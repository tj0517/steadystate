import type { CaseCard as CaseCardContent } from "@/content/types";

type CaseCardProps = {
  content: CaseCardContent;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", box: "bg-signal-soft" },
  amber: { text: "text-amber", box: "bg-amber-soft" },
} as const;

export function CaseCard({ content }: CaseCardProps) {
  const accent = accents[content.accent];
  // Until SS-1.10 ships the subpages every case href is a section anchor —
  // a link that scrolls you to where you already are. Don't render it.
  const hasSubpage = !content.caseHref.startsWith("#");

  return (
    <article className="grid grid-cols-1 gap-space-6 rounded-lg border border-line bg-surface-raised p-space-8 lg:grid-cols-12 lg:gap-x-space-6">
      <div className="flex flex-col gap-space-2 lg:col-span-3">
        <span className={`text-label uppercase ${accent.text}`}>{content.tag}</span>
        <h3 className="text-h2 text-ink">{content.name}</h3>
        <span className="text-small text-ink-muted">{content.sector}</span>
      </div>

      <div className="flex flex-col gap-space-4 text-body lg:col-span-5">
        <p className="text-ink">{content.description}</p>
        <p className="text-ink-muted">{content.note}</p>
        {content.stack && (
          <span className="text-label uppercase text-ink-muted">
            {content.stack.join(" · ")}
          </span>
        )}
        {hasSubpage && (
          <a
            href={content.caseHref}
            className={`text-small font-medium underline-offset-4 hover:underline ${accent.text}`}
          >
            {content.caseLabel}
          </a>
        )}
      </div>

      <div
        className={`flex flex-col gap-space-2 rounded-md p-space-6 lg:col-span-3 lg:col-start-10 ${accent.box}`}
      >
        <span className={`text-label uppercase ${accent.text}`}>
          {content.steadyState.label}
        </span>
        <span className="text-small text-ink">{content.steadyState.text}</span>
      </div>
    </article>
  );
}
