#!/usr/bin/env node
// Fails if any file under src/ contains a hard-coded colour: a hex literal
// (#rgb, #rrggbb, ...), a colour function (rgb(/rgba(/hsl(/hsla(/oklch(),
// or a Tailwind default-palette utility class (bg-blue-500, text-white, ...)
// — outside the generated tokens file.
// Colours must come from design/steadystate-brand/tokens.json via
// src/app/tokens.generated.css (run `npm run tokens`).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const srcDir = path.join(repoRoot, "src");

const EXCLUDED = new Set([path.join(srcDir, "app/tokens.generated.css")]);

const EXTENSIONS = new Set([".css", ".ts", ".tsx", ".js", ".jsx"]);

const HEX_RE = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const COLOR_FN_RE = /\b(?:rgba?|hsla?|oklch)\(/g;

// Tailwind v4 default colour palette (family names only — brand tokens like
// "amber", "signal" have no numeric shade so they never match this list).
const PALETTE_FAMILIES = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
];
const SHADES = "50|100|200|300|400|500|600|700|800|900|950";
const UTILITY_PREFIXES =
  "bg|text|border|ring|ring-offset|divide|fill|stroke|outline|decoration|shadow|from|via|to|caret|accent|placeholder";

// e.g. "hover:md:bg-blue-500", "text-red-600"
const PALETTE_SHADE_RE = new RegExp(
  `\\b(?:[a-z0-9-]+:)*(?:${UTILITY_PREFIXES})-(?:${PALETTE_FAMILIES.join("|")})-(?:${SHADES})\\b`,
  "g"
);
// e.g. "bg-black", "text-white"
const PALETTE_MONO_RE = new RegExp(
  `\\b(?:[a-z0-9-]+:)*(?:${UTILITY_PREFIXES})-(?:black|white)\\b`,
  "g"
);

const CHECKS = [
  { name: "hex literal", re: HEX_RE },
  { name: "colour function", re: COLOR_FN_RE },
  { name: "Tailwind default palette class", re: PALETTE_SHADE_RE },
  { name: "Tailwind default palette class", re: PALETTE_MONO_RE },
];

function listFiles() {
  const out = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "--", "src"],
    { cwd: repoRoot, encoding: "utf8" }
  );
  return out
    .split("\n")
    .filter(Boolean)
    .map((f) => path.join(repoRoot, f))
    .filter((f) => EXTENSIONS.has(path.extname(f)))
    .filter((f) => !EXCLUDED.has(f));
}

let violations = [];

for (const file of listFiles()) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    for (const check of CHECKS) {
      check.re.lastIndex = 0;
      if (check.re.test(line)) {
        violations.push({
          file: path.relative(repoRoot, file),
          line: i + 1,
          text: line.trim(),
          reason: check.name,
        });
      }
    }
  });
}

if (violations.length > 0) {
  console.error("check:colors — hard-coded colours found:\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.reason}]  ${v.text}`);
  }
  console.error(`\n${violations.length} violation(s). Use tokens from design/steadystate-brand/tokens.json instead.`);
  process.exit(1);
}

console.log("check:colors — no hard-coded colours found.");
