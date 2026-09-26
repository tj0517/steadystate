// The steady-state edge curve shared by CurveEdge (band edges) and
// CurveCard (card caps): a long, low-amplitude version of the logo/hero
// family — jump, oscillations that fade over most of the width, flat line.
// viewBox 1440 × 120; the line starts at the bottom-left, peaks at y=30,
// and settles at y=64 (CURVE_REST). Closed variants add the fill below.
export const CURVE_WIDTH = 1440;
export const CURVE_HEIGHT = 120;
export const CURVE_REST_Y = 64;

export type Point = [number, number];

// Cubic segments [start, control 1, control 2, end]; the last one is the
// flat line, written as a degenerate cubic so it samples like the rest.
export const CURVE_SEGMENTS: [Point, Point, Point, Point][] = [
  [[0, 104], [120, 104], [160, 30], [260, 30]],
  [[260, 30], [360, 30], [380, 88], [480, 88]],
  [[480, 88], [580, 88], [600, 52], [700, 52]],
  [[700, 52], [800, 52], [820, 74], [920, 74]],
  [[920, 74], [1020, 74], [1060, 64], [1160, 64]],
  [[1160, 64], [1260, 64], [1340, 64], [1440, 64]],
];

export const CURVE_LINE = CURVE_SEGMENTS.reduce(
  (d, [, c1, c2, p3]) => `${d} C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p3[0]} ${p3[1]}`,
  `M${CURVE_SEGMENTS[0][0][0]} ${CURVE_SEGMENTS[0][0][1]}`,
);
export const CURVE_FILL = `${CURVE_LINE} L${CURVE_WIDTH} ${CURVE_HEIGHT} L0 ${CURVE_HEIGHT} Z`;

export function sampleCurve(spacing: number): Point[] {
  const points: Point[] = [];
  for (const [p0, p1, p2, p3] of CURVE_SEGMENTS) {
    const n = Math.max(2, Math.round((p3[0] - p0[0]) / spacing));
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const u = 1 - t;
      const a = u * u * u;
      const b = 3 * u * u * t;
      const c = 3 * u * t * t;
      const d = t * t * t;
      points.push([
        a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
        a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
      ]);
    }
  }
  points.push(CURVE_SEGMENTS[CURVE_SEGMENTS.length - 1][3]);
  return points;
}
