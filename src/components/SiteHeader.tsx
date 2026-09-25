"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { Logo } from "./Logo";

type SiteHeaderProps = {
  content: SiteContent["nav"];
};

export function SiteHeader({ content }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navLinks = Object.values(content.links);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`border-b border-line bg-surface ${open ? "fixed inset-x-0 top-0 z-50" : "relative"}`}
    >
      <Container className="flex h-[84px] items-center justify-between">
        <a
          href="#top"
          aria-label={content.logoAriaLabel}
          className="flex items-center text-ink"
        >
          <Logo />
        </a>

        <nav
          aria-label={content.navAriaLabel}
          className="hidden items-center gap-space-8 text-body font-medium md:flex"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-ink">
              {link.label}
            </a>
          ))}
          <a
            href={content.cta.href}
            className="inline-flex h-11 items-center rounded-md bg-signal px-space-6 font-medium text-on-signal"
          >
            {content.cta.label}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink md:hidden"
        >
          <span className="sr-only">
            {open ? content.menuCloseLabel : content.menuOpenLabel}
          </span>
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-ink"
            >
              <path d="M4 4L16 16M16 4L4 16" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-ink"
            >
              <path d="M3 5H17M3 10H17M3 15H17" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[84px] bottom-0 z-40 flex flex-col items-center justify-center gap-space-8 bg-surface md:hidden"
        >
          <nav
            aria-label={content.navAriaLabel}
            className="flex flex-col items-center gap-space-8 text-h3"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="text-ink">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={content.cta.href}
            onClick={closeMenu}
            className="inline-flex h-12 items-center rounded-md bg-signal px-space-8 font-medium text-on-signal"
          >
            {content.cta.label}
          </a>
        </div>
      )}
    </header>
  );
}
