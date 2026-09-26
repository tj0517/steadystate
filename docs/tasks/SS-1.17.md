---
id: SS-1.17
title: Ulepszenia strony z promptów tj (zadanie otwarte)
status: in_progress
difficulty: M
model: fable-5.1
model_approved: fable by tj 2026-09-26
effort: medium
branch: feat/site-upgrades
due: null
depends_on: [SS-1.16]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
---

## Cel
Zadanie bez z góry spisanego zakresu: tj podaje kolejne ulepszenia strony w promptach,
każde jest realizowane i dopisywane poniżej jako punkt zakresu. Plik jest dziennikiem tego, co
zostało zmienione i dlaczego.

## Zakres
(uzupełniany na bieżąco — jeden punkt na prompt tj)

## Gotowe, gdy
- każdy punkt zakresu ma odhaczony wpis i notatkę z realizacji
- bez cieni, gradientów, emoji; jeden akcent na ekran (BRAND.md)
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`
- `npm run lint` (w tym `check:colors`), `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony

## Poza zakresem
- zmiany w `design/steadystate-brand/` (STOP)
- treści marketingowe bez akceptacji tj (STOP — propozycja przed/po, potem zmiana)

## Bramki STOP
- przed zmianą copy — propozycja dokładnego przed/po, czekam na akceptację
- przed zmianą liczb w pasku — STOP (O-03)

## Kontekst
- `design/steadystate-brand/BRAND.md`, `tokens.json`
- stan po SS-1.16: rejestr realizacji, proces na krzywej, pasek 3 liczb

## Notatki z realizacji
- 2026-09-26: zadanie założone jako otwarte — zakres powstaje z kolejnych promptów tj
