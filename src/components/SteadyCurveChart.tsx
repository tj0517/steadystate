import type { SiteContent } from "@/content/types";

type SteadyCurveChartProps = {
  content: SiteContent["hero"]["chart"];
};

// Length of the curve path below, measured once (numerical integration of
// the five cubic segments gives 896.1; a browser getTotalLength() agrees to
// within a pixel). Rounded up so `stroke-dashoffset: 900` hides the whole
// path before the draw animation starts. Recompute if the `d` changes.
const CURVE_LENGTH = 900;

// Chart geometry from the reference HERO
// (design/steadystate-brand/reference/homepage-desktop.html) — colours come
// from tokens. Labels are HTML overlays, not SVG <text>, so they stay
// readable at a fixed size instead of scaling down with the chart on
// narrow screens. The viewBox is cropped to 260 high: the axis captions
// that used the bottom band went in SS-1.14 and the curve starts at y=250.
// The draw-in animation lives in globals.css (`.curve-*` classes).
export function SteadyCurveChart({ content }: SteadyCurveChartProps) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 560 260"
        width="560"
        height="260"
        role="img"
        aria-label={content.ariaLabel}
        className="h-auto w-full"
      >
        <g className="curve-grid stroke-line" strokeWidth="1">
          <line x1="0" y1="60" x2="560" y2="60" />
          <line x1="0" y1="120" x2="560" y2="120" />
          <line x1="0" y1="180" x2="560" y2="180" />
          <line x1="0" y1="240" x2="560" y2="240" />
        </g>
        <line
          x1="0"
          y1="212"
          x2="560"
          y2="212"
          className="curve-grid stroke-signal"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M0 250 C40 250 50 30 90 34 C120 37 118 160 150 166 C180 171 176 106 205 110 C232 114 230 206 262 208 C300 210 380 212 560 212"
          fill="none"
          className="curve-path stroke-signal"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={CURVE_LENGTH}
        />
        <circle cx="530" cy="212" r="8" className="curve-dot fill-ink" />
      </svg>

      <span className="curve-badge absolute right-[3.2%] bottom-[3.8%] inline-flex items-center whitespace-nowrap rounded-sm bg-signal-soft px-space-2 py-1 text-label uppercase text-signal">
        {content.badge}
      </span>
    </div>
  );
}
