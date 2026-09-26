---
id: SS-1.17
title: Ulepszenia strony z promptów tj (zadanie otwarte)
status: review
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
pr: 10
---

## Cel
Zadanie bez z góry spisanego zakresu: tj podaje kolejne ulepszenia strony w promptach,
każde jest realizowane i dopisywane poniżej jako punkt zakresu. Plik jest dziennikiem tego, co
zostało zmienione i dlaczego.

## Zakres
(uzupełniany na bieżąco — jeden punkt na prompt tj)
- [x] prompt 1 „komponenty UI, które podniosą stronę wizualnie i dodadzą życia tłu” — pierwsza wersja (siatka za hero, indeksy sekcji, liczby liczące od 0) odrzucona przez tj jako „AI slop”; zostaje:
  - `SettlingLine` — płaska linia stanu ustalonego jako fizyczny układ (sprężyny z tłumieniem, sprzężone sąsiadami): wskaźnik ciągnie linię do siebie, po zejściu linia oscyluje raz–dwa i wraca do spoczynku; pętla rAF tylko gdy linia jest wychylona, tylko mysz, `prefers-reduced-motion` i brak JS = statyczny SVG
  - hero: `SteadyCurveChart` rysuje krzywą w dwóch ścieżkach (oscylacja + ogon); po animacji rysowania ogon przejmuje canvas (`signal`, 5 jednostek, amplituda 28 px)
  - `CurveBackdrop` — duża krzywa w `line` 1,5 px za sekcją kontakt, rysuje się raz przy odsłonięciu, ogon żywy jak w hero (amplituda 48 px)
- [x] prompt 2 „zmień gdzieś kolor tła, a krawędź w kształcie naszej krzywej”: Studio jako pełnoszerokie pasmo `deep` (zamiast boxu z zaokrągleniem); `CurveEdge` — SVG wypełniony `deep`, którego górna krawędź to krzywa stanu ustalonego (skok, dwie gasnące oscylacje, płaska linia), 64/96/120 px wysokości, `preserveAspectRatio="none"`; dolna krawędź prosta

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
- 2026-09-26: prompt 1, wersja 1 (siatka, indeksy sekcji, liczniki) — tj: „life, not AI slop”; wycofane w tej samej gałęzi
- 2026-09-26: prompt 1, wersja 2 — linia stanu ustalonego jako układ tłumiony (SettlingLine) w hero i za kontaktem; ruch tylko w odpowiedzi na wskaźnik, zawsze kończy się spoczynkiem (BRAND „Ruch”)
- 2026-09-26: implementacja prompt 1 gotowa do review — branch `feat/site-upgrades`, PR #10
- 2026-09-26: pomiary Playwright na podglądzie Vercel (1440×900): po 2,6 s ogon SVG ma opacity 0 i canvas rysuje linię w spoczynku (pas 215–225 px, rest 223); po przeciągnięciu wskaźnika pas 194–240 (wychylenie ~28 px), po zejściu wskaźnika wraca do 215–225 po 3 s; tło kontaktu analogicznie (rest 279, przy wskaźniku 235–300); 390×844: `scrollWidth` 390, canvas rysuje ogon; zrzuty w `.playwright-mcp/ss-1.17/`. Symulacja offline: pełne wychylenie gaśnie w ~2,6 s
- 2026-09-26: prompt 2 — Studio pełnoszerokie w `deep` z krawędzią-krzywą; BRAND „jasne sekcje dzielą długie strony” — pasmo zamiast boxu; bez kropki na końcu linii (ink na deep = za mały kontrast)
