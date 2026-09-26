import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type ProofStripProps = {
  content: SiteContent["proofStrip"];
};

export function ProofStrip({ content }: ProofStripProps) {
  return (
    <section aria-label={content.ariaLabel} className="border-y border-line">
      <Container>
        <div className="grid grid-cols-1 py-space-8 lg:grid-cols-3 lg:gap-x-space-6">
          {content.metrics.map((metric) => (
            <div
              key={metric.caption}
              className="flex flex-col gap-space-2 border-t border-line py-space-6 first:border-t-0 first:pt-0 last:pb-0 lg:border-t-0 lg:py-0"
            >
              <span className="text-metric text-ink">{metric.value}</span>
              <span className="text-small text-ink-muted">{metric.caption}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
