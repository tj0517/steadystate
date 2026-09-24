---
id: SS-1.06
title: Strona główna cz. 2 — realizacje, proces, studio, CTA
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.05]
blocked_by_questions: [O-03]
touches_db: false
touches_prod: false
pr: null
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
- sekcje odpowiadają wzorowi — zrzuty 1440 obok zrzutów wzoru w `.playwright-mcp/`; ocenia tj w review
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`; zrzut 390 całej strony
- nie wyświetla się placeholder adresu — `curl -s localhost:3000 | grep -c '\[EMAIL\]'` = 0
- wszystkie kotwice nagłówka trafiają w sekcje — Playwright: dla każdego linku z nawigacji `document.querySelector(href)` istnieje
- `npm run lint`, `npm run typecheck`, `npm run build` przechodzą

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
