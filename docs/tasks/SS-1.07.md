---
id: SS-1.07
title: Kontakt — formularz w pop-upie, e-mail przez Resend
status: review
difficulty: M
model: claude-sonnet-5
model_approved: null
effort: null
branch: feat/contact-form-and-copy
due: null
depends_on: [SS-1.06]
blocked_by_questions: [O-01]
touches_db: false
touches_prod: false
pr: 11
---

## Cel
Każde „Umów rozmowę” na stronie prowadzi do działającej ścieżki kontaktu. Zamiast linku do
kalendarza (pierwotny plan, patrz Notatki 2026-09-24) tj poprosił w sesji o pop-up z
dwuetapowym formularzem wysyłanym mailem — to jedyna ścieżka, po której strona zarabia,
więc wymaga realnego testu wysyłki.

## Zakres
- [x] wszystkie CTA („Umów rozmowę” w hero i w sekcji kontaktowej) otwierają wspólny modal
  (`ContactModalProvider`/`ContactModalTrigger`, `src/components/ContactModal.tsx`)
- [x] formularz dwuetapowy z paskiem postępu: krok 1 dane kontaktowe (imię/firma, firma
  opcjonalnie, e-mail), krok 2 rodzaj problemu (enum), opis, preferowany termin (opcjonalnie)
- [x] fokus ustawiany na pierwsze pole przy otwarciu modala i przy zmianie kroku; tło
  przyciemnione (`::backdrop`)
- [x] wysyłka przez `POST /api/contact` (Resend), z `replyTo` na adres z formularza
- [ ] `RESEND_API_KEY` i `CONTACT_EMAIL` na Vercelu — tj musi ustawić, bez tego endpoint zwraca 500
- [ ] instrukcja dla tj: wiadomość testowa na podglądzie PR po ustawieniu zmiennych

## Gotowe, gdy
- oba CTA otwierają ten sam modal (zweryfikowane w sesji na desktopie i mobile)
- formularz się wysyła i mail dochodzi na `CONTACT_EMAIL` — **wymaga jeszcze** ustawienia
  `RESEND_API_KEY`/`CONTACT_EMAIL` na Vercelu i testu wysyłki przez tj
- `npm run lint`, `npm run typecheck`, `npm run build` przechodzą lokalnie (zrobione);
  build podglądu PR na Vercelu zielony (do potwierdzenia po otwarciu PR)

## Poza zakresem
- kwalifikacja zapytań z użyciem AI → deferred (etap Steady Sales, jak w opisie usług)
- rekordy MX i konfiguracja skrzynki → czynność tj poza repo
- osadzony (embed) kalendarz na stronie → deferred, formularz go zastępuje

## Bramki STOP
- zmiana DNS (MX) i ustawień skrzynki — wyłącznie tj

## Kontekst
- `docs/04-open-questions.md` — O-01
- `src/content/pl/` — CTA

## Notatki z realizacji
- 2026-09-24 tj: kontakt v1 = kalendarz + mail, formularz później (wf-plan D3)
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
- 2026-09-28 tj: zmiana planu w sesji — formularz (pop-up, dwa kroki) zamiast linku do
  kalendarza; wdrożone, PR #10 (merged) obejmował wcześniejsze zmiany UI, ten branch
  (`feat/contact-form-and-copy`) dokłada formularz
- 2026-09-28: w tej samej sesji tj poprosił dodatkowo o przepisanie całego copy strony na
  angielski i strony `/privacy` + `/terms` — poza pierwotnym zakresem SS-1.07, ale
  dostarczone razem w PR #11; do rozważenia, czy rozbić na osobne zadania w INDEX.md
- implementacja gotowa do review — branch `feat/contact-form-and-copy`, PR #11
