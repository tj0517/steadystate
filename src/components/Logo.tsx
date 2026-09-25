type LogoProps = {
  size?: "sm" | "md";
  className?: string;
};

// Curve geometry from design/steadystate-brand/logos/steadystate-mark.svg,
// without the graphite background square — colours come from tokens.
export function Logo({ size = "md", className = "" }: LogoProps) {
  const width = size === "sm" ? 30 : 40;
  const height = size === "sm" ? 24 : 32;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M12 46 C16 46 18 14 24 16 C29 18 29 34 34 32 C38 30.5 38 26 42 26.5 L52 26.5"
          fill="none"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-signal"
        />
        <circle cx="52" cy="26.5" r="3.5" className="fill-ink" />
      </svg>
      <span className={size === "sm" ? "text-body font-semibold" : "text-h3"}>
        steadystate
      </span>
    </span>
  );
}
