import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { Container } from "./Container";

type PartnerStripProps = {
  content: SiteContent["partners"];
};

// Sizes per logo so the three read as one weight: wide wordmarks lower,
// the square Sea Clouds mark taller.
const LOGO_HEIGHT: Record<string, string> = {
  "Hydra Arms": "h-10 md:h-12",
  "Sea Clouds DCS": "h-14 md:h-16",
  Fjordanglers: "h-7 md:h-8",
};

// Client logos under the hero (replaces the numbers strip, tj 2026-09-26).
// The source files are dark on transparent, so each is turned light with
// `grayscale(1) invert(1)` (keeps inner detail such as the Sea Clouds
// waves, unlike a flat silhouette) at 80 % — one monochrome row, centred
// with wide even gaps, on a `surface-raised` band that sets the strip apart
// by tone (no label, no hairlines; tj, 2026-09-26); full opacity on hover.
// Served `unoptimized`: three small static PNGs, and the optimizer cache
// would otherwise keep serving an old file after a swap in /public.
// An item without a `logo` falls back to a mono wordmark.
export function PartnerStrip({ content }: PartnerStripProps) {
  return (
    <section aria-label={content.ariaLabel} className="bg-surface-raised">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-space-16 gap-y-space-8 py-space-8 md:gap-x-[96px] lg:gap-x-[128px] lg:py-[48px]">
          {content.items.map((item) => (
            <li
              key={item.name}
              className="flex items-center opacity-80 transition-opacity duration-300 ease-out hover:opacity-100"
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
