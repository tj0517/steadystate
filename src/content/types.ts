export type NavItem = {
  href: string;
  label: string;
};

export type Metric = {
  value: string;
  caption: string;
};

export type ServiceCard = {
  tag: string;
  tagline: string;
  heading: string;
  description: string;
  bullets: string[];
  credit: string;
  caseHref: string;
  caseLabel: string;
};

export type SiteContent = {
  hero: {
    label: string;
    heading: string;
    lead: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
    chart: {
      ariaLabel: string;
      captionLeft: string;
      captionRight: string;
      badge: string;
      startLabel: string;
      endLabel: string;
      note: string;
    };
  };
  proofStrip: {
    ariaLabel: string;
    metrics: Metric[];
  };
  services: {
    label: string;
    heading: string;
    lead: string;
    ops: ServiceCard;
    sales: ServiceCard;
  };
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
