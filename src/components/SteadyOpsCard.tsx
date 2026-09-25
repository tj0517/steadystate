import type { ServiceCard } from "@/content/types";

type SteadyOpsCardProps = {
  content: ServiceCard;
};

// Work-systems line card — accent `signal` only, per BRAND.md ("Nigdy obu w jednym komponencie").
export function SteadyOpsCard({ content }: SteadyOpsCardProps) {
  return (
    <article className="flex flex-col gap-space-6 rounded-lg border border-line bg-surface-raised p-space-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-7 items-center rounded-sm bg-signal-soft px-space-2 text-label uppercase text-signal">
          {content.tag}
        </span>
        <span className="text-small text-ink-muted">{content.tagline}</span>
      </div>
      <h3 className="text-h2 text-ink">{content.heading}</h3>
      <p className="text-body text-ink-muted">{content.description}</p>
      <ul className="flex flex-col gap-space-4 text-body text-ink">
        {content.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-space-4">
            <span
              className="mt-[11px] h-0.5 w-4 shrink-0 bg-signal"
              aria-hidden="true"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-space-2 flex flex-col gap-space-2 border-t border-line pt-space-6 text-small md:flex-row md:items-center md:justify-between">
        <span className="text-ink-muted">{content.credit}</span>
        <a href={content.caseHref} className="font-medium text-signal">
          {content.caseLabel}
        </a>
      </div>
    </article>
  );
}
