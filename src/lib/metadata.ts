import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

const ogLocale: Record<Locale, string> = { en: "en_US", ar: "ar_SA", ja: "ja_JP" };

/** URL of a page in a given language, e.g. url("ar", "pricing/") → https://…/ar/pricing/ */
export function pageUrl(locale: Locale, path: string): string {
  return `${site.url}/${locale}/${path}`;
}

/**
 * Metadata for one page: title, description, canonical, hreflang alternates and social cards.
 * `path` is relative to the language folder, with a trailing slash ("" for home).
 */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = pageUrl(l, path);
  languages["x-default"] = pageUrl("en", path);
  const image = { url: `${site.url}/og/${locale}.png`, width: 1200, height: 630, alt: site.name };
  return {
    // The layout's title template doesn't reach the home page (same segment), so home sets the full title.
    title: path === "" ? { absolute: `${title} · ${site.name}` } : title,
    description,
    alternates: { canonical: pageUrl(locale, path), languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      url: pageUrl(locale, path),
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description, images: [image.url] },
  };
}

type MetaKey = "home" | "services" | "solutions" | "pricing" | "about" | "book" | "founder" | "privacy" | "terms";

/** Metadata for pages whose copy lives under Meta.<key>. */
export async function metaFor(paramsPromise: Promise<{ locale: string }>, key: MetaKey, path: string): Promise<Metadata> {
  const { locale } = await paramsPromise;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata(locale as Locale, path, t(`${key}.title`), t(`${key}.description`));
}
