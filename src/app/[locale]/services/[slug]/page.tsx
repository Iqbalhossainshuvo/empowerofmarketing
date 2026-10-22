import { notFound } from "next/navigation";
import { services, type ServiceSlug } from "@/content/services";
import { ServicePage } from "@/components/pages/ServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  if (!services.some((s) => s.slug === slug)) notFound();
  return <ServicePage slug={slug as ServiceSlug} />;
}
