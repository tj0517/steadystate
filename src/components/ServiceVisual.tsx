import { FileCheck, Mail, MessageSquareReply } from "lucide-react";
import type { Accent } from "@/content/types";

type Notice = { app: string; title: string; body: string; time: string };

// Solution icons from lucide (tj, 2026-09-27: "an icon from a library");
// the pain banner always shows Mail.
const SOLUTION_ICON = { ops: FileCheck, sales: MessageSquareReply } as const;

type ServiceVisualProps = {
  line: keyof typeof SOLUTION_ICON;
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

// One tilted card per service line, holding two iOS-style notification
// banners (SS-1.17, tj 2026-09-27: "two real UI fragments in an Apple
// style the customer recognises, addressing the pain and the solution,
// not too much"). Banner one is the pain — a mail thread — dimmed; banner
// two is the system's notice in the line's accent. Mock data. Decorative.
export function ServiceVisual({ line, accent, before, after }: ServiceVisualProps) {
  const a = accents[accent];
  const Solution = SOLUTION_ICON[line];
  const banner = (n: Notice, mode: "before" | "after") => (
    <div
      className={`flex items-start gap-space-4 rounded-[14px] border border-line bg-surface p-space-4 ${mode === "before" ? "opacity-60" : ""}`}
      style={mode === "after" ? { boxShadow: "0 12px 32px -16px color-mix(in oklab, var(--surface), black 70%)" } : undefined}
    >
      <span
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] ${mode === "before" ? "bg-line" : a.icon}`}
        aria-hidden="true"
      >
        {mode === "before" ? (
          <Mail size={18} strokeWidth={1.75} className="text-ink-muted" />
        ) : (
          <Solution size={19} strokeWidth={1.75} className={a.on} />
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
    <div aria-hidden="true" className="px-space-2 py-space-4 lg:[perspective:1400px]">
      {/* Tilted in a mild perspective with a large radius and a soft shadow
          (tj, 2026-09-27, after the Tailark search/kanban references — the
          same shadow recipe as the hero panel). Flat below `lg`. */}
      <div
        className="flex flex-col gap-space-4 rounded-[20px] border border-line bg-surface-raised p-space-6 lg:origin-center lg:[transform:rotateX(6deg)_rotateY(-5deg)_rotate(-1.2deg)]"
        style={{ boxShadow: "0 28px 64px -24px color-mix(in oklab, var(--surface), black 70%)" }}
      >
        {banner(before, "before")}
        {banner(after, "after")}
      </div>
    </div>
  );
}
