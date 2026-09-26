"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

const DURATION_MS = 900;

// The number in `value` counts up from 0 and comes to rest at its real
// value — once, ease-out, only when the visitor allows motion and only for
// strips below the fold (same rule as RevealObserver). Server HTML carries
// the final string, so no-JS and reduced-motion readers see the number at
// rest. Only the first digit run animates; prefix/suffix ("+", " tyg.") and
// the thousands separator are kept as written in the content file.
export function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top <= window.innerHeight
    ) {
      return;
    }

    const match = /(\d[\d ]*\d|\d)/.exec(value);
    if (!match) return;

    const digits = match[1];
    const start = match.index;
    const end = start + digits.length;
    const target = Number(digits.replace(/ /g, ""));
    const separator = digits.includes(" ") ? " " : "";
    const before = value.slice(0, start);
    const after = value.slice(end);

    const format = (n: number) => {
      const s = String(Math.round(n));
      return separator ? s.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : s;
    };

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / DURATION_MS);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${before}${format(target * eased)}${after}`;
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    el.textContent = `${before}${format(0)}${after}`;
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${value.length}ch` }}
    >
      {value}
    </span>
  );
}
