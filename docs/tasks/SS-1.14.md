---
id: SS-1.14
title: Stany hover/focus, CTA w nagłówku i poprawki tekstu po audycie
status: in_progress
difficulty: S
model: fable-5.1
model_approved: null
effort: xhigh
branch: feat/interaction-states
due: null
depends_on: [SS-1.06]
blocked_by_questions: [O-06, O-07]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Strona ma odpowiadać na dotyk: przyciski, linki i karty reagują na hover, fokus jest widoczny
z klawiatury, a CTA w nagłówku wygląda jak przycisk. Równolegle znikają najbardziej
„szablonowe” elementy z audytu (26 wrz 2026): notatka tłumacząca metaforę, zmyślona oś
wykresu, martwe linki „Zobacz case →”, zbędne etykiety sekcji i kilka zdań z frazami
z generatora. Bez ruchu, bez nowych efektów — tylko kolor, ramka i podkreślenie.

## Zakres
- [x] odczyt stanu: `src/app/globals.css`, przyciski i linki w `src/components/`, odpowiedzi na O-06 i O-07; stan wyjściowy: 0 reguł `:hover`, 0 reguł `:focus-visible`
- [x] globalny `:focus-visible`: obrys 2px `signal`, offset 2px, na wszystkich elementach fokusowalnych
- [x] hover, tylko kolor (przejście 200 ms ease-out, bez `transform`): przycisk główny → `signal-hover` wg O-06; przycisk drugorzędny, CTA w nagłówku i przycisk menu → ramka `line` → `ink-muted`; linki w nawigacji i menu → podkreślenie (offset 4px); linki w stopce → `ink-muted` → `ink`; karty bez hover — nie są klikalne, a reakcja nieklikalnego elementu to fałszywa afordancja (hover na wierszu realizacji wróci z SS-1.10, gdy wiersz stanie się linkiem)
- [x] token `signal-hover` wyłącznie przez `tokens.json` → `npm run tokens` (paczka `design/` re-eksportowana przez tj wg O-06, agent jej nie edytuje)
- [x] „Umów rozmowę” w nawigacji desktop jako przycisk z ramką `line` (mobile ma już wypełniony `signal`)
- [x] hero: usunąć notatkę pod wykresem (`chart.note`) i etykiety osi `START` / `TYDZIEŃ 8` (`startLabel`, `endLabel`) z typu i treści; zostaje „przed → po wdrożeniu”
- [x] linki case: usunąć `caseHref`/`caseLabel` z typu `ServiceCard` i kart usług; w `CaseCard` link renderowany tylko, gdy `caseHref` nie jest kotwicą (`#…`) — do czasu SS-1.10 nie ma się co wyświetlać; etykieta „Zobacz realizację →” zamiast „Zobacz case →”
- [x] etykiety sekcji: usunąć klucz `label` z typu i treści sekcji usługi, realizacje, proces, studio (nagłówek i nawigacja niosą to samo); zostają: etykieta hero, tagi linii, podpisy wykresu, „Dobrze pasujemy, gdy”
- [x] tekst wg O-07 — tylko wiersze zaakceptowane przez tj, z twardymi spacjami jak w SS-1.05/1.06:
  - T1 `services.lead`: „Nie sprzedajemy godzin programisty. Sprzedajemy działający system z jasno opisanym stanem końcowym.” → „Umowa na działający system, nie na godziny. Stan końcowy opisujemy przed startem.”
  - T2 `studio.paragraphs[0]`: „Pracujemy z architekturą i procesem zbudowanymi wokół agentów AI. Dzięki temu dostarczamy w tygodniach to, co zwykle zajmuje kwartały, i prowadzimy kilka projektów naraz bez rozmywania odpowiedzialności.” → „Kod powstaje z agentami AI, ale czyta go, testuje i odpowiada za niego jedna osoba. Dlatego sklep Hydra Arms wystartował po dwóch tygodniach, a kilka projektów naraz nie oznacza kolejki.”
  - T3 `studio.paragraphs[1]`, drugie zdanie: „Każda decyzja techniczna jest tłumaczona na to, co zmienia w Twojej firmie.” → „O każdej decyzji technicznej mówimy językiem skutku: co przestanie się psuć i ile to kosztuje.”
  - T4 `cases.items[0].description` (Hydra Arms): „Strona i sklep od zera: Next.js, Supabase, BaseLinker. Katalog składany codziennie z plików XML trzech dostawców, ponad 2 000 produktów, bez ręcznego przepisywania cen i stanów.” → „Strona i sklep B2B od zera. Katalog składany co noc z plików XML trzech dostawców: ponad 2 000 produktów, ceny i stany bez ręcznego przepisywania.” — stack (`NEXT.JS · SUPABASE · BASELINKER`) jako linia mono w stopce karty (nowy klucz `stack: string[]` w `CaseCard`, także dla pozostałych dwóch case'ów: tj podaje)
  - T5 `cta.lead`: „…i z szacunkiem, ile zajmie doprowadzenie go do stanu ustalonego.” → „…i z szacunkiem, ile to zajmie.”
  - T6 `hero.chart.note`: usunąć (patrz wyżej)
  - T7 `hero.chart.startLabel` / `endLabel`: usunąć (patrz wyżej)
  - T8 `proofStrip`: „3+” → „3”; „5 systemów w portfolio: od dokumentacji offshore po sprzedaż wypraw” usunąć (pasek z trzech liczb) — zmiana względem O-03, więc tylko za zgodą w O-07; układ paska na 3 kolumny robi SS-1.16
  - T9 `caseLabel`: „Zobacz case →” → „Zobacz realizację →”
- [x] `.playwright-mcp/` — zrzut 1440 przycisku głównego w stanie hover i w stanie fokusu (`ss-1.14/primary-hover.jpeg`, `primary-focus.jpeg`, `full-1440.jpeg`, `full-390.jpeg`)

## Gotowe, gdy
- fokus widoczny — Playwright: Tab przez stronę; dla każdego elementu, który dostał fokus, `getComputedStyle(el).outlineWidth` ≠ `0px` i kolor obrysu = `signal` (`rgb(127, 178, 229)`); zrzut przycisku z fokusem w `.playwright-mcp/`
- hover bez ruchu — Playwright `hover()` na przycisku głównym, drugorzędnym, linku nawigacji, CTA w nagłówku i linku stopki: zmienia się `background-color`, `border-color` lub `text-decoration-line`, a `transform` pozostaje `none`; `transition-duration` każdego z nich w zakresie 200–300 ms
- kolory tylko z tokenów — `npm run check:colors` przechodzi; `signal-hover` jest w `tokens.json` i `npm run tokens && git diff --exit-code` kończy się kodem 0
- CTA w nagłówku odróżnia się od linków — Playwright 1440: `border-width` przycisku „Umów rozmowę” w `header nav` = `1px`, linki nawigacji `0px`
- bez ruchu przy reduced motion — Playwright z `reducedMotion: 'reduce'`: `document.getAnimations().length === 0` po załadowaniu (jak w SS-1.05)
- notatka i oś zniknęły — `curl -s <podgląd> | grep -c 'TYDZIEŃ 8'` = 0 i `grep -c 'przestaje oscylować'` = 0
- martwe linki zniknęły — Playwright: liczba `a[href="#realizacje"]` wewnątrz `#uslugi` i `#realizacje` = 0 (nawigacja, hero i stopka mogą linkować do sekcji); `grep -c 'Zobacz case' src/content/pl/site.ts` = 0
- etykiety sekcji usunięte — `grep -n 'content.label' src/components/Services.tsx src/components/Cases.tsx src/components/Process.tsx src/components/Studio.tsx` puste, a klucz `label` tych sekcji nie istnieje w `src/content/types.ts`
- tekst zgodny z O-07 — każdy wiersz T1–T9 oznaczony w O-07 jako przyjęty występuje w `src/content/pl/site.ts` dosłownie (cytat odpowiedzi O-07 w raporcie); wiersze odrzucone bez zmian (`git diff` treści pokazuje tylko przyjęte)
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- animacja krzywej i odsłanianie sekcji → SS-1.15
- układ realizacji, procesu i paska liczb → SS-1.16
- adresy przycisków „Umów…” → SS-1.07
- przełącznik jasny/ciemny → deferred

## Bramki STOP
- przed zmianą tekstu poza listą T1–T9 lub innym brzmieniem niż w O-07 — pokaż różnicę i czekaj (treść pisze tj)
- przed edycją czegokolwiek w `design/` — STOP; paczkę re-eksportuje tj (O-06)

## Kontekst
- audyt slop z 26 wrz 2026: pomiar na podglądzie 1440 — 0 reguł `:hover`, 0 `:focus-visible`, 0 animacji, 8 paneli z ramką, ok. 25 etykiet mono, „stan ustalony” 8 razy, 5 linków „Zobacz case →” do `#realizacje`; zrzuty lokalnie w `.playwright-mcp/audit/`
- `design/steadystate-brand/BRAND.md` — „Głos i treść” (AI to narzędzie w środku, nie hasło), „Ruch”, „Czego unikamy”
- `design/steadystate-brand/reference/homepage-desktop.html` — `a:hover{color:#A6CBEF}` (źródło wartości dla O-06)
- `docs/04-open-questions.md` — O-03, O-06, O-07

## Notatki z realizacji
- 2026-09-26: zadanie z audytu slop (faza 1 z 3); zasada: ożywić stronę kolorem i podkreśleniem, nie ruchem
- 2026-09-26 tj: O-06 = dodać token, O-07 = wszystkie T1–T9; start
- 2026-09-26: wdrożone na `feat/interaction-states` (baza: `origin/main` po PR #6). Odstępstwa od zakresu: (1) karty bez hover — nieklikalne; (2) pasek liczb po T8 ma 3 kolumny na `sm` (`grid-cols-1 sm:grid-cols-3`), żeby nie zostawić pustej czwartej kolumny — docelowy układ z hairline'ami robi SS-1.16; (3) kryterium „martwe linki” doprecyzowane: liczy się wnętrze `#uslugi` i `#realizacje`, bo nawigacja, hero i stopka mają prawo linkować do sekcji; (4) kryterium hover wymienia elementy interaktywne zamiast „karty usługi”
- 2026-09-26: `signal-hover` dodany do `design/steadystate-brand/tokens.json` i `tokens.css` (za zgodą tj w O-06, wyjątek od „nie edytować”); tj przenosi do artefaktu kanonicznego przy następnym eksporcie
- 2026-09-26: T4 — `stack` tylko dla Hydra Arms; Sea Clouds i Fjordanglers czekają na listę od tj (klucz opcjonalny, linia mono renderuje się, gdy jest)
- 2026-09-26: po usunięciu etykiet osi na dole karty wykresu został pusty pas (~50 px w viewBox 560×300); geometria zostaje dla SS-1.15, które i tak przebudowuje hero (notatka w SS-1.15)
- 2026-09-26: wyniki lokalne (dev server, Playwright): fokus 2px `rgb(127, 178, 229)` offset 2px na wszystkich 15 elementach fokusowalnych strony (jedyny bez obrysu to przycisk overlaya Next.js dev, poza stroną); hover główny `rgb(166, 203, 239)` = `#A6CBEF`, `transform: none`, `transition-duration: 0.2s`, `cubic-bezier(0, 0, 0.2, 1)`; CTA w nagłówku `border 1px`, linki `0px`; reduced motion: 0 animacji; 390: `scrollWidth` 390; `npm run lint`, `npm run typecheck`, `npm run tokens` bez zmian — OK. Podgląd Vercel: po otwarciu PR
