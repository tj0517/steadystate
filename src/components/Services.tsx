import type { SiteContent } from "@/content/types";
import { Container } from "./Container";
import { ServiceColumn } from "./ServiceColumn";

type ServicesProps = {
  content: SiteContent["services"];
};

// Two open columns split by a hairline (SS-1.17, tj 2026-09-27, after the
// Tailark reference) instead of two boxed cards. Each visual is two
// notification banners: the pain (mail) and the system's notice. The
// banner texts are mock data — copy for tj to accept.
const NOTICES = {
  ops: {
    before: { app: "Mail", title: "RE: RE: RE: wersja_final_v3.xlsx", body: "Która wersja jest aktualna? W załączniku moja…", time: "wczoraj" },
    after: { app: "Steady Ops", title: "P-104 · Rev C zatwierdzona", body: "Transmittal T-31 wysłany do klienta.", time: "11:45" },
  },
  sales: {
    before: { app: "Mail", title: "Zapytanie o wyprawę — 3 osoby, czerwiec", body: "Bez odpowiedzi od 2 dni.", time: "pon." },
    after: { app: "Steady Sales", title: "Odpowiedź wysłana · oferta 4 800 €", body: "Zapytanie zakwalifikowane, link do płatności w drodze.", time: "12:05" },
  },
} as const;

export function Services({ content }: ServicesProps) {
  return (
    <section id="uslugi" className="py-space-16">
      <Container className="flex flex-col gap-space-8">
        <div data-reveal className="flex max-w-[720px] flex-col gap-space-4">
          <h2 className="text-h1 text-ink">{content.heading}</h2>
          <p className="text-lead text-ink-muted">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-space-16 lg:grid-cols-2 lg:gap-0">
          <div data-reveal className="lg:pr-space-16">
            <ServiceColumn content={content.ops} accent="signal" before={NOTICES.ops.before} after={NOTICES.ops.after} />
          </div>
          <div data-reveal className="border-t border-line pt-space-16 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-space-16">
            <ServiceColumn content={content.sales} accent="amber" before={NOTICES.sales.before} after={NOTICES.sales.after} />
          </div>
        </div>
      </Container>
    </section>
  );
}
