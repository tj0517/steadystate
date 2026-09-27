type ProcessArtefactProps = {
  step: 0 | 1 | 2 | 3;
};

// One small, flat artefact per process step (SS-1.17, after the Tailark
// "how it works" reference, in the brand's idiom): shapes only, no text,
// so nothing new is said — a flow map, a prototype window with rows, a
// checklist with two items done, and the curve settling. Hairlines and
// tone, one accent (`signal`), no tilt, no fade. Decorative.
export function ProcessArtefact({ step }: ProcessArtefactProps) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-md border border-line bg-surface-raised"
    >
      <svg viewBox="0 0 240 120" className="block h-auto w-full" fill="none">
        {step === 0 && (
          <g>
            <rect x="24" y="48" width="44" height="24" rx="4" className="stroke-line" />
            <rect x="98" y="24" width="44" height="24" rx="4" className="stroke-line" />
            <rect x="98" y="72" width="44" height="24" rx="4" className="stroke-line" />
            <rect x="172" y="48" width="44" height="24" rx="4" className="stroke-signal" />
            <path d="M68 60 H83 V36 H98 M83 60 V84 H98 M142 36 H157 V60 H172 M142 84 H157 V60" className="stroke-line" />
            <circle cx="216" cy="60" r="3" className="fill-signal" />
          </g>
        )}
        {step === 1 && (
          <g>
            <rect x="24" y="16" width="192" height="88" rx="6" className="stroke-line" />
            <line x1="24" y1="36" x2="216" y2="36" className="stroke-line" />
            <circle cx="36" cy="26" r="2.5" className="fill-line" />
            <circle cx="46" cy="26" r="2.5" className="fill-line" />
            <circle cx="56" cy="26" r="2.5" className="fill-line" />
            <rect x="36" y="48" width="64" height="6" rx="3" className="fill-line" />
            <rect x="36" y="64" width="120" height="6" rx="3" className="fill-line" />
            <rect x="36" y="80" width="96" height="6" rx="3" className="fill-line" />
            <rect x="172" y="46" width="32" height="10" rx="3" className="fill-signal" />
          </g>
        )}
        {step === 2 && (
          <g>
            <rect x="32" y="26" width="12" height="12" rx="3" className="fill-signal" />
            <path d="M35 32 L37.5 34.5 L41.5 29.5" className="stroke-on-signal" strokeWidth="1.5" />
            <rect x="56" y="29" width="104" height="6" rx="3" className="fill-line" />
            <rect x="32" y="54" width="12" height="12" rx="3" className="fill-signal" />
            <path d="M35 60 L37.5 62.5 L41.5 57.5" className="stroke-on-signal" strokeWidth="1.5" />
            <rect x="56" y="57" width="136" height="6" rx="3" className="fill-line" />
            <rect x="32" y="82" width="12" height="12" rx="3" className="stroke-line" />
            <rect x="56" y="85" width="80" height="6" rx="3" className="fill-line" />
          </g>
        )}
        {step === 3 && (
          <g>
            <line x1="24" y1="76" x2="216" y2="76" className="stroke-line" strokeDasharray="4 4" />
            <path d="M24 100 C40 100 44 32 60 34 C74 36 74 88 88 90 C102 92 102 66 116 68 C130 70 132 78 148 78 L216 76" className="stroke-signal" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="76" r="4" className="fill-ink" />
          </g>
        )}
      </svg>
    </div>
  );
}
