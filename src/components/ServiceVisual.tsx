import type { Accent } from "@/content/types";

type Notice = { app: string; title: string; body: string; time: string };

type ServiceVisualProps = {
  accent: Accent;
  // Two notification banners: the pain (a mail thread, muted) and the
  // system's own notice (accent).
  before: Notice;
  after: Notice;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { icon: "bg-signal", on: "text-on-signal", text: "text-signal" },
  amber: { icon: "bg-amber", on: "text-on-signal", text: "text-amber" },
} as const;

// One stacked card per service line, holding two iOS-style notification
// banners (SS-1.17, tj 2026-09-27: "two real UI fragments in an Apple
// style the customer recognises, addressing the pain and the solution,
// not too much"). Banner one is the pain — a mail thread — dimmed; banner
// two is the system's notice in the line's accent. Mock data. Decorative.
export function ServiceVisual({ accent, before, after }: ServiceVisualProps) {
  const a = accents[accent];
  const banner = (n: Notice, mode: "before" | "after") => (
    <div
      className={`flex items-start gap-space-4 rounded-lg border border-line bg-surface p-space-4 ${mode === "before" ? "opacity-60" : ""}`}
    >
      <span
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] ${mode === "before" ? "bg-line" : a.icon}`}
        aria-hidden="true"
      >
        {mode === "before" ? (
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" strokeWidth="1.5" className="stroke-ink-muted">
            <rect x="2.5" y="5" width="15" height="10" rx="2" />
            <path d="M3 6l7 5 7-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 50 40" width="22" height="18" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-on-signal">
            <path d="M6 32 C11 32 12 8 18 8 C24 8 23 26 29 26 C34 26 34 17 38 17 L45 17" />
          </svg>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="flex items-baseline justify-between gap-space-4">
          <span className={`text-label uppercase ${mode === "before" ? "text-ink-muted" : a.text}`}>{n.app}</span>
          <span className="text-label normal-case tracking-normal text-ink-muted">{n.time}</span>
        </span>
        <span className="text-small font-medium text-ink">{n.title}</span>
        <span className="truncate text-small text-ink-muted">{n.body}</span>
      </span>
    </div>
  );

  return (
    <div aria-hidden="true" className="relative pt-[14px]">
      <span className="absolute inset-x-[20px] top-0 h-[14px] rounded-t-lg border border-b-0 border-line bg-surface-raised" />
      <span className="absolute inset-x-[10px] top-[7px] h-[14px] rounded-t-lg border border-b-0 border-line bg-surface-raised" />
      <div className="relative flex flex-col gap-space-4 rounded-lg border border-line bg-surface-raised p-space-6">
        {banner(before, "before")}
        {banner(after, "after")}
      </div>
    </div>
  );
}
