import { metaFor } from "@/lib/metadata";
import { LegalArticle } from "@/components/pages/LegalArticle";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "terms", "terms/");
}

export default function TermsPage() {
  return <LegalArticle namespace="Terms" />;
}
