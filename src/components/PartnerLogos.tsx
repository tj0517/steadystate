import Image from "next/image";
import type { SiteContent } from "@/content/types";

type PartnerLogosProps = {
  content: SiteContent["partners"];
  className?: string;
};

// Sizes per logo so the three read as one weight: wide wordmarks lower,
// the square Sea Clouds mark taller.
const LOGO_HEIGHT: Record<string, string> = {
  "Hydra Arms": "h-9 md:h-10",
  "Sea Clouds DCS": "h-12 md:h-14",
  Fjordanglers: "h-7 md:h-8",
};

// Client logos as one row of bright white marks (hero, SS-1.17, like the
// reference). The source files are dark on transparent, so each is
// flattened to white with `brightness(0) invert(1)`; full opacity. Served `unoptimized`: three small static PNGs, and the
// optimizer cache would otherwise keep serving an old file after a swap in
// /public. An item without a `logo` falls back to a mono wordmark.
export function PartnerLogos({ content, className = "" }: PartnerLogosProps) {
  return (
    <ul
      aria-label={content.ariaLabel}
      className={`flex flex-wrap items-center gap-x-[40px] gap-y-space-4 ${className}`}
    >
      {content.items.map((item) => (
        <li
          key={item.name}
          className="flex items-center"
        >
          {item.logo && item.width && item.height ? (
            <Image
              src={item.logo}
              alt={item.name}
              width={item.width}
              height={item.height}
              unoptimized
              className={`w-auto ${LOGO_HEIGHT[item.name] ?? "h-8"}`}
              style={{ filter: "brightness(0) invert(1)" }}
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
