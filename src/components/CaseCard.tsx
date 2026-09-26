import type { CaseCard as CaseCardContent } from "@/content/types";
import { FlowDiagram } from "./FlowDiagram";

type CaseCardProps = {
  content: CaseCardContent;
  index: number;
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", box: "bg-signal-soft" },
  amber: { text: "text-amber", box: "bg-amber-soft" },
} as const;

// A register row, not a card (SS-1.16): hairline on top, mono index, flow
// diagram instead of a screenshot. The „Stan ustalony” box is the only box
// in the section.
export function CaseCard({ content, index }: CaseCardProps) {
  const accent = accents[content.accent];
  // Until SS-1.10 ships the subpages every case href is a section anchor —
  // a link that scrolls you to where you already are. Don't render it.
  const hasSubpage = !content.caseHref.startsWith("#");
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <article
      data-reveal
      className="grid grid-cols-1 gap-space-6 border-t border-line py-space-8 lg:grid-cols-12 lg:gap-x-space-6"
    >
      <div className="flex flex-col gap-space-2 lg:col-span-3">
        <span className="text-label text-ink-muted">{ordinal}</span>
        <span className={`text-label uppercase ${accent.text}`}>{content.tag}</span>
        <h3 className="text-h2 text-ink">{content.name}</h3>
        <span className="text-small text-ink-muted">{content.sector}</span>
      </div>

      <div className="flex flex-col gap-space-4 text-body lg:col-span-6">
        <p className="text-ink">{content.description}</p>
        <p className="text-ink-muted">{content.note}</p>
        <div className="py-space-2">
          <FlowDiagram
            steps={content.flow}
            accent={content.accent}
            ariaLabel={`${content.name}: ${content.flow.join(" → ")}`}
          />
        </div>
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
        className={`flex flex-col gap-space-2 self-start rounded-md p-space-6 lg:col-span-3 lg:col-start-10 ${accent.box}`}
      >
        <span className={`text-label uppercase ${accent.text}`}>
          {content.steadyState.label}
        </span>
        <span className="text-small text-ink">{content.steadyState.text}</span>
      </div>
    </article>
  );
}
