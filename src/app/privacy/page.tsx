import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy — Steadystate",
};

export default function PrivacyPage() {
  return (
    <Container className="flex flex-col gap-space-8 py-space-16">
      <div className="flex flex-col gap-space-4">
        <h1 className="text-h1 text-ink">Privacy Policy</h1>
        <p className="text-small text-ink-muted">Last updated: September 28, 2026</p>
      </div>

      <div className="flex max-w-[720px] flex-col gap-space-8 text-body text-ink-muted">
        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">1. Who we are</h2>
          <p>The data controller for steadystate.pl is:</p>
          <p>
            Tymon Jezionek, operating as a sole proprietorship (jednoosobowa dzialalnosc
            gospodarcza)
            <br />
            NIP: 5833564870
            <br />
            Otwarta 38b/11, 80-169 Gdansk, Poland
            <br />
            Email: contact@steadystate.pl
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">2. What data we collect</h2>
          <p>
            When you use the contact form on this site, we collect: your name, company
            (optional), email address, the type of problem you select, your message, and a
            preferred date to talk (optional). We do not use cookies, analytics, or any
            tracking technology on this site.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">3. Why we collect it and on what legal basis</h2>
          <p>
            We use this data solely to respond to your inquiry and, if you choose to proceed,
            to discuss and prepare a potential engagement. The legal basis is Article 6(1)(b)
            GDPR (steps taken at your request prior to entering into a contract) and, where
            that does not apply, Article 6(1)(f) GDPR (our legitimate interest in responding
            to business inquiries).
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">4. Who we share it with</h2>
          <p>
            Your message is delivered by email via Resend (email delivery) and this site is
            hosted on Vercel (hosting infrastructure). Both are processors acting on our
            instructions; neither uses your data for their own purposes. Both are US-based
            companies, so your data may be transferred outside the EEA; such transfers rely on
            appropriate safeguards (e.g. the EU Standard Contractual Clauses).
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">5. How long we keep it</h2>
          <p>
            We keep inquiry data for as long as needed to handle your request and, if we start
            working together, for the duration of that relationship plus applicable
            legal/accounting retention periods. If nothing comes of it, we delete it within 12
            months.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">6. Your rights</h2>
          <p>
            You have the right to access, correct, delete, or restrict the use of your data,
            to object to processing, and to data portability. You can withdraw consent at any
            time where processing is based on consent. To exercise any of these, email
            contact@steadystate.pl. You also have the right to lodge a complaint with the
            Polish data protection authority (Urzad Ochrony Danych Osobowych, uodo.gov.pl).
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">7. Is providing your data required</h2>
          <p>
            Providing your name and email is required for us to reply to you. Everything else
            on the form is optional.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">8. Automated decisions</h2>
          <p>We don&apos;t use automated decision-making or profiling.</p>
        </section>
      </div>
    </Container>
  );
}
