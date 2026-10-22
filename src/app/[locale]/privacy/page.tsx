import { metaFor } from "@/lib/metadata";
import { LegalArticle } from "@/components/pages/LegalArticle";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "privacy", "privacy/");
}

export default function PrivacyPage() {
  return <LegalArticle namespace="Privacy" />;
}
