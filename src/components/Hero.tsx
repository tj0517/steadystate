import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { PartnerLogos } from "./PartnerLogos";
import { SteadyCurveChart } from "./SteadyCurveChart";

type HeroProps = {
  content: SiteContent["hero"];
  partners: SiteContent["partners"];
};

// Hero after the Tailark "hero-section-1" reference (tj, 2026-09-27):
// left column with headline, lead, the two CTAs and the client logos
// underneath; on the right a large product panel that bleeds off the
// viewport edge — here the product is the curve. No photo, no gradient,
// no perspective (BRAND.md): the panel is `surface-raised` with a hairline
// and the chart inside it. Below `lg` everything stacks and the panel is
// full width.
export function Hero({ content, partners }: HeroProps) {
  return (
    <section id="top" className="overflow-hidden">
      <Container className="grid grid-cols-1 items-center gap-space-8 pt-space-16 pb-space-16 lg:grid-cols-12 lg:gap-x-space-6 lg:pt-[calc(var(--space-16)+var(--space-8))]">
        <div className="flex flex-col gap-space-8 lg:col-span-5">
          <div className="inline-flex items-center gap-space-2 text-label text-ink-muted">
            <span className="inline-block h-px w-6 bg-signal" aria-hidden="true" />
            <span className="uppercase">{content.label}</span>
          </div>
          <h1 className="text-h1 text-ink md:text-display lg:text-[68px] lg:leading-[1.02] lg:tracking-[-0.03em]">
            {content.heading}
          </h1>
          <p className="max-w-[520px] text-lead text-ink-muted">{content.lead}</p>
          <div className="mt-space-2 flex flex-wrap items-center gap-space-4">
            <a
              href={content.primaryCta.href}
              className="inline-flex h-[52px] items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal hover:bg-signal-hover"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex h-[52px] items-center rounded-md border border-line bg-surface-raised px-space-6 text-body font-medium text-ink hover:border-ink-muted"
            >
              {content.secondaryCta.label}
            </a>
          </div>
          <div className="mt-space-8 flex flex-col gap-space-4">
            <span className="text-label uppercase text-ink-muted">{partners.ariaLabel}</span>
            <PartnerLogos content={partners} />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="flex flex-col gap-space-6 rounded-lg border border-line bg-surface-raised p-space-6 md:p-space-8 lg:w-[calc(100%+160px)] lg:rounded-r-none lg:border-r-0 lg:p-[48px]">
            <div className="flex flex-col gap-space-2 text-label text-ink-muted md:flex-row md:items-baseline md:justify-between lg:pr-[160px]">
              <span className="uppercase">{content.chart.captionLeft}</span>
              <span className="uppercase">{content.chart.captionRight}</span>
            </div>
            <SteadyCurveChart content={content.chart} />
          </div>
        </div>
      </Container>
    </section>
  );
}
