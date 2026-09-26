// Section edge shaped like the steady-state curve: the boundary between the
// dark page and the light tail. Filled with `--tail` (the dark theme's
// `deep`, see LightScope); the top follows the logo/hero family: jump, two
// decaying oscillations, flat line. `preserveAspectRatio="none"` so the
// edge spans any width; the height steps down below `lg`. Static — no
// parallax (tj, 2026-09-26).
export function CurveEdge() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block h-[64px] w-full md:h-[96px] lg:h-[120px]"
    >
      <path
        d="M0 118 C60 118 70 8 140 8 C200 8 200 104 260 104 C310 104 320 44 370 44 C420 44 420 88 470 88 C520 88 560 72 640 72 L1440 72 L1440 120 L0 120 Z"
        style={{ fill: "var(--tail)" }}
      />
    </svg>
  );
}
