import { Clock, CreditCard, FileText, LayoutDashboard, Megaphone, MessageSquare, Plug, Store } from "lucide-react";
import type { Accent, ServiceCard } from "@/content/types";
import { ServiceVisual } from "./ServiceVisual";

type Notice = { app: string; title: string; body: string; time: string };
type Chat = { incoming: string; incomingTime: string; outgoing: string; link: string; sentNote: string };

type ServiceColumnProps = {
  content: ServiceCard;
  line: "ops" | "sales";
  accent: Accent;
  tilt: "left" | "right";
  before?: Notice;
  after?: Notice;
  chat?: Chat;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { tag: "bg-signal-soft text-signal", icon: "text-signal" },
  amber: { tag: "bg-amber-soft text-amber", icon: "text-amber" },
} as const;

// One lucide icon per bullet, in content order (tj, 2026-09-27): Ops —
// documents, time, B2B shop, integrations; Sales — ads, qualification,
// offer & payment, one panel.
const BULLET_ICONS = {
  ops: [FileText, Clock, Store, Plug],
  sales: [Megaphone, MessageSquare, CreditCard, LayoutDashboard],
} as const;

// One service line as an open column (SS-1.17, after the Tailark
// two-column reference): tag, heading, description, the two-notification
// visual, then the four bullets as a small two-by-two grid and the credit.
// No card box — the columns are split by a hairline in Services.
export function ServiceColumn({ content, line, accent, tilt, before, after, chat }: ServiceColumnProps) {
  const a = accents[accent];
  return (
    <article className="flex flex-col gap-space-6">
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-7 items-center rounded-sm px-space-2 text-label uppercase ${a.tag}`}>{content.tag}</span>
        <span className="text-small text-ink-muted">{content.tagline}</span>
      </div>
      <h3 className="text-h2 text-ink">{content.heading}</h3>
      <p className="text-body text-ink-muted">{content.description}</p>
      <div className="py-space-2">
        <ServiceVisual line={line} accent={accent} tilt={tilt} before={before} after={after} chat={chat} />
      </div>
      <ul className="grid grid-cols-1 gap-x-space-6 gap-y-space-4 text-small text-ink md:grid-cols-2">
        {content.bullets.map((bullet, i) => {
          const Icon = BULLET_ICONS[line][i] ?? BULLET_ICONS[line][0];
          return (
            <li key={bullet} className="flex items-start gap-space-4">
              <Icon size={16} strokeWidth={1.75} className={`mt-[3px] shrink-0 ${a.icon}`} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-line pt-space-4 text-small text-ink-muted">{content.credit}</div>
    </article>
  );
}
