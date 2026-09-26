---
id: SS-1.16
title: Realizacje jako rejestr z diagramami, proces na krzywej, pasek liczb
status: review
difficulty: M
model: fable-5.1
model_approved: fable by tj 2026-09-26 (po fakcie)
effort: medium
branch: feat/cases-register
due: null
depends_on: [SS-1.15]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: 9
---

## Cel
Przerwać rytm „każda sekcja to siatka kart z ramką”. Realizacje stają się rejestrem: wiersze
oddzielone hairline'ami, indeks mono i mały diagram przepływu dla każdego systemu, bo zrzutów
z systemów klientów nie ma (zgoda klientów, deferred), a BRAND.md wprost dopuszcza diagramy
przepływu. Box „Stan ustalony” zostaje jedynym boxem w sekcji i wreszcie się wyróżnia.
Proces układa się na krzywej stanu ustalonego: kroki 01–03 na oscylacji, 04 na płaskiej linii.
Pasek liczb schodzi do trzech uczciwych liczb.

## Zakres
- [ ] odczyt stanu: `CaseCard.tsx`, `Cases.tsx`, `Process.tsx`, `ProofStrip.tsx`, `Studio.tsx` po SS-1.15; odpowiedź O-07 (T8); BRAND.md „Grafika”, „Fundamenty wizualne”
- [ ] realizacje jako rejestr: bez `rounded-lg border bg-surface-raised` na wierszu; wiersze rozdzielone `border-t border-line`; indeks mono `01`–`03`; układ desktop: indeks + nazwa/branża | opis + diagram | box „Stan ustalony” (`signal-soft` / `amber-soft`, jedyny box); mobile: kolumna
- [ ] trzy diagramy przepływu jako SVG w komponentach (cienka linia ≤ 1,5 px, etykiety mono w HTML lub `<text>` z `font-mono`, jeden akcent na diagram, bez ikon, bez strzałek-grafik poza prostą linią z grotem):
  - Hydra Arms: `XML ×3 dostawców` → `import nocny` → `katalog 2 000+` → `zamówienia` (akcent `signal`)
  - Sea Clouds DCS: `rewizja` → `transmittal` → `akceptacja` → `rozliczenie godzin` (akcent `signal`)
  - Fjordanglers: `reklama` → `formularz` → `kwalifikacja` → `oferta` → `płatność` (akcent `amber`)
  - każdy z `role="img"` i `aria-label` opisującym przepływ; treść etykiet w `src/content/pl/site.ts` (nowy klucz `flow: string[]` w `CaseCard`), geometria w komponencie
- [ ] proces na krzywej: jeden cienki SVG `path` przez całą szerokość sekcji na `lg`, ta sama rodzina krzywej co logo/hero (skok, dwie malejące oscylacje, płaska linia z kropką); kroki 01–03 zakotwiczone nad kolejnymi ekstremami, 04 nad płaską linią z kropką; `ol` z czterema `li` pozostaje semantyką (kolejność czytania jak dziś); poniżej `lg` krzywa ukryta, lista pionowa z hairline'ami
- [ ] pasek liczb: trzy metryki wg O-07 (T8) bez zmian, siatka 3 kolumny na `lg`, 1 kolumna + hairline'y poniżej
- [ ] Studio bez zmian
- [ ] `.playwright-mcp/` — zrzuty 1440 i 390 sekcji realizacje, proces, pasek liczb

