# steadystate.pl — web

Strona marketingowa steadystate.pl.

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, ESLint
- npm, kod aplikacji w `src/` (`src/app/`)
- Node: wersja przypięta w `.nvmrc` / `engines` w `package.json`

## Komendy
- `npm run dev` — serwer developerski
- `npm run build` — build produkcyjny
- `npm run start` — uruchomienie builda
- `npm run lint` — ESLint
- `npm run typecheck` — `next typegen && tsc --noEmit`

## CI
CI (`.github/workflows/ci.yml`) uruchamia typecheck, lint, build i skan sekretów (gitleaks) na każdym PR; każdy PR ma też własny podgląd na Vercelu (integracja GitHub → Vercel).

## Struktura katalogów
- `src/app/` — strony i layouty (App Router)
- `public/` — statyczne assety
- `design/steadystate-brand/` — eksport design systemu marki (patrz niżej), nie edytować
- `docs/tasks/` — zadania projektu; pliki zadań są źródłem prawdy o statusie, `docs/tasks/INDEX.md` to tylko przegląd trzymany z nimi w synchronizacji

## Marka i UI
Design system: `design/steadystate-brand/` — przeczytaj `design/steadystate-brand/BRAND.md` i `tokens.json` przed pracą nad UI.
Zasady: dark-first; jeden akcent (`signal`) na ekran; `amber` tylko dla Steady Sales; ramki `line` zamiast cieni;
liczby i etykiety w JetBrains Mono; bez gradientów, glow'ów i emoji. Wzorzec strony głównej: `reference/homepage-desktop.html`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
