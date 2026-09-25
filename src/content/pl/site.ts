import type { SiteContent } from "../types";

export const site: SiteContent = {
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
