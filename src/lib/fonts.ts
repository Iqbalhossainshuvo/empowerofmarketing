import type { Locale } from "@/i18n/routing";

// Latin and Arabic fonts are imported globally in globals.css (small, and the browser
// only downloads a face when a glyph in its unicode-range is rendered). Japanese is
// loaded with a <link> on /ja/ pages only — see scripts/copy-fonts.mjs.
export function fontStylesheetFor(locale: Locale): string | null {
  return locale === "ja" ? "/fonts/noto-sans-jp/index.css" : null;
}
