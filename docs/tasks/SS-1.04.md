---
id: SS-1.04
title: Layout — nawigacja, menu mobilne, stopka, pliki treści
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.03]
blocked_by_questions: []
touches_db: false
touches_prod: false
pr: null
---

## Cel
Rama strony, w którą wchodzą wszystkie sekcje: nagłówek z logo i kotwicami, menu na
telefonie, stopka i kontener sekcji. Teksty od początku leżą w plikach treści, żeby wersja EN
(SS-1.12) była nowym plikiem, a nie przepisywaniem komponentów.

## Zakres
- [ ] odczyt stanu: `src/app/`, wygenerowane tokeny z SS-1.03, sekcje NAV i FOOTER w `design/steadystate-brand/reference/homepage-desktop.html`
- [ ] pliki treści `src/content/pl/` z typem wspólnym dla języków (klucze wymagane przez TypeScript)
- [ ] nagłówek: znak słowny z `logos/`, kotwice Usługi / Realizacje / Proces / Studio, przycisk „Umów rozmowę” (na razie `#kontakt`)
- [ ] menu mobilne poniżej progu tabletu: przycisk z `aria-expanded`, zamykanie Esc i kliknięciem w link, fokus wraca na przycisk
- [ ] stopka wg wzoru; kontener sekcji (max 1440, marginesy wg wzoru na desktopie, węższe na mobile)
- [ ] płynne przewijanie do kotwic wyłączone przy `prefers-reduced-motion`
- [ ] `<html lang="pl">`; `.playwright-mcp/` — zrzuty 1440 i 390

## Gotowe, gdy
- nagłówek i stopka odpowiadają wzorowi — zrzuty 1440 obok zrzutów tych samych sekcji wzoru (wzór otwarty w Playwright w tym samym viewporcie) w `.playwright-mcp/`; ocenia tj w review
- brak poziomego przewijania na telefonie — Playwright 390×844: `document.documentElement.scrollWidth <= 390`
- menu mobilne działa z klawiatury — Playwright: Tab do przycisku, Enter otwiera (`aria-expanded="true"`), Esc zamyka, fokus na przycisku; wynik kroków w raporcie
- teksty pochodzą z plików treści — zmiana etykiety „Proces” w `src/content/pl/` zmienia ją w nagłówku (zrzut lub test), a usunięcie klucza powoduje błąd `npm run typecheck` (red proof)
- `npm run lint` (w tym `check:colors`) i `npm run build` przechodzą

## Poza zakresem
- sekcje strony głównej → SS-1.05, SS-1.06
- adres kontaktowy i link do kalendarza → SS-1.07
- przełącznik języka i `/en` → SS-1.12

## Bramki STOP
- (brak projektowych poza ogólnymi)

## Kontekst
- `design/steadystate-brand/reference/homepage-desktop.html` — sekcje `<!-- NAV -->`, `<!-- FOOTER -->`
- `design/steadystate-brand/logos/README.md`
- `design/steadystate-brand/BRAND.md` — „Ruch”, „Logo”

## Notatki z realizacji
- 2026-09-24 tj: wersję mobilną układa agent z tokenów, tj ocenia zrzuty 390 px (wf-plan D5)
