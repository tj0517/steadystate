import type { CSSProperties } from "react";

type LightScopeProps = {
  children: React.ReactNode;
  className?: string;
};

// The tail of the page (Studio, contact, footer) on the light stone `deep`
// of the dark theme. Inside, tokens switch to the light theme
// (`[data-theme="light"]` in tokens.generated.css) so text, lines, boxes
// and the `signal` button get their light-surface values — but the ground
// itself stays the dark theme's `deep`, resolved as `--tail` on :root
// (globals.css) before the scope switches.
export function LightScope({ children, className = "" }: LightScopeProps) {
  return (
    <div
      data-theme="light"
      className={`text-ink ${className}`}
      style={{ background: "var(--tail)" } as CSSProperties}
    >
      {children}
    </div>
  );
}
