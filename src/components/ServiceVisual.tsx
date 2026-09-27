import type { Accent } from "@/content/types";

type ServiceVisualProps = {
  line: "ops" | "sales";
  accent: Accent;
  // Labels of the loose inputs in the "before" row — words that already
  // appear in the card copy (mail, Excel / reklama, formularz).
  before: string[];
  // Captions for the two rows; from the hero chart ("przed", "po wdrożeniu").
  captionBefore: string;
  captionAfter: string;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", soft: "bg-signal-soft", bg: "bg-signal", on: "text-on-signal", stroke: "stroke-signal", border: "border-signal" },
  amber: { text: "text-amber", soft: "bg-amber-soft", bg: "bg-amber", on: "text-on-signal", stroke: "stroke-amber", border: "border-amber" },
} as const;

const mono = "font-mono text-[11px] leading-[14px] normal-case tracking-normal";

function Rows({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-col gap-[6px]">
      {widths.map((w, i) => (
        <span key={i} className="h-[6px] rounded-full bg-line" style={{ width: w }} />
      ))}
    </div>
  );
}

// Pain point → solution for a service line (SS-1.17, after the Tailark
// two-column reference). Top row: the "before" — loose inputs as tilted
// hairline chips (mail, Excel / reklama, formularz). Between: the
// steady-state curve settling into the system. Bottom: the "after" — a
// stacked card with real interface pieces in the line's accent (document
// with status and hours for Ops; automatic reply and paid offer for Sales).
// Mock data, no claims. Decorative; the column's text carries the meaning.
export function ServiceVisual({ line, accent, before, captionBefore, captionAfter }: ServiceVisualProps) {
  const a = accents[accent];
  return (
    <div aria-hidden="true" className="flex flex-col gap-space-4">
      <div className="flex items-center gap-space-4">
        <span className="text-label uppercase text-ink-muted">{captionBefore}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="flex flex-wrap gap-space-4">
        {before.map((label, i) => (
          <span
            key={label}
            className={`flex w-[132px] flex-col gap-space-2 rounded-md border border-line bg-surface p-space-4 ${mono} text-ink-muted`}
            style={{ transform: `rotate(${i % 2 === 0 ? -2.5 : 2}deg)` }}
          >
            {label}
            <Rows widths={["70%", "45%", "60%"]} />
          </span>
        ))}
      </div>
      <svg viewBox="0 0 320 48" className="h-[48px] w-full max-w-[320px]" fill="none" aria-hidden="true">
        <path d="M0 6 C40 6 44 40 80 40 C116 40 120 12 156 12 C192 12 196 34 232 34 C256 34 270 30 320 30" className="stroke-line" />
        <path d="M232 34 C256 34 270 30 320 30" className={a.stroke} strokeWidth="1.5" />
        <circle cx="312" cy="30" r="3" className={a.bg} />
      </svg>
      <div className="flex items-center gap-space-4">
        <span className={`text-label uppercase ${a.text}`}>{captionAfter}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="relative pt-[14px]">
        <span aria-hidden="true" className="absolute inset-x-[20px] top-0 h-[14px] rounded-t-md border border-b-0 border-line bg-surface-raised" />
        <span aria-hidden="true" className="absolute inset-x-[10px] top-[7px] h-[14px] rounded-t-md border border-b-0 border-line bg-surface-raised" />
        <div className="relative rounded-md border border-line bg-surface-raised p-space-6">
          {line === "ops" ? (
            <div className="grid grid-cols-[1fr_auto] gap-space-6">
              <div className="flex flex-col gap-space-4">
                <div className="flex items-center gap-space-2">
                  <span className={`${mono} whitespace-nowrap text-ink`}>P-104 · Rev C</span>
                  <span className={`inline-flex h-[20px] items-center rounded-sm px-space-2 ${mono} ${a.soft} ${a.text}`}>zatwierdzona</span>
                </div>
                <Rows widths={["85%", "60%", "72%"]} />
                <div className="flex items-center gap-space-4 border-t border-line pt-space-4">
                  <span className={`${mono} text-ink-muted`}>transmittal T-31</span>
                  <span className={`inline-flex h-[20px] items-center rounded-sm px-space-2 ${mono} ${a.bg} ${a.on}`}>wysłano</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-space-1">
                <span className={`${mono} text-ink-muted`}>godziny</span>
                <span className="font-mono text-[28px] leading-none text-ink">07:30</span>
                <span className={`${mono} text-ink-muted`}>ten tydzień</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-space-4">
              <div className="flex items-start gap-space-2">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-line font-mono text-[10px] text-ink">JK</span>
                <div className="flex flex-col gap-space-1">
                  <span className={`${mono} text-ink-muted`}>zapytanie · 12:04</span>
                  <Rows widths={["180px", "120px"]} />
                </div>
              </div>
              <div className={`flex items-start gap-space-2 self-end rounded-md border ${a.border} px-space-4 py-space-2`}>
                <div className="flex flex-col gap-space-1">
                  <span className={`${mono} text-ink-muted`}>odpowiedź · 12:05</span>
                  <Rows widths={["200px", "150px"]} />
                </div>
                <span className={`inline-flex h-[20px] items-center rounded-sm px-space-2 ${mono} ${a.soft} ${a.text}`}>auto</span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-space-4">
                <span className="flex flex-col">
                  <span className={`${mono} text-ink-muted`}>oferta 2041</span>
                  <span className="font-mono text-[28px] leading-none text-ink">4 800 €</span>
                </span>
                <span className={`inline-flex h-[20px] items-center rounded-sm px-space-2 ${mono} ${a.bg} ${a.on}`}>opłacono</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
