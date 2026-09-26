import { SettlingLine } from "./SettlingLine";

// A large, quiet steady-state curve behind a section — the brand motif as a
// background, drawn in `line` at 1.5 px. The oscillation and the tail are
// separate paths: both draw once when the section scrolls into view (the
// wrapper carries `data-reveal`; globals.css `.backdrop-curve`), and after
// that SettlingLine takes over the tail so the line answers the pointer and
// settles. Lengths: 1163 → 1200 and 760 → 800. Recompute if a `d` changes.
const OSC_LENGTH = 1200;
const TAIL_LENGTH = 800;
const TAIL: [[number, number], [number, number], [number, number], [number, number]] = [
  [680, 264],
  [760, 266],
  [900, 268],
  [1440, 268],
];

export function CurveBackdrop() {
  return (
    <div
      data-reveal
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0 380 C120 380 150 40 230 44 C300 48 300 300 380 306 C450 312 460 150 530 154 C600 158 610 262 680 264"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="backdrop-curve stroke-line"
          strokeDasharray={OSC_LENGTH}
          style={{ "--curve-len": OSC_LENGTH } as React.CSSProperties}
        />
        <path
          id="contact-curve-tail"
          d="M680 264 C760 266 900 268 1440 268"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="backdrop-curve backdrop-curve-tail stroke-line"
          strokeDasharray={TAIL_LENGTH}
          style={{ "--curve-len": TAIL_LENGTH } as React.CSSProperties}
        />
      </svg>
      <SettlingLine
        tail={TAIL}
        viewBox={{ width: 1440, height: 400 }}
        preserve={false}
        tailId="contact-curve-tail"
        strokeWidth={1.5}
        color="line"
        amplitude={48}
      />
    </div>
  );
}
