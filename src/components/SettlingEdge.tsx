"use client";

import { useEffect, useRef } from "react";
import { CURVE_HEIGHT, CURVE_REST_Y, CURVE_WIDTH, sampleCurve } from "./curve";

type SettlingEdgeProps = {
  direction: "in" | "out";
  // CSS custom property holding the fill: `tail` for band edges,
  // `surface-raised` for the white cards (resolved on the canvas, so a
  // light-token scope gives the light value).
  fill: "tail" | "surface-raised";
  // Draw a 1 px `line` hairline along the boundary and down the box sides
  // (bordered cards).
  stroke?: boolean;
};

const SPACING = 6; // viewBox units between mass points
const REST_EPS = 0.04;
// Initial overshoot: the edge appears with its wave 35 % larger than the
// final shape and eases into it.
const ENTRY_OVERSHOOT = 0.35;

// Motion for a curved edge (CurveEdge, CurveCard caps). The boundary is
// the same coupled-spring system as the hero line (SettlingLine), drawn as
// a filled area on a canvas that covers the static SVG and reaches half a
// box height above and below it, so a big swing is never cropped:
// on first reveal it starts with a larger wave and settles into the final
// curve — one ease-out that ends at rest (BRAND.md „Ruch”). No pointer
// interaction (tj, 2026-09-27). The loop runs only while the edge is
// displaced. Reduced motion and no JS keep the static SVG; the canvas takes
// over only while it has something to draw and hands back at rest.
export function SettlingEdge({
  direction,
  fill,
  stroke = false,
}: SettlingEdgeProps) {
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
    const box = canvas.parentElement;
    if (!ctx || !svg || !box) return;

    const rest = sampleCurve(SPACING);
    const n = rest.length;
    const disp = new Array<number>(n).fill(0);
    const vel = new Array<number>(n).fill(0);
    let width = 0; // edge box
    let height = 0;
    let pad = 0; // canvas overhang above and below the box
    let canvasH = 0;
    let dpr = 1;
    let sx = 1;
    let sy = 1;
    let frame = 0;
    let fillColor = "";
    let strokeColor = "";
    let live = false;
    let entered = false;

    const layout = () => {
      const b = box.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      width = b.width;
      height = b.height;
      canvasH = c.height;
      pad = (canvasH - height) / 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(canvasH * dpr);
      sx = width / CURVE_WIDTH;
      sy = height / CURVE_HEIGHT;
      const style = getComputedStyle(canvas);
      fillColor = style.getPropertyValue(`--${fill}`).trim();
      strokeColor = style.getPropertyValue("--line").trim();
      draw();
    };

    // `out` edges are the same shape rotated 180°: mirror both axes within
    // the box; `pad` moves box coordinates onto the taller canvas.
    const px = (x: number) => (direction === "out" ? width - x * sx : x * sx);
    const py = (y: number) => pad + (direction === "out" ? height - y : y);
    const boundaryY = (i: number) => py(rest[i][1] * sy + disp[i]);

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, canvasH);
      if (!live) return;
      ctx.beginPath();
      ctx.moveTo(px(0), py(height));
      for (let i = 0; i < n; i++) ctx.lineTo(px(rest[i][0]), boundaryY(i));
      ctx.lineTo(px(CURVE_WIDTH), py(height));
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      if (stroke) {
        ctx.beginPath();
        ctx.moveTo(px(0), py(height));
        for (let i = 0; i < n; i++) ctx.lineTo(px(rest[i][0]), boundaryY(i));
        ctx.lineTo(px(CURVE_WIDTH), py(height));
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      }
    };

    const step = () => {
      const acc = new Array<number>(n).fill(0);
      for (let i = 1; i < n - 1; i++) {
        const a =
          0.2 * (disp[i - 1] + disp[i + 1] - 2 * disp[i]) -
          0.012 * disp[i] -
          0.085 * vel[i];
        acc[i] = a;
      }
      let energy = 0;
      for (let i = 1; i < n - 1; i++) {
        vel[i] += acc[i];
        disp[i] += vel[i];
        energy += Math.abs(disp[i]) + Math.abs(vel[i]);
      }
      draw();
      if (Number.isFinite(energy) && energy / n > REST_EPS) {
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
    observer.observe(box);
    const resize = new ResizeObserver(() => layout());
    resize.observe(box);

    return () => {
      observer.disconnect();
      resize.disconnect();
      if (frame) cancelAnimationFrame(frame);
      svg.style.opacity = "";
    };
  }, [direction, fill, stroke]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-1/2 h-[200%] w-full"
    />
  );
}
