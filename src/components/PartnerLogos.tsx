import Image from "next/image";
import type { SiteContent } from "@/content/types";

type PartnerLogosProps = {
  content: SiteContent["partners"];
  className?: string;
};

// Sizes per logo so the three read as one weight: wide wordmarks lower,
// the square Sea Clouds mark taller.
const LOGO_HEIGHT: Record<string, string> = {
  "Hydra Arms": "h-8 md:h-9",
  "Sea Clouds DCS": "h-11 md:h-12",
  Fjordanglers: "h-6 md:h-7",
};

// Client logos as one monochrome row (hero, SS-1.17). The source files are
// dark on transparent, so each is turned light with `grayscale(1)
// invert(1)` (keeps inner detail such as the Sea Clouds waves) at 70 %,
// full on hover. Served `unoptimized`: three small static PNGs, and the
// optimizer cache would otherwise keep serving an old file after a swap in
// /public. An item without a `logo` falls back to a mono wordmark.
export function PartnerLogos({ content, className = "" }: PartnerLogosProps) {
  return (
    <ul
      aria-label={content.ariaLabel}
      className={`flex flex-wrap items-center gap-x-space-8 gap-y-space-4 ${className}`}
    >
      {content.items.map((item) => (
        <li
          key={item.name}
          className="flex items-center opacity-70 transition-opacity duration-300 ease-out hover:opacity-100"
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
  );
}
