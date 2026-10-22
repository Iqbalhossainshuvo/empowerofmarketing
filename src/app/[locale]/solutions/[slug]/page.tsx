import { notFound } from "next/navigation";
import { solutions, type SolutionSlug } from "@/content/solutions";
import { SolutionPage } from "@/components/pages/SolutionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  if (!solutions.some((s) => s.slug === slug)) notFound();
  return <SolutionPage slug={slug as SolutionSlug} />;
}
