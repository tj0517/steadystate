"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/content/types";

type ContactModalContextValue = {
  open: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return ctx;
}

type ContactModalProviderProps = {
  content: SiteContent["cta"]["form"];
  children: ReactNode;
};

// Both CTAs (hero, bottom CTA section) call the same `open()` from context,
// so there is exactly one modal instance mounted once here (SS-1.07 v2, tj
// 2026-09-28: pop-up instead of an inline/anchored form).
export function ContactModalProvider({ content, children }: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ContactModalDialog content={content} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  );
}

type ContactModalTriggerProps = {
  label: string;
  className: string;
};

export function ContactModalTrigger({ label, className }: ContactModalTriggerProps) {
  const { open } = useContactModal();
  return (
    <button type="button" onClick={open} className={className}>
      {label}
    </button>
  );
}

type Step = 1 | 2;
const TOTAL_STEPS = 2;

type FormState = {
  name: string;
  company: string;
  email: string;
  problemType: string;
  details: string;
  preferredDate: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  problemType: "",
  details: "",
  preferredDate: "",
};

type Status = "idle" | "pending" | "success" | "error";

function ContactModalDialog({
  content,
  isOpen,
  onClose,
}: {
  content: SiteContent["cta"]["form"];
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const problemSelectRef = useRef<HTMLSelectElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [stepError, setStepError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Pull focus onto the current step's first field so the modal — not the
  // dimmed page behind it — is where the user's attention (and keyboard)
  // lands, on open and on every step change.
  useEffect(() => {
    if (!isOpen || status === "success") return;
    if (step === 1) nameInputRef.current?.focus();
    if (step === 2) problemSelectRef.current?.focus();
  }, [isOpen, step, status]);

  function resetAndClose() {
    onClose();
    setStep(1);
    setForm(EMPTY_FORM);
    setStatus("idle");
    setStepError(null);
  }

  function goNext() {
    if (!form.name.trim() || !form.email.trim()) {
      setStepError("Fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStepError("Enter a valid email address.");
      return;
    }
    setStepError(null);
    setStep(2);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.problemType) {
      setStepError("Choose a type of problem.");
      return;
    }
    setStepError(null);
    setStatus("pending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStepError(result.error ?? content.genericErrorMessage);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStepError(content.genericErrorMessage);
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={resetAndClose}
      aria-label={content.about.heading}
      className="contact-dialog m-auto w-[calc(100%-32px)] max-w-[480px] rounded-lg border border-line bg-surface-raised p-space-8 text-ink outline-none"
    >
      <div className="flex flex-col gap-space-6">
        <div className="flex items-center justify-between gap-space-4">
          {status === "success" ? (
            <span className="text-label uppercase text-ink-muted">{content.about.heading}</span>
          ) : (
            <div className="flex flex-1 flex-col gap-space-2">
              <span className="font-mono text-label text-ink-muted">
                {content.progressLabel.replace("{step}", String(step)).replace("{total}", String(TOTAL_STEPS))}
              </span>
              <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-signal transition-[width] duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="shrink-0 rounded-md border border-line px-space-4 py-space-2 text-small text-ink hover:border-ink-muted"
          >
            {content.closeLabel}
          </button>
        </div>

        {status === "success" ? (
          <p className="text-body text-ink">{content.successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-4">
            {step === 1 && (
              <>
                <h3 className="text-h3 text-ink">{content.about.heading}</h3>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-name" className="text-label uppercase text-ink-muted">
                    {content.about.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    ref={nameInputRef}
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
                    className="h-[44px] rounded-md border border-line bg-surface px-space-4 text-body text-ink outline-none focus:border-ink-muted"
                  />
                </div>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-company" className="text-label uppercase text-ink-muted">
                    {content.about.companyLabel}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(event) => setForm((f) => ({ ...f, company: event.target.value }))}
                    className="h-[44px] rounded-md border border-line bg-surface px-space-4 text-body text-ink outline-none focus:border-ink-muted"
                  />
                </div>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-email" className="text-label uppercase text-ink-muted">
                    {content.about.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
                    className="h-[44px] rounded-md border border-line bg-surface px-space-4 text-body text-ink outline-none focus:border-ink-muted"
                  />
                </div>

                {stepError && (
                  <p role="alert" className="text-small text-amber">
                    {stepError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-[52px] w-fit items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal hover:bg-signal-hover"
                >
                  {content.about.nextLabel}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-h3 text-ink">{content.problem.heading}</h3>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-problem-type" className="text-label uppercase text-ink-muted">
                    {content.problem.problemTypeLabel}
                  </label>
                  <select
                    id="contact-problem-type"
                    ref={problemSelectRef}
                    required
                    value={form.problemType}
                    onChange={(event) => setForm((f) => ({ ...f, problemType: event.target.value }))}
                    className="h-[44px] rounded-md border border-line bg-surface px-space-4 text-body text-ink outline-none focus:border-ink-muted"
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {content.problem.problemOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-details" className="text-label uppercase text-ink-muted">
                    {content.problem.detailsLabel}
                  </label>
                  <textarea
                    id="contact-details"
                    rows={3}
                    placeholder={content.problem.detailsPlaceholder}
                    value={form.details}
                    onChange={(event) => setForm((f) => ({ ...f, details: event.target.value }))}
                    className="rounded-md border border-line bg-surface px-space-4 py-space-2 text-body text-ink outline-none focus:border-ink-muted"
                  />
                </div>
                <div className="flex flex-col gap-space-2">
                  <label htmlFor="contact-date" className="text-label uppercase text-ink-muted">
                    {content.problem.dateLabel}
                  </label>
                  <input
                    id="contact-date"
                    type="date"
                    value={form.preferredDate}
                    onChange={(event) => setForm((f) => ({ ...f, preferredDate: event.target.value }))}
                    className="h-[44px] rounded-md border border-line bg-surface px-space-4 text-body text-ink outline-none focus:border-ink-muted"
                  />
                </div>

                {stepError && (
                  <p role="alert" className="text-small text-amber">
                    {stepError}
                  </p>
                )}

                <div className="flex items-center gap-space-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-[52px] items-center rounded-md border border-line px-space-6 text-body font-medium text-ink hover:border-ink-muted"
                  >
                    {content.problem.backLabel}
                  </button>
                  <button
                    type="submit"
                    disabled={status === "pending"}
                    className="inline-flex h-[52px] items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal hover:bg-signal-hover disabled:opacity-60"
                  >
                    {status === "pending" ? content.problem.submitPendingLabel : content.problem.submitLabel}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </dialog>
  );
}
