"use client";

import { useId, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { CaseVisual } from "./CaseVisual";
import { FlowDiagram } from "./FlowDiagram";

type CaseExplorerProps = {
  content: SiteContent["cases"];
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", bar: "bg-signal", box: "bg-signal-soft" },
  amber: { text: "text-amber", bar: "bg-amber", box: "bg-amber-soft" },
} as const;

// Expandable case panels (SS-1.17, prompt 26, after the „Powerful features”
// reference): three panels in a row, the open one takes twice the width and
// shows its diagram whole; the others show a cropped, dimmed corner of
// theirs. Under each panel a hairline that fills with the accent when open,
// the name, and — open only — the description, three highlights, the
// „Stan ustalony” line and the button to the full case. Until SS-1.10 ships
// the subpages the button opens the full case in a native dialog. Width
// changes ease out (BRAND „Ruch”); below `lg` the panels stack.
export function CaseExplorer({ content }: CaseExplorerProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const baseId = useId();

  const openCase = (index: number) => {
    setOpen(index);
    dialogRef.current?.showModal();
  };
  const closeCase = () => dialogRef.current?.close();
  const current = open === null ? null : content.items[open];

  return (
    <>
      <div className="flex flex-col gap-space-8 lg:flex-row lg:gap-space-6">
        {content.items.map((item, index) => {
          const accent = accents[item.accent];
          const isActive = index === active;
          const detailsId = `${baseId}-${index}`;
          const hasSubpage = !item.caseHref.startsWith("#");

          return (
            <article
              key={item.name}
              data-reveal
              className="flex min-w-0 flex-col gap-space-4"
              style={{
                flex: isActive ? "2 1 0%" : "1 1 0%",
                transition: "flex-grow 400ms cubic-bezier(0, 0, 0.2, 1)",
              }}
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={detailsId}
                onClick={() => setActive(index)}
                className={`relative h-[360px] w-full overflow-hidden rounded-lg border border-line bg-surface-raised text-left lg:h-[340px] ${
                  isActive ? "" : "hover:border-ink-muted"
                }`}
              >
                <span className="absolute left-0 top-0 flex items-center gap-space-2 px-space-6 pt-space-6 text-label text-ink-muted">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`whitespace-nowrap uppercase ${accent.text}`}>{item.tag}</span>
                </span>
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-space-6 bottom-space-6 top-[72px] flex items-center ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
                  style={{ transition: "opacity 400ms cubic-bezier(0, 0, 0.2, 1)" }}
                >
                  <div className="w-full lg:w-[560px] lg:shrink-0">
                    <CaseVisual visual={item.visual} accent={item.accent} />
                  </div>
                </div>
              </button>

              <div className="h-px w-full bg-line">
                <div
                  className={`h-full ${accent.bar}`}
                  style={{
                    width: isActive ? "100%" : "0%",
                    transition: "width 400ms cubic-bezier(0, 0, 0.2, 1)",
                  }}
                />
              </div>

              <div id={detailsId} className="flex flex-col gap-space-4">
                <div className="flex flex-col gap-space-1">
                  <h3 className="text-body font-medium text-ink">{item.name}</h3>
                  <span className="text-small text-ink-muted">{item.sector}</span>
                </div>

                {isActive && (
                  <>
                    <p className="max-w-[560px] text-body text-ink-muted">{item.description}</p>
                    <ul className="flex flex-col gap-space-2 text-small text-ink">
                      {item.features.map((feature, featureIndex) => (
                        <li key={feature} className="flex gap-space-4">
                          <span className="font-mono text-label text-ink-muted">
                            {String(featureIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`max-w-[560px] rounded-md p-space-4 text-small text-ink ${accent.box}`}>
                      <span className={`mr-space-2 font-mono text-label uppercase ${accent.text}`}>
                        {item.steadyState.label}
                      </span>
                      {item.steadyState.text}
                    </p>
                    {hasSubpage ? (
                      <a
                        href={item.caseHref}
                        className="inline-flex h-[44px] w-fit items-center rounded-md border border-line px-space-4 text-small font-medium text-ink hover:border-ink-muted"
                      >
                        {item.caseLabel}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openCase(index)}
                        className="inline-flex h-[44px] w-fit items-center rounded-md border border-line px-space-4 text-small font-medium text-ink hover:border-ink-muted"
                      >
                        {item.caseLabel}
                      </button>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        aria-label={current?.name}
        className="case-dialog m-auto outline-none w-[calc(100%-32px)] max-w-[760px] rounded-lg border border-line bg-surface-raised p-space-8 text-ink"
      >
        {current && (
          <div className="flex flex-col gap-space-6">
            <div className="flex items-start justify-between gap-space-4">
              <div className="flex flex-col gap-space-2">
                <span className={`text-label uppercase ${accents[current.accent].text}`}>{current.tag}</span>
                <h3 className="text-h2 text-ink">{current.name}</h3>
                <span className="text-small text-ink-muted">{current.sector}</span>
              </div>
              <button
                type="button"
                onClick={closeCase}
                className="rounded-md border border-line px-space-4 py-space-2 text-small text-ink hover:border-ink-muted"
              >
                {content.dialogCloseLabel}
              </button>
            </div>

            <div className="flex flex-col gap-space-4 text-body">
              <p className="text-ink">{current.description}</p>
              <p className="text-ink-muted">{current.note}</p>
              <div className="py-space-2">
                <FlowDiagram
                  steps={current.flow}
                  accent={current.accent}
                  ariaLabel={`${current.name}: ${current.flow.join(" → ")}`}
                />
              </div>
              {current.stack && (
                <span className="text-label uppercase text-ink-muted">{current.stack.join(" · ")}</span>
              )}
            </div>

            <div className="flex flex-col gap-space-2">
              <span className="text-label uppercase text-ink-muted">{content.detailsLabel}</span>
              <ul className="flex flex-col gap-space-2 text-small text-ink">
                {current.features.map((feature, featureIndex) => (
                  <li key={feature} className="flex gap-space-4">
                    <span className="font-mono text-label text-ink-muted">
                      {String(featureIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`flex flex-col gap-space-2 rounded-md p-space-6 ${accents[current.accent].box}`}>
              <span className={`text-label uppercase ${accents[current.accent].text}`}>
                {current.steadyState.label}
              </span>
              <span className="text-small text-ink">{current.steadyState.text}</span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
