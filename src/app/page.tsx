import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Services } from "@/components/Services";
import { site } from "@/content/pl/site";

export default function Home() {
  return (
    <>
      <Hero content={site.hero} />
      <ProofStrip content={site.proofStrip} />
      <Services content={site.services} />
    </>
  );
}
