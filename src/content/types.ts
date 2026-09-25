export type NavItem = {
  href: string;
  label: string;
};

export type SiteContent = {
  nav: {
    logoAriaLabel: string;
    navAriaLabel: string;
    links: {
      uslugi: NavItem;
      realizacje: NavItem;
      proces: NavItem;
      studio: NavItem;
    };
    cta: NavItem;
    menuOpenLabel: string;
    menuCloseLabel: string;
  };
  footer: {
    tagline: string;
    links: {
      uslugi: NavItem;
      realizacje: NavItem;
      proces: NavItem;
      kontakt: NavItem;
    };
    location: string;
  };
};
