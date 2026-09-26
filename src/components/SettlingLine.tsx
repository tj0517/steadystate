"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

type SettlingLineProps = {
  // The tail of the curve as one cubic in viewBox units: start, two control
  // points, end. The canvas draws this at rest and the physics displace it.
  tail: [Point, Point, Point, Point];
  viewBox: { width: number; height: number };
  // `preserve` = the SVG keeps its aspect ratio (uniform scale from width);
  // otherwise it stretches to the box (`preserveAspectRatio="none"`).
  preserve: boolean;
  // `id` of the static SVG tail path this canvas replaces once it goes live.
  tailId: string;
  // Stroke in viewBox units when `preserve`, else in CSS px.
  strokeWidth: number;
  color: "signal" | "line";
  // How far (px) the line may be pulled from rest.
  amplitude: number;
};

const SPACING_PX = 4;
const REACH_PX = 72;
const REST_EPS = 0.05;

// The flat line of the steady state as a physical system. Every point is a
// mass on a spring, coupled to its neighbours: the pointer pulls the line
// toward itself, and when it leaves the line oscillates once or twice and
// comes to rest — the brand idea, not a decoration. Nothing moves until the
// visitor does; the loop runs only while the line is displaced; reduced
// motion or no JS keeps the static SVG tail and never mounts the canvas.
// It goes live only after the SVG tail has finished drawing (animationend /
// transitionend on `tailId`), so the hand-over is invisible.
export function SettlingLine({
  tail,
  viewBox,
  preserve,
  tailId,
  strokeWidth,
  color,
  amplitude,
}: SettlingLineProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const ctx = canvas.getContext("2d");
    const area =
      canvas.parentElement?.closest<HTMLElement>("[data-settle-area]") ??
      canvas.parentElement;
    const tailPath = document.getElementById(tailId);
    if (!ctx || !area || !tailPath) return;

    let live = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sx = 1;
    let sy = 1;
    let rest: Point[] = [];
    let disp: number[] = [];
    let vel: number[] = [];
    let frame = 0;
    let pointer: Point | null = null;
    let strokeColor = "";

    const sample = (t: number): Point => {
      const [p0, p1, p2, p3] = tail;
      const u = 1 - t;
      const a = u * u * u;
      const b = 3 * u * u * t;
      const c = 3 * u * t * t;
      const d = t * t * t;
      return [
        a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
        a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
      ];
    };

    const layout = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sx = width / viewBox.width;
      sy = preserve ? sx : height / viewBox.height;
      const startX = tail[0][0] * sx;
      const endX = tail[3][0] * sx;
      const n = Math.max(2, Math.round((endX - startX) / SPACING_PX) + 1);
      rest = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const [x, y] = sample(t);
        return [x * sx, y * sy];
      });
      disp = new Array(n).fill(0);
      vel = new Array(n).fill(0);
      strokeColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${color}`)
        .trim();
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (!live) return;
      ctx.beginPath();
      ctx.lineWidth = preserve ? strokeWidth * sx : strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = strokeColor;
      rest.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y + disp[i]);
        else ctx.lineTo(x, y + disp[i]);
      });
      ctx.stroke();
    };

    // One physics step at ~60 fps. Coupled damped springs: the return to
    // rest is the ease-out the brand asks for; the coupling lets a pull
    // travel along the line instead of staying a local bump.
    const step = () => {
      const n = rest.length;
      let energy = 0;
      for (let i = 1; i < n; i++) {
        const left = disp[i - 1];
        const right = i < n - 1 ? disp[i + 1] : disp[i];
        let acc = 0.28 * (left + right - 2 * disp[i]) - 0.012 * disp[i] - 0.06 * vel[i];
        if (pointer) {
          const dx = Math.abs(rest[i][0] - pointer[0]);
          if (dx < REACH_PX) {
            const w = 1 - dx / REACH_PX;
            const target = Math.max(
              -amplitude,
              Math.min(amplitude, pointer[1] - rest[i][1]),
            );
            acc += (target - disp[i]) * 0.1 * w * w;
          }
        }
        vel[i] += acc;
        disp[i] += vel[i];
        energy += Math.abs(disp[i]) + Math.abs(vel[i]);
      }
      draw();
      if (energy / n > REST_EPS || pointer) {
        frame = requestAnimationFrame(step);
      } else {
        disp.fill(0);
        vel.fill(0);
        draw();
        frame = 0;
      }
    };

    const wake = () => {
      if (live && frame === 0) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      pointer = [event.clientX - box.left, event.clientY - box.top];
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    const goLive = () => {
      if (live) return;
      live = true;
      tailPath.style.opacity = "0";
      layout();
    };

    // Hand-over: wait for the SVG tail to finish its draw-in. If it has no
    // animation or transition pending (already drawn), go live right away.
    // Deferred one tick so RevealObserver has marked below-the-fold sections.
    const onTailDone = () => goLive();
    tailPath.addEventListener("animationend", onTailDone);
    tailPath.addEventListener("transitionend", onTailDone);
    const timer = window.setTimeout(() => {
      const style = getComputedStyle(tailPath);
      const hidden = tailPath.closest(".reveal-hidden") !== null;
      const animating = style.animationName !== "none" && style.animationPlayState !== "paused";
      if (!hidden && !animating && parseFloat(style.strokeDashoffset) === 0) {
        goLive();
      }
    }, 0);

    const resize = new ResizeObserver(() => layout());
    resize.observe(canvas);
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);

    return () => {
      window.clearTimeout(timer);
      tailPath.removeEventListener("animationend", onTailDone);
      tailPath.removeEventListener("transitionend", onTailDone);
      resize.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      tailPath.style.opacity = "";
    };
  }, [tail, viewBox, preserve, tailId, strokeWidth, color, amplitude]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
