import type { Accent } from "@/content/types";

type ServiceArtefactProps = {
  accent: Accent;
  // Number of loose inputs on the left (mail, sheets, calls…).
  inputs?: number;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { stroke: "stroke-signal", fill: "fill-signal" },
  amber: { stroke: "stroke-amber", fill: "fill-amber" },
} as const;

// Before → after for a service card (SS-1.17): scattered inputs on the
// left — hairline chips with skeleton rows, tilted a little — and one
// system on the right, a chip in the card's accent with the dot. Between
// them the steady-state curve: the inputs' lines oscillate and settle into
// the system. Shapes only, no text; the card's copy carries the meaning.
export function ServiceArtefact({ accent, inputs = 3 }: ServiceArtefactProps) {
  const a = accents[accent];
  const ys = inputs === 3 ? [14, 42, 70] : [28, 56];
  return (
    <svg
      viewBox="0 0 320 96"
      aria-hidden="true"
      className="block h-auto w-full max-w-[320px]"
      fill="none"
      strokeWidth="1"
    >
      {ys.map((y, i) => (
        <g key={y} transform={`rotate(${i % 2 === 0 ? -4 : 3} 36 ${y + 8})`}>
          <rect x="4" y={y} width="64" height="20" rx="4" className="stroke-line fill-surface" />
          <rect x="12" y={y + 6} width="26" height="3" rx="1.5" className="fill-line" />
          <rect x="12" y={y + 12} width="40" height="3" rx="1.5" className="fill-line" />
        </g>
      ))}
      {ys.map((y) => (
        <path
          key={`c-${y}`}
          d={`M72 ${y + 10} C110 ${y + 10} 120 ${48 + (y - 42) * 0.9} 150 ${48 + (y - 42) * 0.4} C175 ${48 + (y - 42) * 0.15} 190 48 232 48`}
          className="stroke-line"
        />
      ))}
      <path d="M150 48 C175 48 190 48 232 48" className={a.stroke} strokeWidth="1.5" />
      <rect x="232" y="30" width="80" height="36" rx="4" className={`${a.stroke} fill-surface`} strokeWidth="1.5" />
      <rect x="244" y="41" width="30" height="3" rx="1.5" className="fill-line" />
      <rect x="244" y="49" width="46" height="3" rx="1.5" className="fill-line" />
      <circle cx="300" cy="48" r="3.5" className={a.fill} />
    </svg>
  );
}
