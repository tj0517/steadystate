# steadystate-brand

Design system marki Steadystate w plikach — do wrzucenia do repo strony steadystate.pl i czytania przez Claude Code.

| Plik | Co to jest | Jak używać |
|---|---|---|
| `BRAND.md` | Brand book: idea, głos, linie usług, zasady wizualne, czego unikamy | Kontekst dla agenta i ludzi. Zlinkuj z CLAUDE.md. |
| `tokens.json` | Źródło prawdy: kolory (dark domyślny + light), typografia, spacing, radius | Generuj z tego CSS/Tailwind; nie edytuj wartości ręcznie w kodzie. |
| `tokens.css` | Gotowe zmienne CSS wygenerowane z tokens.json (`:root` = dark, `[data-theme="light"]`) + klasy `.text-*` | Podepnij od razu; przy zmianie tokens.json wygeneruj ponownie. |
| `logos/` | Sygnet + znak słowny (ciemne i jasne tło), SVG | Favicon/OG z sygnetu, nav ze znaku słownego. |
| `reference/homepage-desktop.html` | Zaprojektowana strona główna (desktop 1440) jako statyczny HTML z inline'owymi stylami | **Wzorzec wizualny, nie kod produkcyjny.** Odtwórz w komponentach z użyciem tokenów. Nie ma wersji mobilnej. |

Fonty: Inter Tight (400/500/600) i JetBrains Mono (500) z Google Fonts — w produkcji lepiej self-hostować (`next/font`).

Kanoniczna, edytowalna wersja systemu żyje jako artefakt „Steadystate” (Design System) w Claude; ta paczka to jej eksport z 24.09.2026.

## Sugerowany wpis do CLAUDE.md

```
## Marka i UI
Design system: `design/steadystate-brand/` — przeczytaj `BRAND.md` i `tokens.json` przed pracą nad UI.
Zasady: dark-first; jeden akcent (`signal`) na ekran; `amber` tylko dla Steady Sales; ramki `line` zamiast cieni;
liczby i etykiety w JetBrains Mono; bez gradientów, glow'ów i emoji. Wzorzec strony głównej: `reference/homepage-desktop.html`.
```
