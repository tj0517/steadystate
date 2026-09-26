import { CURVE_FILL, CURVE_HEIGHT, CURVE_LINE, CURVE_WIDTH } from "./curve";
import { SettlingEdge } from "./SettlingEdge";

type CurveCardProps = {
  children: React.ReactNode;
  // Hairline around the card, running along both curves.
  bordered?: boolean;
  className?: string;
  as?: "article" | "div";
  reveal?: boolean;
};

// White card on the dark page, with the steady-state curve as its top edge
// (curve.ts, the same line as the band edges, in a 32–44 px cap). Used for
// the two service cards only (tj, 2026-09-26). The card is a light-token
// scope (`data-theme="light"`, like LightScope), so its ground is white
// (`surface-raised`) and text, tags and hairlines inside take their
// light-surface values. The cap is an SVG filled with the ground; bordered
// cards get a 1 px `line` stroke along the curve and down the cap's sides
// (non-scaling, so `preserveAspectRatio="none"` does not distort it),
// meeting the body's own side borders. The bottom cap is the same SVG
// rotated 180°, so the card closes with the curve it opened with, like the
// band (CurveEdge). No corner radius — the curves replace the corners.
export function CurveCard({
  children,
  bordered = false,
  className = "",
  as = "div",
  reveal = false,
}: CurveCardProps) {
  const Tag = as;
  // Each cap: static SVG (resting state) plus SettlingEdge, which draws the
  // same boundary on a canvas while it moves (see SettlingEdge).
  const cap = (position: "top" | "bottom") => (
    <div className="relative h-[32px] md:h-[44px]">
      <svg
        viewBox={`0 0 ${CURVE_WIDTH} ${CURVE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`block h-full w-full overflow-visible ${position === "bottom" ? "rotate-180" : ""}`}
      >
        <path d={CURVE_FILL} className="fill-surface-raised" />
        {bordered && (
          <path
            d={`M0 ${CURVE_HEIGHT} L0 104 ${CURVE_LINE.slice(6)} L${CURVE_WIDTH} ${CURVE_HEIGHT}`}
            fill="none"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="stroke-line"
          />
        )}
      </svg>
      <SettlingEdge
        direction={position === "top" ? "in" : "out"}
        fill="surface-raised"
        stroke={bordered}
        amplitude={16}
      />
    </div>
  );

  return (
    <Tag
      data-theme="light"
      data-reveal={reveal ? "" : undefined}
      className="flex flex-col text-ink"
    >
      {cap("top")}
      <div
        className={`relative z-10 flex-1 bg-surface-raised ${bordered ? "border-x border-line" : ""} ${className}`}
      >
        {children}
      </div>
      {cap("bottom")}
    </Tag>
  );
}
