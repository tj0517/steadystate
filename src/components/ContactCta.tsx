import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type ContactCtaProps = {
  content: SiteContent["cta"];
};

export function ContactCta({ content }: ContactCtaProps) {
  return (
    <section id="kontakt" className="py-space-16">
      <Container className="grid grid-cols-1 gap-space-8 lg:grid-cols-12 lg:gap-x-space-6">
        <div className="flex flex-col gap-space-6 lg:col-span-7">
          <h2 className="text-h1 text-ink lg:text-[56px] lg:leading-[60px] lg:tracking-[-0.03em]">
            {content.heading}
          </h2>
          <p className="max-w-[560px] text-lead text-ink-muted">{content.lead}</p>
          <div className="mt-space-2 flex flex-wrap items-center gap-space-4">
            <a
              href={content.button.href}
              className="inline-flex h-[52px] items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal hover:bg-signal-hover"
            >
              {content.button.label}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-space-4 rounded-lg border border-line bg-surface-raised p-space-8 lg:col-span-4 lg:col-start-9">
          <span className="text-label uppercase text-ink-muted">{content.fit.label}</span>
          <ul className="flex flex-col gap-space-4 text-small text-ink">
            {content.fit.items.map((item) => (
              <li key={item} className="flex items-start gap-space-4">
                <span
                  className="mt-[10px] h-0.5 w-4 shrink-0 bg-signal"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
