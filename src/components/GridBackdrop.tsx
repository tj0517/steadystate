// Engineering-paper grid behind a section: hairlines in `line`, one major
// line every fourth cell, no fill. Purely decorative, sits under the content
// (`-z-10` on a `relative` parent) and fades in with the hero grid
// (`curve-grid`). Neutral tokens only, so it never competes with the one
// accent on screen (BRAND.md „Fundamenty wizualne”).
export function GridBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="curve-grid pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60"
    >
      <defs>
        <pattern id="grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" className="stroke-line" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid-major" width="96" height="96" patternUnits="userSpaceOnUse">
          <rect width="96" height="96" fill="url(#grid-minor)" />
          <path d="M96 0H0V96" fill="none" className="stroke-line" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    </svg>
  );
}
