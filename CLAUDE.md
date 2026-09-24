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

## Struktura katalogów
- `src/app/` — strony i layouty (App Router)
- `public/` — statyczne assety
- `design/steadystate-brand/` — eksport design systemu marki (patrz niżej), nie edytować
- `docs/tasks/` — zadania projektu; pliki zadań są źródłem prawdy o statusie, `docs/tasks/INDEX.md` to tylko przegląd trzymany z nimi w synchronizacji

## Marka i UI
Design system: `design/steadystate-brand/` — przeczytaj `design/steadystate-brand/BRAND.md` i `tokens.json` przed pracą nad UI.
Zasady: dark-first; jeden akcent (`signal`) na ekran; `amber` tylko dla Steady Sales; ramki `line` zamiast cieni;
liczby i etykiety w JetBrains Mono; bez gradientów, glow'ów i emoji. Wzorzec strony głównej: `reference/homepage-desktop.html`.
