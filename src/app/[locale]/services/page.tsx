import { useTranslations } from "next-intl";
import { services } from "@/content/services";
import { PageHero } from "@/components/pages/PageHero";
import { IndexGrid } from "@/components/pages/IndexGrid";
import { ProcessSteps } from "@/components/home/sections";
import { CtaBand } from "@/components/layout/CtaBand";

export default function ServicesIndexPage() {
  const t = useTranslations("ServicesIndex");
  const tS = useTranslations("Service");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section aria-label={t("eyebrow")} className="pb-8">
        <div className="container-x">
          <IndexGrid
            items={services.map(({ slug, icon }) => ({ href: `/services/${slug}`, title: tS(`${slug}.title`), short: tS(`${slug}.short`), icon }))}
          />
        </div>
      </section>
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
