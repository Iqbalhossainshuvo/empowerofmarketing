import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { pageUrl } from "@/lib/metadata";

export const dynamic = "force-static";

const paths = [
  "",
  "services/",
  ...services.map((s) => `services/${s.slug}/`),
  "solutions/",
  ...solutions.map((s) => `solutions/${s.slug}/`),
  "pricing/",
  "about/",
  "book/",
  "profile/",
  "privacy/",
  "terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, path)])),
      },
    })),
  );
}
