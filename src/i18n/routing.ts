import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar", "ja"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ja: "日本語",
};
