import type { SiteContent } from "../types";

export const site: SiteContent = {
  hero: {
    label: "Software studio, Gdansk",
    heading: "Systems that keep the business in flow.",
    lead: "We build systems for running the business and for selling: document flow, CRM, orders, inquiry funnels. Once they ship, they run on their own and you stop firefighting.",
    primaryCta: { label: "Book a call" },
    secondaryCta: { href: "#work", label: "See the work" },
    chart: {
      ariaLabel:
        "Chart: the number of urgent problems spikes, then drops and holds at a low, steady level",
      captionLeft: "Fires per week",
      captionRight: "before / after launch",
      badge: "STEADY STATE",
    },
    dashboard: {
      workspace: "Steady Ops",
      nav: ["Overview", "Orders", "Documents", "Inquiries", "Time", "Finance"],
      filters: ["Last 30 days", "Week"],
      overview: "Overview",
      activity: "Activity",
    },
  },
  proofStrip: {
    ariaLabel: "Numbers",
    metrics: [
      {
        value: "10/week",
        caption: "inquiries qualified automatically, no one on call",
      },
      {
        value: "2 days",
        caption: "from first message to a ready offer",
      },
      {
        value: "3",
        caption: "continents anglers book from",
      },
    ],
  },
  partners: {
    ariaLabel: "Clients",
    items: [
      { name: "Hydra Arms", logo: "/partners/hydra-arms.png", width: 2220, height: 825 },
      { name: "Sea Clouds DCS", logo: "/partners/sea-clouds.png", width: 270, height: 260 },
      { name: "Fjordanglers", logo: "/partners/fjordanglers.png", width: 1350, height: 264 },
    ],
  },
  services: {
    heading: "One system to run the business. One to sell.",
    lead: "You pay for a working system, not for hours. We write down what a finished system looks like before we start.",
    ops: {
      tag: "Steady Ops",
      tagline: "The system that runs the business",
      heading: "A company where nothing gets lost between email and Excel.",
      description:
        "Document flow, CRM, time tracking, finance, orders, and supplier integrations. One source of truth instead of ten spreadsheets.",
      bullets: [
        "Document control with versioning and sign-off",
        "Time tracking and project billing in one view",
        "B2B shop and catalog with automatic supplier imports",
        "Integrations: BaseLinker, payments, accounting, warehouse",
      ],
      credit: "Built for: Sea Clouds DCS, Hydra Arms",
    },
    sales: {
      tag: "Steady Sales",
      tagline: "The system that sells",
      heading: "Inquiries that qualify themselves before you ever see them.",
      description:
        "The funnel from ad to payment: landing page, form, AI-qualified inquiries, offer, payment. You only answer the ones ready to buy.",
      bullets: [
        "Landing page and Google Ads campaigns built around one measurable goal",
        "Inquiry qualification and first reply, generated automatically",
        "Offer, booking, and payment online, no manual re-typing",
        "One panel: where the inquiry came from and what stage it's at",
      ],
      credit: "Built for: Fjordanglers",
    },
  },
  cases: {
    heading: "Every project ends the same way: a writeup of what now runs on its own.",
    dialogCloseLabel: "Close",
    detailsLabel: "What works",
    items: [
      {
        accent: "signal",
        tag: "Steady Ops · Document control",
        name: "Sea Clouds DCS",
        sector: "Offshore engineering. Document control system.",
        description:
          "A Document Control System with time tracking: revisions, transmittals, sign-off, and project hours in one place instead of email and spreadsheets.",
        note: "Built in stages, each one with a clear finish line.",
        flow: ["revision", "transmittal", "sign-off", "hours logged"],
        features: [
          "Revisions with an owner and a status",
          "Transmittals and sign-off in one place",
          "Hours logged per project",
        ],
        steadyState: {
          label: "Steady state",
          text: "Every revision has an owner and a status. No one asks which version is current.",
        },
        caseHref: "#work",
        caseLabel: "See the case →",
      },
      {
        accent: "amber",
        tag: "Steady Sales · Inquiry funnel",
        name: "Fjordanglers",
        sector: "Guided fishing trips. Clients from across Europe.",
        description:
          "From ad to booking: landing page, campaigns, inquiry form, AI-qualified leads, and an automatic first reply. Offer and payment online.",
        note: "Our own product: we sell it to ourselves before we sell it to you.",
        flow: ["ad", "form", "qualification", "offer", "payment"],
        features: [
          "AI-qualified inquiries",
          "Automatic first reply within minutes",
          "Offer and payment online",
        ],
        steadyState: {
          label: "Steady state",
          text: "An inquiry gets a reply in minutes. A person steps in only once the client is ready to book.",
        },
        caseHref: "#work",
        caseLabel: "See the case →",
      },
      {
        accent: "signal",
        tag: "Steady Ops · B2B e-commerce",
        name: "Hydra Arms",
        sector: "Defense sector. Had no online shop before this.",
        description:
          "Website and B2B shop, built from zero. The catalog rebuilds every night from three suppliers' XML feeds: over 2,000 products, prices, and stock, no manual entry.",
        stack: ["Next.js", "Supabase", "BaseLinker"],
        flow: ["3 supplier feeds", "nightly import", "2,000+ catalog", "orders"],
        features: [
          "Nightly import from three suppliers' XML feeds",
          "2,000+ product catalog with prices and stock",
          "B2B orders with no manual entry",
        ],
        steadyState: {
          label: "Steady state",
          text: "The catalog updates itself every night. The team handles orders, not data.",
        },
        caseHref: "#work",
        caseLabel: "See the case →",
      },
    ],
  },
  process: {
    heading: "Short stages, each one with a clear finish line.",
    steps: [
      {
        number: "01",
        heading: "Process map",
        description:
          "A conversation and a walkthrough of how work looks today. You leave with a description of the end state and a quote.",
      },
      {
        number: "02",
        heading: "Working prototype",
        description:
          "A clickable system on real data, not a mockup. We adjust it live, before the rest gets built.",
      },
      {
        number: "03",
        heading: "Staged rollout",
        description:
          "Each stage is one closed piece of work with clear acceptance criteria. You see progress every week.",
      },
      {
        number: "04",
        heading: "Steady state",
        description:
          "The system runs without us. What stays is support: monitoring, small fixes, another stage when you need one.",
      },
    ],
  },
  studio: {
    heading: "No account manager between you and the person building it.",
    paragraphs: [
      "You talk directly to whoever is building your system, not to someone relaying your brief. Nothing gets lost in translation between what you meant and what gets shipped.",
      "We run this as a business too, so technical decisions get discussed in business terms: what it costs, what it fixes, what it's worth building next.",
    ],
    stack: ["Next.js", "Supabase", "BaseLinker", "Google Ads"],
  },
  cta: {
    heading: "Tell us what you're putting out by hand right now.",
    lead: "Two minutes, one form. Expect a reply by email, usually the next business day.",
    triggerLabel: "Book a call",
    fit: {
      label: "It's a good fit when",
      items: [
        "You have a process that works but runs on people and spreadsheets",
        "Inquiries come in faster than you can handle them well",
        "You want technical decisions explained in business terms, not jargon",
      ],
    },
    form: {
      closeLabel: "Close",
      progressLabel: "Step {step} of {total}",
      about: {
        heading: "Who are you?",
        nameLabel: "Name / company",
        companyLabel: "Company (optional)",
        emailLabel: "Email",
        nextLabel: "Next",
      },
      problem: {
        heading: "What are you putting out by hand?",
        problemTypeLabel: "Type of problem",
        problemOptions: [
          "Document flow",
          "CRM and sales",
          "Orders and B2B catalog",
          "Inquiry funnel",
          "Other",
        ],
        detailsLabel: "Short description",
        detailsPlaceholder: "What's held together by people and spreadsheets right now?",
        dateLabel: "Preferred time to talk (optional)",
        backLabel: "Back",
        submitLabel: "Send",
        submitPendingLabel: "Sending...",
      },
      successMessage: "Thanks, that came through. Expect a reply by email.",
      genericErrorMessage: "Couldn't send that. Try again, or reach out directly.",
    },
  },
  nav: {
    logoAriaLabel: "Steadystate, homepage",
    navAriaLabel: "Main",
    links: {
      uslugi: { href: "#services", label: "Services" },
      realizacje: { href: "#work", label: "Work" },
      proces: { href: "#process", label: "Process" },
      studio: { href: "#studio", label: "Studio" },
    },
    cta: { href: "#contact", label: "Book a call" },
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
  },
  footer: {
    tagline: "Systems that settle.",
    links: {
      uslugi: { href: "#services", label: "Services" },
      realizacje: { href: "#work", label: "Work" },
      proces: { href: "#process", label: "Process" },
      kontakt: { href: "#contact", label: "Contact" },
    },
    legalLinks: {
      privacy: { href: "/privacy", label: "Privacy" },
      terms: { href: "/terms", label: "Terms" },
    },
    location: "GDANSK · STEADYSTATE.PL",
  },
};
