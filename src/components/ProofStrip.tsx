import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type ProofStripProps = {
  content: SiteContent["proofStrip"];
};

export function ProofStrip({ content }: ProofStripProps) {
  return (
    <section aria-label={content.ariaLabel} className="border-y border-line">
      <Container>
        <div className="grid grid-cols-1 gap-space-6 py-space-8 sm:grid-cols-3">
          {content.metrics.map((metric) => (
            <div key={metric.caption} className="flex flex-col gap-space-2">
              <span className="text-metric text-ink">{metric.value}</span>
              <span className="text-small text-ink-muted">{metric.caption}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
