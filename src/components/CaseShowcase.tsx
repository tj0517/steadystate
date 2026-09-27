import type { Accent } from "@/content/types";

type CaseShowcaseProps = {
  // 0 Hydra Arms, 1 Sea Clouds DCS, 2 Fjordanglers — the showcases are
  // hand-built per case, like the reference's illustrations.
  index: number;
  accent: Accent;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", soft: "bg-signal-soft", bg: "bg-signal", on: "text-on-signal", stroke: "stroke-signal" },
  amber: { text: "text-amber", soft: "bg-amber-soft", bg: "bg-amber", on: "text-on-signal", stroke: "stroke-amber" },
} as const;

const card = "flex flex-col gap-space-2 rounded-md border border-line bg-surface p-space-4";
const bar = "h-[6px] rounded-full bg-line";
const mono = "font-mono text-[11px] leading-[14px] normal-case tracking-normal";

type AccentClasses = (typeof accents)[Accent];

function Badge({ a, children, strong = false }: { a: AccentClasses; children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] items-center rounded-sm px-[6px] ${mono} ${
        strong ? `${a.bg} ${a.on}` : `${a.soft} ${a.text}`
      }`}
    >
      {children}
    </span>
  );
}

function Rows({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-col gap-[6px]">
      {widths.map((w, i) => (
        <span key={i} className={bar} style={{ width: w }} />
      ))}
    </div>
  );
}

// Per-case UI showcase for the explorer panel (SS-1.17, tj 2026-09-27:
// "each case study has its own UI showcase with real computer elements",
// after the Tailark "pillars" illustration). Built from interface parts —
// file cards, a document window, a form, a chat reply, a payment card —
// with skeleton rows for content, hairline connectors and small badges in
// the case accent. Labels are mock data, not claims. Decorative.
export function CaseShowcase({ index, accent }: CaseShowcaseProps) {
  const a = accents[accent];

  if (index === 0) {
    // Hydra Arms: three supplier XML files merge through the nightly
    // import into one catalogue file.
    return (
      <div aria-hidden="true" className="flex w-full max-w-[460px] flex-col items-center">
        <div className="grid w-full grid-cols-3 gap-space-4">
          {["dostawca A", "dostawca B", "dostawca C"].map((file) => (
            <div key={file} className={card}>
              <div className="flex items-center justify-between gap-space-2">
                <span className={`${mono} truncate text-ink`}>{file}</span>
                <span className={`${mono} rounded-sm border border-line px-[4px] text-ink-muted`}>XML</span>
              </div>
              <Rows widths={["80%", "60%", "70%", "45%"]} />
            </div>
          ))}
        </div>
        <svg viewBox="0 0 460 64" className="h-[64px] w-full" aria-hidden="true" fill="none">
          <path d="M76 0 V20 Q76 32 88 32 H218 Q230 32 230 44 V64" className="stroke-line" />
          <path d="M230 0 V64" className="stroke-line" />
          <path d="M384 0 V20 Q384 32 372 32 H242 Q230 32 230 44 V64" className="stroke-line" />
        </svg>
        <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-line bg-surface">
          <svg viewBox="0 0 50 40" width="26" height="21" fill="none" strokeWidth="3" strokeLinecap="round" className={a.stroke}>
            <path d="M3 34 C10 34 11 6 17 6 C23 6 22 28 28 28 C33 28 33 16 38 16 C42 16 42 20 47 20" />
          </svg>
        </div>
        <span className="h-[40px] w-px bg-line" />
        <div className={`${card} w-[240px]`}>
          <div className="flex items-center justify-between">
            <span className={`${mono} text-ink`}>katalog-b2b.csv</span>
            <Badge a={a} strong>2 000+</Badge>
          </div>
          <Rows widths={["85%", "70%", "90%", "55%"]} />
          <span className={`${mono} text-ink-muted`}>import 02:14 · ceny i stany</span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Sea Clouds DCS: a document window with revisions and their status,
    // a transmittal card, hours on the project.
    return (
      <div aria-hidden="true" className="flex w-full max-w-[460px] flex-col gap-space-4">
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <div className="flex items-center gap-[6px] border-b border-line px-space-4 py-space-2">
            <span className="h-[6px] w-[6px] rounded-full bg-line" />
            <span className="h-[6px] w-[6px] rounded-full bg-line" />
            <span className="h-[6px] w-[6px] rounded-full bg-line" />
            <span className={`${mono} ml-space-2 text-ink-muted`}>P-104 · rysunek zbiorczy</span>
          </div>
          <ul className="flex flex-col">
            {[
              ["Rev A", "zatwierdzona", false],
              ["Rev B", "zatwierdzona", false],
              ["Rev C", "w akceptacji", true],
            ].map(([rev, status, current]) => (
              <li
                key={rev as string}
                className={`flex items-center justify-between border-b border-line px-space-4 py-space-2 last:border-b-0 ${mono}`}
              >
                <span className="flex items-center gap-space-2 text-ink">
                  <span className={`h-[6px] w-[6px] rounded-full ${current ? a.bg : "bg-line"}`} />
                  {rev as string}
                </span>
                {current ? <Badge a={a}>{status as string}</Badge> : <span className="text-ink-muted">{status as string}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-space-4">
          <div className={card}>
            <div className="flex items-center justify-between">
              <span className={`${mono} text-ink`}>Transmittal T-31</span>
              <Badge a={a} strong>wysłano</Badge>
            </div>
            <Rows widths={["70%", "50%"]} />
          </div>
          <div className={card}>
            <span className={`${mono} text-ink-muted`}>godziny · P-104</span>
            <span className="font-mono text-[22px] leading-none text-ink">07:30</span>
            <span className={`${mono} text-ink-muted`}>ten tydzień</span>
          </div>
        </div>
      </div>
    );
  }

  // Fjordanglers: ad → form → automatic reply → payment.
  return (
    <div aria-hidden="true" className="flex w-full max-w-[460px] flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-space-4">
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className={`${mono} text-ink`}>Google Ads</span>
            <span className={`${mono} text-ink-muted`}>CTR 4,2%</span>
          </div>
          <span className="h-[44px] rounded-sm bg-line" />
          <Rows widths={["70%", "45%"]} />
        </div>
        <div className={card}>
          <span className={`${mono} text-ink`}>Formularz zapytania</span>
          <span className="h-[22px] rounded-sm border border-line" />
          <span className="h-[22px] rounded-sm border border-line" />
          <span className={`flex h-[22px] items-center justify-center rounded-sm ${a.bg} ${a.on} ${mono}`}>Wyślij</span>
        </div>
      </div>
      <span className="h-[32px] w-px bg-line" />
      <div className="flex w-full flex-col gap-space-2">
        <div className={`${card} w-[78%] self-start`}>
          <span className={`${mono} text-ink-muted`}>zapytanie · 12:04</span>
          <Rows widths={["90%", "60%"]} />
        </div>
        <div className={`${card} w-[78%] self-end`}>
          <div className="flex items-center justify-between">
            <span className={`${mono} text-ink-muted`}>odpowiedź · 12:05</span>
            <Badge a={a}>auto</Badge>
          </div>
          <Rows widths={["85%", "70%", "40%"]} />
        </div>
      </div>
      <span className="h-[32px] w-px bg-line" />
      <div className={`${card} w-[240px]`}>
        <div className="flex items-center justify-between">
          <span className={`${mono} text-ink`}>Oferta nr 2041</span>
          <Badge a={a} strong>opłacono</Badge>
        </div>
        <span className="font-mono text-[22px] leading-none text-ink">4 800 €</span>
        <Rows widths={["60%"]} />
      </div>
    </div>
  );
}
