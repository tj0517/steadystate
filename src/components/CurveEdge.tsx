import { CURVE_FILL, CURVE_HEIGHT, CURVE_WIDTH } from "./curve";

type CurveEdgeProps = {
  // `in`: dark page above, light band below (the default).
  // `out`: light band above, dark page below — the same shape rotated
  // 180°, so the band closes with the curve it opened with.
  direction?: "in" | "out";
};

// Band edge shaped like the steady-state curve (curve.ts, shared with the
// cards): the boundary between the dark page and the light band
// (LightScope). Filled with `--tail` (the dark theme's `deep`).
// `preserveAspectRatio="none"` so the edge spans any width; the height
// steps down below `lg`. Static — no parallax (tj, 2026-09-26).
export function CurveEdge({ direction = "in" }: CurveEdgeProps) {
  return (
    <svg
      viewBox={`0 0 ${CURVE_WIDTH} ${CURVE_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-[48px] w-full md:h-[72px] lg:h-[96px] ${direction === "out" ? "rotate-180" : ""}`}
    >
      <path d={CURVE_FILL} style={{ fill: "var(--tail)" }} />
    </svg>
  );
}
