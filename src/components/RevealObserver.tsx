"use client";

import { useEffect } from "react";

const STAGGER_MS = 60;

// Reveals `[data-reveal]` elements as they scroll into view — once, and only
// when the visitor allows motion. Renders nothing. The hidden state is added
// here, after mount, and only to elements below the fold, so the server HTML
// is fully visible and nothing already on screen flashes.
export function RevealObserver() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${index * STAGGER_MS}ms`;
          el.classList.remove("reveal-hidden");
          observer.unobserve(el);
          index += 1;
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of targets) {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
