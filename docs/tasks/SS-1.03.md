---
id: SS-1.03
title: Tokeny marki i fonty w kodzie
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.01]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
---

## Cel
Kolory, typografia, odstępy i promienie w kodzie mają pochodzić wyłącznie z
`design/steadystate-brand/tokens.json`. Zmiana marki to wtedy nowy eksport paczki, a nie
szukanie kolorów po komponentach. Mechanizm kontrolny pilnuje, żeby nikt nie wpisał koloru
na sztywno.

## Zakres
- [ ] odczyt stanu: struktura `tokens.json` (`color.tokens`, `type.groups`, `spacing`, `radius`), `tokens.css`, konfiguracja Tailwinda z SS-1.01
- [ ] skrypt `npm run tokens` generujący z `tokens.json` zmienne CSS (dark domyślny, `[data-theme="light"]`) i mapowanie na theme Tailwinda; wynik w repo, oznaczony jako generowany
- [ ] style tekstu z `type.groups` (display, h1–h3, lead, body, metric, label) jako klasy lub utility
- [ ] fonty Inter Tight (400/500/600) i JetBrains Mono (500) przez `next/font`, bez zapytań do Google Fonts w runtime
- [ ] `npm run check:colors`: odrzuca literał koloru (`#rrggbb`, `#rgb`, `rgb(`) w `src/` poza wygenerowanym plikiem tokenów; podpięty pod `npm run lint` (więc i pod CI)
- [ ] strona `/styleguide` z próbkami kolorów i stylów tekstu, dostępna tylko w dev (`notFound()` w produkcji), `noindex`

## Gotowe, gdy
- wygenerowane tokeny są aktualne — `npm run tokens && git diff --exit-code` kończy się kodem 0
- tło strony to `surface` — Playwright na `/styleguide`: `getComputedStyle(document.body).backgroundColor` = `rgb(20, 23, 28)`
- fonty są self-hostowane — log sieci Playwrighta dla `/styleguide` nie zawiera `fonts.googleapis.com` ani `fonts.gstatic.com`, a computed `font-family` nagłówka zaczyna się od Inter Tight
- check kolorów działa (red proof) — tymczasowy plik w `src/` z `color: '#FF0000'` powoduje błąd `npm run check:colors` z nazwą pliku i linią; po usunięciu przechodzi
- `/styleguide` nie istnieje w produkcji — `npm run build && npm start`, potem `curl -s -o /dev/null -w '%{http_code}' localhost:3000/styleguide` = 404
- tokeny źródłowe nietknięte — `git diff --stat main...HEAD -- design/` jest puste
- zrzut `/styleguide` (1440) w `.playwright-mcp/` do oceny w review

## Poza zakresem
- komponenty (przycisk, karta, sekcja) → SS-1.04 i dalej
- przełącznik jasny/ciemny motyw — wersja jasna jest w tokenach, ale strona jest dark-first; przełącznik → deferred
- zmiana wartości w `tokens.json` → bramka STOP

## Bramki STOP
- przed jakąkolwiek zmianą `design/steadystate-brand/tokens.json` — pokaż powód i czekaj (kanoniczna wersja żyje w artefakcie Design System)

## Kontekst
- `design/steadystate-brand/tokens.json` — źródło prawdy
- `design/steadystate-brand/tokens.css` — wzór wygenerowanego CSS
- `design/steadystate-brand/BRAND.md` — sekcja „Fundamenty wizualne”

## Notatki z realizacji
