import type { SiteContent } from "@/content/types";
import { ContactModalTrigger } from "./ContactModal";
import { Container } from "./Container";

type ContactCtaProps = {
  content: SiteContent["cta"];
};

// CTA after the Tailark reference (tj, 2026-09-27): one large hairline
// panel; heading, lead and the primary button on the left, and on the
// right two wireframe windows drawn in `line` only — outlines, three dots,
// a hatched stripe — cropped by the panel's bottom and right edges. The
// front window carries the "good fit" list, so the section keeps its
// content. No fill, no shadow; tone and hairlines only.
export function ContactCta({ content }: ContactCtaProps) {
  return (
    <section id="contact" className="py-space-16">
      <Container>
        <div className="relative overflow-hidden rounded-lg border border-line">
          <div className="grid grid-cols-1 gap-space-8 px-space-6 py-space-16 md:px-space-8 lg:grid-cols-12 lg:gap-x-space-6 lg:px-[96px] lg:py-[112px]">
            <div data-reveal className="flex flex-col gap-space-6 lg:col-span-6">
              <h2 className="text-h1 text-ink lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.03em]">
                {content.heading}
              </h2>
              <p className="max-w-[520px] text-lead text-ink-muted">{content.lead}</p>
              <div className="mt-space-2">
                <ContactModalTrigger
                  label={content.triggerLabel}
                  className="inline-flex h-[52px] items-center rounded-md bg-signal px-space-6 text-body font-medium text-on-signal hover:bg-signal-hover"
                />
              </div>
            </div>

            <div
              data-reveal
              className="relative min-h-[260px] lg:col-span-6 lg:col-start-7 lg:min-h-0"
            >
              {/* Back window outline, cropped right, and a hatched stripe just
                  past the front window's edge (both `line` only). */}
              <div
                aria-hidden="true"
                className="absolute top-[-32px] left-[45%] hidden h-[calc(100%+180px)] w-[80%] rounded-lg border border-line lg:block"
              />
              <svg
                aria-hidden="true"
                className="absolute top-[64px] left-[75%] hidden h-[calc(100%+180px)] w-[28px] lg:block"
              >
                <defs>
                  <pattern id="cta-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" className="stroke-line" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-hatch)" />
              </svg>

              {/* Front window: the good-fit list, cropped by the panel bottom. */}
              <div className="absolute inset-x-0 top-0 flex h-[calc(100%+120px)] flex-col rounded-lg border border-line bg-surface lg:left-0 lg:w-[75%]">
                <div aria-hidden="true" className="flex items-center gap-[6px] border-b border-line px-space-4 py-space-4">
                  <span className="h-[7px] w-[7px] rounded-full bg-line" />
                  <span className="h-[7px] w-[7px] rounded-full bg-line" />
                  <span className="h-[7px] w-[7px] rounded-full bg-line" />
                </div>
                <div className="flex flex-col gap-space-4 p-space-6">
                  <span className="text-label uppercase text-ink-muted">{content.fit.label}</span>
                  <ul className="flex flex-col gap-space-4 text-small text-ink">
                    {content.fit.items.map((item) => (
                      <li key={item} className="flex items-start gap-space-4">
                        <span className="mt-[10px] h-0.5 w-4 shrink-0 bg-signal" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
