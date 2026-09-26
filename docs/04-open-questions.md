# Otwarte pytania — Steadystate

Jeden wiersz na pytanie (grep po id). Odpowiedź wpisuje tj; zadanie odblokowuje się, gdy status = rozstrzygnięte.

| id | pytanie | opcje | blokuje | status | odpowiedź |
|---|---|---|---|---|---|
| O-01 | Adres kontaktowy, skrzynka i kalendarz | adres: hello@ / tymon@ / inny · skrzynka: Google Workspace (płatny) / Zoho (darmowy plan) / przekierowanie na Gmail (ImprovMX) · kalendarz: Cal.com / harmonogram spotkań Google Calendar | SS-1.07 | otwarte | |
| O-02 | Analityka | brak / bez ciasteczek (Vercel Analytics, Plausible), bez banera / GA4 z banerem cookies i polityką prywatności | SS-1.08 | otwarte | |
| O-03 | Zgoda klientów na nazwę i opis case'u; liczby na stronie | Hydra Arms i Sea Clouds z nazwy (zgoda uzyskana) / zanonimizowani („sklep B2B z sektora obronnego”) · liczby „2 tyg.”, „2 000+”, „3+”, „5 systemów” zostają / zmiana | SS-1.05, SS-1.06, SS-1.10, SS-1.11 | rozstrzygnięte | 2026-09-25 tj: Hydra Arms i Sea Clouds z nazwy — tak; liczby („2 tyg.”, „2 000+”, „3+”, „5 systemów”) zostają na razie (mogą się zmienić później) |
| O-04 | Treść 3 case'ów (PL) | tj pisze z Claude poza repo; gotowy tekst w `content/cases/<slug>.pl.md` (hydra-arms, sea-clouds-dcs, fjordanglers) | SS-1.10, SS-1.11 | otwarte | |
| O-05 | Treść EN strony głównej i case'ów | tj pisze z Claude poza repo; strona główna → `src/content/en/`, case'y → `content/cases/<slug>.en.md` | SS-1.12, SS-1.13 | otwarte | |
| O-06 | Token `signal-hover` dla hover przycisku głównego i linków (SS-1.14) | dodać do kanonicznego systemu (artefakt Claude) i re-eksport `design/`: dark `#A6CBEF` jak `a:hover` we wzorze, light do ustalenia / bez nowego koloru: hover = podkreślenie i zmiana ramki, przycisk główny bez zmiany koloru | SS-1.14 | rozstrzygnięte | 2026-09-26 tj: dodać token. Agent dodaje `signal-hover` do `tokens.json` w repo (dark `#A6CBEF` jak `a:hover` we wzorze, light `#1A4267` — propozycja, ciemniejszy signal); tj przenosi token do artefaktu kanonicznego przy następnym eksporcie paczki |
| O-07 | Poprawki tekstu po audycie slop — wiersze T1–T9 w SS-1.14 (T8 zmienia liczby z O-03) | wszystkie / wybrane (podać numery T) / żadne · T8 osobno: pasek z 3 liczb bez „+” przy 3, „5 systemów” do Studio lub usunąć / zostają 4 jak w O-03 | SS-1.14, SS-1.16 | rozstrzygnięte | 2026-09-26 tj: wszystkie T1–T9, w tym T8 (pasek z trzech liczb, „3” bez plusa, „5 systemów” znika z paska; ewentualna linia mono w Studio — SS-1.16). Stack dla Sea Clouds i Fjordanglers (T4) tj poda osobno |
