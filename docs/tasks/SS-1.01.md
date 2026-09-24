---
id: SS-1.01
title: Szkielet projektu Next.js + Tailwind
status: done
difficulty: S
model: null
model_approved: null
effort: null
branch: chore/scaffold
due: null
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 1
---

## Cel
Postawić pusty, ale kompletny projekt strony steadystate.pl: Next.js (App Router) z TypeScriptem,
Tailwindem i ESLintem, z komendami, których używa każde następne zadanie. Repo dostaje
`CLAUDE.md`, żeby każdy agent od pierwszej sesji znał stack, komendy i zasady marki.
Sukces: `npm run build` przechodzi, a kolejne zadania mogą od razu dokładać UI.

## Zakres
- [ ] odczyt stanu: `ls -la`, `cat .gitignore .mcp.json .claude/settings.json`, `ls design/steadystate-brand`
- [ ] Next.js (App Router) + TypeScript + Tailwind + ESLint, npm; kod w `src/`
- [ ] skrypty w `package.json`: `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`)
- [ ] wersja Node przypięta (`.nvmrc` i `engines`)
- [ ] `.gitignore` rozszerzony o `node_modules/`, `.next/`, `.vercel/` z zachowaniem istniejących wpisów
- [ ] `CLAUDE.md` (< 8 000 znaków): stack, komendy, struktura katalogów, odesłanie do `docs/tasks/`, blok „Marka i UI” z `design/steadystate-brand/README.md`
- [ ] domyślna strona startowa create-next-app zastąpiona pustą stroną z tytułem „Steadystate” (bez stylowania)

## Gotowe, gdy
- build przechodzi — `npm run build` kończy się kodem 0 (ostatnie ~15 linii w raporcie)
- lint i typy czyste — `npm run lint && npm run typecheck` kończy się kodem 0
- `CLAUDE.md` mieści się w limicie i wskazuje markę — `wc -c CLAUDE.md` < 8000 oraz `grep -c 'design/steadystate-brand/BRAND.md' CLAUDE.md` ≥ 1
- śmieci i sekrety nie trafią do repo — `git check-ignore -v node_modules/x .next/x .env.local .playwright-mcp/x` wypisuje cztery linie (ścieżki w środku, bo wzorce katalogów git dopasowuje tylko do istniejących katalogów)
- lockfile w repo — `git ls-files package-lock.json` zwraca ścieżkę
- paczka marki nietknięta — `git diff --stat main...HEAD -- design/` jest puste

## Poza zakresem
- tokeny marki, fonty, theme Tailwinda → SS-1.03
- CI i podgląd Vercel → SS-1.02
- jakiekolwiek komponenty UI → SS-1.04

## Bramki STOP
- przed dodaniem zależności spoza domyślnego zestawu create-next-app — wypisz paczkę, po co jest, rozmiar i czekaj na akceptację (core/security.md §5)

## Kontekst
- `design/steadystate-brand/README.md` — sugerowany wpis do CLAUDE.md
- `design/steadystate-brand/BRAND.md` — zasady marki (tylko do odesłania w CLAUDE.md)

## Notatki z realizacji
- 2026-09-24 tj: stack Next.js + Tailwind, hosting Vercel Pro (wf-plan D1, D2)
- 2026-09-24 tj: kryterium check-ignore sprawdza ścieżki w środku katalogów (wf-task, przed startem)
- 2026-09-24 tj: hydra-arms zostaje odpalone — przed `npm run build` sprawdzać `memory_pressure | tail -1`; budować tylko przy "normal", inaczej stop i raport
- 2026-09-24 tj: Node 24 LTS zamiast 20 (20 jest EOL); `.nvmrc` = `24`, `engines.node` = `>=24`, npm przez `source ~/.nvm/nvm.sh && nvm use`
- 2026-09-24 tj: `typecheck` musi działać na czystym checkout (CI w SS-1.02) — skrypt generuje typy sam (`next typegen && tsc --noEmit`)
- 2026-09-24 tj: `.gitignore` musi zawierać `*.tsbuildinfo` i `next-env.d.ts` (domyślne wpisy Next.js zgubione przy przenoszeniu plików)
- 2026-09-24 tj: nieużywane domyślne SVG w `public/` zostają w deferred, bez akcji
- 2026-09-24 tj: memory pressure = warn → bez lokalnego builda; kryterium `npm run build` udowadnia Vercel Preview build zamiast lokalnego
- 2026-09-24 tj: review — przyjęte z uzupełnieniami (CLAUDE.md, @types/node, dowody lint/typecheck)
- 2026-09-24 tj: odebrane, PR #1 — build z integracji Vercel, lint/typecheck od zera, check-ignore i nietknięta paczka marki sprawdzone w review
