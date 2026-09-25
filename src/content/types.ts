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

export type Accent = "signal" | "amber";

export type CaseCard = {
  accent: Accent;
  tag: string;
  name: string;
  sector: string;
  description: string;
  note: string;
  steadyState: {
    label: string;
    text: string;
  };
  caseHref: string;
  caseLabel: string;
};

export type ProcessStep = {
  number: string;
  heading: string;
  description: string;
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
  cases: {
    label: string;
    heading: string;
    items: CaseCard[];
  };
  process: {
    label: string;
    heading: string;
    steps: ProcessStep[];
  };
  studio: {
    label: string;
    heading: string;
    paragraphs: string[];
    stack: string[];
  };
  cta: {
    heading: string;
    lead: string;
    button: NavItem;
    fit: {
      label: string;
      items: string[];
    };
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
