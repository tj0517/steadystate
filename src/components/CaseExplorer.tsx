"use client";

import { useId, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { CaseNodeDiagram } from "./CaseNodeDiagram";
import { FlowDiagram } from "./FlowDiagram";

type CaseExplorerProps = {
  content: SiteContent["cases"];
};

// Accent classes written out literally — the Tailwind scanner only sees full
// class names in the source, never strings built at runtime.
const accents = {
  signal: { text: "text-signal", box: "bg-signal-soft", border: "border-signal" },
  amber: { text: "text-amber", box: "bg-amber-soft", border: "border-amber" },
} as const;

// Cases as an explorer (SS-1.17, after the Tailark "pillars" reference,
// tj 2026-09-27): on the left a stack of collapsible items — the open one
// shows its tag, sector, description and three highlights; on the right a
// panel with the node diagram of the open case's flow, its „Stan
// ustalony” box (the one tinted element) and the link to the full case.
// Until SS-1.10 ships the subpages the link opens the full case in a
// native dialog. Below `lg` the panel renders inside the open item, so the
// section stays a register that folds. Heights ease out (BRAND „Ruch”).
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

  const panel = (index: number) => {
    const item = content.items[index];
    const a = accents[item.accent];
    const hasSubpage = !item.caseHref.startsWith("#");
    return (
      <div className="flex flex-col gap-space-8 rounded-lg border border-line p-space-6 lg:p-space-8">
        <div className="flex justify-center py-space-4">
          <CaseNodeDiagram
            steps={item.flow}
            accent={item.accent}
            ariaLabel={`${item.name}: ${item.flow.join(" → ")}`}
          />
        </div>
        <div className={`flex flex-col gap-space-2 rounded-md p-space-6 ${a.box}`}>
          <span className={`text-label uppercase ${a.text}`}>{item.steadyState.label}</span>
          <span className="text-small text-ink">{item.steadyState.text}</span>
        </div>
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
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-space-6 lg:grid-cols-12 lg:gap-x-space-6">
        <ul className="flex flex-col gap-space-4 lg:col-span-5">
          {content.items.map((item, index) => {
            const a = accents[item.accent];
            const isActive = index === active;
            const detailsId = `${baseId}-${index}`;
            return (
              <li
                key={item.name}
                data-reveal
                className={`rounded-lg border ${isActive ? a.border : "border-line"}`}
                style={{ transition: "border-color 300ms cubic-bezier(0, 0, 0.2, 1)" }}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={detailsId}
                  onClick={() => setActive(index)}
                  className="flex w-full flex-col items-start gap-space-2 px-space-6 py-space-6 text-left md:flex-row md:items-center md:justify-between md:gap-space-4"
                >
                  <span className="flex items-center gap-space-4">
                    <span className="font-mono text-label text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h3 text-ink">{item.name}</span>
                  </span>
                  <span className={`text-label uppercase ${isActive ? a.text : "text-ink-muted"}`}>
                    {item.tag}
                  </span>
                </button>
                <div
                  id={detailsId}
                  hidden={!isActive}
                  className="flex flex-col gap-space-6 px-space-6 pb-space-6"
                >
                  <div className="flex flex-col gap-space-4">
                    <span className="text-small text-ink-muted">{item.sector}</span>
                    <p className="text-body text-ink-muted">{item.description}</p>
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
                  </div>
                  <div className="lg:hidden">{panel(index)}</div>
                </div>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="hidden lg:col-span-7 lg:block">{panel(active)}</div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        aria-label={current?.name}
        className="case-dialog m-auto w-[calc(100%-32px)] max-w-[760px] rounded-lg border border-line bg-surface-raised p-space-8 text-ink outline-none"
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
