---
id: SS-1.08
title: SEO, metadane, OG i dostępność
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.06]
blocked_by_questions: [O-02]
touches_db: false
touches_prod: false
pr: null
---

## Cel
Strona ma się dobrze wyświetlać w Google i przy udostępnianiu linku oraz przechodzić podstawowe
progi jakości (Lighthouse ≥ 90). Analityka tylko w wariancie wybranym w O-02.

## Zakres
- [ ] odczyt stanu: `src/app/layout.tsx` (metadata), `public/`, odpowiedź na O-02
- [ ] metadata: tytuł „Steadystate — Systems that settle.”, opis PL, canonical, `lang`
- [ ] favicon i apple-touch-icon z `logos/steadystate-mark.svg`
- [ ] obrazek OG 1200×630 (sygnet + tagline, tokeny marki)
- [ ] `sitemap.xml` i `robots.txt` (bez `/styleguide`)
- [ ] dostępność: kontrast, widoczny fokus, `alt`, kolejność nagłówków
- [ ] analityka wg O-02 (jeśli wymaga banera lub polityki prywatności — STOP, osobne zadanie)

## Gotowe, gdy
- Lighthouse ≥ 90 w wydajności, dostępności i SEO — raport JSON dla podglądu PR (mobile i desktop), ścieżki w raporcie, wyniki w tabeli
- OG działa — `curl -s <podgląd>/ | grep -E 'og:image|og:title'` zwraca oba, a `curl -sI <og:image>` = 200 i `image/png`
- sitemap i robots — `curl -s <podgląd>/sitemap.xml | grep -c '<loc>'` ≥ 1, brak `styleguide`; `curl -s <podgląd>/robots.txt` wskazuje sitemap
- favicon — `curl -sI <podgląd>/favicon.ico` albo `/icon.svg` = 200
- `npm run lint`, `npm run typecheck` przechodzą lokalnie, a build podglądu PR na Vercelu jest zielony (check Vercel na PR)

## Poza zakresem
- metadane EN i hreflang → SS-1.12
- metadane podstron case'ów → SS-1.10
- baner cookies / polityka prywatności (jeśli O-02 = GA4) → nowe zadanie z wf-plan

## Bramki STOP
- przed dodaniem skryptu analityki lub dowolnej zewnętrznej usługi — pokaż, co wysyła i dokąd, czekaj na akceptację
- zmiana env w Vercel (np. klucz analityki) — robi tj

## Kontekst
- `design/steadystate-brand/logos/`
- `docs/04-open-questions.md` — O-02

## Notatki z realizacji
- 2026-09-24 tj: weryfikacja UI i HTTP na podglądzie PR na Vercelu (`<podgląd>` = URL podglądu z PR, publiczny); lokalnie tylko lint i typy (Mac 8 GB przy działającym stacku HA)
