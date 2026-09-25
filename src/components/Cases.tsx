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
        <div className="flex max-w-[720px] flex-col gap-space-4">
          <span className="text-label uppercase text-ink-muted">{content.label}</span>
          <h2 className="text-h1 text-ink">{content.heading}</h2>
        </div>

        <div className="flex flex-col gap-space-4">
          {content.items.map((item) => (
            <CaseCard key={item.name} content={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
