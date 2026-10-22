import { metaFor } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { BookTeaser, Faq, ProcessSteps, ServicesGrid, WhichSection, WhyUs } from "@/components/home/sections";
import { CtaBand } from "@/components/layout/CtaBand";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "home", "");
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <WhichSection />
      <ServicesGrid />
      <ProcessSteps />
      <WhyUs />
      <BookTeaser />
      <Faq />
      <CtaBand />
    </>
  );
}
