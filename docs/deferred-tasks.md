# Odłożone — Steadystate

„Noticed, not touched” i świadomie odłożone rzeczy. wf-plan zamienia je w zadania, gdy przyjdzie ich czas.

| data | co | skąd | uwagi |
|---|---|---|---|
| 2026-09-24 | Formularz kontaktowy z kwalifikacją zapytań (Steady Sales na własnej stronie) | wf-plan D3 | wymaga backendu, antyspamu, RODO |
| 2026-09-24 | Automatyczne przekierowanie według języka przeglądarki | SS-1.12 | decyzja tj |
| 2026-09-24 | Przełącznik jasny/ciemny motyw | SS-1.03 | tokeny light istnieją |
| 2026-09-24 | Osadzony kalendarz na stronie | SS-1.07 | |
| 2026-09-24 | Zdjęcia i zrzuty systemów w case'ach | SS-1.10 | wymaga zgody klientów |
| 2026-09-24 | Testy e2e / Lighthouse w CI, monitoring dostępności | SS-1.02, SS-1.09 | |
| 2026-09-24 | Usunąć nieużywane domyślne SVG create-next-app (`public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) | SS-1.01 | strona startowa ich już nie używa, ale to poza zakresem tego zadania |
| 2026-09-25 | Brak tokenów dla rozmiarów tekstu ze wzoru: 15/23, 36/42 (h2 Studio), 56/60 (h2 CTA) — użyto najbliższych tokenów i wartości arbitralnych | SS-1.06 | do rozważenia przy kolejnej wersji `tokens.json` (kanoniczna marka poza repo) |
| 2026-09-25 | Tekst treści w sekcji Studio: wzór ma `#3D434B`, bez tokenu — użyto `on-deep-muted` (`#5E636B`, jaśniejszy) | SS-1.06 | zgodne z zasadą „kolory tylko z tokenów”; jeśli za jasne, potrzebny nowy token |
| 2026-09-26 | Opcjonalne ożywienie po SS-1.16: scroll-spy (wskaźnik aktywnej sekcji w nawigacji), linia mono z lokalnym czasem/dostępnością w stopce | audyt slop | tylko jeśli po fazach 1–3 strona nadal wydaje się martwa; nie dodawać count-up, parallax, ziarna, kursora, rozmytego nagłówka, marquee logo, gradientowego tekstu, cienia na hover |
| 2026-09-26 | C: linia celu rysuje się przed krzywą — ocenić po SS-1.16, tylko jeśli strona nadal wydaje się statyczna | SS-1.15 | dotyczy SS-1.16 (proces na krzywej); decyzja tj: hero zostaje z jednym efektem (opcja A) |
