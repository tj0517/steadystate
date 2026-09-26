// A large, quiet steady-state curve behind a section — the brand motif as a
// background, drawn in `line` at 1.5 px. It draws itself once when the
// section scrolls into view: the parent carries `data-reveal`, and the path
// transitions from fully hidden (dashoffset = length) to drawn when
// RevealObserver removes `reveal-hidden` (see globals.css `.backdrop-curve`).
// Length: numerical integration of the five cubics gives 1923; rounded up. Recompute if `d` changes.
const CURVE_LENGTH = 1950;

export function CurveBackdrop() {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-reveal
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <path
        d="M0 380 C120 380 150 40 230 44 C300 48 300 300 380 306 C450 312 460 150 530 154 C600 158 610 262 680 264 C760 266 900 268 1440 268"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="backdrop-curve stroke-line"
        strokeDasharray={CURVE_LENGTH}
        style={{ strokeDashoffset: 0 }}
      />
    </svg>
  );
}
