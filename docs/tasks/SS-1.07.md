---
id: SS-1.07
title: Kontakt — link do kalendarza i e-mail
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.06]
blocked_by_questions: [O-01]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Każde „Umów rozmowę” na stronie prowadzi do kalendarza, a adres e-mail działa. To jedyna
ścieżka, po której strona zarabia, więc sprawdzamy ją wiadomością i rezerwacją testową.

## Zakres
- [ ] odczyt stanu: wszystkie CTA na stronie (`grep -rn 'kontakt' src`), odpowiedź na O-01
- [ ] jedno miejsce konfiguracji kontaktu (`src/content/contact.ts`): adres e-mail, URL kalendarza
- [ ] przyciski „Umów rozmowę” / „Umów 30‑minutową rozmowę” → URL kalendarza (nowa karta, `rel="noopener"`)
- [ ] adres w CTA i stopce jako `mailto:`
- [ ] instrukcja dla tj: wiadomość testowa i rezerwacja testowa na podglądzie PR

## Gotowe, gdy
- wszystkie CTA wskazują kalendarz — Playwright zbiera `href` przycisków „Umów…”; wszystkie równe URL z `contact.ts`
- mail ma poprawny adres — `curl -s <podgląd> | grep -o 'mailto:[^"]*' | sort -u` zwraca jeden adres z O-01
- ścieżka działa naprawdę — tj potwierdza w review: mail testowy doszedł, rezerwacja testowa pojawiła się w kalendarzu (dowód: potwierdzenie tj)
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- formularz kontaktowy z kwalifikacją zapytań → deferred (etap Steady Sales)
- rekordy MX i konfiguracja skrzynki → czynność tj poza repo
- osadzony (embed) kalendarz na stronie → deferred

## Bramki STOP
- zmiana DNS (MX) i ustawień skrzynki — wyłącznie tj

## Kontekst
- `docs/04-open-questions.md` — O-01
- `src/content/pl/` — CTA

## Notatki z realizacji
- 2026-09-24 tj: kontakt v1 = kalendarz + mail, formularz później (wf-plan D3)
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
