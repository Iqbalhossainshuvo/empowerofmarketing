/**
 * Portfolio work samples (from Iqbal's PORTFOLIO.pdf).
 * Titles/descriptions are translated in messages/*.json under Profile.portfolio.cases.<slug> / .proofs.<slug>.
 * Images live in /public/images/portfolio/<image>.webp.
 */

export const caseStudies = [
  {
    slug: "tekla",
    image: "case-tekla-digital-marketing-strategy",
    w: 961,
    h: 537,
    href: "https://drive.google.com/file/d/1dkgNeHy3kp9FNH3UOmyPLl6I-RiG19Jw/view?usp=sharing",
  },
  {
    slug: "budget",
    image: "case-digital-marketing-budget-plan",
    w: 711,
    h: 513,
    href: "https://docs.google.com/spreadsheets/d/14n8oFq6QHTepCZIdJP4PEaQ6tqtG7n9R/edit?usp=sharing",
  },
  {
    slug: "seoAudit",
    image: "case-seo-technical-audit",
    w: 711,
    h: 508,
    href: "https://docs.google.com/spreadsheets/d/1bkNVS_jKqT4qVlVNKiKNjHiyCnN08bZ-/edit?usp=sharing",
  },
  {
    slug: "henrys",
    image: "case-henrys-content-marketing-plan",
    w: 774,
    h: 415,
    href: "https://drive.google.com/file/d/16Kh5QramJGBvxDBDkg6U7MY9xAnMNNBR/view?usp=sharing",
  },
  {
    slug: "britishCouncil",
    image: "case-british-council-ielts-audit-plan",
    w: 947,
    h: 535,
    // TODO(iqbal): PDF linked this card to the SEO audit sheet — replace with the real British Council deck link.
    href: "https://docs.google.com/spreadsheets/d/1bkNVS_jKqT4qVlVNKiKNjHiyCnN08bZ-/edit?usp=sharing",
  },
  {
    slug: "homeward",
    image: "case-homeward-agencies-audit-plan",
    w: 711,
    h: 587,
    // TODO(iqbal): PDF linked this card to the Henry's plan — replace with the real Homeward deck link.
    href: "https://drive.google.com/file/d/16Kh5QramJGBvxDBDkg6U7MY9xAnMNNBR/view?usp=sharing",
  },
] as const;

export const platformProofs = [
  { slug: "ga4", image: "proof-google-analytics-4", w: 782, h: 550 },
  { slug: "googleAds", image: "proof-google-ads", w: 782, h: 550 },
  { slug: "merchant", image: "proof-google-merchant-center", w: 782, h: 550 },
  { slug: "searchConsole", image: "proof-google-search-console", w: 783, h: 551 },
  { slug: "pixel", image: "proof-facebook-pixel-capi", w: 711, h: 545 },
  { slug: "gtm", image: "proof-google-tag-manager", w: 783, h: 551 },
  { slug: "maps", image: "proof-google-business-profile", w: 782, h: 550 },
  { slug: "email", image: "proof-email-marketing", w: 650, h: 231 },
  { slug: "facebookAds", image: "proof-facebook-ads", w: 784, h: 551 },
  { slug: "shopify", image: "proof-shopify-ga4", w: 783, h: 551 },
] as const;

export const portfolioImage = (name: string) => `/images/portfolio/${name}.webp`;
