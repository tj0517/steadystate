import type { Accent } from "@/content/types";

type CaseShowcaseProps = {
  // Keyed by case name — the showcases are hand-built per case, like the
  // reference illustrations; an unknown name falls back to the last one.
  name: string;
  accent: Accent;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", soft: "bg-signal-soft", bg: "bg-signal", on: "text-on-signal", stroke: "stroke-signal", border: "border-signal" },
  amber: { text: "text-amber", soft: "bg-amber-soft", bg: "bg-amber", on: "text-on-signal", stroke: "stroke-amber", border: "border-amber" },
} as const;
type AccentClasses = (typeof accents)[Accent];

const mono = "font-mono text-[12px] leading-[16px] normal-case tracking-normal";

function Badge({ a, children, strong = false }: { a: AccentClasses; children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-sm px-space-2 ${mono} ${
        strong ? `${a.bg} ${a.on}` : `${a.soft} ${a.text}`
      }`}
    >
      {children}
    </span>
  );
}

// Two offset cards behind the main one — the reference's stacked depth,
// with hairlines instead of shadows.
function Stack({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full pt-[16px]">
      <span aria-hidden="true" className="absolute inset-x-[24px] top-0 h-[16px] rounded-t-md border border-b-0 border-line bg-surface" />
      <span aria-hidden="true" className="absolute inset-x-[12px] top-[8px] h-[16px] rounded-t-md border border-b-0 border-line bg-surface" />
      <div className="relative rounded-md border border-line bg-surface">{children}</div>
    </div>
  );
}

function Mark({ a }: { a: AccentClasses }) {
  return (
    <svg viewBox="0 0 50 40" width="30" height="24" fill="none" strokeWidth="3" strokeLinecap="round" className={a.stroke} aria-hidden="true">
      <path d="M3 34 C10 34 11 6 17 6 C23 6 22 28 28 28 C33 28 33 16 38 16 C42 16 42 20 47 20" />
    </svg>
  );
}

// Small document thumbnail, as in the invoice reference.
function DocThumb() {
  return (
    <div className="hidden h-[96px] w-[76px] shrink-0 flex-col gap-[7px] rounded-md border border-line bg-surface-raised p-space-2 md:flex" aria-hidden="true">
      <span className="flex items-center gap-[4px]">
        <span className="h-[8px] w-[8px] rounded-full bg-line" />
        <span className="h-[3px] w-[16px] rounded-full bg-line" />
      </span>
      <span className="h-[3px] w-[40px] rounded-full bg-line" />
      <span className="h-[3px] w-[52px] rounded-full bg-line" />
      <span className="h-[3px] w-[46px] rounded-full bg-line" />
      <span className="h-[3px] w-[30px] rounded-full bg-line" />
    </div>
  );
}

// Per-case UI showcase for the explorer panel (SS-1.17, tj 2026-09-27,
// after the Tailark feature references: one big element per case with a
// focal number, stacked cards for depth, a segmented bar, a timeline, a
// chat exchange). Labels are mock data, not claims. Decorative.
export function CaseShowcase({ name, accent }: CaseShowcaseProps) {
  const a = accents[accent];

  if (name === "Hydra Arms") {
    // Hydra Arms: the catalogue after the nightly import — big count,
    // document thumb, a bar split by supplier.
    const suppliers = [
      ["dostawca A", "812", "40%"],
      ["dostawca B", "640", "32%"],
      ["dostawca C", "562", "28%"],
    ];
    return (
      <div aria-hidden="true" className="w-full max-w-[520px]">
        <Stack>
          <div className="flex flex-col gap-space-6 p-space-6">
            <div className="flex items-start justify-between gap-space-6">
              <div className="flex flex-col gap-space-4">
                <Mark a={a} />
                <div className="flex flex-col gap-space-1">
                  <span className={`${mono} text-ink-muted`}>katalog B2B · import 02:14</span>
                  <span className="whitespace-nowrap font-mono text-[36px] leading-none text-ink">2 014</span>
                  <span className="text-small text-ink-muted">produktów, ceny i stany z tej nocy</span>
                </div>
              </div>
              <DocThumb />
            </div>
            <div className="flex flex-col gap-space-4 border-t border-line pt-space-6">
              <div className="flex h-[10px] w-full gap-[3px] overflow-hidden rounded-full">
                {suppliers.map(([name, , width], i) => (
                  <span
                    key={name}
                    className={`h-full ${i === 0 ? a.bg : i === 1 ? a.soft : "bg-line"}`}
                    style={{ width }}
                  />
                ))}
              </div>
              <ul className="flex flex-col gap-space-2">
                {suppliers.map(([name, count, width], i) => (
                  <li key={name} className={`flex items-center gap-space-2 ${mono}`}>
                    <span className={`h-[6px] w-[6px] rounded-full ${i === 0 ? a.bg : i === 1 ? a.soft : "bg-line"}`} />
                    <span className="text-ink">{name}</span>
                    <span className="text-ink-muted">({width})</span>
                    <span className="ml-auto text-ink">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Stack>
      </div>
    );
  }

  if (name === "Sea Clouds DCS") {
    // Sea Clouds DCS: a revision's day as a timeline with the transmittal
    // highlighted, and the hours on the project as the focal number.
    const events: [string, string, boolean][] = [
      ["08:10", "Rev C wgrana", false],
      ["11:45", "Transmittal T-31 wysłany", true],
      ["16:20", "Rev C zatwierdzona", false],
    ];
    return (
      <div aria-hidden="true" className="grid w-full max-w-[520px] grid-cols-1 gap-space-6 md:grid-cols-[1fr_200px]">
        <ol className="relative flex flex-col gap-space-4 py-space-2 pl-space-6">
          <span aria-hidden="true" className="absolute left-[7px] top-0 h-full w-px border-l border-dashed border-line" />
          {events.map(([time, label, current]) => (
            <li key={time} className="relative flex items-center gap-space-4">
              <span
                className={`absolute -left-[22px] h-[10px] w-[10px] rounded-full border ${current ? `${a.border} ${a.bg}` : "border-line bg-surface"}`}
              />
              {current ? (
                <span className="flex items-center gap-space-4 rounded-md border border-line bg-surface px-space-4 py-space-2">
                  <span className={`${mono} text-ink-muted`}>{time}</span>
                  <span className="text-small text-ink">{label}</span>
                  <Badge a={a} strong>wysłano</Badge>
                </span>
              ) : (
                <>
                  <span className={`${mono} text-ink-muted`}>{time}</span>
                  <span className="text-small text-ink">{label}</span>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-space-4 rounded-md border border-line bg-surface p-space-4">
          <div className="flex items-center justify-between">
            <span className={`${mono} text-ink-muted`}>P-104 · godziny</span>
            <Mark a={a} />
          </div>
          <span className="whitespace-nowrap font-mono text-[36px] leading-none text-ink">07:30</span>
          <span className="text-small text-ink-muted">ten tydzień, 3 osoby</span>
          <div className="flex h-[24px] items-end gap-[3px]">
            {[40, 60, 100, 70, 50, 30, 20, 80, 90, 60, 45, 100, 65, 35].map((h, i) => (
              <span key={i} className={`w-full rounded-sm ${i < 9 ? a.bg : "bg-line"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fjordanglers: the enquiry and the automatic reply, then the paid offer
  // as a stacked card with the focal amount.
  return (
    <div aria-hidden="true" className="flex w-full max-w-[520px] flex-col gap-space-6">
      <div className="flex flex-col gap-space-4">
        <div className="flex flex-col gap-space-2">
          <span className="flex items-center gap-space-2 text-small text-ink">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-line font-mono text-[10px] text-ink">JK</span>
            Jonas · zapytanie 12:04
          </span>
          <p className="max-w-[360px] rounded-md rounded-tl-none border border-line bg-surface px-space-4 py-space-4 text-small text-ink">
            Hi, 3 osoby, 12–15 czerwca, łowienie z łodzi. Wolne?
          </p>
        </div>
        <div className="flex flex-col items-end gap-space-2">
          <span className="flex items-center gap-space-2 text-small text-ink">
            Fjordanglers · odpowiedź 12:05
            <Badge a={a}>auto</Badge>
          </span>
          <p className={`max-w-[360px] rounded-md rounded-tr-none border ${a.border} bg-surface px-space-4 py-space-4 text-small text-ink`}>
            Hi Jonas, 12–15 czerwca mamy wolną łódź i przewodnika. Oferta i link do płatności poniżej.
          </p>
        </div>
      </div>
      <Stack>
        <div className="flex items-start justify-between gap-space-6 p-space-6">
          <div className="flex flex-col gap-space-4">
            <Mark a={a} />
            <div className="flex flex-col gap-space-1">
              <span className={`${mono} text-ink-muted`}>oferta 2041 · 3 osoby · 4 dni</span>
              <span className="whitespace-nowrap font-mono text-[36px] leading-none text-ink">4 800 €</span>
              <span className="text-small text-ink-muted">zaliczka opłacona online</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-space-4">
            <Badge a={a} strong>opłacono</Badge>
            <DocThumb />
          </div>
        </div>
      </Stack>
    </div>
  );
}
