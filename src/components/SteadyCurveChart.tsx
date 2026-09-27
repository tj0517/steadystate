import type { SiteContent } from "@/content/types";

type SteadyCurveChartProps = {
  content: SiteContent["hero"]["chart"];
};

// The curve is two paths: the oscillation (length 598, rounded to 600) and
// the flat tail (298, rounded to 300). Lengths are numerical integrations of
// the cubics; a browser getTotalLength() agrees within a pixel. Both are
// hidden by their own dash offset before the draw animation (globals.css,
// `--curve-len`). Recompute if a `d` changes.
const OSC_LENGTH = 600;
const TAIL_LENGTH = 300;

// Chart geometry from the reference HERO
// (design/steadystate-brand/reference/homepage-desktop.html) — colours come
// from tokens. Labels are HTML overlays, not SVG <text>, so they stay
// readable at a fixed size instead of scaling down with the chart on
// narrow screens. The viewBox is cropped to 260 high: the axis captions
// that used the bottom band went in SS-1.14 and the curve starts at y=250.
// Grid lines removed (tj, 2026-09-27) — only the dashed steady-state
// baseline stays. The draw-in animation lives in globals.css (`.curve-*`).
export function SteadyCurveChart({ content }: SteadyCurveChartProps) {
  return (
    <div className="relative pb-space-4 md:pb-0">
      <div className="relative">
        <svg
          viewBox="0 0 560 260"
          width="560"
          height="260"
          role="img"
          aria-label={content.ariaLabel}
          className="h-auto w-full"
        >
          <line
            x1="0"
            y1="212"
            x2="560"
            y2="212"
            className="curve-baseline stroke-signal"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M0 250 C40 250 50 30 90 34 C120 37 118 160 150 166 C180 171 176 106 205 110 C232 114 230 206 262 208"
            fill="none"
            className="curve-path stroke-signal"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={OSC_LENGTH}
            style={{ "--curve-len": OSC_LENGTH } as React.CSSProperties}
          />
          <path
            id="hero-curve-tail"
            d="M262 208 C300 210 380 212 560 212"
            fill="none"
            className="curve-tail stroke-signal"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={TAIL_LENGTH}
            style={{ "--curve-len": TAIL_LENGTH } as React.CSSProperties}
          />
          <circle cx="530" cy="212" r="8" className="curve-dot fill-ink" />
        </svg>
      </div>

      <span className="curve-badge absolute right-[3.2%] bottom-0 inline-flex items-center whitespace-nowrap rounded-sm bg-signal-soft px-space-2 py-1 text-label uppercase text-signal">
        {content.badge}
      </span>
    </div>
  );
}
