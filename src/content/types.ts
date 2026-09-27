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
};

export type Accent = "signal" | "amber";

// Illustration data for the expandable case panel (SS-1.17, prompt 25).
// Each case gets its own diagram; the numbers are the panel's mock data,
// not claims — the claims live in `description` and `steadyState`.
export type CaseVisual =
  | {
      kind: "import";
      schedule: string;
      sources: { name: string; count: string }[];
      target: { label: string; value: string; note: string };
    }
  | {
      kind: "register";
      columns: [string, string, string, string];
      rows: { id: string; rev: string; owner: string; status: string; done: boolean }[];
    }
  | {
      kind: "funnel";
      stages: { label: string; value: number }[];
      footnote: string;
    };

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
  // Technology line in mono under the description; optional until the
  // client supplies it (O-07, T4).
  stack?: string[];
  // Flow-diagram labels, in order (SS-1.16). Geometry lives in FlowDiagram.
  flow: string[];
  // Three short highlights shown when the panel is expanded (SS-1.17).
  features: string[];
  visual: CaseVisual;
  // Rendered only when it points at a real subpage (SS-1.10), not at an anchor.
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
    };
    // Decorative dashboard chrome around the chart (hero panel, SS-1.17).
    dashboard: {
      workspace: string;
      nav: string[];
      filters: string[];
      overview: string;
      activity: string;
    };
  };
  proofStrip: {
    ariaLabel: string;
    metrics: Metric[];
  };
  partners: {
    ariaLabel: string;
    // `logo`: path under /public (PNG/SVG on transparent); rendered as a
    // monochrome silhouette at `height` px. Without it the name renders as
    // a mono wordmark.
    items: { name: string; logo?: string; width?: number; height?: number }[];
  };
  services: {
    heading: string;
    lead: string;
    ops: ServiceCard;
    sales: ServiceCard;
  };
  cases: {
    heading: string;
    // Labels of the full case view opened from the panel (SS-1.17).
    dialogCloseLabel: string;
    detailsLabel: string;
    items: CaseCard[];
  };
  process: {
    heading: string;
    steps: ProcessStep[];
  };
  studio: {
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
