# Research: Next.js multilingual marketing site (EMPOWER OF MARKETING)

Date: 2026-10-22. Scope: Next.js App Router + Vercel Hobby, no DB, no payments, locales en/ar/ja/fr/de/es (+ maybe bn).
Sources: official docs only. Where an official page could not be fetched it is flagged **UNVERIFIED**.

---

## TL;DR decisions

| Topic | Decision |
|---|---|
| Framework | `next@16.4.2` (latest stable, published 2026-10-15), React 19.x, Node >= 20.9 |
| i18n | `next-intl@4.14.9`, `app/[locale]/...`, `localePrefix: 'always'`, `src/proxy.ts` (not `middleware.ts`) |
| Static rendering | `generateStaticParams` over `routing.locales` + locale read via `next/root-params` (16.3+) — `setRequestLocale` now optional/legacy |
| RTL | `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>` + CSS logical properties everywhere |
| SEO | `metadataBase` in root layout, per-page `alternates.canonical` + `alternates.languages` (incl. `x-default`), `app/sitemap.ts` with `alternates.languages`, file-based `opengraph-image` |
| Fonts | `next/font/google`, CSS variables, script-specific font loaded only where needed; `preload: false` for Japanese |
| Booking | Calendly popup via `Calendly.initPopupWidget({ url, prefill, utm })`, script loaded with `next/script` `lazyOnload` in a Client Component |
| WhatsApp | `https://wa.me/<digits>?text=<urlencoded>` |
| Animation | `motion@14.6.0`, `import { motion } from "motion/react"`, `<MotionConfig reducedMotion="user">` |
| Hosting | **Vercel Hobby is non-commercial only. This is a commercial site → needs Pro (or another host).** See section 7. |

---

## 1. Next.js version and App Router i18n

### Versions (npm registry, checked 2026-10-22)
- `next` latest = **16.4.2** (2026-10-15); canary 16.5.0-canary.x. `engines.node >= 20.9.0`. Source: https://registry.npmjs.org/next
- `next-intl` latest = **4.14.9** (2026-10-02), peer `next ^12 … ^16`. Source: https://registry.npmjs.org/next-intl
- `react` latest = 19.3.1. Source: https://registry.npmjs.org/react

### Next.js 16 breaking changes that matter here
Source: https://nextjs.org/docs/app/guides/upgrading/version-16
- **`middleware` renamed to `proxy`**: file `proxy.ts`, export `proxy` (named) — `middleware` filename/export deprecated. **`proxy` runs on the `nodejs` runtime only; edge is not supported** in `proxy`.
- Async request APIs only: `params` must be awaited in layouts/pages/`opengraph-image`/`sitemap` (`id` in `sitemap` is now a Promise).
- Turbopack is default for `next dev` and `next build`; a custom `webpack` config makes `next build` fail unless `--webpack`.
- `next lint` removed (use ESLint CLI; flat config default). `next build` no longer lints.
- `next/image`: `images.qualities` default now `[75]`; `minimumCacheTTL` default 4h; `images.domains` deprecated → `remotePatterns`.
- Next no longer overrides `scroll-behavior: smooth` on navigation; add `data-scroll-behavior="smooth"` on `<html>` to restore the old override.
- Minimums: Node 20.9, TypeScript 5.1, browsers Chrome/Edge/Firefox 111+, Safari 16.4+.

### Official Next.js pattern (no library)
Source: https://nextjs.org/docs/app/guides/internationalization (lastUpdated 2026-06-10)
- Nest everything under `app/[lang]/`, root layout can live at `app/[lang]/layout.tsx`.
- Locale detection/redirect in `proxy.js` (uses `@formatjs/intl-localematcher` + `negotiator`).
- `next/root-params`: `import { lang } from 'next/root-params'` lets any Server Component/server util read the root param without prop drilling. Not available in Client Components, Server Actions or Route Handlers.
- `generateStaticParams` in the root layout for static locales.
- Docs list `next-intl` first among recommended libraries (also next-international, next-i18n-router, paraglide-next, lingui, etc.). Next.js itself does not "endorse" one.

