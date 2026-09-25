import type { SiteContent } from "../types";

export const site: SiteContent = {
  hero: {
    label: "Studio software · Gdańsk",
    heading: "Systemy, po których firma wchodzi w stan ustalony.",
    lead: "Budujemy systemy do pracy i do sprzedaży: obieg dokumentów, CRM, zamówienia, lejek zapytań. Po wdrożeniu kręcą się same, a Ty przestajesz gasić pożary.",
    primaryCta: { href: "#kontakt", label: "Umów 30-minutową rozmowę" },
    secondaryCta: { href: "#realizacje", label: "Zobacz realizacje" },
    chart: {
      ariaLabel:
        "Wykres: liczba nagłych problemów spada po skoku i ustala się na niskim, stałym poziomie",
      captionLeft: "Pożary w firmie / tydzień",
      captionRight: "przed → po wdrożeniu",
      badge: "STAN USTALONY",
      startLabel: "START",
      endLabel: "TYDZIEŃ 8",
      note: "Stan ustalony to moment, w którym układ przestaje oscylować. Tak projektujemy systemy: raz wdrożone, działają bez nadzoru.",
    },
  },
  proofStrip: {
    ariaLabel: "Liczby",
    metrics: [
      {
        value: "2 tyg.",
        caption: "od startu do działającego sklepu B2B (Hydra Arms)",
      },
      {
        value: "2 000+",
        caption: "produktów importowanych automatycznie każdego dnia",
      },
      {
        value: "3+",
        caption: "dostawców spiętych w jeden katalog, bez ręcznej pracy",
      },
      {
        value: "5",
        caption: "systemów w portfolio: od dokumentacji offshore po sprzedaż wypraw",
      },
    ],
  },
  services: {
    label: "Dwie linie usług",
    heading: "Jeden system do pracy. Jeden do sprzedaży.",
    lead: "Nie sprzedajemy godzin programisty. Sprzedajemy działający system z jasno opisanym stanem końcowym.",
    ops: {
      tag: "Steady Ops",
      tagline: "System do pracy",
      heading: "Firma, w której nic nie ginie między mailem a Excelem.",
      description:
        "Obieg dokumentów, CRM, rejestracja czasu, finanse, zamówienia i integracje z dostawcami. Jedno źródło prawdy zamiast dziesięciu arkuszy.",
      bullets: [
        "Obieg i kontrola dokumentów z wersjonowaniem i akceptacjami",
        "Czas pracy i rozliczenia projektów w jednym widoku",
        "Sklep i katalog B2B z automatycznym importem od dostawców",
        "Integracje: BaseLinker, płatności, księgowość, magazyn",
      ],
      credit: "Realizacje: Sea Clouds DCS, Hydra Arms",
      caseHref: "#realizacje",
      caseLabel: "Zobacz case →",
    },
    sales: {
      tag: "Steady Sales",
      tagline: "System do sprzedaży",
      heading: "Zapytania, które same się kwalifikują, zanim do nich usiądziesz.",
      description:
        "Lejek od reklamy do płatności: landing, formularz, kwalifikacja zapytań z użyciem AI, oferta, płatność. Odpowiadasz tylko tym, którzy są gotowi kupić.",
      bullets: [
        "Landing i kampanie Google Ads pod jeden mierzalny cel",
        "Kwalifikacja zapytań i pierwsza odpowiedź generowane automatycznie",
        "Oferta, rezerwacja i płatność online bez ręcznego przepisywania",
        "Jeden panel: skąd przyszło zapytanie i na jakim jest etapie",
      ],
      credit: "Realizacja: Fjordanglers",
      caseHref: "#realizacje",
      caseLabel: "Zobacz case →",
    },
  },
  nav: {
    logoAriaLabel: "Steadystate — strona główna",
    navAriaLabel: "Główna",
    links: {
      uslugi: { href: "#uslugi", label: "Usługi" },
      realizacje: { href: "#realizacje", label: "Realizacje" },
      proces: { href: "#proces", label: "Proces" },
      studio: { href: "#studio", label: "Studio" },
    },
    cta: { href: "#kontakt", label: "Umów rozmowę" },
    menuOpenLabel: "Otwórz menu",
    menuCloseLabel: "Zamknij menu",
  },
  footer: {
    tagline: "Systems that settle.",
    links: {
      uslugi: { href: "#uslugi", label: "Usługi" },
      realizacje: { href: "#realizacje", label: "Realizacje" },
      proces: { href: "#proces", label: "Proces" },
      kontakt: { href: "#kontakt", label: "Kontakt" },
    },
    location: "GDAŃSK · STEADYSTATE.PL",
  },
};
