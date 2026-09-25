import type { SiteContent } from "@/content/types";

type SteadyCurveChartProps = {
  content: SiteContent["hero"]["chart"];
};

// Chart geometry from the reference HERO
// (design/steadystate-brand/reference/homepage-desktop.html) — colours come
// from tokens.
export function SteadyCurveChart({ content }: SteadyCurveChartProps) {
  return (
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
      <rect x="392" y="222" width="150" height="28" rx="4" className="fill-signal-soft" />
      <text
        x="467"
        y="241"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="12"
        letterSpacing="1"
        className="fill-signal"
      >
        {content.badge}
      </text>
      <text
        x="8"
        y="292"
        fontFamily="var(--font-mono)"
        fontSize="12"
        letterSpacing="1"
        className="fill-ink-muted"
      >
        {content.startLabel}
      </text>
      <text
        x="552"
        y="292"
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="12"
        letterSpacing="1"
        className="fill-ink-muted"
      >
        {content.endLabel}
      </text>
    </svg>
  );
}
