import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { SteadyCurveChart } from "./SteadyCurveChart";

type HeroProps = {
  content: SiteContent["hero"];
};

export function Hero({ content }: HeroProps) {
  return (
    <section id="top">
      <Container className="grid grid-cols-1 items-center gap-space-8 py-space-16 lg:grid-cols-12 lg:gap-x-space-6 lg:py-16">
        <div className="flex flex-col gap-space-8 lg:col-span-6">
          <div className="inline-flex items-center gap-space-2 text-label text-ink-muted">
            <span className="inline-block h-px w-6 bg-signal" aria-hidden="true" />
            <span className="uppercase">{content.label}</span>
          </div>
          <h1 className="text-h1 text-ink md:text-display">{content.heading}</h1>
          <p className="max-w-[540px] text-lead text-ink-muted">{content.lead}</p>
          <div className="mt-space-2 flex flex-wrap items-center gap-space-4">
            <a
              href={content.primaryCta.href}
              className="inline-flex h-[52px] items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex h-[52px] items-center rounded-md border border-line bg-surface-raised px-space-6 text-body font-medium text-ink"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-space-4 lg:col-span-6">
          <div className="flex flex-col gap-space-6 rounded-lg border border-line bg-surface-raised p-space-8">
            <div className="flex items-baseline justify-between text-label text-ink-muted">
              <span className="uppercase">{content.chart.captionLeft}</span>
              <span className="uppercase">{content.chart.captionRight}</span>
            </div>
            <SteadyCurveChart content={content.chart} />
          </div>
          <p className="px-space-1 text-small text-ink-muted">{content.chart.note}</p>
        </div>
      </Container>
    </section>
  );
}
