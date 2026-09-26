type SectionMarkerProps = {
  index: string;
  label: string;
};

// Mono index rail at the top of a section: `01 — USŁUGI` on a hairline,
// like the row indexes in the cases register. Labels reuse the navigation
// items, so no new copy is introduced.
export function SectionMarker({ index, label }: SectionMarkerProps) {
  return (
    <div
      data-reveal
      className="flex items-center gap-space-4 border-t border-line pt-space-4 text-label uppercase text-ink-muted"
    >
      <span className="text-ink">{index}</span>
      <span className="inline-block h-px w-6 bg-line" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
