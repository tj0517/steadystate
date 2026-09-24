---
id: SS-1.10
title: Szablon podstrony case'u + case Hydra Arms
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.09]
blocked_by_questions: [O-03, O-04]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Pierwsza podstrona realizacji: pełny opis case'u zakończony sekcją „Stan ustalony” z jedną
liczbą. Szablon ma przyjąć kolejne case'y samym dodaniem pliku treści. Tekst pisze tj,
a agent go nie zmienia i nie dopisuje faktów o kliencie.

## Zakres
- [ ] odczyt stanu: `content/cases/` (gotowy tekst z O-04), karty realizacji z SS-1.06
- [ ] trasa `/realizacje/[slug]` generowana statycznie z plików `content/cases/*.pl.md`
- [ ] szablon: nagłówek (linia usług, nazwa, branża), treść, sekcja „Stan ustalony” (`signal-soft`, metryka w stylu `metric`), powrót do realizacji, CTA do kontaktu
- [ ] case Hydra Arms; link „Zobacz case →” z karty Hydry prowadzi do podstrony (pozostałe dalej do `#realizacje`)
- [ ] metadata podstrony (tytuł, opis, OG), wpis w sitemap
- [ ] nieznany slug → 404

## Gotowe, gdy
- treść pochodzi z pliku — tekst podstrony równy treści `content/cases/hydra-arms.pl.md` (skrypt porównujący tekst lub diff w raporcie); agent nie dopisał zdań
- szablon przyjmuje nowy case plikiem (red proof w drugą stronę) — tymczasowy plik `content/cases/test.pl.md` daje `/realizacje/test` bez zmian w kodzie; plik usunięty przed PR
- nieznany slug = 404 — `curl -s -o /dev/null -w '%{http_code}' <podgląd>/realizacje/nie-ma` = 404
- sitemap zawiera podstronę — `curl -s <podgląd>/sitemap.xml | grep -c 'realizacje/hydra-arms'` = 1
- wygląd — zrzuty 1440 i 390 w `.playwright-mcp/`, `scrollWidth <= 390`; ocenia tj
- Lighthouse ≥ 90 (wydajność, dostępność, SEO) dla podstrony na podglądzie PR
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- case'y Sea Clouds i Fjordanglers → SS-1.11
- wersja EN → SS-1.13
- zdjęcia i zrzuty z systemów klientów → deferred (wymagają zgody klienta)

## Bramki STOP
- przed jakąkolwiek zmianą treści case'u względem pliku od tj — pokaż różnicę i czekaj

## Kontekst
- `content/cases/hydra-arms.pl.md` (z O-04)
- `design/steadystate-brand/BRAND.md` — „Linie usług” (sekcja „Stan ustalony”), „Głos i treść”
- `docs/04-open-questions.md` — O-03, O-04

## Notatki z realizacji
- 2026-09-24 tj: case'y i EN w zakresie etapu 1, po starcie PL (wf-plan D4); treść pisze tj z Claude poza repo
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
