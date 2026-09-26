import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type StudioProps = {
  content: SiteContent["studio"];
};

// Part of the light tail (LightScope): the ground is the dark
// theme's `deep`, tokens inside are the light theme's, so `ink` here is
// dark text. The curve edge above the tail lives in page.tsx (CurveEdge).
export function Studio({ content }: StudioProps) {
  return (
    <section id="studio" className="py-space-16">
      <Container>
        <div data-reveal className="grid grid-cols-1 gap-space-8 lg:grid-cols-12 lg:gap-x-space-6">
          <div className="flex flex-col gap-space-4 lg:col-span-6">
            <h2 className="text-h2 text-ink md:text-[36px] md:leading-[42px] md:tracking-[-0.02em]">
              {content.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-space-4 text-body text-ink-muted lg:col-span-5 lg:col-start-8">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-space-2 flex flex-wrap gap-x-space-8 gap-y-space-2 text-label uppercase text-ink-muted">
              {content.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
