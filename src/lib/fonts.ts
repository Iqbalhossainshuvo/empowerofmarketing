import localFont from "next/font/local";

// Self-hosted fonts (files come from @fontsource npm packages). next/font preloads them and
// sizes the fallback font to match, so text paints immediately without layout shift.
export const sora = localFont({
  src: "../../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
});

export const interTight = localFont({
  src: "../../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
  display: "swap",
});

// Arabic fonts live in public/fonts/arabic (stable URLs) so Arabic pages can preload them;
// their @font-face rules are in globals.css with an Arabic-only unicode-range.
export const arabicPreloads = ["/fonts/arabic/alexandria.woff2", "/fonts/arabic/plex-400.woff2"];

export const fontVariables = [sora.variable, interTight.variable].join(" ");
