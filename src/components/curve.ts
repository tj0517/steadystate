// The steady-state edge curve shared by CurveEdge (band edges) and
// CurveCard (card caps): a long, low-amplitude version of the logo/hero
// family — jump, oscillations that fade over most of the width, flat line.
// viewBox 1440 × 120; the line starts at the bottom-left, peaks at y=30,
// and settles at y=64. Closed variants add the fill below.
export const CURVE_WIDTH = 1440;
export const CURVE_HEIGHT = 120;
export const CURVE_LINE =
  "M0 104 C120 104 160 30 260 30 C360 30 380 88 480 88 C580 88 600 52 700 52 C800 52 820 74 920 74 C1020 74 1060 64 1160 64 L1440 64";
export const CURVE_FILL = `${CURVE_LINE} L1440 120 L0 120 Z`;
