"use client";

import { useEffect, useRef } from "react";
import { CURVE_HEIGHT, CURVE_REST_Y, CURVE_WIDTH, sampleCurve } from "./curve";

type SettlingEdgeProps = {
  direction: "in" | "out";
};

const SPACING = 6; // viewBox units between mass points
const REACH_PX = 110;
const AMPLITUDE_PX = 36;
const REST_EPS = 0.04;
// Initial overshoot: the edge appears with its wave 60 % larger than the
// final shape and settles into it.
const ENTRY_OVERSHOOT = 0.6;

// Motion for a band edge (CurveEdge). The boundary between dark and light
// is the same coupled-spring system as the hero line (SettlingLine), drawn
// as a filled area on a canvas that covers the static SVG:
//  - on first reveal it starts with a larger wave and settles into the
//    final curve — one ease-out that ends at rest (BRAND.md „Ruch”);
//  - with a mouse, moving over the edge pulls the boundary toward the
//    pointer; leaving lets it swing back and settle.
// The loop runs only while the edge is displaced. Touch devices get the
// settle-in on reveal but no pull. Reduced motion and no JS keep the static
// SVG; the canvas takes over only while it has something to draw and hands
// back at rest, so the hand-over is invisible.
export function SettlingEdge({ direction }: SettlingEdgeProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (
      !canvas ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const ctx = canvas.getContext("2d");
    const svg = canvas.previousElementSibling as SVGSVGElement | null;
    if (!ctx || !svg) return;

    const rest = sampleCurve(SPACING);
    const n = rest.length;
    const disp = new Array<number>(n).fill(0);
    const vel = new Array<number>(n).fill(0);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sx = 1;
    let sy = 1;
    let frame = 0;
    let pointer: [number, number] | null = null;
    let fillColor = "";
    let live = false;
    let entered = false;

    const layout = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sx = width / CURVE_WIDTH;
      sy = height / CURVE_HEIGHT;
      fillColor = getComputedStyle(document.documentElement).getPropertyValue("--tail").trim();
      draw();
    };

    // `out` edges are the same shape rotated 180°: mirror both axes.
    const px = (x: number) => (direction === "out" ? width - x * sx : x * sx);
    const py = (y: number) => (direction === "out" ? height - y : y);

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (!live) return;
      ctx.beginPath();
      ctx.moveTo(px(0), py(height));
      for (let i = 0; i < n; i++) {
        ctx.lineTo(px(rest[i][0]), py(rest[i][1] * sy + disp[i]));
      }
      ctx.lineTo(px(CURVE_WIDTH), py(height));
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    };

    const step = () => {
      const acc = new Array<number>(n).fill(0);
      for (let i = 1; i < n - 1; i++) {
        let a =
          0.26 * (disp[i - 1] + disp[i + 1] - 2 * disp[i]) -
          0.014 * disp[i] -
          0.055 * vel[i];
        if (pointer) {
          const dx = Math.abs(px(rest[i][0]) - pointer[0]);
          if (dx < REACH_PX) {
            const w = 1 - dx / REACH_PX;
            const restPx = py(rest[i][1] * sy);
            const pull = direction === "out" ? -(pointer[1] - restPx) : pointer[1] - restPx;
            const target = Math.max(-AMPLITUDE_PX, Math.min(AMPLITUDE_PX, pull));
            a += (target - disp[i]) * 0.09 * w * w;
          }
        }
        acc[i] = a;
      }
      let energy = 0;
      for (let i = 1; i < n - 1; i++) {
        vel[i] += acc[i];
        disp[i] += vel[i];
        energy += Math.abs(disp[i]) + Math.abs(vel[i]);
      }
      draw();
      if (Number.isFinite(energy) && (energy / n > REST_EPS || pointer)) {
        frame = requestAnimationFrame(step);
      } else {
        disp.fill(0);
        vel.fill(0);
        live = false;
        svg.style.opacity = "";
        draw();
        frame = 0;
      }
    };

    const wake = () => {
      if (!live) {
        live = true;
        layout();
        svg.style.opacity = "0";
      }
      if (frame === 0) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      const inside =
        event.clientY > box.top - 80 &&
        event.clientY < box.bottom + 80 &&
        event.clientX >= box.left &&
        event.clientX <= box.right;
      if (inside) {
        pointer = [event.clientX - box.left, event.clientY - box.top];
        wake();
      } else if (pointer) {
        pointer = null;
        wake();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entered || !entries.some((e) => e.isIntersecting)) return;
        entered = true;
        observer.disconnect();
        // Larger wave than the final one, in the sign of the curve's own
        // deviation from its flat level — so the shape exaggerates, then
        // settles into itself.
        for (let i = 1; i < n - 1; i++) {
          disp[i] = (rest[i][1] - CURVE_REST_Y) * sy * ENTRY_OVERSHOOT;
        }
        wake();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    layout();
    observer.observe(canvas);
    const resize = new ResizeObserver(() => layout());
    resize.observe(canvas);
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      svg.style.opacity = "";
    };
  }, [direction]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
