import type { Metadata } from "next";
import { notFound } from "next/navigation";
import tokens from "../../../design/steadystate-brand/tokens.json";

export const metadata: Metadata = {
  title: "Styleguide — Steadystate",
  robots: { index: false, follow: false },
};

const colorTokens = tokens.color.tokens.filter(
  (t): t is Extract<(typeof tokens.color.tokens)[number], { value: { dark: string; light: string } }> =>
    typeof t.value === "object"
);

// Literal class names so Tailwind's source scanner can find them —
// `text-${style.name}` is a dynamic string and would not be detected.
const TEXT_STYLE_CLASSES: Record<string, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
  metric: "text-metric",
  label: "text-label",
};

export default function StyleguidePage() {
  if (process.env.VERCEL_ENV === "production") {
    notFound();
  }

  return (
    <main className="p-space-8 flex flex-col gap-space-8">
      <h1 className="text-h1">Styleguide</h1>

      <section className="flex flex-col gap-space-4">
        <h2 className="text-h2">Kolory</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-space-4">
          {colorTokens.map((t) => (
            <div
              key={t.name}
              className="border border-line rounded-md overflow-hidden"
            >
              <div
                className="h-16"
                style={{ backgroundColor: `var(--${t.name})` }}
              />
              <div className="p-space-2">
                <div className="text-label uppercase text-ink-muted">
                  {t.name}
                </div>
                <div className="text-small text-ink-muted">{t.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-space-4">
        <h2 className="text-h2">Style tekstu</h2>
        <div className="flex flex-col gap-space-4">
          {tokens.type.groups.flatMap((group) =>
            group.styles.map((style) => (
              <div key={style.name} className={TEXT_STYLE_CLASSES[style.name]}>
                {style.name} — {style.fontSize} / {style.lineHeight}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="flex flex-col gap-space-4">
        <h2 className="text-h2">Warianty responsywne</h2>
        <div id="responsive-proof" className="text-h2 md:text-display">
          responsive text style
        </div>
      </section>
    </main>
  );
}
