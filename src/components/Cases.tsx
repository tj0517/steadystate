import type { SiteContent } from "@/content/types";
import { CaseExplorer } from "./CaseExplorer";
import { Container } from "./Container";

type CasesProps = {
  content: SiteContent["cases"];
  partners: SiteContent["partners"];
};

export function Cases({ content, partners }: CasesProps) {
  return (
    <section id="realizacje" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
        </div>

        <CaseExplorer content={content} partners={partners} />
      </Container>
    </section>
  );
}
