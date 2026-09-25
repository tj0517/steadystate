import type { SiteContent } from "../types";

export const site: SiteContent = {
  hero: {
    label: "Studio software · Gdańsk",
    heading: "Systemy, po których firma wchodzi w stan ustalony.",
    lead: "Budujemy systemy do pracy i do sprzedaży: obieg dokumentów, CRM, zamówienia, lejek zapytań. Po wdrożeniu kręcą się same, a Ty przestajesz gasić pożary.",
    primaryCta: { href: "#kontakt", label: "Umów 30‑minutową rozmowę" },
    secondaryCta: { href: "#realizacje", label: "Zobacz realizacje" },
    chart: {
      ariaLabel:
        "Wykres: liczba nagłych problemów spada po skoku i ustala się na niskim, stałym poziomie",
      captionLeft: "Pożary w firmie / tydzień",
      captionRight: "przed → po wdrożeniu",
      badge: "STAN USTALONY",
      startLabel: "START",
      endLabel: "TYDZIEŃ 8",
      note: "Stan ustalony to moment, w którym układ przestaje oscylować. Tak projektujemy systemy: raz wdrożone, działają bez nadzoru.",
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
        caption: "dostawców spiętych w jeden katalog, bez ręcznej pracy",
      },
      {
        value: "5",
        caption: "systemów w portfolio: od dokumentacji offshore po sprzedaż wypraw",
      },
    ],
  },
  services: {
    label: "Dwie linie usług",
    heading: "Jeden system do pracy. Jeden do sprzedaży.",
    lead: "Nie sprzedajemy godzin programisty. Sprzedajemy działający system z jasno opisanym stanem końcowym.",
    ops: {
      tag: "Steady Ops",
      tagline: "System do pracy",
      heading: "Firma, w której nic nie ginie między mailem a Excelem.",
      description:
        "Obieg dokumentów, CRM, rejestracja czasu, finanse, zamówienia i integracje z dostawcami. Jedno źródło prawdy zamiast dziesięciu arkuszy.",
      bullets: [
        "Obieg i kontrola dokumentów z wersjonowaniem i akceptacjami",
        "Czas pracy i rozliczenia projektów w jednym widoku",
        "Sklep i katalog B2B z automatycznym importem od dostawców",
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
        "Lejek od reklamy do płatności: landing, formularz, kwalifikacja zapytań z użyciem AI, oferta, płatność. Odpowiadasz tylko tym, którzy są gotowi kupić.",
      bullets: [
        "Landing i kampanie Google Ads pod jeden mierzalny cel",
        "Kwalifikacja zapytań i pierwsza odpowiedź generowane automatycznie",
        "Oferta, rezerwacja i płatność online bez ręcznego przepisywania",
        "Jeden panel: skąd przyszło zapytanie i na jakim jest etapie",
      ],
      credit: "Realizacja: Fjordanglers",
      caseHref: "#realizacje",
      caseLabel: "Zobacz case →",
    },
  },
  cases: {
    label: "Realizacje",
    heading: "Każdy projekt kończy się tym samym: opisem, co teraz działa samo.",
    items: [
      {
        accent: "signal",
        tag: "Steady Ops · B2B e‑commerce",
        name: "Hydra Arms",
        sector: "Sektor obronny. Wcześniej bez sklepu internetowego.",
        description:
          "Strona i sklep od zera: Next.js, Supabase, BaseLinker. Katalog składany codziennie z plików XML trzech dostawców, ponad 2 000 produktów, bez ręcznego przepisywania cen i stanów.",
        note: "Start produkcyjny po dwóch tygodniach od pierwszej rozmowy.",
        steadyState: {
          label: "Stan ustalony",
          text: "Katalog aktualizuje się sam każdej nocy. Zespół obsługuje zamówienia, nie dane.",
        },
        caseHref: "#realizacje",
        caseLabel: "Zobacz case →",
      },
      {
        accent: "signal",
        tag: "Steady Ops · Dokumentacja",
        name: "Sea Clouds DCS",
        sector: "Inżynieria offshore. System kontroli dokumentów.",
        description:
          "Document Control System z rejestracją czasu pracy: rewizje, transmittale, akceptacje i rozliczenie godzin na projekt w jednym miejscu zamiast w mailach i arkuszach.",
        note: "Budowany etapami, każdy etap z kryteriami „gotowe, gdy”.",
        steadyState: {
          label: "Stan ustalony",
          text: "Każda rewizja ma właściciela i status. Nikt nie pyta, która wersja jest aktualna.",
        },
        caseHref: "#realizacje",
        caseLabel: "Zobacz case →",
      },
      {
        accent: "amber",
        tag: "Steady Sales · Lejek zapytań",
        name: "Fjordanglers",
        sector: "Wyprawy wędkarskie z przewodnikiem. Klienci z całej Europy.",
        description:
          "Od reklamy do rezerwacji: landing, kampanie, formularz zapytania, kwalifikacja z użyciem AI i automatyczna pierwsza odpowiedź. Oferta i płatność online.",
        note: "Nasz własny produkt: testujemy na sobie to, co sprzedajemy.",
        steadyState: {
          label: "Stan ustalony",
          text: "Zapytanie dostaje odpowiedź w minuty, a człowiek wchodzi dopiero przy gotowym kliencie.",
        },
        caseHref: "#realizacje",
        caseLabel: "Zobacz case →",
      },
    ],
  },
  process: {
    label: "Proces",
    heading: "Krótkie etapy, każdy z jasnym „gotowe, gdy”.",
    steps: [
      {
        number: "01",
        heading: "Mapa procesu",
        description:
          "Rozmowa i przegląd tego, jak praca wygląda dziś. Wychodzisz z opisem stanu końcowego i wyceną.",
      },
      {
        number: "02",
        heading: "Działający prototyp",
        description:
          "Klikalny system na prawdziwych danych, nie makieta. Poprawiamy na żywo, zanim powstanie reszta.",
      },
      {
        number: "03",
        heading: "Wdrożenie etapami",
        description:
          "Każdy etap to jeden domknięty kawałek pracy z kryteriami odbioru. Widzisz postęp co tydzień.",
      },
      {
        number: "04",
        heading: "Stan ustalony",
        description:
          "System działa bez nas. Zostaje opieka: monitoring, drobne zmiany, kolejny etap, gdy będzie potrzebny.",
      },
    ],
  },
  studio: {
    label: "Studio",
    heading:
      "Małe studio. Jedna osoba odpowiedzialna od pierwszej rozmowy do produkcji.",
    paragraphs: [
      "Pracujemy z architekturą i procesem zbudowanymi wokół agentów AI. Dzięki temu dostarczamy w tygodniach to, co zwykle zajmuje kwartały, i prowadzimy kilka projektów naraz bez rozmywania odpowiedzialności.",
      "Nie ma account managera między Tobą a osobą, która pisze kod. Każda decyzja techniczna jest tłumaczona na to, co zmienia w Twojej firmie.",
    ],
    stack: ["Next.js", "Supabase", "BaseLinker", "Google Ads"],
  },
  cta: {
    heading: "Opowiedz, co dziś gasisz ręcznie.",
    lead: "30 minut rozmowy. Wychodzisz z opinią, czy to jest problem na system, i z szacunkiem, ile zajmie doprowadzenie go do stanu ustalonego.",
    // href docelowy (kalendarz / mailto) uzupełnia SS-1.07 — na razie kotwica sekcji.
    button: { href: "#kontakt", label: "Umów rozmowę" },
    fit: {
      label: "Dobrze pasujemy, gdy",
      items: [
        "Masz proces, który działa, ale trzyma się na ludziach i arkuszach",
        "Zapytań przychodzi więcej, niż jesteś w stanie dobrze obsłużyć",
        "Chcesz jednej osoby, która rozumie i biznes, i kod",
      ],
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