## Gotowe, gdy
- realizacje bez kart z ramką — `grep -c 'rounded-lg border' src/components/CaseCard.tsx` = 0; Playwright 1440: w `#realizacje` jedynymi elementami, których `background-color` nie jest przezroczyste (`rgba(0, 0, 0, 0)`) ani `surface` (`rgb(20, 23, 28)`), są trzy boxy „Stan ustalony”. *(Zmiana tj 2026-09-26: elementy bez własnego tła raportują przezroczyste.)*
- diagram na każdą realizację — Playwright 1440: widocznych `#realizacje svg[role="img"]` = 3, każdy z niepustym `aria-label`, wszystkie `stroke-width` ≤ 1,5; Playwright 390: wszystkie trzy SVG mają `display: none`, a każda realizacja pokazuje przepływ jako tekst z obliczonym `font-size` ≥ 11px, w całości w viewporcie (bez uciętych etykiet). *(Zmiana tj 2026-09-26: przepływ tekstowy poniżej `lg`.)*
- jeden akcent na diagram — Playwright: dla każdego z trzech SVG zebrać obliczone kolory `stroke` i `fill` jego elementów, pomijając `none`/przezroczyste i neutralne tokeny `line`/`ink`/`ink-muted`; Fjordanglers daje tylko amber (`rgb(230, 166, 82)`), Hydra Arms i Sea Clouds tylko signal (`rgb(127, 178, 229)`); zestawy kolorów per diagram w raporcie. *(Zmiana tj 2026-09-26: zastępuje grep, który istniejąca mapa akcentów w `CaseCard.tsx` zawsze by oblała.)* Na 390 kolor strzałek per realizacja: tylko amber dla Fjordanglers, tylko signal dla dwóch pozostałych. *(Uzupełnienie tj 2026-09-26.)*
- proces na krzywej — Playwright 1440: `#proces svg` widoczny (`display` ≠ `none`), `#proces ol li` = 4; Playwright 390: `#proces svg` ma `display: none`, lista czytelna w kolumnie
- pasek liczb wg O-07 — liczba `.text-metric` w sekcji „Liczby” = 3 (lub 4, jeśli O-07 zachowuje cztery; cytat odpowiedzi w raporcie); `grep -c '3+' src/content/pl/site.ts` = 0, gdy T8 przyjęte
- bez cieni, gradientów, emoji — `grep -rnE 'shadow|gradient' src --include='*.tsx' --include='*.css' | grep -v tokens.generated.css` puste; `find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) -exec perl -CSD -ne 'print "$ARGV:$.: $_" if /[\x{1F300}-\x{1FAFF}]/; close ARGV if eof' {} +` puste (macOS `grep` nie ma `-P`)
- telefon bez poziomego przewijania — Playwright 390×844: `scrollWidth <= 390`
*(Lighthouse dostępność ≥ 90 na podglądzie przeniesione do SS-1.08 przez tj 2026-09-26.)*
- wygląd — zrzuty 1440 i 390 trzech sekcji w `.playwright-mcp/`; ocenia tj w review, poprawki na tej samej gałęzi
- `npm run lint` (w tym `check:colors`), `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- zrzuty i zdjęcia z systemów klientów → deferred (zgoda klientów)
- podstrony case'ów → SS-1.10 (szablon powinien użyć tych samych diagramów; propozycja: dodać SS-1.16 do `depends_on` SS-1.10 — decyzja tj)
- scroll-spy w nawigacji, linia z lokalnym czasem → deferred

## Bramki STOP
- przed dodaniem czwartego typu boxu/karty w sekcji realizacje — STOP; box „Stan ustalony” ma zostać jedynym
- przed użyciem ikon (mózg, rakieta, żarówka, ikonki technologii) w diagramach — STOP (BRAND „Grafika”)
- przed zmianą liczb w pasku poza odpowiedzią O-07 — STOP (O-03)

## Kontekst
- `design/steadystate-brand/BRAND.md` — „Grafika: krzywa stanu ustalonego jako motyw, diagramy przepływu, wykresy z cienką linią. Bez zdjęć stockowych, bez ikon…”, „Kształt: ramki `line` zamiast cieni”
- `src/components/Logo.tsx`, `SteadyCurveChart.tsx` — geometria krzywej do ponownego użycia w procesie
- `docs/04-open-questions.md` — O-03, O-07
- `docs/deferred-tasks.md` — zrzuty z systemów klientów

## Notatki z realizacji
- 2026-09-26: zadanie z audytu slop (faza 3 z 3); jedyny „kreatywny” element strukturalny to krzywa jako oś procesu — motyw marki jako układ, nie dekoracja
- 2026-09-26 tj: tło w #realizacje poza boxami — przezroczyste lub surface; jeden akcent na diagram sprawdzany w Playwright (kolory linii w SVG), nie grepem; Lighthouse dostępność przeniesiona do SS-1.08; Studio bez linii mono („5 systemów” nie wraca)
- 2026-09-26: implementacja gotowa do review — branch `feat/cases-register`, PR #9; pomiary Playwright na podglądzie Vercel i zrzuty w `.playwright-mcp/ss-1.16/`; wykonane na modelu Fable 5.1 (prompt zakładał Sonnet medium)
- 2026-09-26 tj: diagramy poniżej `lg` jako tekst mono ze strzałkami, łamany w wierszach; SVG tylko od `lg` (etykiety ~9 px na 390 były nieczytelne)
- 2026-09-26 tj: kroki procesu bez kreski nad sobą — zostaje (krzywa jest osią na desktopie, hairline'y na telefonie)
- 2026-09-26 tj: Fable 5.1 zatwierdzony po fakcie
