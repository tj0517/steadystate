type CurveCardProps = {
  children: React.ReactNode;
  // Card ground: the cap and the body share it.
  fill: "surface-raised" | "signal-soft" | "amber-soft";
  // Hairline around the card (services and contact cards); the steady-state
  // boxes in the cases register have none.
  bordered?: boolean;
  radius?: "md" | "lg";
  className?: string;
  as?: "article" | "div";
  reveal?: boolean;
};

const FILL = {
  "surface-raised": "fill-surface-raised",
  "signal-soft": "fill-signal-soft",
  "amber-soft": "fill-amber-soft",
} as const;

const BG = {
  "surface-raised": "bg-surface-raised",
  "signal-soft": "bg-signal-soft",
  "amber-soft": "bg-amber-soft",
} as const;

const CURVE =
  "M0 118 C60 118 70 8 140 8 C200 8 200 104 260 104 C310 104 320 44 370 44 C420 44 420 88 470 88 C520 88 560 72 640 72 L1440 72";

// Card whose top edge is the steady-state curve (same path as CurveEdge,
// scaled to a cap of 40–56 px). The cap is an SVG filled with the card
// ground; for bordered cards a 1 px `line` stroke runs along the curve and
// down the cap's sides (non-scaling, so `preserveAspectRatio="none"` does
// not distort it), meeting the body's own border. Top corners are square —
// the curve replaces them — bottom corners keep the card radius.
export function CurveCard({
  children,
  fill,
  bordered = false,
  radius = "lg",
  className = "",
  as = "div",
  reveal = false,
}: CurveCardProps) {
  const Tag = as;
  const bodyRadius = radius === "lg" ? "rounded-b-lg" : "rounded-b-md";

  return (
    <Tag data-reveal={reveal ? "" : undefined} className="flex flex-col">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block h-[40px] w-full overflow-visible md:h-[56px]"
      >
        <path d={`${CURVE} L1440 120 L0 120 Z`} className={FILL[fill]} />
        {bordered && (
          <path
            d={`M0 120 L0 118 ${CURVE.slice(6)} L1440 120`}
            fill="none"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="stroke-line"
          />
        )}
      </svg>
      <div
        className={`flex-1 ${bodyRadius} ${BG[fill]} ${bordered ? "border border-t-0 border-line" : ""} ${className}`}
      >
        {children}
      </div>
    </Tag>
  );
}
