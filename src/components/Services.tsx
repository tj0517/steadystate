import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { ServiceColumn } from "./ServiceColumn";

type ServicesProps = {
  content: SiteContent["services"];
};

// Two open columns split by a hairline (SS-1.17, tj 2026-09-27, after the
// Tailark reference) instead of two boxed cards. Each visual is two
// notification banners for Ops (pain: mail; solution: the system's notice)
// and an iMessage-style exchange for Sales (pain: the enquiry; solution:
// the automatic reply with offer and payment link). Texts are mock data —
// copy for tj to accept.
const NOTICES = {
  ops: {
    before: { app: "Mail", title: "RE: RE: RE: final_version_v3.xlsx", body: "Which version is current? Mine's attached...", time: "yesterday" },
    after: { app: "Steady Ops", title: "P-104 · Rev C approved", body: "Transmittal T-31 sent to client.", time: "11:45" },
  },
  sales: {
    chat: {
      incoming: "Hi, 3 people, June 12 to 15, boat fishing. Any dates open?",
      incomingTime: "Mon, 12:04",
      outgoing: "Yes, the boat and guide are free. Offer 4,800 EUR, a deposit holds the date:",
      link: "Pay deposit · 1,200 EUR",
      sentNote: "Sent automatically · 12:05",
    },
  },
} as const;

export function Services({ content }: ServicesProps) {
  return (
    <section id="services" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
          <p className="text-lead text-ink-muted">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-space-16 lg:grid-cols-2 lg:gap-0">
          <div data-reveal className="lg:pr-space-16">
            <ServiceColumn content={content.ops} line="ops" accent="signal" tilt="left" before={NOTICES.ops.before} after={NOTICES.ops.after} />
          </div>
          <div data-reveal className="border-t border-line pt-space-16 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-space-16">
            <ServiceColumn content={content.sales} line="sales" accent="amber" tilt="right" chat={NOTICES.sales.chat} />
          </div>
        </div>
      </Container>
    </section>
  );
}
