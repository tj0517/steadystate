import Image from "next/image";
import type { Accent } from "@/content/types";

type CaseShowcaseProps = {
  // Keyed by case name — one rebuilt screen per case.
  name: string;
  accent: Accent;
  // The client's logo (partner file), shown in the rebuilt screen's chrome
  // where the real product shows its brand.
  logo?: { src: string; width: number; height: number };
};

function Brand({ logo, className }: { logo?: { src: string; width: number; height: number }; className: string }) {
  if (!logo) return null;
  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      unoptimized
      className={`w-auto self-start ${className}`}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", soft: "bg-signal-soft", bg: "bg-signal", on: "text-on-signal", border: "border-signal" },
  amber: { text: "text-amber", soft: "bg-amber-soft", bg: "bg-amber", on: "text-on-signal", border: "border-amber" },
} as const;
type A = (typeof accents)[Accent];

// Screen typography: everything a step smaller than the page, so the
// window reads as a screenshot, not as page content.
const t = {
  xs: "font-sans text-[9px] leading-[12px]",
  sm: "font-sans text-[10px] leading-[14px]",
  md: "font-sans text-[11px] leading-[15px]",
  mono: "font-mono text-[9px] leading-[12px] normal-case tracking-normal",
};

// Cropped window: the real screen's proportions, cut at the bottom like a
// screenshot; hairline frame, tone only.
function Window({
  children,
  dark = false,
  // Fixed 340 px crop for rebuilt screens; `natural` lets a real
  // screenshot keep its own proportions instead.
  natural = false,
}: { children: React.ReactNode; dark?: boolean; natural?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[560px] overflow-hidden rounded-md border border-line ${natural ? "" : "h-[340px]"} ${dark ? "bg-surface" : "bg-surface-raised"}`}
    >
      {children}
    </div>
  );
}

function Chip({ a, children, strong = false }: { a: A; children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] items-center whitespace-nowrap rounded-full px-space-2 ${t.xs} ${
        strong ? `${a.bg} ${a.on}` : `${a.soft} ${a.text}`
      }`}
    >
      {children}
    </span>
  );
}

