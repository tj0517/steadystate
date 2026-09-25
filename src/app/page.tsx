import { Cases } from "@/components/Cases";
import { ContactCta } from "@/components/ContactCta";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { Services } from "@/components/Services";
import { Studio } from "@/components/Studio";
import { site } from "@/content/pl/site";

export default function Home() {
  return (
    <>
      <Hero content={site.hero} />
      <ProofStrip content={site.proofStrip} />
      <Services content={site.services} />
      <Cases content={site.cases} />
      <Process content={site.process} />
      <Studio content={site.studio} />
      <ContactCta content={site.cta} />
    </>
  );
}