### Decision: next-intl 4.x
Sources: https://next-intl.dev/docs/routing/setup , https://next-intl.dev/docs/getting-started/app-router , https://next-intl.dev/docs/routing/configuration

Install: `npm install next-intl`. Plugin in `next.config.ts`:
```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```
Files:
```
messages/{en,ar,ja,fr,de,es}.json
src/i18n/routing.ts      defineRouting({ locales, defaultLocale })
src/i18n/navigation.ts   createNavigation(routing) -> Link, redirect, usePathname, useRouter, getPathname
src/i18n/request.ts      getRequestConfig (+ next/root-params)
src/proxy.ts             createMiddleware(routing)   // was middleware.ts before Next 16
src/app/[locale]/layout.tsx
```
`src/i18n/routing.ts`
```ts
import {defineRouting} from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['en', 'ar', 'ja', 'fr', 'de', 'es'],
  defaultLocale: 'en'
});
```
`src/proxy.ts`
```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
export default createMiddleware(routing);
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```
`src/i18n/request.ts` (current docs, uses root params)
```ts
import * as rootParams from 'next/root-params';
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) locale = paramValue;
    else notFound();
  }
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});
```
Layout essentials: `const {locale} = await params; if (!hasLocale(routing.locales, locale)) notFound();` wrap children in `<NextIntlClientProvider>`; `export function generateStaticParams() { return routing.locales.map((locale) => ({locale})); }`.

**`setRequestLocale`**: still supported, but the docs now call it legacy and recommend `next/root-params`; the next-intl blog (2026-08-04) says it can be removed for static rendering on Next 16.3+, while `generateStaticParams` is still required. `next/root-params` is on by default from 16.3; earlier versions need `experimental.rootParams`. Sources: https://next-intl.dev/docs/routing/setup , https://next-intl.dev/blog/nextjs-root-params
- Caveat: root params don't work in Route Handlers/Server Actions → pass `locale` explicitly there.

Usage: `useTranslations('Home')` (sync components) / `await getTranslations('Home')` (async, from `next-intl/server`).

