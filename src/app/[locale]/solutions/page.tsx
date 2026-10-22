import { metaFor } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import { solutions } from "@/content/solutions";
import { PageHero } from "@/components/pages/PageHero";
import { IndexGrid } from "@/components/pages/IndexGrid";
import { SolutionSteps } from "@/components/pages/SolutionSteps";
import { CtaBand } from "@/components/layout/CtaBand";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "solutions", "solutions/");
}

export default function SolutionsIndexPage() {
  const t = useTranslations("SolutionsIndex");
  const tSo = useTranslations("Solution");
  return (
    <>
      <PageHero tone="violet" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section aria-label={t("eyebrow")} className="pb-24">
        <div className="container-x">
          <IndexGrid
            items={solutions.map(({ slug, icon }) => ({ href: `/solutions/${slug}`, title: tSo(`${slug}.title`), short: tSo(`${slug}.short`), icon }))}
          />
        </div>
      </section>
      <SolutionSteps />
      <CtaBand />
    </>
  );
}
