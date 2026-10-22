import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import { services, type ServiceSlug } from "@/content/services";
import { ServicePage } from "@/components/pages/ServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Service" });
  return pageMetadata(locale as Locale, `services/${slug}/`, t(`${slug}.title`), t(`${slug}.short`));
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  if (!services.some((s) => s.slug === slug)) notFound();
  return <ServicePage slug={slug as ServiceSlug} />;
}
