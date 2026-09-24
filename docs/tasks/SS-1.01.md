---
id: SS-1.01
title: Szkielet projektu Next.js + Tailwind
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
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
