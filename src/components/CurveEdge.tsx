import { CURVE_FILL, CURVE_HEIGHT, CURVE_WIDTH } from "./curve";
import { SettlingEdge } from "./SettlingEdge";

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
// steps down below `lg`. The SVG is the resting state; SettlingEdge draws
// the same boundary on a canvas while it moves (settle-in on reveal,
// pointer pull on desktop) and hands back when it is at rest.
export function CurveEdge({ direction = "in" }: CurveEdgeProps) {
  return (
    <div className="relative h-[48px] md:h-[72px] lg:h-[96px]">
      <svg
        viewBox={`0 0 ${CURVE_WIDTH} ${CURVE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`block h-full w-full ${direction === "out" ? "rotate-180" : ""}`}
      >
        <path d={CURVE_FILL} style={{ fill: "var(--tail)" }} />
      </svg>
      <SettlingEdge direction={direction} fill="tail" />
    </div>
  );
}
