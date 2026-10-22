import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import { solutions, type SolutionSlug } from "@/content/solutions";
import { SolutionPage } from "@/components/pages/SolutionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Solution" });
  return pageMetadata(locale as Locale, `solutions/${slug}/`, t(`${slug}.title`), t(`${slug}.short`));
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  if (!solutions.some((s) => s.slug === slug)) notFound();
  return <SolutionPage slug={slug as SolutionSlug} />;
}
