---
id: SS-1.11
title: Case'y Sea Clouds DCS i Fjordanglers
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.10]
blocked_by_questions: [O-03, O-04]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Dwie pozostałe podstrony realizacji na szablonie z SS-1.10. Po tym zadaniu każdy „Zobacz case →”
na stronie głównej prowadzi do właściwej podstrony.

## Zakres
- [ ] odczyt stanu: szablon z SS-1.10, pliki `content/cases/sea-clouds-dcs.pl.md` i `fjordanglers.pl.md` (O-04)
- [ ] dwie podstrony z plików treści, bez zmian w szablonie (chyba że plik treści wymaga czegoś nowego — wtedy STOP)
- [ ] linki „Zobacz case →” z kart realizacji i z sekcji usług prowadzą do podstron

## Gotowe, gdy
- treść z plików — tekst podstron równy plikom treści (porównanie jak w SS-1.10)
- wszystkie linki case'ów działają — Playwright: każdy link „Zobacz case →” na `/` daje 200 i trafia na `/realizacje/<slug>`; żaden nie wskazuje już `#realizacje`
- sitemap — `curl -s <podgląd>/sitemap.xml | grep -c 'realizacje/'` = 3
- wygląd — zrzuty 1440 i 390 obu podstron w `.playwright-mcp/`, `scrollWidth <= 390`
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- wersja EN → SS-1.13
- zmiany szablonu → osobne zadanie, jeśli potrzebne

## Bramki STOP
- przed zmianą szablonu z SS-1.10 lub treści względem plików od tj — pokaż i czekaj

## Kontekst
- `content/cases/*.pl.md`
- `docs/tasks/SS-1.10.md`

## Notatki z realizacji
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
