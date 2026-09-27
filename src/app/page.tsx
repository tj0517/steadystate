import { Cases } from "@/components/Cases";
import { CurveEdge } from "@/components/CurveEdge";
import { LightScope } from "@/components/LightScope";
import { ContactCta } from "@/components/ContactCta";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { RevealObserver } from "@/components/RevealObserver";
import { Studio } from "@/components/Studio";
import { site } from "@/content/pl/site";

export default function Home() {
  return (
    <>
      <Hero content={site.hero} partners={site.partners} metrics={site.proofStrip.metrics} />
      <Services content={site.services} />
      <Cases content={site.cases} />
      <div className="mt-space-16">
        <CurveEdge />
      </div>
      <LightScope>
        <Process content={site.process} />
        <Studio content={site.studio} />
      </LightScope>
      <CurveEdge direction="out" />
      <ContactCta content={site.cta} />
      <RevealObserver />
    </>
  );
}
