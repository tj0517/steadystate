---
id: SS-1.13
title: Case'y po angielsku
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.11, SS-1.12]
blocked_by_questions: [O-05]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Trzy podstrony realizacji w wersji angielskiej, połączone z polskimi odpowiednikami. Po tym
zadaniu cała strona istnieje w obu językach.

## Zakres
- [ ] odczyt stanu: szablon case'u (SS-1.10), routing EN (SS-1.12), pliki `content/cases/*.en.md` (O-05)
- [ ] trasa `/en/cases/[slug]` z plików `*.en.md` (te same slugi co PL)
- [ ] linki „See case →” na `/en` prowadzą do podstron EN
- [ ] przełącznik języka na podstronie case'u prowadzi do odpowiednika; hreflang dla par; sitemap

## Gotowe, gdy
- treść z plików — tekst podstron równy `content/cases/*.en.md`
- brak polskiego tekstu — ten sam grep co w SS-1.12 na trzech adresach `/en/cases/<slug>` jest pusty
- pary językowe — każda podstrona PL ma hreflang do EN i odwrotnie; przełącznik prowadzi do odpowiednika (Playwright)
- sitemap — `curl -s localhost:3000/sitemap.xml | grep -c '/en/cases/'` = 3
- zrzuty 390 w `.playwright-mcp/`, `scrollWidth <= 390`
- `npm run lint`, `npm run typecheck`, `npm run build` przechodzą

## Poza zakresem
- zmiany szablonu case'u → osobne zadanie
- tłumaczenie przez agenta

## Bramki STOP
- przed zmianą tekstu względem plików od tj — pokaż i czekaj

## Kontekst
- `content/cases/*.en.md`
- `docs/tasks/SS-1.10.md`, `docs/tasks/SS-1.12.md`

## Notatki z realizacji