### Routing config choices (https://next-intl.dev/docs/routing/configuration)
- `localePrefix`: `'always'` (default, `/en/about`), `'as-needed'` (default locale unprefixed; matcher must catch unprefixed paths), `'never'` (disables alternate links). **Use `'always'`** — simplest, every URL unique per locale, clean hreflang.
- Locale detection order in proxy: URL prefix → `NEXT_LOCALE` cookie → `accept-language` → `defaultLocale` (https://next-intl.dev/docs/routing/middleware). `localeDetection: false` disables it.
- `NEXT_LOCALE` cookie: session cookie by default (no max-age), `sameSite: lax`; `localeCookie: false` disables (useful for a no-cookie privacy story); can set `maxAge`.
- `alternateLinks` (default on): proxy adds an HTTP `Link` header with hreflang incl. `x-default`. Can disable and rely on Metadata API + sitemap.

### Language switcher (https://next-intl.dev/docs/routing/navigation)
Client Component using wrappers from `src/i18n/navigation.ts`:
```ts
const router = useRouter(); const pathname = usePathname();
router.replace(pathname, {locale: 'ar'});
```
or `<Link href="/" locale="ar">` (sets `hreflang` on the anchor; always prefixed; not prefetched). Docs note `useRouter` can update the cookie client-side before navigating.

### Vercel cost note for `proxy.ts`
Routing middleware/proxy on Vercel runs **before the cache on every matched request** and is billed on the Fluid compute model (counts toward Hobby's Function Invocations / Active CPU). Keep the matcher tight. Source: https://vercel.com/docs/routing-middleware
- Option: with `localePrefix: 'always'`, the proxy is only strictly needed for the bare `/` redirect and detection; still recommended by next-intl.

---

## 2. RTL (Arabic)

- Set `dir` on the root element for RTL documents; `lang` does **not** imply direction; default base direction is LTR. Prefer the `dir` attribute over CSS `direction` because direction is semantic. Use `dir="auto"` only for unknown-direction user/external content; wrap embedded LTR phrases tightly (`<cite dir="ltr" lang="en">`). Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir
- In `app/[locale]/layout.tsx`: `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`. (Next's own i18n guide sets `<html lang={…}>` in the `[lang]` root layout: https://nextjs.org/docs/app/guides/internationalization)
- CSS logical properties map physical (`left/right/top/bottom`, `width`) to flow-relative (`inline/block`, `start/end`) so layouts adapt to writing direction/mode; flex/grid alignment already uses `start/end`. Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values/Basic_concepts , https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values/Margins_borders_padding
- Practical rule: use `margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`, `border-start-start-radius`, `inline-size` (Tailwind: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `rtl:` variant). Directional icons/arrows need explicit `rtl:` flipping; animations with `x` offsets must flip sign in RTL.
- `<input type="tel">` stays LTR even inside RTL (MDN dir page) — fine for phone fields.

---

## 3. Multilingual SEO

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata (lastUpdated 2026-08-19)
- `metadataBase: new URL('https://<domain>')` in the root layout lets URL fields use relative paths; **a relative URL without `metadataBase` is a build error**.
- `alternates: { canonical, languages: { 'en': '/en/…', 'ar': '/ar/…', …, 'x-default': '/en/…' } }` → `<link rel="alternate" hreflang=…>`. Generate per page in `generateMetadata` (await `params`).
- `openGraph: { locale: 'ar_SA', alternateLocale: [...], images, type: 'website' }`.
- **Merging is shallow**: a page that sets `openGraph` replaces the whole parent `openGraph` (images etc.). Share a constant and spread it.
- `title: { template: '%s | Empower of Marketing', default: 'Empower of Marketing' }` in the locale layout.
- Prerendered pages resolve metadata at build time (no streaming). Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

Sitemap — `app/sitemap.ts` returning `MetadataRoute.Sitemap` with `alternates.languages` per URL; emits `xhtml:link rel="alternate" hreflang`. Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
```ts
{ url: 'https://<domain>/en/services/digital-marketing',
  lastModified: new Date(),
  alternates: { languages: { ar: 'https://<domain>/ar/services/digital-marketing', ja: '…' } } }
```
(Sitemap needs absolute URLs; keep the domain in one constant.) Add `app/robots.ts` too.

OG images — `opengraph-image.(jpg|png)` file in any route folder (more specific wins), or `opengraph-image.tsx` with `ImageResponse` from `next/og`, `size = { width: 1200, height: 630 }`. `ImageResponse` supports flexbox only (no grid); in Next 16 `params` is a Promise. Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Caveat: generated OG with Arabic/Japanese text needs the font file passed to `ImageResponse` — static per-locale JPGs are simpler.

---

## 4. Fonts (next/font/google)

Source: https://nextjs.org/docs/app/api-reference/components/font (lastUpdated 2026-09-24)
- Files are downloaded at build and self-hosted; **no browser requests to Google** (good for GDPR).
- Prefer variable fonts; **non-variable fonts require `weight`**. `display` default `'swap'`. `preload` default `true`.
- `subsets` = which subsets get `<link rel=preload>`; omitting subsets with `preload: true` warns.
- Fonts are preloaded only on routes where they're used (page → that route; layout → wrapped routes; root layout → all). Use `variable: '--font-x'` + CSS vars. "Use multiple fonts conservatively."
- Multi-word names use underscores: `IBM_Plex_Sans_Arabic`, `Noto_Sans_JP`.

Availability verified from next 16.4.2's bundled `font-data.json` (`node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`):

| Script | Font | Variable? | next/font subsets |
|---|---|---|---|
| Latin display | Sora | yes (wght) | latin, latin-ext |
| Latin display | Bricolage Grotesque | yes (opsz, wdth, wght) | latin, latin-ext, vietnamese |
| Latin display (serif accent) | Fraunces | yes (SOFT, WONK, opsz, wght) | latin, latin-ext, vietnamese |
| Latin body | Inter Tight / Manrope / Geist | yes (wght) | latin, latin-ext (+cyrillic etc.) |
| Arabic display | Alexandria / Readex Pro / Noto Kufi Arabic | yes | arabic, latin, latin-ext |
| Arabic body | IBM Plex Sans Arabic | **no** (100–700, needs `weight`) | arabic, latin, latin-ext |
| Arabic body | Noto Sans Arabic | yes (wdth, wght) | arabic, latin, latin-ext |
| Japanese | Noto Sans JP | yes (wght) | cyrillic, latin, latin-ext, vietnamese — **no `japanese` subset listed** |
| Japanese | M PLUS 1 | yes (wght) | latin, latin-ext, vietnamese |
| Japanese | M PLUS 1p, Zen Kaku Gothic New | **no** | latin-ish only |
| Bengali | Anek Bangla | yes (wdth, wght) | bengali, latin, latin-ext |
| Bengali | Noto Sans Bengali | yes (wdth, wght) | bengali, latin, latin-ext |
| Bengali | Hind Siliguri | **no** (300–700) | bengali, latin, latin-ext |

Recommendation:
- Latin: **Sora** (display) + **Inter Tight** (body). Arabic: **Alexandria** or **Readex Pro** (display, variable) + **IBM Plex Sans Arabic** (body, weights 400/500/600/700). Japanese: **Noto Sans JP** (variable). Bengali: **Anek Bangla**.
- Load script fonts per locale (e.g., a `fonts.ts` map, apply only the active locale's variables on `<html>`) so `/en` doesn't download Arabic/JP files.
- **CJK caveat**: Japanese glyphs are not exposed as a named subset in next/font; Google serves CJK fonts as many `unicode-range` slices. next/font's preload logic only preloads `@font-face` blocks whose subset comment matches `subsets` (see `find-font-files-in-css.js` in the next package), so the JP slices are self-hosted and fetched lazily by unicode-range. Set **`preload: false`** for Noto Sans JP and use a sensible `fallback` (e.g., `['Hiragino Sans', 'Yu Gothic', 'sans-serif']`). Build output will contain many font files; that's expected. (Inference from package source; not stated in Next.js docs.)
- Google Fonts CSS API also supports `text=` subsetting (up to 90% smaller) — only relevant if you hand-roll a logo font. Source: https://developers.google.com/fonts/docs/css2

---

## 5. Calendly (booking popup)

Sources: https://developer.calendly.com/how-to-display-the-scheduling-page-for-users-of-your-app , https://calendly.com/help/how-to-customize-your-embed , https://help.calendly.com/hc/en-us/articles/31618265722775-Advanced-Calendly-embed-for-developers , https://calendly.com/help/how-to-pre-fill-invitee-information-in-an-embed , https://calendly.com/help/how-to-source-track-your-calendly-embed-with-utm-parameters , https://assets.calendly.com/assets/external/widget.js

- Assets:
  - CSS `https://assets.calendly.com/assets/external/widget.css`
  - JS `https://assets.calendly.com/assets/external/widget.js`
- APIs on `window.Calendly`: `initPopupWidget({ url, prefill, utm })`, `closePopupWidget()`, `showPopupWidget(url)`, `initInlineWidget({ url, parentElement, resize, prefill, utm })`, `initBadgeWidget({ url, text, color, textColor, branding })`, `destroyBadgeWidget()`.
- `prefill`: `name` | `firstName`+`lastName`, `email`, `guests[]`, `customAnswers: { a1…a10 }` (order of questions in Calendly maps to a1…).
- `utm`: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm` (overrides UTM in page URL; values < 255 chars).
- URL params on the scheduling link: `hide_event_type_details=1`, `hide_landing_page_details=1`, `hide_gdpr_banner=1`.
- Events via `postMessage`: `calendly.profile_page_viewed`, `calendly.event_type_viewed`, `calendly.date_and_time_selected`, `calendly.event_scheduled`. Listen on `window` `message`, check `e.origin === 'https://calendly.com'` and `e.data.event?.startsWith('calendly.')`; details in `e.data.payload`. Plain `<iframe>` embeds don't support events/auto-resize.
- React: Calendly's help page mentions `react-calendly` as **third-party, not maintained by Calendly**; the vanilla script + effect approach is also documented. → Use vanilla script, no dependency.

Next.js loading (https://nextjs.org/docs/app/api-reference/components/script):
- Client Component (`'use client'`) with `<Script src=".../widget.js" strategy="lazyOnload" />` (docs list chat/social widgets as `lazyOnload` candidates). `onLoad`/`onReady` only work in Client Components. Import the CSS via a `<link>` in the component or load it on first click.
- Button: `onClick={() => window.Calendly?.initPopupWidget({ url, prefill, utm })}`; fallback `href` to the Calendly URL in a new tab if script not loaded.
- Pass `locale` → Calendly UI language is set in Calendly account settings, not by the embed (not documented in the fetched pages; verify in Calendly).

Plan limits:
- Free plan: **one event type**; "Remove Calendly branding" and embed **color customization are paid** (Standard+). Source: https://calendly.com/pricing , https://calendly.com/help/how-to-customize-your-embed
- Embed availability on Free: help pages say "All plans … feature access may vary"; not explicitly confirmed for Free → **test with the actual account**. Source: https://calendly.com/help/how-to-add-calendly-to-your-website

---

## 6. WhatsApp click-to-chat

- Format: `https://wa.me/<number>?text=<URL-encoded message>` — number in full international format **digits only** (no `+`, no leading zeros, no spaces/brackets/dashes). Build with `encodeURIComponent(message)`.
- **UNVERIFIED against the official page**: WhatsApp's FAQ "How to use click to chat" (https://faq.whatsapp.com/5913398998672934 , https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/) blocks automated fetching (robots). The format above is the long-standing published one; open the FAQ in a browser to confirm.
- Number format rule (official): international format, "remove any leading 0s or special calling codes". Source: https://faq.whatsapp.com/1294841057948784
- Alternative for WhatsApp Business API numbers: short links `https://wa.me/message/<CODE>` with prefilled message up to 140 chars, no phone number exposed in URL. Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/qr-codes/
- Localize the `text` per locale from messages JSON.

---

## 7. Vercel Hobby — limits and COMMERCIAL USE

**Plain statement: Vercel Hobby is restricted to non-commercial, personal use. A company marketing site that advertises paid services is commercial usage and requires Pro (or Enterprise).**

Source: https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage (last_updated 2026-09-14):
> "Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan."

Commercial usage = any deployment used for financial gain of anyone involved in any part of the production, including a paid consultant writing the code. Examples include **"Advertising the sale of a product or service"**, "Receiving payment to create, update, or host the site", requesting payment from visitors, affiliate-link-primary sites, ads (AdSense). Donations are not commercial. Also restated on https://vercel.com/docs/plans/hobby .
→ The Book page (Amazon links), service pages and Calendly booking for paid consulting all fall under "advertising the sale of a product or service".
→ Options: Vercel **Pro** ($20/developer seat/month per https://vercel.com/docs/plans/hobby), or a static export (`output: 'export'`) on a host whose free tier allows commercial use (not researched here — verify that host's terms). Note: next-intl static export requires `localePrefix: 'always'` and no proxy (https://next-intl.dev/docs/routing/middleware).

Hobby included usage (per month; exceed → usually wait 30 days, no overage billing). Source: https://vercel.com/docs/plans/hobby
- Fast Data Transfer 100 GB; Fast Origin Transfer 10 GB; CDN requests 1,000,000
- Function Invocations 1,000,000; Active CPU 4 CPU-hrs; Provisioned Memory 360 GB-hrs (proxy.ts counts here)
- Image Transformations 5,000; Image Cache Reads 300,000; Writes 100,000
- Web Analytics 50,000 events/month (1 month data); Speed Insights 10,000 events
- Deployments/day 100; projects 200; domains/project 50; build 2 vCPU / 8 GB; runtime logs 1 hour; WAF custom rules 3
- Tip: with 6 locales × many images, `next/image` transformations (5K) can be the first limit hit — use pre-sized static images or `unoptimized` for decorative assets.

---

## 8. Animation: Motion

Sources: https://registry.npmjs.org/motion , https://motion.dev/docs/react-installation , https://motion.dev/docs/react-upgrade-guide , https://motion.dev/docs/react-accessibility
- Package **`motion`** (latest 14.6.0, 2026-10-22; peer React ^18 || ^19). Replaces `framer-motion`: `npm uninstall framer-motion && npm install motion`.
- Import: `import { motion, MotionConfig, useReducedMotion } from "motion/react"`.
- App Router: add `"use client"` to files importing `motion/react`; or `import * as motion from "motion/react-client"` to use `motion.div` inside Server Components with less client JS.
- Reduced motion: wrap app in `<MotionConfig reducedMotion="user">` → automatically disables transform/layout animations, keeps opacity/color. `useReducedMotion()` for custom logic (e.g., stop autoplay video, parallax). Also honor `@media (prefers-reduced-motion: reduce)` in plain CSS animations.
- RTL: flip `x` offsets when `dir === 'rtl'`.

---

## 9. Privacy policy must-haves (high level, not legal advice)

Site facts to disclose: no database; hosting (Vercel, logs IPs); Calendly (third-party processor collecting name/email/answers — it has its own cookie banner unless `hide_gdpr_banner=1`); WhatsApp (Meta) when users click; optional analytics; `NEXT_LOCALE` cookie (session; can be disabled); self-hosted fonts (no Google requests).

**EU – GDPR** (European Commission): tell people your name/contact (and DPO if any), purposes, categories of data, legal basis, retention period, recipients, whether data leaves the EU, their rights, right to complain to a DPA, right to withdraw consent, automated decision-making. Source: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en ; legal text https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- Non-essential analytics/marketing cookies need consent under ePrivacy rules (not researched here) → prefer cookieless analytics or a consent banner.

**Saudi Arabia – PDPL** (SDAIA): applies to processing in the Kingdom and to processing of data of individuals residing in the Kingdom by parties outside it; individuals have the right to be informed of the lawful basis and purpose; storing data abroad (e.g., US cloud) is still regulated and cross-border transfer has its own regulation. Source: SDAIA "Guide to the Saudi PDP Law" https://dgp.sdaia.gov.sa/wps/wcm/connect/f579bc32-fda8-47bd-bc6f-66b8cb77985c/ENG-Guide+to+the+saudi+PDP+law+for+controllersprocessors.pdf?MOD=AJPERES
- SDAIA also publishes a "Privacy Policy Guideline" (dgp.sdaia.gov.sa knowledge center) and the law/implementing regulations at sdaia.gov.sa — **could not be fetched (blocked)**; review them for the exact privacy-policy element list and any Arabic-language expectations. Provide an Arabic version of the policy regardless (site already has `ar`).

**Japan – APPI** (PPC tentative translation, June 2020; only Japanese text is binding): specify purpose of use as explicitly as possible and publicize/notify it (Art. 15, 18); prior consent plus information about the foreign country's system for providing data to a third party in a foreign country (Art. 24 — relevant because Calendly/Vercel/Meta are overseas from Japan); make public the business name, address, representative, purposes, and request procedures (Art. 27). Source: https://www.ppc.go.jp/files/pdf/APPI_english.pdf
- Article numbers shifted in the 2022 renumbering; check the current PPC English page before citing in the policy.

---

## Surprises / caveats
1. **Vercel Hobby forbids commercial use** — this site is commercial. Budget for Pro or choose a different host for a static export.
2. Next.js 16: `middleware.ts` → **`proxy.ts`** (Node runtime only). next-intl docs already use `src/proxy.ts`.
3. Next.js 16.3 `next/root-params` makes next-intl's `setRequestLocale` optional for static rendering.
4. `Noto Sans JP` has no `japanese` subset in next/font → `preload: false`.
5. Calendly Free: 1 event type, branding stays, no color theming; confirm embed works on Free.
6. WhatsApp and some SDAIA pages could not be machine-fetched; confirm manually.
