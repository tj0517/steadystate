---
id: SS-1.15
title: Hero — krzywa, która się rysuje, i odsłanianie sekcji
status: in_progress
difficulty: M
model: fable-5.1
model_approved: null
effort: medium
branch: feat/hero-motion
due: null
depends_on: [SS-1.14]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
---

## Cel
Jeden zapamiętywalny moment: krzywa stanu ustalonego w hero rysuje się od lewej, oscyluje
i dochodzi do spoczynku, kropka ląduje, etykieta pojawia się na końcu. To dosłowna realizacja
zasady z BRAND.md („elementy dochodzą do spoczynku”) i jedyna animacja, której strona potrzebuje.
Do tego ciche odsłanianie sekcji przy przewijaniu i lżejszy hero bez ramki wokół wykresu.
Wszystko wygasające, bez bounce, bez pulsowania, bez ruchu przy `prefers-reduced-motion`.

## Zakres
- [ ] odczyt stanu: `src/components/Hero.tsx`, `SteadyCurveChart.tsx` po SS-1.14, `globals.css`, BRAND.md „Ruch”
- [ ] animacja krzywej, CSS bez biblioteki, uruchamiana raz po załadowaniu: (1) siatka i linia przerywana pojawiają się (opacity, ~300 ms), (2) ścieżka rysuje się przez `stroke-dasharray`/`stroke-dashoffset` od pełnej długości do 0 w ~1400 ms, ease-out (`cubic-bezier` bez przestrzelenia, wartości y w [0,1]), (3) kropka pojawia się, gdy linia dochodzi do końca, (4) etykieta `STAN USTALONY` wygasa do widocznej jako ostatnia; łączny czas ≤ 2,5 s; `animation-iteration-count: 1`, `animation-fill-mode: both`
- [ ] `@media (prefers-reduced-motion: reduce)`: brak animacji, krzywa od razu w stanie końcowym
- [ ] hero bez ramki wokół wykresu: wykres na `surface`, bez `border`/`bg-surface-raised`; podpisy wykresu zostają; sprawdzić, czy kolumna z wykresem nie potrzebuje innego wyrównania w pionie względem nagłówka; po SS-1.14 (usunięte etykiety osi) na dole `viewBox 0 0 560 300` został pusty pas ~50 px — przyciąć viewBox (krzywa startuje w y=250) i przeliczyć pozycję etykiety `STAN USTALONY` (overlay w %)
- [ ] odsłanianie sekcji: mały komponent kliencki (`Reveal` lub atrybut `data-reveal` + jeden `IntersectionObserver`), stan ukryty (opacity 0, `translateY(8px)`) nadawany dopiero po zamontowaniu (SSR i brak JS = wszystko widoczne), przejście 350 ms ease-out, opóźnienie 60 ms na kolejne dziecko siatki, odpala się raz, tylko `motion-safe`
- [ ] zastosowanie: nagłówki sekcji, karty usług, karty realizacji, kroki procesu, panel Studio, CTA; hero nie (ma własną animację)
- [ ] `.playwright-mcp/` — zrzuty 1440 hero w trakcie (ok. 700 ms) i po animacji, zrzut 390 hero po animacji

## Gotowe, gdy
- krzywa rysuje się raz i kończy — Playwright bez reduced motion: bezpośrednio po `load` `document.getAnimations().length > 0`; po 2,5 s `document.getAnimations().filter(a => a.playState === 'running').length === 0`; żadna animacja nie ma `iterationCount` `Infinity`
- kolejność jest zachowana — Playwright: `opacity` kropki i etykiety = 0 przy t = 200 ms, = 1 przy t = 2500 ms; `stroke-dashoffset` ścieżki = 0 przy t = 2500 ms
- ruch wygasa, nie odbija — dla każdej animacji `animation-timing-function` to `ease-out` lub `cubic-bezier` z y1, y2 w [0,1] (bez przestrzelenia); nigdzie `ease-in-out` z pulsem ani `alternate`
- reduced motion = statycznie — Playwright z `reducedMotion: 'reduce'`: `document.getAnimations().length === 0` po załadowaniu, `stroke-dashoffset` ścieżki = 0 i `opacity` kropki = 1 od razu
- odsłanianie działa i odpala się raz — Playwright 1440: element `[data-reveal]` poniżej viewportu ma `opacity: 0`; po `scrollIntoView` i 500 ms `opacity: 1` i `transform: none`; po przewinięciu z powrotem na górę i ponownym zjeździe dalej `opacity: 1`
- bez JS wszystko widoczne — `curl -s <podgląd> | grep -c 'opacity-0'` = 0 (stan ukryty nie jest w HTML z serwera)
- bez ramki wokół wykresu — Playwright: `border-width` opakowania wykresu w hero = `0px`, a `background-color` to przezroczyste (`rgba(0, 0, 0, 0)`) albo `surface` (`rgb(20, 23, 28)`), nigdy `surface-raised` (`rgb(30, 35, 41)`). *(Zmiana tj 2026-09-26: opakowanie bez własnego tła raportuje przezroczyste.)*
- bez przesunięć układu — Playwright na podglądzie: wpisy `layout-shift` zbierane `PerformanceObserver` (`buffered: true`, pomijając wpisy z `hadRecentInput`) podczas ładowania i przewinięcia do dołu, przy 1440 i 390; suma `value` < 0,1 w obu; odsłanianie zmienia tylko `opacity` i `transform`. *(Zmiana tj 2026-09-26: zastępuje CLS z Lighthouse; Lighthouse zostaje w SS-1.08.)*
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- liczby „nabijające się” w pasku liczb (count-up) — celowo nie; to szablonowy efekt
- parallax, ziarno, kursor, rozmyty nagłówek, animacja pisania nagłówka — nie (BRAND „Czego unikamy” i audyt)
- animacje na podstronach case'ów → SS-1.10

## Bramki STOP
- przed dodaniem biblioteki animacji (framer-motion, gsap) — STOP; ma wystarczyć CSS i jeden `IntersectionObserver`
- przed jakimkolwiek ruchem, który nie wygasa (bounce, pulse, loop) — STOP

## Kontekst
- `design/steadystate-brand/BRAND.md` — „Ruch: powolny i wygaszający się (ease-out, 250–400 ms), elementy dochodzą do spoczynku. Żadnego bounce ani pulsowania.”
- `src/components/SteadyCurveChart.tsx` — geometria ścieżki; długość ścieżki do `stroke-dasharray` policzyć raz (`getTotalLength()` w skrypcie pomocniczym) i wpisać jako stałą, nie liczyć w runtime
- SS-1.05 — kryterium „brak aktywnych animacji przy reduced motion” nadal obowiązuje

## Notatki z realizacji
- 2026-09-26: zadanie z audytu slop (faza 2 z 3); jedyny „efekt” na stronie to krzywa, która dochodzi do spoczynku
- 2026-09-26 tj: CLS mierzony w Playwright (wpisy layout-shift na podglądzie) zamiast Lighthouse — Lighthouse zostaje w SS-1.08; tło opakowania wykresu: przezroczyste lub surface (liczy się brak ramki i surface-raised)
