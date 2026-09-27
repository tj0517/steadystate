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
- [x] prompt 3 „wszystkie sekcje pod krawędzią w tym kolorze, efekt paralaksy na granicy dwóch kolorów, usuń linie nad i pod”: `LightScope` — Studio, kontakt i stopka na tle `deep` (ciemnego motywu, `--tail` na `:root`) z tokenami motywu jasnego (`[data-theme="light"]`), więc tekst, box, hairline'y i przycisk `signal` dostają wartości na jasne tło; `CurveEdge` wypełnia `--tail`; usunięte: `CurveBackdrop` za kontaktem i hairline nad stopką. Paralaksa napisana i wycofana w tej samej turze („remove animation”) — krawędź statyczna
- [x] prompt 4 „przesuń ten efekt wyżej, do końca strony”: krawędź-krzywa nad sekcją proces; jasny blok obejmuje proces, studio, kontakt i stopkę (krzywa procesu i numer 04 w `signal` motywu jasnego)
- [x] prompt 5 „w środku, zakończ wyżej tym samym efektem, nie do końca strony”: jasne pasmo = proces + studio; `CurveEdge direction="out"` (ta sama ścieżka obrócona o 180°) zamyka pasmo nad kontaktem; kontakt i stopka z powrotem na ciemnym, hairline stopki przywrócony
- [x] prompt 6 „ten efekt na kartach w całej stronie”: `CurveCard` — karta z górną krawędzią-krzywą (ta sama ścieżka, czapka 40/56 px, wypełnienie = tło karty, dla kart z ramką 1 px `line` wzdłuż krzywej i boków czapki); użyta w kartach Steady Ops / Steady Sales, boxach „Stan ustalony” w rejestrze (bez ramki, `signal-soft`/`amber-soft`) i boxie „Dobrze pasujemy” w kontakcie; górne narożniki proste, dolne z radiusem karty
- [x] prompt 7 „dłuższa krzywa o mniejszej amplitudzie, ta sama na krawędziach sekcji, karty na biało”: wspólna ścieżka w `curve.ts` (oscylacje gasną przez ~80% szerokości, szczyt y=30, płaska y=64 w viewBoxie 120) używana przez `CurveEdge` (48/72/96 px) i `CurveCard` (32/44 px); karty jako scope tokenów jasnych (`data-theme="light"`): tło białe (`surface-raised` jasne), boxy „Stan ustalony” w jasnych tintach signal/amber, tekst i tagi w wartościach jasnych
- [x] prompt 8 „dodaj lustrzane na dole”: `CurveCard` zamyka kartę tą samą czapką obróconą o 180° (jak pasmo); korpus bez radiusa i bez ramki górnej/dolnej — tylko boki, ramka biegnie po krzywych
- [x] prompt 9 „zostaw na tych dwóch dużych, usuń z pozostałych”: `CurveCard` tylko na kartach Steady Ops / Steady Sales; boxy „Stan ustalony” i box „Dobrze pasujemy” wracają do stanu z `main`
- [x] prompt 10 „w hero za mało miejsca między h1 a wykresem”: wykres w kolumnach 8–12 (`lg:col-span-5 lg:col-start-8`), tekst zostaje w 1–6; odstęp h1→wykres 126 px zamiast 24 px na 1440, wykres 486 px szerokości
- [x] prompt 11 „spróbuj dodać ruch do tych zakrzywionych sekcji”: `SettlingEdge` — krawędzie pasma jako ten sam układ sprężyn co linia w hero, rysowany jako wypełnienie na canvasie nad statycznym SVG: przy pierwszym odsłonięciu fala startuje 60% większa i osiada w docelowy kształt (~2 s, raz); z myszą krawędź daje się pociągnąć (±36 px, zasięg 110 px) i wraca; canvas przejmuje tylko w ruchu i oddaje SVG w spoczynku; `prefers-reduced-motion` = bez ruchu; `curve.ts` trzyma segmenty krzywej i `sampleCurve`
- [x] prompt 12 „to samo na dwóch kartach; przy dużej amplitudzie przepływ jest przycinany”: canvas `SettlingEdge` sięga pół wysokości boxu nad i pod krawędź (`-top-1/2 h-[200%]`), więc wychylenie nie jest przycinane; `SettlingEdge` sparametryzowany (`fill` = `tail` | `surface-raised`, `stroke` dla ramki, `amplitude`); czapki kart Steady Ops / Steady Sales dostają osiadanie przy odsłonięciu i pociągnięcie (±22 px) z ramką rysowaną na canvasie; korpus karty `relative z-10` nad canvasami
- [x] prompt 13 „płynniej, mniej agresywnie”: `SettlingEdge` — wejście 35% zamiast 60%, pociągnięcie 0,045 zamiast 0,09 (zasięg 140 px), amplituda 26 px (karty 16 px), sprzężenie 0,2, tłumienie 0,085 — jedno miękkie wahnięcie, spoczynek po ~1,2 s
- [x] prompt 14 „zrób coś z tą linią między sekcjami, jest cienka i nie wygląda dobrze”: pasek liczb bez hairline'ów `border-y` — pełnoszerokie pasmo `surface-raised` (BRAND: „odcinają się tonem, nie cieniem”)
- [x] prompt 15 „lepiej u góry pasek z logami partnerów”: `PartnerStrip` zamiast paska liczb — pasmo `surface-raised`, trzy pozycje (Hydra Arms, Sea Clouds DCS, Fjordanglers) jako wordmarki mono `ink-muted`; pole `logo` (SVG w `/public`) podmienia wordmark na obraz 32 px, gdy pliki będą; treść `partners` w `site.ts` (aria-label „Klienci” — nowe copy do akceptacji tj); `proofStrip` w treści zostaje, komponent `ProofStrip` nieużywany
- [x] prompt 16 „wrzucone do public, pasek ma wyglądać gładziej”: logo w `public/partners/` (hydra-arms, sea-clouds, fjordanglers — PNG przycięte do zawartości, Sea Clouds z wyciętym białym tłem), w treści `logo`/`width`/`height`; `PartnerStrip` bez pasma i linii: jeden cichy rząd na `surface`, logo jako monochrom (`grayscale(1) invert(1)`, zachowuje detale), opacity 55% → 90% hover, wysokości per logo (Hydra 36/44, Sea Clouds 48/56, Fjord 24/28 px), `unoptimized` (cache optymalizatora podawał stary plik)
- [x] prompt 17 „dodaj temu styl, ginie na stronie”: wersja z etykietą (kreska `signal` + mono „Klienci”) odrzucona przez tj („not like that for sure”); zostaje: pasmo `surface-raised` z powrotem, logo większe (Hydra 40/48, Sea Clouds 56/64, Fjord 28/32 px), wyśrodkowane z równymi odstępami 128 px na `lg`, 80% → 100% hover, bez etykiety i linii
- [x] prompt 19 „krzywa pod 4 krokami grubsza”: `Process` — stroke 1,5 → 4 (jednostki viewBox 1200, ~4 px na 1440), kropka r 5 → 7
- [x] prompt 20 „animacja tej linii”: krzywa procesu rysuje się raz przy odsłonięciu (svg z `data-reveal`, `stroke-dashoffset` 1260 → 0 przez 1400 ms liniowo, kropka pojawia się po 1300 ms), `prefers-reduced-motion` = bez przejścia
- [x] prompt 21 „hero wg zrzutu Tailark hero-section-1” (wcześniejszy zrzut hero-section-2, wersja wyśrodkowana, odrzucona w trakcie): lewa kolumna (5/12) — etykieta, h1, lead, CTA, pod spodem podpis „Klienci” (istniejąca nazwa sekcji) i logo klientów (`PartnerLogos`, 70% → 100%); prawa (7/12) — panel `surface-raised` z hairline'em, +160 px poza kontener, ucięty prawą krawędzią (`overflow-hidden`), w środku wykres z podpisami; `PartnerStrip` usunięty; poniżej `lg` kolumna, panel pełnej szerokości
- [x] prompt 22 „usuń animację siatki linii, wdróż 1:1”: cztery poziome linie siatki wykresu usunięte (zostaje kreskowana linia stanu ustalonego, klasa `curve-baseline`); hero domierzone do wzorca: lewa kolumna max 460 px, h1 62 px / 1.0, podpis „Klienci” w `text-body`, panel od 6. kolumny, +200 px poza kontener, perspektywa `rotateY(-6deg) rotateX(4deg)` od `lg` (płaski poniżej), wykres z prawym marginesem 200 px, żeby kropka i etykieta zostały w kadrze
- [x] prompt 23 „panel jak ekran dashboardu (własny), wszystko w viewport, logo białe i szerzej”: `HeroDashboard` — sidebar (logo + nav z 6 pozycji, aktywna na `surface-raised`), górny pasek (workspace + chipy filtrów), „Przegląd” z trzema kafelkami liczb z `proofStrip.metrics`, „Aktywność” z wykresem (ten sam `SteadyCurveChart`, ogon żywy); chrome `aria-hidden`; nowe klucze `hero.dashboard` w treści; hero bez linii-etykiety nad h1, h1 56 px, odstępy `space-6`, całość mieści się w 1440×900 (dół hero 859 px); logo białe (`brightness(0) invert(1)`, 100%), wyższe (Hydra 40, Sea Clouds 56, Fjord 32 px), rząd 560 px z odstępami 40 px
- [x] prompt 24 „usuń efekt myszy na wykresie”: `SettlingLine` usunięty z `SteadyCurveChart` i z repo; wykres tylko rysuje się raz po załadowaniu; ruch krawędzi pasma i czapek kart (`SettlingEdge`) zostaje
- [x] prompt 25 „cień jak na zrzucie, więcej powietrza, mniejszy wykres i nagłówek”: panel w ramce-bezelu (`surface`, 10 px, radius 20, hairline) z miękkim cieniem `0 32px 80px -24px color-mix(surface, black 70%)` — wyjątek tj od BRAND „ramki zamiast cieni”; panel 6 kolumn od 7., +160 px; h1 48 px; hero `py` 96 px; dashboard ciaśniejszy (sidebar 160 px, kafelki 18 px mono, chrome w sans 12 px)

