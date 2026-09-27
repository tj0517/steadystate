import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { ServiceColumn } from "./ServiceColumn";

type ServicesProps = {
  content: SiteContent["services"];
  // Captions for the visuals' before/after rows, from the hero chart.
  captions: { before: string; after: string };
};

// Two open columns split by a hairline (SS-1.17, tj 2026-09-27, after the
// Tailark reference) instead of two boxed cards. The "before" chips reuse
// words from each line's copy.
export function Services({ content, captions }: ServicesProps) {
  return (
    <section id="uslugi" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
          <p className="text-lead text-ink-muted">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-space-16 lg:grid-cols-2 lg:gap-0">
          <div data-reveal className="lg:pr-space-16">
            <ServiceColumn
              content={content.ops}
              line="ops"
              accent="signal"
              before={["mail", "Excel"]}
              captionBefore={captions.before}
              captionAfter={captions.after}
            />
          </div>
          <div data-reveal className="border-t border-line pt-space-16 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-space-16">
            <ServiceColumn
              content={content.sales}
              line="sales"
              accent="amber"
              before={["reklama", "formularz"]}
              captionBefore={captions.before}
              captionAfter={captions.after}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
