import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type ProcessProps = {
  content: SiteContent["process"];
};

// Process on the steady-state curve (SS-1.16). The `ol` keeps the semantics
// and reading order; from `lg` its four columns sit above one thin curve
// from the logo/hero family — steps 01–03 above successive extremes, 04
// above the flat line with the dot. Column centres in the 1200-wide viewBox
// (4 columns, 24 gaps) are 141, 447, 753 and 1059; the curve's extremes and
// the dot sit on them. Below `lg` the curve is hidden and the list is a
// column with hairlines.
export function Process({ content }: ProcessProps) {
  return (
    <section id="proces" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
        </div>

        <div className="flex flex-col">
          <ol className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-x-space-6">
            {content.steps.map((step, index) => {
              // The last step is the steady state itself — the only one that
              // carries the `signal` accent, as in the reference.
              const isLast = index === content.steps.length - 1;

              return (
                <li
                  key={step.number}
                  data-reveal
                  className="flex flex-col gap-space-4 border-t border-line py-space-6 lg:border-t-0 lg:pt-0"
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

          <svg
            viewBox="0 0 1200 120"
            width="1200"
            height="120"
            aria-hidden="true"
            className="hidden h-auto w-full lg:block"
          >
            <path
              d="M0 104 C70 104 100 16 141 16 C200 16 390 92 447 92 C505 92 690 40 753 40 C800 40 850 60 900 60 L1200 60"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-signal"
            />
            <circle cx="1059" cy="60" r="5" className="fill-ink" />
          </svg>
        </div>
      </Container>
    </section>
  );
}
