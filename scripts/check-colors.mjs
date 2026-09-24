#!/usr/bin/env node
// Fails if any file under src/ contains a hard-coded colour literal
// (#rgb, #rrggbb, rgb(...)) outside the generated tokens file.
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
const RGB_RE = /\brgb\(/g;

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
    HEX_RE.lastIndex = 0;
    RGB_RE.lastIndex = 0;
    if (HEX_RE.test(line) || RGB_RE.test(line)) {
      violations.push({ file: path.relative(repoRoot, file), line: i + 1, text: line.trim() });
    }
  });
}

if (violations.length > 0) {
  console.error("check:colors — hard-coded colour literals found:\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.text}`);
  }
  console.error(`\n${violations.length} violation(s). Use tokens from design/steadystate-brand/tokens.json instead.`);
  process.exit(1);
}

console.log("check:colors — no hard-coded colour literals found.");
