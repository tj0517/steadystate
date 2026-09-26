import type { SiteContent } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Container } from "./Container";

type CasesProps = {
  content: SiteContent["cases"];
};

export function Cases({ content }: CasesProps) {
  return (
    <section id="realizacje" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
        </div>

        <div className="flex flex-col border-b border-line">
          {content.items.map((item, index) => (
            <CaseCard key={item.name} content={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
