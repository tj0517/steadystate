import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { SteadyOpsCard } from "./SteadyOpsCard";
import { SteadySalesCard } from "./SteadySalesCard";

type ServicesProps = {
  content: SiteContent["services"];
};

export function Services({ content }: ServicesProps) {
  return (
    <section id="uslugi" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
          <p className="text-lead text-ink-muted">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-space-6 lg:grid-cols-2">
          <SteadyOpsCard content={content.ops} />
          <SteadySalesCard content={content.sales} />
        </div>
      </Container>
    </section>
  );
}
