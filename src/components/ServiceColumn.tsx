import type { Accent, ServiceCard } from "@/content/types";
import { ServiceVisual } from "./ServiceVisual";

type ServiceColumnProps = {
  content: ServiceCard;
  line: "ops" | "sales";
  accent: Accent;
  before: string[];
  captionBefore: string;
  captionAfter: string;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { tag: "bg-signal-soft text-signal", dash: "bg-signal" },
  amber: { tag: "bg-amber-soft text-amber", dash: "bg-amber" },
} as const;

// One service line as an open column (SS-1.17, after the Tailark
// two-column reference): tag, heading, description, the pain → solution
// visual, then the four bullets as a small two-by-two grid and the credit.
// No card box — the columns are split by a hairline in Services.
export function ServiceColumn({ content, line, accent, before, captionBefore, captionAfter }: ServiceColumnProps) {
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
        <ServiceVisual line={line} accent={accent} before={before} captionBefore={captionBefore} captionAfter={captionAfter} />
      </div>
      <ul className="grid grid-cols-1 gap-x-space-6 gap-y-space-4 text-small text-ink md:grid-cols-2">
        {content.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-space-4">
            <span className={`mt-[9px] h-0.5 w-4 shrink-0 ${a.dash}`} aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line pt-space-4 text-small text-ink-muted">{content.credit}</div>
    </article>
  );
}
