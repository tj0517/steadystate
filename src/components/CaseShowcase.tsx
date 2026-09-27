import Image from "next/image";
import type { Accent } from "@/content/types";

type Logo = { src: string; width: number; height: number };

type CaseShowcaseProps = {
  // Keyed by case name — one rebuilt screen per case.
  name: string;
  accent: Accent;
  // The client's logo (partner file), shown where the real product shows
  // its brand.
  logo?: Logo;
};

// Screen typography: everything a step smaller than the page, so the
// window reads as a screenshot, not as page content.
const t = {
  xs: "font-sans text-[9px] leading-[12px]",
  sm: "font-sans text-[10px] leading-[14px]",
  md: "font-sans text-[11px] leading-[15px]",
};

// Product colours come from public/cases/screens.css (`.screen-fjord`,
// `.screen-dcs`) as `--sc-*` variables; the helpers below map them to
// inline styles so the screens use the clients' palettes, not ours.
const v = (name: string) => `var(--sc-${name})`;
const S = {
  bg: { background: v("bg") },
  surface: { background: v("surface"), borderColor: v("line") },
  line: { borderColor: v("line") },
  text: { color: v("text") },
  muted: { color: v("muted") },
  accentText: { color: v("accent") },
  accentBg: { background: v("accent"), color: v("surface") },
  chip: { background: v("chip-bg"), color: v("chip-text") },
  nav: { background: v("nav"), color: v("nav-text") },
  navActive: { background: v("nav-active") },
  skeleton: { background: v("line") },
};