## Gotowe, gdy
- każdy punkt zakresu ma odhaczony wpis i notatkę z realizacji
- bez gradientów i emoji; jeden akcent na ekran (BRAND.md); cień tylko na panelu hero (wyjątek tj 2026-09-27)
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
- 2026-09-26: prompt 2 sprawdzony na podglądzie Vercel — krawędź-krzywa i pasmo deep na 1440 i 390, `scrollWidth` 390; zrzuty `studio-1440.png`, `studio-390.png`
- 2026-09-26: prompt 3 — dół strony jako jasny blok (deep) od krawędzi-krzywej po stopkę; paralaksa krawędzi wycofana na polecenie tj; sprawdzone lokalnie na dev tj (localhost:3000) 1440 i 390, bez pushu — tj powie kiedy
- 2026-09-26: prompt 4 — jasny blok od procesu do końca strony; sprawdzone lokalnie 1440 i 390, bez pushu
- 2026-09-26: prompt 5 — pasmo proces+studio z krawędzią-krzywą na wejściu i wyjściu; sprawdzone lokalnie 1440 i 390, bez pushu
- 2026-09-26: prompt 6 — CurveCard na 5 kartach; sprawdzone lokalnie 1440 i 390, bez pushu
- 2026-09-26: prompt 7 — jedna krzywa dla krawędzi i kart, karty białe; sprawdzone lokalnie 1440 i 390, bez pushu
- 2026-09-26: prompt 8 — lustrzana czapka na dole kart; sprawdzone lokalnie 1440 i 390, bez pushu
- 2026-09-26: prompt 9 — CurveCard tylko na dwóch kartach usług; sprawdzone lokalnie, bez pushu
- 2026-09-26: prompt 10 — odstęp w hero; sprawdzone lokalnie 1440, bez pushu
- 2026-09-26: prompt 11 — pomiar lokalny 1440: wejście krawędzi „out” (maks. y canvasu): 83 → 64 → 75 → 70 → spoczynek i opacity SVG z powrotem po ~3 s; pociągnięcie krawędzi „in”: pas 21–95 px, SVG ukryty w ruchu; bez pushu
- 2026-09-26: prompt 12 — pomiar lokalny 1440: czapka karty 44 px, canvas 88 px (box w wierszach 22–66), pociągnięta granica dochodzi do wiersza 22 bez przycięcia; SVG ukryty w ruchu, z powrotem w spoczynku; bez pushu
- 2026-09-26: prompt 12 — poprawka: wyjście myszy z okna (`pointerout` bez `relatedTarget`) zwalnia pociągnięcie, inaczej pętla i wychylenie zostawały; 390: `scrollWidth` 390, czapki w spoczynku
- 2026-09-26: prompt 13 — symulacja offline: spoczynek po 74 klatkach (1,23 s); pomiar lokalny 1440, krawędź „out”: wejście 127 → 117 → 120 (spoczynek) co 100 ms, pociągnięcie +20 px, SVG wraca po zwolnieniu; bez pushu
- 2026-09-26: prompt 14 — interpretacja: linie wokół paska liczb (hero → liczby → usługi); zamiast nich ton `surface-raised`; sprawdzone lokalnie 1440; bez pushu
- 2026-09-26: prompt 15 — brak plików logo w repo (public/ ma tylko domyślne SVG Next); wordmarki tekstowe do czasu dostarczenia SVG; pasek liczb (O-07) zdjęty ze strony decyzją tj, treść zostaje; sprawdzone lokalnie 1440; bez pushu
- 2026-09-26: prompt 16 — pliki od tj: `dark logo.png` (FjordAnglers), `logo-footer.png` (Hydra Arms), `logo.png` (Sea Clouds, 500×500 z białym wnętrzem); po obróbce Sea Clouds 41% pikseli kryjących zamiast 98%; sprawdzone lokalnie 1440; bez pushu
- 2026-09-26: prompt 17 — etykieta paska klientów; sprawdzone lokalnie 1440 i 390; bez pushu
- 2026-09-26: prompt 18 — etykieta wycofana, pasmo + większe logo; sprawdzone lokalnie 1440 i 390; bez pushu
- 2026-09-27: prompt 19 — grubsza krzywa procesu; sprawdzone lokalnie 1440; bez pushu
- 2026-09-27: prompt 20 — pomiar lokalny: przed odsłonięciem offset 1260 i kropka 0, po 1250 ms offset 0 i kropka 0,9 → 1; bez pushu
- 2026-09-27: prompt 21 — hero z panelem wychodzącym poza krawędź; sprawdzone lokalnie 1440 i 390; bez pushu
- 2026-09-27: prompt 22 — pomiar lokalny 1440: brak `<g>` siatki, ogon canvas działa po pochyleniu (pas 290–319 przy pociągnięciu); 390 kolumna bez przewijania; bez pushu
- 2026-09-27: SettlingLine mierzy canvas z `offsetWidth/Height` (rozmiar układu), nie z projekcji — po pochyleniu panelu projekcja (607×287) rozjeżdżała linię z SVG (592×275)
- 2026-09-27: prompt 23 — copy do akceptacji tj: etykiety dashboardu „Przegląd”, „Aktywność”, „Ostatnie 30 dni”, „Tydzień” (pozostałe słowa z opisów usług); zmierzono 1440: hero 859 px, logo do 767 px, panel do 810 px; 390: kolumna, sidebar ukryty; bez pushu
- 2026-09-27: prompt 24 — bez efektu wskaźnika na wykresie hero; bez pushu
- 2026-09-27: prompt 25 — zmierzono 1440: dół hero 793 px, panel do 708 px; bez pushu
