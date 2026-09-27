import type { Accent, CaseVisual as CaseVisualContent } from "@/content/types";

type CaseVisualProps = {
  visual: CaseVisualContent;
  accent: Accent;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", bg: "bg-signal", stroke: "stroke-signal" },
  amber: { text: "text-amber", bg: "bg-amber", stroke: "stroke-amber" },
} as const;

// One diagram per case for the expandable panel (SS-1.17, prompt 26):
// nightly import, revision register, inquiry funnel. Built from the same
// parts as the hero dashboard — `surface` tiles on `surface-raised`,
// `line` hairlines, mono labels, one accent per diagram (BRAND „Grafika”:
// flow diagrams and thin lines, no icons). Decorative: the parent hides it
// from assistive tech; the panel's text carries the meaning.
export function CaseVisual({ visual, accent }: CaseVisualProps) {
  const a = accents[accent];

  if (visual.kind === "import") {
    // Three source rows feed one catalogue tile; the SVG bracket joins them.
    const rowHeight = 40;
    const gap = 8;
    const height = visual.sources.length * rowHeight + (visual.sources.length - 1) * gap;
    const mid = height / 2;
    return (
      <div className="flex flex-col gap-space-4 font-mono text-label normal-case tracking-normal">
        <span className="text-ink-muted">{visual.schedule}</span>
        <div className="flex flex-col lg:flex-row lg:items-center">
          <ul className="flex w-full flex-col gap-space-2 lg:w-[196px] lg:shrink-0">
            {visual.sources.map((source) => (
              <li
                key={source.name}
                className="flex h-[40px] items-center justify-between rounded-sm border border-line bg-surface px-space-4"
              >
                <span className="text-ink">{source.name}</span>
                <span className="text-ink-muted">{source.count}</span>
              </li>
            ))}
          </ul>
          <svg
            width="56"
            height={height}
            viewBox={`0 0 56 ${height}`}
            fill="none"
            strokeWidth="1"
            strokeLinecap="round"
            className={`hidden shrink-0 lg:block ${a.stroke}`}
          >
            {visual.sources.map((source, index) => {
              const y = index * (rowHeight + gap) + rowHeight / 2;
              return <path key={source.name} d={`M0 ${y} H16 C30 ${y} 22 ${mid} 36 ${mid}`} />;
            })}
            <path d={`M36 ${mid} H50`} />
            <path d={`M45 ${mid - 3} L50 ${mid} L45 ${mid + 3}`} />
          </svg>
          <span className={`ml-space-6 h-[16px] w-px lg:hidden ${a.bg}`} />
          <div className="flex min-w-0 flex-col gap-space-1 rounded-md border border-line bg-surface p-space-4 lg:min-w-[168px]">
            <span className="text-ink-muted">{visual.target.label}</span>
            <span className={`text-[26px] leading-none ${a.text}`}>{visual.target.value}</span>
            <span className="truncate text-ink-muted">{visual.target.note}</span>
          </div>
        </div>
      </div>
    );
  }

  if (visual.kind === "register") {
    // Register table: hairline rows, accent dot on the settled status.
    return (
      <div className="flex w-full flex-col font-mono text-label normal-case tracking-normal">
        <div className="grid grid-cols-[64px_40px_1fr] gap-x-space-4 border-b border-line pb-space-2 uppercase text-ink-muted lg:grid-cols-[72px_44px_64px_1fr]">
          {visual.columns.map((column, index) => (
            <span key={column} className={index === 2 ? "hidden lg:inline" : ""}>
              {column}
            </span>
          ))}
        </div>
        {visual.rows.map((row) => (
          <div
            key={row.id}
            className="grid h-[40px] grid-cols-[64px_40px_1fr] items-center gap-x-space-4 border-b border-line lg:grid-cols-[72px_44px_64px_1fr]"
          >
            <span className="text-ink">{row.id}</span>
            <span className="text-ink">{row.rev}</span>
            <span className="hidden text-ink-muted lg:inline">{row.owner}</span>
            <span className={`flex items-center gap-space-2 whitespace-nowrap ${row.done ? a.text : "text-ink-muted"}`}>
              <span
                className={`h-[6px] w-[6px] shrink-0 rounded-full ${row.done ? a.bg : "border border-line"}`}
              />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Funnel: thin bars scaled to the first stage; the last stage — the one
  // that ends in a paid client — carries the accent.
  const max = visual.stages[0]?.value ?? 1;
  return (
    <div className="flex w-full flex-col gap-space-4 font-mono text-label normal-case tracking-normal">
      <ul className="flex flex-col gap-space-4">
        {visual.stages.map((stage, index) => {
          const isLast = index === visual.stages.length - 1;
          return (
            <li key={stage.label} className="grid grid-cols-[96px_32px_1fr] items-center gap-x-space-4">
              <span className={isLast ? a.text : "text-ink"}>{stage.label}</span>
              <span className="text-right text-ink-muted">{stage.value}</span>
              <span className="h-[6px] w-full rounded-full bg-surface">
                <span
                  className={`block h-full rounded-full ${isLast ? a.bg : "bg-line"}`}
                  style={{ width: `${(stage.value / max) * 100}%` }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <span className="text-ink-muted">{visual.footnote}</span>
    </div>
  );
}
