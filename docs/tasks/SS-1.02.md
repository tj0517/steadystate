---
id: SS-1.02
title: CI na PR i podgląd Vercel
status: review
difficulty: S
model: null
model_approved: null
effort: low
branch: chore/ci
due: null
depends_on: [SS-1.01]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 6
---

## Cel
Każdy PR ma być sprawdzony automatycznie (typy, lint, build, skan sekretów) i mieć własny
link podglądu na Vercelu. Dzięki temu review UI od SS-1.04 odbywa się na żywej stronie,
a błąd albo wklejony klucz nie dojdzie do `main`.

## Zakres
- [ ] odczyt stanu: `git remote -v` (musi wskazywać GitHub — zakłada tj), `ls .github 2>/dev/null`
- [ ] workflow GitHub Actions na `pull_request` i `push` do `main`: `npm ci`, `typecheck`, `lint`, `build`
- [ ] skan sekretów (gitleaks) w tym samym workflow
- [ ] odczyt: projekt Vercel już podpięty (tj 2026-09-24, preset Next.js) — bez zmian w ustawieniach
- [ ] w `CLAUDE.md` jedna linia: gdzie jest CI i że podgląd PR jest na Vercelu

## Gotowe, gdy
- checki biegną na PR tego zadania i są zielone — wynik `gh pr checks <nr>` w raporcie
- check łapie błąd typów (red proof) — tymczasowy commit z celowym błędem typu na tej gałęzi daje czerwony check (link lub log), potem commit wycofany i check znów zielony
- skan sekretów łapie klucz (red proof) — lokalnie `gitleaks detect --no-git --source <katalog tymczasowy poza repo>` z fałszywym kluczem w formacie `sk_live_…` zwraca znalezisko; niczego takiego nie commitujesz
- podgląd naprawdę serwuje stronę — `curl -s -o /dev/null -w '%{http_code}' <podgląd>/` = 200 (zielony build tego nie dowodzi, SS-1.03)
- PR ma link podglądu — `gh pr view <nr> --comments | grep -c 'vercel.app'` ≥ 1 (po imporcie przez tj)
- workflow nie zawiera sekretów ani `continue-on-error` — `grep -nE 'continue-on-error|sk_|ghp_' .github/workflows/*.yml` puste

## Poza zakresem
- domena i produkcja → SS-1.09
- testy e2e / Lighthouse w CI → deferred, jeśli okażą się potrzebne
- branch protection na GitHubie → ustawia tj (opcjonalnie)

## Bramki STOP
- przed każdą zmianą ustawień projektu w Vercel (import, env, domeny) — robi to tj według instrukcji z raportu
- nie commitujesz żadnego prawdziwego ani fałszywego klucza (GitHub push protection zablokuje push)

## Kontekst
- `CLAUDE.md`
- `package.json` — skrypty z SS-1.01

## Notatki z realizacji
- 2026-09-24 tj: GitHub zakładany od razu, podgląd Vercel od pierwszych PR-ów UI (wf-plan D6)
- 2026-09-25 tj (retro): import Vercel już zrobiony; dodane kryterium `<podgląd>/` = 200
