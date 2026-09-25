---
id: SS-1.06
title: Strona główna cz. 2 — realizacje, proces, studio, CTA
status: done
difficulty: M
model: sonnet
model_approved: null
effort: medium
branch: feat/home-bottom
due: null
depends_on: [SS-1.05]
blocked_by_questions: [O-03]
touches_db: false
touches_prod: false
pr: 5
---

## Cel
Dolna połowa strony głównej: trzy realizacje z sekcją „Stan ustalony”, proces w czterech
krokach, jasna sekcja Studio i wezwanie do rozmowy. Po tym zadaniu strona główna jest
kompletna treściowo, brakuje tylko prawdziwych danych kontaktowych (SS-1.07).

## Zakres
- [ ] odczyt stanu: strona po SS-1.05, sekcje CASES, PROCESS, STUDIO, CTA we wzorze
- [ ] realizacje: 3 karty (linia usług, nazwa, opis, „Stan ustalony” na tle `signal-soft`); „Zobacz case →” na razie do `#realizacje`
- [ ] proces: 4 kroki z numeracją mono
- [ ] studio: sekcja odwrócona (`deep` / `on-deep`), lista technologii
- [ ] CTA `#kontakt`: nagłówek, opis, przycisk (na razie bez adresu — `href` do uzupełnienia w SS-1.07), lista „Dobrze pasujemy, gdy”
- [ ] teksty w `src/content/pl/`, nazwy klientów wg O-03

## Gotowe, gdy
- sekcje odpowiadają wzorowi z poprawkami tj z review — zrzuty 1440 obok zrzutów tych samych sekcji wzoru, otwartego przez lokalny serwer statyczny (`python3 -m http.server` w `design/steadystate-brand/reference/`, bo `file://` jest zablokowane), w `.playwright-mcp/`; ocenia tj w review, poprawki wizualne na tej samej gałęzi
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`; zrzut 390 całej strony
- nie wyświetla się placeholder adresu — `curl -s <podgląd> | grep -c '\[EMAIL\]'` = 0
- wszystkie kotwice nagłówka trafiają w sekcje — Playwright: dla każdego linku z nawigacji `document.querySelector(href)` istnieje
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- adres e-mail i link do kalendarza → SS-1.07
- podstrony case'ów → SS-1.10, SS-1.11
- metadane, OG, Lighthouse → SS-1.08

## Bramki STOP
- przed zmianą tekstu marketingowego względem wzoru lub O-03 — pokaż różnicę i czekaj

## Kontekst
- `design/steadystate-brand/reference/homepage-desktop.html` — sekcje CASES, PROCESS, STUDIO, CTA
- `design/steadystate-brand/BRAND.md` — „Linie usług” (sekcja „Stan ustalony”)
- `docs/04-open-questions.md` — O-03

## Notatki z realizacji
- 2026-09-24 tj: poprawki wizualne w kodzie, w review; wzór to punkt startowy (wf-plan, opcja B)
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
- 2026-09-25 tj: wzór do porównań agent otwiera przez `python3 -m http.server` w folderze wzoru (Playwright blokuje `file://`, SS-1.04)
- 2026-09-25 claude: zbudowane wg wzoru; odstępstwa do oceny w review: (a) karty case'ów mają dodatkowo „Zobacz case →” (wymóg zakresu, wzór tego nie ma) — przez to box „Stan ustalony” rozciąga się na wysokość wiersza; (b) rozmiary 15/23 i 15/24 ze wzoru zmapowane na `text-small` (14/22); (c) tekst treści Studio na `on-deep-muted` zamiast nietokenowego `#3D434B`; (d) padding kart 32px (`space-8`) zamiast 40px we wzorze — jak w SS-1.05
- 2026-09-25 tj: przyjęte w review (PR #5) — wszystkie kryteria udowodnione (zrzuty 1440/390, scrollWidth 375, kotwice, [EMAIL]=0, Vercel zielony); ramka „Stan ustalony” rozciągnięta — zostaje; Fjordanglers na amber zgodnie z BRAND.md
