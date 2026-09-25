import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type ProcessProps = {
  content: SiteContent["process"];
};

export function Process({ content }: ProcessProps) {
  return (
    <section id="proces" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div className="flex max-w-[720px] flex-col gap-space-4">
          <span className="text-label uppercase text-ink-muted">{content.label}</span>
          <h2 className="text-h1 text-ink">{content.heading}</h2>
        </div>

        <ol className="grid grid-cols-1 gap-space-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => {
            // The last step is the steady state itself — the only one that
            // carries the `signal` accent, as in the reference.
            const isLast = index === content.steps.length - 1;

            return (
              <li
                key={step.number}
                className={`flex flex-col gap-space-4 border-t-2 pt-space-6 ${
                  isLast ? "border-signal" : "border-ink"
                }`}
              >
                <span
                  className={`text-label ${isLast ? "text-signal" : "text-ink-muted"}`}
                >
                  {step.number}
                </span>
                <h3 className="text-h3 text-ink">{step.heading}</h3>
                <p className="text-small text-ink-muted">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
