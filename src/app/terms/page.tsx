import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Use — Steadystate",
};

export default function TermsPage() {
  return (
    <Container className="flex flex-col gap-space-8 py-space-16">
      <div className="flex flex-col gap-space-4">
        <h1 className="text-h1 text-ink">Terms of Use</h1>
        <p className="text-small text-ink-muted">Last updated: September 28, 2026</p>
      </div>

      <div className="flex max-w-[720px] flex-col gap-space-8 text-body text-ink-muted">
        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">1. About this site</h2>
          <p>
            steadystate.pl is operated by Tymon Jezionek, sole proprietorship, NIP 5833564870,
            Otwarta 38b/11, 80-169 Gdansk, Poland. Contact: contact@steadystate.pl
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">2. Purpose of this site</h2>
          <p>
            This site is informational. It describes services and past work; nothing on it
            constitutes a binding offer. A working relationship only begins once both parties
            agree on scope and price in writing.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">3. Case studies</h2>
          <p>
            Case studies describe real projects for real clients, shown with their agreement.
            Numbers and timelines reflect that specific project and are not a guarantee of
            results for any other engagement.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">4. Intellectual property</h2>
          <p>
            The site&apos;s design, text, and code are owned by Tymon Jezionek unless otherwise
            noted, and may not be copied or reused without permission. Client logos are used
            with permission and remain the property of their respective owners.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">5. No warranty</h2>
          <p>
            This site is provided as is. We make reasonable efforts to keep it accurate and
            available but do not guarantee uninterrupted access or that all content is
            error-free.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">6. Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for indirect or consequential
            damages arising from your use of this site. This does not limit liability that
            cannot legally be excluded.
          </p>
        </section>

        <section className="flex flex-col gap-space-2">
          <h2 className="text-h3 text-ink">7. Governing law</h2>
          <p>
            These terms are governed by Polish law. Disputes fall under the jurisdiction of
            the courts competent for Gdansk, unless mandatory consumer-protection rules say
            otherwise.
          </p>
        </section>
      </div>
    </Container>
  );
}
