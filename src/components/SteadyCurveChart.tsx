import type { SiteContent } from "@/content/types";

type SteadyCurveChartProps = {
  content: SiteContent["hero"]["chart"];
};

// Chart geometry from the reference HERO
// (design/steadystate-brand/reference/homepage-desktop.html) — colours come
// from tokens. Labels are HTML overlays, not SVG <text>, so they stay
// readable at a fixed size instead of scaling down with the chart on
// narrow screens.
export function SteadyCurveChart({ content }: SteadyCurveChartProps) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 560 300"
        width="536"
        height="287"
        role="img"
        aria-label={content.ariaLabel}
        className="h-auto w-full"
      >
        <g className="stroke-line" strokeWidth="1">
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
          className="stroke-signal"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M0 250 C40 250 50 30 90 34 C120 37 118 160 150 166 C180 171 176 106 205 110 C232 114 230 206 262 208 C300 210 380 212 560 212"
          fill="none"
          className="stroke-signal"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="530" cy="212" r="8" className="fill-ink" />
      </svg>

      <span className="absolute bottom-[2.7%] left-[1.4%] whitespace-nowrap text-label uppercase text-ink-muted">
        {content.startLabel}
      </span>
      <span className="absolute right-[1.4%] bottom-[2.7%] whitespace-nowrap text-label uppercase text-ink-muted">
        {content.endLabel}
      </span>
      <span className="absolute right-[3.2%] bottom-[16.7%] inline-flex items-center whitespace-nowrap rounded-sm bg-signal-soft px-space-2 py-1 text-label uppercase text-signal">
        {content.badge}
      </span>
    </div>
  );
}
