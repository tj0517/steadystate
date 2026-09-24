---
id: SS-1.09
title: Produkcja — domena steadystate.pl na Vercelu
status: todo
difficulty: S
model: null
model_approved: null
effort: null
branch: null
due: null
depends_on: [SS-1.02, SS-1.07, SS-1.08]
blocked_by_questions: []
touches_db: false
touches_prod: true
pr: null
---

## Cel
Polska strona główna działa pod `https://steadystate.pl`, `www` przekierowuje na domenę główną,
a produkcja wdraża się z `main`. Zmiany DNS robi tj; agent przygotowuje dokładną listę kroków
i sprawdza wynik odczytem.

## Zakres
- [ ] odczyt stanu: `dig +short steadystate.pl A`, `dig +short www.steadystate.pl CNAME`, `dig +short steadystate.pl MX` (zapisz przed zmianą)
- [ ] instrukcja dla tj: dodanie domeny w Vercel, rekordy do wpisania w GoDaddy (dokładne wartości z panelu Vercel wkleja tj), przekierowanie `www` → `steadystate.pl`
- [ ] po zmianie DNS: weryfikacja odczytem (niżej)
- [ ] notatka w `CLAUDE.md`: produkcja = `main` na Vercelu, domena steadystate.pl

## Gotowe, gdy
- strona działa po HTTPS — `curl -sI https://steadystate.pl` → `HTTP/2 200`
- `www` przekierowuje — `curl -sI https://www.steadystate.pl` → 301 lub 308 z `location: https://steadystate.pl/`
- HTTP przekierowuje na HTTPS — `curl -sI http://steadystate.pl` → 301/308 na `https://`
- poczta nie ucierpiała — `dig +short steadystate.pl MX` identyczne jak przed zmianą (oba wyniki w raporcie)
- produkcja to ostatni commit `main` — hash z panelu Vercel lub `curl -s https://steadystate.pl` zgodny ze zmianą z ostatniego PR-a (wskaż, po czym poznać)

## Poza zakresem
- podstrony case'ów → SS-1.10
- wersja EN → SS-1.12
- monitoring dostępności → deferred

## Bramki STOP
- każda zmiana DNS w GoDaddy — wyłącznie tj, po pokazaniu dokładnych rekordów
- dodanie domeny i zmiana ustawień projektu w Vercel — wyłącznie tj
- rekordy MX i TXT poczty — nie ruszać

## Kontekst
- `CLAUDE.md`
- `docs/tasks/SS-1.02.md` — jak jest podpięty Vercel

## Notatki z realizacji