// Cropped window: the real screen's proportions, cut at the bottom like a
// screenshot; hairline frame. `natural` lets a real screenshot keep its own
// proportions; `palette` switches on a product palette.
function Window({
  children,
  natural = false,
  palette,
}: { children: React.ReactNode; natural?: boolean; palette?: "screen-fjord" | "screen-dcs" }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[560px] overflow-hidden rounded-md border border-line bg-surface ${natural ? "" : "h-[340px]"} ${palette ?? ""}`}
      style={palette ? S.bg : undefined}
    >
      {children}
    </div>
  );
}

function Brand({ logo, className, light = false }: { logo?: Logo; className: string; light?: boolean }) {
  if (!logo) return null;
  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      unoptimized
      className={`w-auto ${className}`}
      style={light ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

// Rebuilt screens of the three systems (SS-1.17, tj 2026-09-27, from
// screenshots tj provided; Hydra Arms is the real screenshot): the same
// structure as the real views — navigation, headers, tabs, field grids,
// pipelines — in each product's own colours, with mock data. Decorative;
// the panel's text carries the meaning.
export function CaseShowcase({ name, logo }: CaseShowcaseProps) {
  if (name === "Fjordanglers") {
    // Inquiry page: navy sidebar with the orange accent, light content —
    // header with contact and status, trip fields, the eight-step pipeline,
    // tabs, next-step card and deal column.
    const steps = ["New", "Qualifying", "Waiting guide", "Offer presented", "Awaiting payment", "Paid", "Handed over", "Completed"];
    const current = 3;
    return (
      <Window palette="screen-fjord">
        <div className="flex h-full">
          <aside className="hidden w-[118px] shrink-0 flex-col gap-space-4 p-space-4 md:flex" style={S.nav}>
            <Brand logo={logo} className="h-[14px]" light />
            <span className={`rounded-sm px-space-2 py-[3px] ${t.xs}`} style={{ ...S.navActive, color: v("accent") }}>Admin panel</span>
            <ul className={`flex flex-col gap-[6px] ${t.sm}`}>
              {["Weekly", "Overview", "Guides", "Experiences", "Inquiries", "Pipeline", "Ads", "Finances"].map((item) => (
                <li
                  key={item}
                  className="rounded-sm px-space-2 py-[3px]"
                  style={item === "Inquiries" ? { ...S.navActive, color: v("accent") } : undefined}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col gap-space-4 p-space-4">
            <span className={t.xs} style={S.muted}>Admin › Inquiries › <span style={S.accentText}>Jonas K.</span></span>
            <div className="flex flex-col gap-space-4 rounded-md border p-space-4" style={S.surface}>
              <div className="flex items-center gap-space-2">
                <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${t.sm} font-medium`} style={{ background: v("nav"), color: v("surface") }}>J</span>
                <span className="flex flex-col">
                  <span className={`${t.md} font-medium`} style={S.text}>Jonas K.</span>
                  <span className={t.xs} style={S.muted}>jonas@example.com · +47 …</span>
                </span>
                <span className={`ml-auto ${t.xs}`} style={S.muted}>Received 24 Sept</span>
                <span className={`inline-flex h-[18px] items-center whitespace-nowrap rounded-full px-space-2 ${t.xs}`} style={S.chip}>Offer presented</span>
              </div>
              <div className={`grid grid-cols-2 gap-space-2 border-t pt-space-2 md:grid-cols-4 ${t.xs}`} style={S.line}>
                {[["Trip", "Fly fishing"], ["Country", "Norway"], ["Group", "3 people"], ["Dates", "12–15 Jun"]].map(([k, val]) => (
                  <span key={k} className="flex flex-col">
                    <span className="uppercase tracking-[0.06em]" style={S.muted}>{k}</span>
                    <span className={t.sm} style={S.text}>{val}</span>
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {steps.map((s, i) => (
                  <span key={s} className="flex flex-1 flex-col gap-[4px]">
                    <span className="h-[3px] rounded-full" style={i <= current ? { background: v("nav") } : S.skeleton} />
                    <span className={`${t.xs} truncate ${i === current ? "font-medium" : ""}`} style={i === current ? S.text : S.muted}>{s}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={`flex gap-space-4 overflow-hidden whitespace-nowrap ${t.sm}`} style={S.muted}>
              {["Overview", "Conversation", "Brief", "Guide", "Offer & payment"].map((tab) => (
                <span
                  key={tab}
                  className={tab === "Offer & payment" ? "rounded-sm border px-space-2 py-[2px]" : "py-[2px]"}
                  style={tab === "Offer & payment" ? { ...S.surface, color: v("text") } : undefined}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-space-4 md:grid-cols-[1fr_120px]">
              <div className="flex flex-col gap-space-2 rounded-md border p-space-4" style={S.surface}>
                <span className={`${t.xs} uppercase tracking-[0.06em]`} style={S.muted}>Next step</span>
                <span className={`${t.md} font-medium`} style={S.text}>Offer sent, awaiting payment</span>
                <span className={t.xs} style={S.muted}>The angler received the offer and the payment link automatically.</span>
              </div>
              <div className={`flex flex-col gap-[6px] rounded-md border p-space-4 ${t.xs}`} style={S.surface}>
                <span className="uppercase tracking-[0.06em]" style={S.muted}>Deal</span>
                {[["Offer", "4 800 €"], ["Deposit", "1 200 €"], ["Guide", "Erik"]].map(([k, val]) => (
                  <span key={k} className="flex justify-between"><span style={S.muted}>{k}</span><span className="font-mono" style={S.text}>{val}</span></span>
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
    // /public/cases; a browser tooltip painted out and the logo restored.
    return (
      <Window natural>
        <Image src="/cases/hydra-arms.jpg" alt="" width={1400} height={762} unoptimized className="block h-auto w-full" />
      </Window>
    );
  }

  // Sea Clouds DCS: light document page — white sidebar, breadcrumb,
  // document number with workflow status, tabs, field grid, current
  // revision column with the teal action button.
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
    <Window palette="screen-dcs">
      <div className="flex h-full">
        <aside className="hidden w-[104px] shrink-0 flex-col gap-space-4 border-r p-space-4 md:flex" style={{ ...S.nav, borderColor: v("line") }}>
          <Brand logo={logo} className="h-[20px]" />
          <ul className={`flex flex-col gap-[6px] ${t.sm}`}>
            {["Projects", "MDR", "Dictionaries", "Clients"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-space-2 p-space-4">
          <span className={`${t.xs} truncate`} style={S.muted}>SC2699 — DCS Demo — Create Project MDR — documents / SC2699-SCL-AA-0002-EN</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[13px] leading-[18px]" style={S.text}>SC2699-SCL-AA-0002-EN</span>
            <span className={`rounded-sm border px-space-2 py-[2px] ${t.xs}`} style={{ ...S.surface, color: v("text") }}>STARTED</span>
          </div>
          <div className={`flex gap-space-4 overflow-hidden whitespace-nowrap ${t.sm}`} style={S.muted}>
            {["Information", "Revisions", "Plan", "Comments", "References", "Transmittals", "History"].map((tab) => (
              <span
                key={tab}
                className={tab === "Information" ? "rounded-sm border px-space-2 py-[2px]" : "py-[2px]"}
                style={tab === "Information" ? { ...S.surface, color: v("text") } : undefined}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-space-4 md:grid-cols-[1fr_150px]">
            <div className={`grid grid-cols-1 gap-x-space-4 gap-y-space-2 rounded-md border p-space-4 md:grid-cols-2 ${t.xs}`} style={S.surface}>
              {fields.map(([k, val]) => (
                <span key={k} className="flex flex-col">
                  <span style={S.muted}>{k}</span>
                  <span className={`${t.sm} truncate`} style={S.text}>{val}</span>
                </span>
              ))}
            </div>
            <div className={`flex flex-col gap-[6px] rounded-md border p-space-4 ${t.xs}`} style={S.surface}>
              <span className={`${t.sm} font-medium`} style={S.text}>Current revision</span>
              {[["SCL revision", "A"], ["Step", "IDC"], ["Revision date", "2026-09-22"]].map(([k, val]) => (
                <span key={k} className="flex justify-between border-b pb-[4px] last:border-b-0" style={S.line}>
                  <span style={S.muted}>{k}</span><span style={S.text}>{val}</span>
                </span>
              ))}
              <span className="flex justify-between"><span style={S.muted}>Status</span><span className={`rounded-sm border px-[5px] ${t.xs}`} style={{ ...S.line, color: v("text") }}>IDC</span></span>
              <span className={`mt-space-2 flex h-[20px] items-center justify-center rounded-sm ${t.xs}`} style={S.accentBg}>New revision</span>
              <span className={`flex h-[20px] items-center justify-center rounded-sm ${t.xs}`} style={S.accentBg}>Add file</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
