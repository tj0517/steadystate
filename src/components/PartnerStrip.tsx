import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type PartnerStripProps = {
  content: SiteContent["partners"];
};

// Client logos in a raised-tone band under the hero (replaces the numbers
// strip, tj 2026-09-26). Logos are monochrome `ink-muted` wordmarks so the
// band stays quiet; an item without a `logo` file renders its name in mono
// caps, same colour and height, so the strip works before the SVGs exist.
export function PartnerStrip({ content }: PartnerStripProps) {
  return (
    <section aria-label={content.ariaLabel} className="bg-surface-raised">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-space-16 gap-y-space-6 py-space-8 md:justify-between">
          {content.items.map((item) => (
            <li key={item.name} className="flex h-8 items-center">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={160}
                  height={32}
                  className="h-8 w-auto opacity-70"
                />
              ) : (
                <span className="font-mono text-label uppercase tracking-[0.12em] text-ink-muted">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
