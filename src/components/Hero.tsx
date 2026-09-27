import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { PartnerLogos } from "./PartnerLogos";
import { SteadyCurveChart } from "./SteadyCurveChart";

type HeroProps = {
  content: SiteContent["hero"];
  partners: SiteContent["partners"];
};

// Hero after the Tailark "hero-section-1" reference, measured 1:1 (tj,
// 2026-09-27): left column ≈ 31 % of the viewport with headline (≈ 4.3 vw,
// tight leading), lead, the two CTAs and a "clients" caption with the
// logos; the product panel starts at 48 % of the width and bleeds off the
// right edge, tilted in a mild perspective like the reference. The product
// here is the curve. No photo, no gradient: `surface-raised` + hairline.
// Below `lg` everything stacks and the panel is flat and full width.
export function Hero({ content, partners }: HeroProps) {
  return (
    <section id="top" className="overflow-hidden">
      <Container className="grid grid-cols-1 items-center gap-space-8 pt-space-16 pb-space-16 lg:grid-cols-12 lg:gap-x-space-6 lg:pt-[calc(var(--space-16)+var(--space-6))] lg:pb-[calc(var(--space-16)+var(--space-8))]">
        <div className="flex flex-col gap-space-6 lg:col-span-5 lg:max-w-[460px]">
          <div className="inline-flex items-center gap-space-2 text-label text-ink-muted">
            <span className="inline-block h-px w-6 bg-signal" aria-hidden="true" />
            <span className="uppercase">{content.label}</span>
          </div>
          <h1 className="text-h1 text-ink md:text-display lg:text-[62px] lg:leading-[1.0] lg:tracking-[-0.03em]">
            {content.heading}
          </h1>
          <p className="max-w-[460px] text-lead text-ink-muted">{content.lead}</p>
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
          <div className="mt-space-6 flex flex-col gap-space-4">
            <span className="text-body text-ink-muted">{partners.ariaLabel}</span>
            <PartnerLogos content={partners} />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:[perspective:1600px]">
          <div className="flex flex-col gap-space-6 rounded-lg border border-line bg-surface-raised p-space-6 md:p-space-8 lg:w-[calc(100%+200px)] lg:origin-left lg:[transform:rotateY(-6deg)_rotateX(4deg)] lg:p-[48px]">
            <div className="flex flex-col gap-space-2 text-label text-ink-muted md:flex-row md:items-baseline md:justify-between lg:pr-[200px]">
              <span className="uppercase">{content.chart.captionLeft}</span>
              <span className="uppercase">{content.chart.captionRight}</span>
            </div>
            <div className="lg:pr-[200px]">
              <SteadyCurveChart content={content.chart} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
