type LogoProps = {
  size?: "sm" | "md";
  className?: string;
};

// Curve geometry from the reference NAV
// (design/steadystate-brand/reference/homepage-desktop.html) — colours come
// from tokens.
export function Logo({ size = "md", className = "" }: LogoProps) {
  const width = size === "sm" ? 30 : 40;
  const height = size === "sm" ? 24 : 32;

  return (
    <span className={`inline-flex items-center gap-3 text-ink ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 40"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 32 C8 32 10 4 15 6 C20 8 20 24 25 22 C29 20.5 29 16 33 16.5 L44 16.5"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-signal"
        />
        <circle cx="44" cy="16.5" r="3.2" className="fill-ink" />
      </svg>
      <span
        className={
          size === "sm"
            ? "text-body font-semibold"
            : "text-[22px] leading-none font-semibold tracking-[-0.02em]"
        }
      >
        steadystate
      </span>
    </span>
  );
}
