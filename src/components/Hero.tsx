import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { HeroDashboard } from "./HeroDashboard";
import { PartnerLogos } from "./PartnerLogos";

type HeroProps = {
  content: SiteContent["hero"];
  partners: SiteContent["partners"];
  metrics: SiteContent["proofStrip"]["metrics"];
};

// Hero after the Tailark "hero-section-1" reference (tj, 2026-09-27):
// left column with headline, lead, the two CTAs and the client logos in
// bright white; on the right the product panel — a dashboard screen built
// from our parts (HeroDashboard) — starting at the sixth column, bleeding
// off the viewport edge and tilted in a mild perspective. The whole hero
// fits a 1440 × 900 viewport with air around it: no label line above the
// heading, 48 px headline, the panel in a bezel with a soft shadow. No photo, no gradient (BRAND.md). Below `lg` it stacks flat.
export function Hero({ content, partners, metrics }: HeroProps) {
  return (
    <section id="top" className="overflow-hidden">
      <Container className="grid grid-cols-1 items-center gap-space-8 pt-space-16 pb-space-16 lg:grid-cols-12 lg:gap-x-space-6 lg:py-[96px]">
        <div className="flex flex-col gap-space-6 lg:col-span-5">
          <h1 className="text-h1 text-ink md:text-display lg:max-w-[460px] lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.03em]">
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
          <div className="mt-space-4 flex flex-col gap-space-4 lg:w-[560px] lg:max-w-none">
            <span className="text-body text-ink-muted">{partners.ariaLabel}</span>
            <PartnerLogos content={partners} />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:[perspective:1600px]">
          {/* Bezel + soft shadow like the reference screen (tj's explicit
              exception to BRAND "ramki zamiast cieni", 2026-09-27). The
              shadow colour is the page surface mixed toward black, so it
              stays a token-derived colour. */}
          <div
            className="rounded-[20px] border border-line bg-surface p-[10px] lg:w-[calc(100%+160px)] lg:origin-left lg:[transform:rotateY(-6deg)_rotateX(4deg)]"
            style={{ boxShadow: "0 32px 80px -24px color-mix(in oklab, var(--surface), black 70%)" }}
          >
            <HeroDashboard chart={content.chart} dashboard={content.dashboard} metrics={metrics} />
          </div>
        </div>
      </Container>
    </section>
  );
}
