---
id: SS-1.05
title: Strona główna cz. 1 — hero, pasek liczb, usługi
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.04]
blocked_by_questions: [O-03]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Górna połowa strony głównej: obietnica studia (hero z krzywą stanu ustalonego), twarde liczby
i dwie linie usług. To pierwsze, co zobaczy potencjalny klient, więc ma wyglądać jak wzór
na desktopie i dobrze działać na telefonie.

## Zakres
- [ ] odczyt stanu: layout z SS-1.04, sekcje HERO, PROOF STRIP, SERVICES we wzorze
- [ ] hero: etykieta mono, nagłówek, lead, dwa przyciski (główny `signal` → `#kontakt`, drugi → `#realizacje`), grafika krzywej jako SVG z tokenami
- [ ] pasek liczb: 4 metryki w stylu `metric` (JetBrains Mono) z podpisami — wartości wg odpowiedzi na O-03
- [ ] usługi: karty Steady Ops (akcent `signal`) i Steady Sales (akcent `amber`), listy punktów, linki „Zobacz case →” na razie do `#realizacje`
- [ ] ewentualny ruch: ease-out 250–400 ms, bez ruchu przy `prefers-reduced-motion`
- [ ] teksty w `src/content/pl/`

## Gotowe, gdy
- sekcje odpowiadają wzorowi z poprawkami tj z review — zrzuty 1440 trzech sekcji obok zrzutów wzoru w `.playwright-mcp/`; ocenia tj w review, poprawki wizualne na tej samej gałęzi
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`; zrzut 390 całej części
- `amber` tylko w Steady Sales — `grep -rn 'amber' src --include='*.tsx'` trafia wyłącznie w komponent/wariant Steady Sales
- teksty zgodne z O-03 — nazwy klientów i liczby w `src/content/pl/` odpowiadają odpowiedzi w `docs/04-open-questions.md` (cytat wiersza O-03 w raporcie)
- bez ruchu przy `prefers-reduced-motion` — Playwright z `reducedMotion: 'reduce'`: brak aktywnych animacji (`document.getAnimations().length === 0` po załadowaniu)
- `npm run lint` (w tym `check:colors`), `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- realizacje, proces, studio, CTA → SS-1.06
- podstrony case'ów → SS-1.10
- teksty EN → SS-1.12

## Bramki STOP
- przed zmianą tekstu marketingowego względem wzoru lub O-03 — pokaż różnicę i czekaj (treść pisze tj)

## Kontekst
- `design/steadystate-brand/reference/homepage-desktop.html` — sekcje HERO, PROOF STRIP, SERVICES
- `design/steadystate-brand/BRAND.md` — „Linie usług”, „Ruch”, „Czego unikamy”
- `docs/04-open-questions.md` — O-03

## Notatki z realizacji
- 2026-09-24 tj: poprawki wizualne w kodzie, w review; wzór to punkt startowy (wf-plan, opcja B)
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
