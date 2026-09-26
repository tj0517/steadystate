import { Cases } from "@/components/Cases";
import { ContactCta } from "@/components/ContactCta";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { Services } from "@/components/Services";
import { RevealObserver } from "@/components/RevealObserver";
import { Studio } from "@/components/Studio";
import { site } from "@/content/pl/site";

export default function Home() {
  return (
    <>
      <Hero content={site.hero} />
      <ProofStrip content={site.proofStrip} />
      <Services content={site.services} marker={{ index: "01", label: site.nav.links.uslugi.label }} />
      <Cases content={site.cases} marker={{ index: "02", label: site.nav.links.realizacje.label }} />
      <Process content={site.process} marker={{ index: "03", label: site.nav.links.proces.label }} />
      <Studio content={site.studio} marker={{ index: "04", label: site.nav.links.studio.label }} />
      <ContactCta content={site.cta} marker={{ index: "05", label: site.footer.links.kontakt.label }} />
      <RevealObserver />
    </>
  );
}
