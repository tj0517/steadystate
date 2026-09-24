---
id: SS-1.12
title: Wersja EN strony głównej
status: todo
difficulty: M
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.09]
blocked_by_questions: [O-05]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Angielska wersja strony głównej pod `/en` dla klientów spoza Polski. Polska zostaje pod `/`.
Wyszukiwarki widzą obie wersje jako pary językowe, a użytkownik przełącza język jednym
kliknięciem.

## Zakres
- [ ] odczyt stanu: `src/content/pl/`, wspólny typ treści, routing `src/app/`, tekst EN z O-05
- [ ] `src/content/en/` z tekstem od tj (O-05), ten sam typ co PL
- [ ] trasa `/en` z tymi samymi sekcjami; `<html lang="en">` na `/en`
- [ ] przełącznik PL / EN w nagłówku (na telefonie też w menu), prowadzi do odpowiednika strony
- [ ] `hreflang` (pl, en, x-default → `/`) w obie strony, sitemap z obiema wersjami, metadata i OG po angielsku

## Gotowe, gdy
- brak polskiego tekstu na `/en` — `curl -s <podgląd>/en | sed 's/<[^>]*>/\n/g' | grep -E '[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]' | grep -v -e 'Gdańsk' -e 'GDAŃSK'` puste (nazwa miasta to jedyny wyjątek)
- niekompletne tłumaczenie nie przejdzie (red proof) — usunięcie jednego klucza z `src/content/en/` powoduje błąd `npm run typecheck`
- `lang` i hreflang — `curl -s <podgląd>/en | grep -o '<html[^>]*lang="en"'` trafia; oba adresy mają `<link rel="alternate" hreflang=...>` dla pl, en i x-default
- przełącznik działa — Playwright: klik EN na `/` → `/en`, klik PL na `/en` → `/`
- sitemap — `curl -s <podgląd>/sitemap.xml | grep -c '/en'` ≥ 1
- wygląd — zrzuty 1440 i 390 `/en` w `.playwright-mcp/`, `scrollWidth <= 390` (angielskie teksty mają inną długość)
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- automatyczne przekierowanie według języka przeglądarki → deferred (osobna decyzja tj)
- case'y po angielsku → SS-1.13
- tłumaczenie treści przez agenta — tekst EN dostarcza tj (O-05)

## Bramki STOP
- przed zmianą tekstu EN względem pliku od tj — pokaż różnicę i czekaj

## Kontekst
- `src/content/pl/`, `src/content/en/`
- `docs/04-open-questions.md` — O-05

## Notatki z realizacji
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
