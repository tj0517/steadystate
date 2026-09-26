import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type PartnerStripProps = {
  content: SiteContent["partners"];
};

// Sizes per logo so the three read as one weight: wide wordmarks lower,
// the square Sea Clouds mark taller.
const LOGO_HEIGHT: Record<string, string> = {
  "Hydra Arms": "h-9 md:h-11",
  "Sea Clouds DCS": "h-12 md:h-14",
  Fjordanglers: "h-6 md:h-7",
};

// Client logos under the hero (replaces the numbers strip, tj 2026-09-26).
// The source files are dark on transparent, so each is turned light with
// `grayscale(1) invert(1)` (keeps inner detail such as the Sea Clouds
// waves, unlike a flat silhouette) and dimmed — one quiet monochrome row
// on the page surface, no band, no hairlines; near-full opacity on hover.
// Served `unoptimized`: three small static PNGs, and the optimizer cache
// would otherwise keep serving an old file after a swap in /public.
// An item without a `logo` falls back to a mono wordmark.
export function PartnerStrip({ content }: PartnerStripProps) {
  return (
    <section aria-label={content.ariaLabel}>
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-space-16 gap-y-space-8 py-space-8 lg:justify-between lg:px-space-16">
          {content.items.map((item) => (
            <li
              key={item.name}
              className="flex items-center opacity-55 transition-opacity duration-300 ease-out hover:opacity-90"
            >
              {item.logo && item.width && item.height ? (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  unoptimized
                  className={`w-auto ${LOGO_HEIGHT[item.name] ?? "h-8"}`}
                  style={{ filter: "grayscale(1) invert(1)" }}
                />
              ) : (
                <span className="font-mono text-label uppercase tracking-[0.12em] text-ink">
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