// Rebuilt screens of the three systems (SS-1.17, tj 2026-09-27, from
// screenshots tj provided; Hydra Arms is the real screenshot): the same
// structure as the real views —
// navigation, headers, tabs, field grids, pipelines — redrawn in the site's
// tokens with mock data and no client branding, until screenshots can be
// used. Decorative; the panel's text carries the meaning.
export function CaseShowcase({ name, accent, logo }: CaseShowcaseProps) {
  const a = accents[accent];

  if (name === "Fjordanglers") {
    // Inquiry page: header with contact and status, trip fields, the
    // eight-step pipeline with the current step, tabs, next-step card.
    const steps = ["New", "Qualifying", "Waiting guide", "Offer presented", "Awaiting payment", "Paid", "Handed over", "Completed"];
    const current = 3;
    return (
      <Window>
        <div className="flex h-full">
          <aside className="hidden w-[118px] shrink-0 flex-col gap-space-4 bg-surface p-space-4 md:flex">
            <Brand logo={logo} className="h-[14px]" />
            <span className={`rounded-sm border border-line px-space-2 py-[3px] ${t.xs} ${a.text}`}>Admin panel</span>
            <ul className={`flex flex-col gap-[6px] ${t.sm} text-ink-muted`}>
              {["Weekly", "Overview", "Guides", "Experiences", "Inquiries", "Pipeline", "Ads", "Finances"].map((item) => (
                <li key={item} className={item === "Inquiries" ? `rounded-sm px-space-2 py-[3px] ${a.soft} ${a.text}` : "px-space-2 py-[3px]"}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col gap-space-4 p-space-4">
            <span className={`${t.xs} text-ink-muted`}>Admin › Inquiries › <span className={a.text}>Jonas K.</span></span>
            <div className="flex flex-col gap-space-4 rounded-md border border-line bg-surface p-space-4">
              <div className="flex items-center gap-space-2">
                <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${a.bg} ${a.on} ${t.sm} font-medium`}>J</span>
                <span className="flex flex-col">
                  <span className={`${t.md} font-medium text-ink`}>Jonas K.</span>
                  <span className={`${t.xs} text-ink-muted`}>jonas@example.com · +47 …</span>
                </span>
                <span className={`ml-auto ${t.xs} text-ink-muted`}>Received 24 Sept</span>
                <Chip a={a}>Offer presented</Chip>
              </div>
              <div className={`grid grid-cols-2 gap-space-2 border-t border-line pt-space-2 md:grid-cols-4 ${t.xs}`}>
                {[["Trip", "Fly fishing"], ["Country", "Norway"], ["Group", "3 people"], ["Dates", "12–15 Jun"]].map(([k, v]) => (
                  <span key={k} className="flex flex-col">
                    <span className="uppercase tracking-[0.06em] text-ink-muted">{k}</span>
                    <span className={`${t.sm} text-ink`}>{v}</span>
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {steps.map((s, i) => (
                  <span key={s} className="flex flex-1 flex-col gap-[4px]">
                    <span className={`h-[3px] rounded-full ${i <= current ? a.bg : "bg-line"}`} />
                    <span className={`${t.xs} truncate ${i === current ? "font-medium text-ink" : "text-ink-muted"}`}>{s}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={`flex gap-space-4 overflow-hidden whitespace-nowrap ${t.sm} text-ink-muted`}>
              {["Overview", "Conversation", "Brief", "Guide", "Offer & payment"].map((tab) => (
                <span key={tab} className={tab === "Offer & payment" ? "rounded-sm border border-line bg-surface px-space-2 py-[2px] text-ink" : "py-[2px]"}>
                  {tab}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-space-4 md:grid-cols-[1fr_120px]">
              <div className="flex flex-col gap-space-2 rounded-md border border-line bg-surface p-space-4">
                <span className={`${t.xs} uppercase tracking-[0.06em] text-ink-muted`}>Next step</span>
                <span className={`${t.md} font-medium text-ink`}>Offer sent, awaiting payment</span>
                <span className={`${t.xs} text-ink-muted`}>The angler received the offer and the payment link automatically.</span>
              </div>
              <div className={`flex flex-col gap-[6px] rounded-md border border-line bg-surface p-space-4 ${t.xs}`}>
                <span className="uppercase tracking-[0.06em] text-ink-muted">Deal</span>
                {[["Offer", "4 800 €"], ["Deposit", "1 200 €"], ["Guide", "Erik"]].map(([k, v]) => (
                  <span key={k} className="flex justify-between"><span className="text-ink-muted">{k}</span><span className="font-mono text-ink">{v}</span></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Window>
    );
  }

  if (name === "Hydra Arms") {
    // Real screenshot of the site's hero (tj, 2026-09-27), uncropped: the
    // window takes the image's own proportions. 1400 px JPEG in
    // /public/cases, a browser tooltip painted out of the top-left corner.
    return (
      <Window dark natural>
        <Image
          src="/cases/hydra-arms.jpg"
          alt=""
          width={1400}
          height={762}
          unoptimized
          className="block h-auto w-full"
        />
      </Window>
    );
  }

  // Sea Clouds DCS: document page — sidebar, breadcrumb, document number
  // with workflow status, tabs, field grid, current-revision column.
  const fields: [string, string][] = [
    ["SCL number", "SC2699-SCL-AA-0002-EN"],
    ["Client number", "—"],
    ["Project", "SC2699 — Create Project MDR"],
    ["Document type", "AA — Accounting / Budget"],
    ["Discipline", "B00 — Procurement & SCM"],
    ["Area", "10 — Offshore"],
    ["Language", "EN — English"],
    ["Originator", "ADMIN"],
  ];
  return (
    <Window>
      <div className="flex h-full">
        <aside className="hidden w-[104px] shrink-0 flex-col gap-space-4 border-r border-line p-space-4 md:flex">
          <Brand logo={logo} className="h-[28px]" />
          <ul className={`flex flex-col gap-[6px] ${t.sm} text-ink-muted`}>
            {["Projects", "MDR", "Dictionaries", "Clients"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-space-2 p-space-4">
          <span className={`${t.xs} truncate text-ink-muted`}>SC2699 — DCS Demo — Create Project MDR — documents / SC2699-SCL-AA-0002-EN</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[13px] leading-[18px] text-ink">SC2699-SCL-AA-0002-EN</span>
            <span className={`rounded-sm border border-line px-space-2 py-[2px] ${t.xs} text-ink`}>STARTED</span>
          </div>
          <div className={`flex gap-space-4 overflow-hidden whitespace-nowrap ${t.sm} text-ink-muted`}>
            {["Information", "Revisions", "Plan", "Comments", "References", "Transmittals", "History"].map((tab) => (
              <span key={tab} className={tab === "Information" ? "rounded-sm border border-line px-space-2 py-[2px] text-ink" : "py-[2px]"}>
                {tab}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-space-4 md:grid-cols-[1fr_150px]">
            <div className={`grid grid-cols-1 gap-x-space-4 gap-y-space-2 rounded-md border border-line p-space-4 md:grid-cols-2 ${t.xs}`}>
              {fields.map(([k, v]) => (
                <span key={k} className="flex flex-col">
                  <span className="text-ink-muted">{k}</span>
                  <span className={`${t.sm} truncate text-ink`}>{v}</span>
                </span>
              ))}
            </div>
            <div className={`flex flex-col gap-[6px] rounded-md border border-line p-space-4 ${t.xs}`}>
              <span className={`${t.sm} font-medium text-ink`}>Current revision</span>
              {[["SCL revision", "A"], ["Step", "IDC"], ["Revision date", "2026-09-22"]].map(([k, v]) => (
                <span key={k} className="flex justify-between border-b border-line pb-[4px] last:border-b-0">
                  <span className="text-ink-muted">{k}</span><span className="text-ink">{v}</span>
                </span>
              ))}
              <span className="flex justify-between"><span className="text-ink-muted">Status</span><Chip a={a}>IDC</Chip></span>
              <span className={`mt-space-2 flex h-[20px] items-center justify-center rounded-sm ${a.bg} ${a.on} ${t.xs}`}>New revision</span>
              <span className={`flex h-[20px] items-center justify-center rounded-sm border border-line ${t.xs} text-ink`}>Add file</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
