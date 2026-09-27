import type { Accent } from "@/content/types";

type CaseNodeDiagramProps = {
  steps: string[];
  accent: Accent;
  ariaLabel: string;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { stroke: "stroke-signal", text: "text-signal", border: "border-signal" },
  amber: { stroke: "stroke-amber", text: "text-amber", border: "border-amber" },
} as const;

// Node diagram of a case's flow for the explorer panel (SS-1.17, after the
// Tailark "pillars" reference: sources merge into a hub and out to one
// result). Built from the case's `flow` labels: a first step written as
// "… ×3 …" fans out into three source nodes that merge into the next; the
// rest is a vertical chain. Nodes are `surface` chips with `line`
// hairlines and mono labels; connectors are hairlines; the accent is used
// once, on the final node. No icons, no fills beyond tone (BRAND „Grafika”).
export function CaseNodeDiagram({ steps, accent, ariaLabel }: CaseNodeDiagramProps) {
  const a = accents[accent];
  const fan = /×(\d)/.exec(steps[0] ?? "");
  const sources = fan ? Number(fan[1]) : 1;
  const chain = fan ? steps.slice(1) : steps;
  const chip =
    "flex h-[40px] items-center justify-center whitespace-nowrap rounded-sm border border-line bg-surface px-space-4 font-mono text-label normal-case tracking-normal text-ink";

  return (
    <div role="img" aria-label={ariaLabel} className="flex flex-col items-center">
      {fan && (
        <>
          <div className="flex gap-space-4">
            {Array.from({ length: sources }, (_, i) => (
              <span key={i} className={chip}>
                {steps[0].replace(/\s*×\d+\s*/, " ")}
                <span className="ml-space-2 text-ink-muted">{i + 1}</span>
              </span>
            ))}
          </div>
          {/* Three drops merging into one stem. */}
          <svg viewBox="0 0 300 56" className="h-[56px] w-[300px]" aria-hidden="true" fill="none">
            <path d="M50 0 V16 Q50 28 62 28 H138 Q150 28 150 40 V56" className="stroke-line" />
            <path d="M150 0 V56" className="stroke-line" />
            <path d="M250 0 V16 Q250 28 238 28 H162 Q150 28 150 40 V56" className="stroke-line" />
          </svg>
        </>
      )}
      {chain.map((label, index) => {
        const isLast = index === chain.length - 1;
        return (
          <div key={label} className="flex flex-col items-center">
            {(index > 0 || (!fan && index === 0 && false)) && (
              <span aria-hidden="true" className="h-[40px] w-px bg-line" />
            )}
            <span className={`${chip} ${isLast ? `${a.border} ${a.text}` : ""}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
