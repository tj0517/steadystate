import type { Accent, CaseVisual as CaseVisualContent } from "@/content/types";

type CaseVisualProps = {
  visual: CaseVisualContent;
  accent: Accent;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", bg: "bg-signal", border: "border-signal" },
  amber: { text: "text-amber", bg: "bg-amber", border: "border-amber" },
} as const;

// One small motif per case for the expandable panel (SS-1.17, prompt 26,
// after the „Powerful features” reference: a quiet chip timeline, a small
// list — one element, lots of air). Everything is built from the same
// chip: `surface` on `surface-raised`, `line` hairline, radius-sm, mono
// 11 px; hairline connectors; one accent per motif, used once, on the
// settled item (BRAND „Grafika”: thin lines, no icons). Decorative — the
// panel's text carries the meaning.
const chip =
  "flex h-[36px] items-center justify-between gap-space-4 whitespace-nowrap rounded-sm border border-line bg-surface px-space-4";

export function CaseVisual({ visual, accent }: CaseVisualProps) {
  const a = accents[accent];

  if (visual.kind === "log") {
    // Headline with the accent dot, chips indented under a spine with elbows.
    return (
      <div className="flex w-[264px] max-w-full flex-col font-mono text-label normal-case tracking-normal">
        <div className="flex items-center gap-space-2 text-ink">
          <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${a.bg}`} />
          {visual.headline}
        </div>
        <ul className="relative mt-space-4 flex flex-col gap-space-2 pl-space-6">
          <span aria-hidden="true" className="absolute left-[2px] top-0 h-[calc(100%-18px)] w-px bg-line" />
          {visual.entries.map((entry) => (
            <li key={entry.label} className="relative">
              <span aria-hidden="true" className="absolute -left-[22px] top-[18px] h-px w-[18px] bg-line" />
              <span className={chip}>
                <span className="text-ink">{entry.label}</span>
                <span className="text-ink-muted">{entry.meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (visual.kind === "list") {
    // Picker: a title row, then rows; the current one is raised.
    return (
      <div className="flex w-[232px] max-w-full flex-col overflow-hidden rounded-md border border-line bg-surface font-mono text-label normal-case tracking-normal">
        <span className="border-b border-line px-space-4 py-space-2 text-ink-muted">{visual.title}</span>
        <ul className="flex flex-col p-space-1">
          {visual.rows.map((row) => (
            <li
              key={row.label}
              className={`flex h-[32px] items-center justify-between rounded-sm px-space-2 ${
                row.current ? "bg-surface-raised text-ink" : "text-ink-muted"
              }`}
            >
              <span>{row.label}</span>
              <span className={row.current ? a.text : ""}>{row.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Steps: chips on one hairline; the last chip carries the accent border.
  return (
    <ol className="flex max-w-full items-center font-mono text-label normal-case tracking-normal">
      {visual.steps.map((step, index) => {
        const isLast = index === visual.steps.length - 1;
        return (
          <li key={step.label} className="flex items-center">
            <span
              className={`${chip} h-[56px] shrink-0 flex-col items-start justify-center gap-space-1 px-[12px] ${isLast ? a.border : ""}`}
            >
              <span className="text-ink">{step.label}</span>
              <span className="text-ink-muted">{step.meta}</span>
            </span>
            {!isLast && <span aria-hidden="true" className="h-px w-[20px] shrink-0 bg-line" />}
          </li>
        );
      })}
    </ol>
  );
}
