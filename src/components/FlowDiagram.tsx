import type { Accent } from "@/content/types";

type FlowDiagramProps = {
  steps: string[];
  accent: Accent;
  ariaLabel: string;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: "stroke-signal",
  amber: "stroke-amber",
} as const;

// Diagram metrics in viewBox units (1 unit = 1 px at natural size). Label
// widths are estimated from JetBrains Mono's 0.6 em advance and then pinned
// with `textLength`, so a fallback font cannot push a label into an arrow.
const FONT_SIZE = 11;
const CHAR_WIDTH = 6.6;
const GAP = 28; // space between labels that holds the arrow
const ARROW_INSET = 6;
const ARROW_HEAD = 5;
const HEIGHT = 24;
const BASELINE = 16;

// Flow diagram per case (BRAND.md „Grafika”: flow diagrams, thin lines, no
// icons). One SVG, mono labels in `ink`, connectors in the case accent —
// one accent per diagram. Scales down with its column; labels stay in order.
export function FlowDiagram({ steps, accent, ariaLabel }: FlowDiagramProps) {
  const stroke = accents[accent];
  const nodes: { label: string; x: number; width: number }[] = [];
  for (const label of steps) {
    const previous = nodes[nodes.length - 1];
    const x = previous ? previous.x + previous.width + GAP : 0;
    nodes.push({ label, x, width: Math.ceil(label.length * CHAR_WIDTH) });
  }
  const last = nodes[nodes.length - 1];
  const totalWidth = last ? last.x + last.width : 0;
  const arrowY = BASELINE - 4;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${HEIGHT}`}
      width={totalWidth}
      height={HEIGHT}
      role="img"
      aria-label={ariaLabel}
      fill="none"
      className="h-auto max-w-full"
    >
      {nodes.map((node, index) => {
        const arrowStart = node.x + node.width + ARROW_INSET;
        const arrowEnd = node.x + node.width + GAP - ARROW_INSET;
        const isLast = index === nodes.length - 1;

        return (
          <g key={index}>
            <text
              x={node.x}
              y={BASELINE}
              fontSize={FONT_SIZE}
              textLength={node.width}
              lengthAdjust="spacingAndGlyphs"
              className="fill-ink font-mono"
            >
              {node.label}
            </text>
            {!isLast && (
              <g
                fill="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={stroke}
              >
                <line x1={arrowStart} y1={arrowY} x2={arrowEnd} y2={arrowY} />
                <path
                  d={`M${arrowEnd - ARROW_HEAD} ${arrowY - 3} L${arrowEnd} ${arrowY} L${arrowEnd - ARROW_HEAD} ${arrowY + 3}`}
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
