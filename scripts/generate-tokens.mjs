#!/usr/bin/env node
// Generates src/app/tokens.generated.css from design/steadystate-brand/tokens.json.
// Do not edit the output by hand — run `npm run tokens` after tokens.json changes.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const tokensPath = path.join(repoRoot, "design/steadystate-brand/tokens.json");
const outPath = path.join(repoRoot, "src/app/tokens.generated.css");

const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));

function resolveColorValue(token) {
  if (typeof token.value === "string") {
    // alias, e.g. "{signal}"
    const alias = token.value.match(/^\{(.+)\}$/)?.[1];
    return { alias };
  }
  return { dark: token.value.dark, light: token.value.light };
}

const colorTokens = tokens.color.tokens.map((t) => ({
  name: t.name,
  usage: t.usage,
  ...resolveColorValue(t),
}));

function cssVarLine(name, valueDark, usage) {
  const comment = usage ? ` /* ${usage.replace(/\*\//g, "*\\/")} */` : "";
  return `  --${name}: ${valueDark};${comment}`;
}

const darkLines = colorTokens.map((t) =>
  cssVarLine(t.name, t.alias ? `var(--${t.alias})` : t.dark, t.usage)
);

const lightLines = colorTokens
  .filter((t) => !t.alias)
  .map((t) => `  --${t.name}: ${t.light};`);
const lightAliasLines = colorTokens
  .filter((t) => t.alias)
  .map((t) => `  --${t.name}: var(--${t.alias});`);

const spacingLines = tokens.spacing.tokens.map(
  (t) => `  --space-${t.name.replace(/^space-/, "")}: ${t.value};`
);

const radiusLines = tokens.radius.tokens.map(
  (t) => `  --radius-${t.name.replace(/^radius-/, "")}: ${t.value};`
);

const fontSans = tokens.type.families.sans;
const fontMono = tokens.type.families.mono;

const themeColorLines = colorTokens.map(
  (t) => `  --color-${t.name}: var(--${t.name});`
);
const themeSpacingLines = tokens.spacing.tokens.map(
  (t) => `  --spacing-${t.name}: var(--space-${t.name.replace(/^space-/, "")});`
);
const themeRadiusLines = tokens.radius.tokens.map(
  (t) => `  --radius-${t.name.replace(/^radius-/, "")}: var(--radius-${t.name.replace(/^radius-/, "")});`
);

function textClass(style, familyVar) {
  const decls = [`font-family: var(${familyVar})`, `font-size: ${style.fontSize}`, `line-height: ${style.lineHeight}`, `font-weight: ${style.fontWeight}`];
  if (style.letterSpacing) decls.push(`letter-spacing: ${style.letterSpacing}`);
  return `@utility text-${style.name} {\n  ${decls.join(";\n  ")};\n}`;
}

const textClassLines = tokens.type.groups.flatMap((group) => {
  const familyVar = group.family === "mono" ? "--font-mono" : "--font-sans";
  return group.styles.map((style) => textClass(style, familyVar));
});

const out = `/* GENERATED FILE — do not edit by hand.
 * Source: design/steadystate-brand/tokens.json
 * Regenerate with: npm run tokens
 */
:root, [data-theme="dark"] {
${darkLines.join("\n")}
${spacingLines.join("\n")}
${radiusLines.join("\n")}
  --font-sans: ${fontSans};
  --font-mono: ${fontMono};
}
[data-theme="light"] {
${lightLines.join("\n")}
${lightAliasLines.join("\n")}
}

@theme inline {
  /* Only brand colours are available as Tailwind colour utilities —
   * the default Tailwind palette (slate, blue, amber-500, ...) is removed. */
  --color-*: initial;
${themeColorLines.join("\n")}
${themeSpacingLines.join("\n")}
${themeRadiusLines.join("\n")}
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

/* Text styles — @utility so they work with variants (md:text-display, ...) */
${textClassLines.join("\n\n")}
`;

writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${path.relative(repoRoot, outPath)}`);
