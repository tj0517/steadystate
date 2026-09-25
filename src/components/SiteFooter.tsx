import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { Logo } from "./Logo";

type SiteFooterProps = {
  content: SiteContent["footer"];
};

export function SiteFooter({ content }: SiteFooterProps) {
  const links = Object.values(content.links);

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-space-6 py-space-8 text-small text-ink-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-space-2">
          <Logo size="sm" />
          <span>{content.tagline}</span>
        </div>
        <div className="flex flex-wrap gap-space-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink-muted">
              {link.label}
            </a>
          ))}
        </div>
        <span className="font-mono text-label">{content.location}</span>
      </Container>
    </footer>
  );
}
