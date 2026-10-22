import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PricingTable } from "@/components/pages/PricingTable";
import { Faq } from "@/components/home/sections";
import { CtaBand } from "@/components/layout/CtaBand";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const notes = t.raw("notes") as string[];
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section aria-label={t("eyebrow")} className="pb-16">
        <div className="container-x">
          <PricingTable />
          <ul className="mt-14 grid gap-3 md:grid-cols-3">
            {notes.map((n, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-sky" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Faq />
      <CtaBand />
    </>
  );
}
