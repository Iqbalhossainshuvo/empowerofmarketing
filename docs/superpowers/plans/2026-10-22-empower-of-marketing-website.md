# Empower of Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the multilingual (en/ar/ja), multi-page, dark premium marketing site for Empower of Marketing as a fully static Next.js export, ready to deploy on Vercel or any static host.

**Architecture:** Next.js 16 App Router with every page under `app/[locale]/`, pre-rendered for each locale via `generateStaticParams` and `output: 'export'`. All copy lives in `messages/{en,ar,ja}.json`. Structured data (services, solutions, packages, contact, book chapters) lives in typed config under `src/content/`. Visuals are CSS/SVG plus `motion` animations; there is no server code, no proxy and no database.

**Tech Stack:** Next.js 16.4.x, React 19, TypeScript, Tailwind CSS v4, next-intl 4.14.x, motion 14.x, lucide-react, Playwright (tests), Lighthouse CI (checks).

**Spec:** `docs/superpowers/specs/2026-10-22-empower-of-marketing-website-design.md` (+ technical research `docs/research/2026-10-22-nextjs-multilingual-landing-site.md`, visual refs `docs/references/ref-01..13.png`)

## Global Constraints

- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`. No `proxy.ts`/`middleware.ts`, no route handlers, no server actions.
- Locales exactly `['en','ar','ja']`, default `en`, `localePrefix: 'always'`. `<html lang={locale} dir={locale==='ar'?'rtl':'ltr'}>`.
- Every `[locale]` layout/page exports `generateStaticParams` and `dynamicParams = false`.
- Contact values (single source `src/content/site.ts`): WhatsApp `966510356264` → `https://wa.me/966510356264?text=<encodeURIComponent(localized)>`; email `empireofmarketing4@gmail.com`; Calendly `https://calendly.com/iqbalshuvo/discuss-problem-solution-growth`; Amazon `https://www.amazon.com/dp/B0H71PC4QF`; LinkedIn `https://www.linkedin.com/in/mdiqbalhossainmarketingspecialist`; Medium `https://medium.com/@mdiqbalhossain203050`; X URL = `null` until Iqbal provides it (hide the icon when null).
- Site URL from `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://empowerofmarketing.vercel.app'`.
- Colors: bg `#05070D`/`#0A0F1E`, glass white 4–6% + border white 8–10%, primary gradient `#3B82F6`→`#8B5CF6`, CTA accent `#7CF5B4`, text `#E8ECF5`, muted `#8A93A8`.
- Fonts via `next/font/google`, loaded per locale only: en → Sora + Inter Tight; ar → Alexandria + IBM Plex Sans Arabic (weights 400/500/600/700); ja → Noto Sans JP (`preload:false`, fallback `['Hiragino Sans','Yu Gothic','sans-serif']`).
- Voice "we". No fake proof: no testimonials, client logos or invented numbers. Proof stats only: 6+ years, 50+ global clients, 3 languages, published author. No income/revenue guarantees.
- Only transform/opacity/filter/clip-path animations; wrap app in `<MotionConfig reducedMotion="user">` and add a CSS `prefers-reduced-motion` reset. Adjacent home sections use different entrance animations.
- Use Tailwind logical utilities (`ms/me/ps/pe/start/end/text-start`). Directional icons get `rtl:-scale-x-100`; x-offset animations flip sign in RTL.
- No third-party request on page load. Calendly `widget.js`/`widget.css` load only on first CTA hover/focus/click.
- Book PDF (`*.pdf` except `docs/references/build-instruction-prompt.pdf`) must never be committed; never quote book text beyond a short phrase.
- Commit messages end with the session's Co-Authored-By / Claude-Session trailer.

## Review Focus

1. **Arabic mirroring** — in `/ar/*` the header, cards, arrows, dropdowns, process connectors and slide-in animations mirror correctly; nothing overflows horizontally at 360px. (Test: Task 4 `rtl.spec.ts`, Task 11 overflow check.)
2. **Calendly blocked or slow** (ad-blocker, offline, script error) — the "Book a Free Call" button must still get the visitor to booking: open the Calendly URL in a new tab. (Test: Task 4 `booking.spec.ts` with the script route aborted.)
3. **Missing or mismatched translation keys** in ar/ja — must fail the build/test, never render a raw key. (Test: Task 2 `messages.spec.ts` key-parity.)
4. **Unknown locale or slug** (`/fr/`, `/en/services/foo/`) — must render the branded 404, not a blank page. (Test: Task 8 `notfound.spec.ts` against the static export.)
5. **Reduced motion and no-JS** — content is fully visible without animations (no element stuck at opacity 0) when `prefers-reduced-motion: reduce` or JS is slow. (Test: Task 5 `motion.spec.ts`.)

---

## File Structure

```
next.config.ts · tailwind (src/app/globals.css, @theme tokens) · playwright.config.ts · lighthouserc.json · README.md
messages/en.json · messages/ar.json · messages/ja.json
public/index.html                 # bare "/" → language redirect (static, no JS framework)
public/og/{en,ar,ja}.png          # 1200×630 static OG images
src/i18n/routing.ts · navigation.ts · request.ts
src/content/site.ts               # contact, social, siteUrl, nav structure
src/content/services.ts           # 6 growth services: slug, icon, i18n key
src/content/solutions.ts          # 7 solutions: slug, icon, i18n key
src/content/pricing.ts            # 5 packages: id, priceUsd|null, period, featured
src/content/book.ts               # title meta, 26 A–Z chapter themes (short), journey steps
src/lib/contact.ts                # whatsappUrl(locale,text), mailtoUrl(subject)
src/lib/metadata.ts               # buildMetadata({locale, path, titleKey, descKey})
src/lib/fonts.ts                  # fontClassesFor(locale)
src/components/ui/*               # GlassCard, GlowButton, Badge, SectionHeading, GridBackground, Orb, Counter, Reveal, IconTile, Accordion, Logo
src/components/layout/*           # Header, NavDropdown, MobileMenu, LanguageSwitcher, Footer, FloatingWhatsApp, CtaBand
src/components/booking/*          # BookCallButton, useCalendly
src/components/home/*             # Hero, ProofStrip, WhichOneAreYou, ServicesGrid, HowItWorks, WhyUs, BookTeaser, Faq
src/components/pages/*            # ServicePage, SolutionPage, PricingTable, AZGrid, JourneyLine, LegalArticle
src/app/[locale]/layout.tsx · page.tsx · not-found.tsx
src/app/[locale]/services/page.tsx · services/[slug]/page.tsx
src/app/[locale]/solutions/page.tsx · solutions/[slug]/page.tsx
src/app/[locale]/{pricing,about,book,founder,privacy,terms}/page.tsx
src/app/sitemap.ts · robots.ts · not-found.tsx (root fallback)
tests/e2e/*.spec.ts
```

---

### Task 1: Scaffold static Next.js + i18n skeleton

**Files:** Create `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/i18n/{routing,navigation,request}.ts`, `src/lib/fonts.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` (placeholder), `messages/{en,ar,ja}.json` (minimal), `public/index.html`, `playwright.config.ts`, `tests/e2e/smoke.spec.ts`.

**Interfaces:**
- Produces: `routing` (`locales`, `defaultLocale`), `Link`, `usePathname`, `useRouter`, `getPathname` from `src/i18n/navigation.ts`; `type Locale = 'en'|'ar'|'ja'`; `fontClassesFor(locale: Locale): string`; `isRtl(locale: Locale): boolean` in `src/i18n/routing.ts`.

- [ ] **Step 1:** `npx create-next-app@16` (TS, App Router, Tailwind, src dir, no ESLint prompt → add `eslint` flat config), then `npm i next-intl motion lucide-react` and `npm i -D @playwright/test serve`. `npx playwright install chromium`.
- [ ] **Step 2: Write failing test** `tests/e2e/smoke.spec.ts`: Playwright `webServer` serves `out/` with `npx serve out -l 4173`. Tests: `GET /en/` has `html[lang=en][dir=ltr]`; `/ar/` has `html[lang=ar][dir=rtl]`; `/ja/` has `html[lang=ja]`; visiting `/` with `locale: 'ar-SA'` context ends at `/ar/`, with `ja-JP` ends at `/ja/`, with `de-DE` ends at `/en/`.
- [ ] **Step 3:** Run `npm run build && npx playwright test smoke` → FAIL.
- [ ] **Step 4: Implement.** next-intl static setup per research §1 (`request.ts` using `next/root-params`, `localePrefix:'always'`), root layout at `app/[locale]/layout.tsx` with `generateStaticParams`, `dynamicParams=false`, `NextIntlClientProvider`, `MotionConfig reducedMotion="user"`, fonts from `fontClassesFor`. `public/index.html`: inline script picks first of `navigator.languages` starting with `ar`/`ja` else `en`, `location.replace('/'+l+'/')`; `<meta http-equiv="refresh" content="0;url=/en/">` inside `<noscript>` plus three plain links.
- [ ] **Step 5:** Build + test → PASS. Commit `feat: scaffold static next.js site with en/ar/ja routing`.

### Task 2: Content config and message catalog

**Files:** Create `src/content/{site,services,solutions,pricing,book}.ts`, `src/lib/contact.ts`, full English `messages/en.json` (all copy for every page, per spec §7), stub `ar.json`/`ja.json` with identical keys (English values for now); `tests/unit/messages.test.ts`, `tests/unit/contact.test.ts` (run with `node --test` via `tsx`).

**Interfaces:**
- Produces:
  - `site: { name:'Empower of Marketing', url, whatsapp:'966510356264', email, calendlyUrl, amazonUrl, social:{linkedin, medium, x:null} }`
  - `services: ReadonlyArray<{ slug:'digital-marketing'|'traditional-marketing'|'business-growth'|'business-setup'|'ai-automation'|'video-editing'; icon: LucideIcon }>`
  - `solutions: ReadonlyArray<{ slug:'web-development'|'ui-ux-design'|'graphic-design'|'documents'|'travel-ticketing'|'training'|'manpower'; icon }>`
  - `packages: ReadonlyArray<{ id:'free'|'starter'|'growth'|'scale'|'custom'; priceUsd:number|null; period:'once'|'month'|null; featured:boolean }>` with values free 0/null, starter 99/once, growth 299/month featured, scale 699/month, custom null/null.
  - `whatsappUrl(text: string): string`, `mailtoUrl(subject: string): string`.
  - Message namespaces: `Common`, `Nav`, `Footer`, `Home`, `ServicesIndex`, `Service.<slug>`, `SolutionsIndex`, `Solution.<slug>`, `Pricing`, `About`, `Book`, `Founder`, `Privacy`, `Terms`, `NotFound`, `Meta.<page>`.

- [ ] **Step 1: Failing tests.** `messages.test.ts`: flattened key sets of en/ar/ja are identical; no value is empty; every `services`/`solutions` slug has `Service.<slug>.title|hero|pains|deliverables|faq` / `Solution.<slug>.title|offer|faq` keys. `contact.test.ts`: `whatsappUrl('Hi there')==='https://wa.me/966510356264?text=Hi%20there'`; `mailtoUrl('Hello')==='mailto:empireofmarketing4@gmail.com?subject=Hello'`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement** config + English copy following spec copy rules (pain first, "we", no guarantees, CTA on every page). Book copy paraphrases spec §7 Book content only.
- [ ] **Step 4:** Run → PASS. Commit `feat: add content config and english copy`.

### Task 3: Design system primitives

**Files:** `src/app/globals.css` (`@theme` tokens from Global Constraints, glass utility, grid-bg, shimmer keyframes, reduced-motion reset), `src/components/ui/{GlassCard,GlowButton,Badge,SectionHeading,GridBackground,Orb,Counter,Reveal,IconTile,Accordion,Logo}.tsx`, temporary `/[locale]/_kit` page **not** created — verify via Task 5 home instead.

**Interfaces:**
- Produces: `GlowButton({ variant:'primary'|'ghost', href?, onClick?, children, icon? })` (renders `<a>` when `href`); `Reveal({ variant:'rise'|'scale'|'blur'|'slide'|'words', delay?, children })`; `Counter({ to:number, suffix?:string })`; `Orb({ cards?: ReactNode[] })`; `Accordion({ items:{q:string;a:string}[] })`; `SectionHeading({ eyebrow, title, highlight?, subtitle? })`; `Logo({ withText?: boolean })` (original SVG spark-arrow in rounded square).

- [ ] **Step 1:** Implement components. Reveal uses `motion` `whileInView` with `viewport={{ once:true, margin:'-80px' }}`; `slide` flips x in RTL via `useLocale()`. Counter animates with `useInView` + `animate()`, renders final number in SSR markup. Orb: layered radial gradients + 2 SVG orbit ellipses rotating via CSS keyframes (60s/90s), floating cards absolutely positioned with logical insets.
- [ ] **Step 2:** `npm run build` + `npx tsc --noEmit` pass. Commit `feat: add design system primitives`.

### Task 4: Site chrome — header, menus, language switch, footer, booking, WhatsApp

**Files:** `src/components/layout/{Header,NavDropdown,MobileMenu,LanguageSwitcher,Footer,FloatingWhatsApp,CtaBand}.tsx`, `src/components/booking/{BookCallButton,useCalendly}.tsx`, update `[locale]/layout.tsx`; tests `tests/e2e/{nav,rtl,booking}.spec.ts`.

**Interfaces:**
- Consumes: `site`, `services`, `solutions`, `whatsappUrl`, `mailtoUrl`, navigation `Link/usePathname/useRouter`, UI primitives.
- Produces: `BookCallButton({ label?, variant?, packageId? })` — calls `window.Calendly.initPopupWidget({ url: site.calendlyUrl, utm:{ utmSource:'website', utmMedium:locale, utmCampaign:packageId ?? 'cta' } })`; falls back to `window.open(site.calendlyUrl,'_blank','noopener')` if `window.Calendly` is absent 2.5 s after click. `CtaBand()` used at the end of every page.

- [ ] **Step 1: Failing tests.** `nav.spec.ts`: header shows Home, Services, Solutions, Pricing, About Us, Book and **not** Founder; Services dropdown lists 6 links, Solutions 7; Footer contains Founder, Privacy, Terms links; switching language on `/en/services/business-growth/` lands on `/ja/services/business-growth/`; at 390px width the mobile menu opens, is keyboard-closable with Escape and traps focus. `rtl.spec.ts`: on `/ar/` the logo's bounding box is right of the CTA button's. `booking.spec.ts`: clicking "Book a Free Call" with Calendly script route fulfilled by a stub that defines `initPopupWidget` → stub called with the Calendly URL; with route aborted → a new page opens at `calendly.com/iqbalshuvo/...`. WhatsApp float link `href` starts with `https://wa.me/966510356264?text=`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement.** Header: sticky, glass on scroll, dropdowns on hover+click+keyboard (`aria-expanded`, Escape closes). Language switcher: `router.replace(pathname,{locale})`, labels `EN`/`العربية`/`日本語`. Calendly CSS/JS injected on first `pointerenter`/`focus` of any BookCallButton. Footer per spec §6.
- [ ] **Step 4:** Run → PASS. Commit `feat: add header, footer, language switch and booking`.

### Task 5: Home page

**Files:** `src/components/home/{Hero,ProofStrip,WhichOneAreYou,ServicesGrid,HowItWorks,WhyUs,BookTeaser,Faq}.tsx`, `src/app/[locale]/page.tsx`; test `tests/e2e/{home,motion}.spec.ts`.

**Interfaces:** Consumes UI primitives, `services`, `BookCallButton`, `whatsappUrl`, `CtaBand`.

- [ ] **Step 1: Failing tests.** `home.spec.ts` on `/en/`: one `h1`; hero has Book-call and WhatsApp CTAs; proof strip shows `6+`, `50+`, `3`, and "author" text, and does **not** contain "testimonial" or "trusted by"; exactly 4 "Which one are you" cards linking to `/en/services/business-setup/`, `/en/services/business-growth/` (no sales), `/en/services/business-growth/` (messy) and `/en/services/ai-automation/`; 6 service cards; 4 process steps; FAQ accordion toggles `aria-expanded`. `motion.spec.ts`: with `reducedMotion:'reduce'`, after load every `section` heading has computed opacity `1`; with JS disabled, `h1` text is present.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3: Implement** sections in spec §7.1 order. Entrance variants by section: Hero `words`, Proof `scale`, WhichOne `rise` staggered, Services `blur`, HowItWorks line draw (SVG `pathLength`), WhyUs `slide`, BookTeaser 3D tilt-in, Faq `rise`. Hero floating cards: Ads ROI mini bar chart, AI workflow nodes, Growth roadmap checklist, Video reel timeline (all pure SVG/HTML, no images).
- [ ] **Step 4:** Run → PASS. Commit `feat: build home page`.

### Task 6: Services and Solutions pages

**Files:** `src/components/pages/{ServicePage,SolutionPage}.tsx`, `src/app/[locale]/services/page.tsx`, `services/[slug]/page.tsx`, `solutions/page.tsx`, `solutions/[slug]/page.tsx`; test `tests/e2e/services.spec.ts`.

**Interfaces:** `[slug]` pages export `generateStaticParams` = locales × slugs, `dynamicParams=false`.

- [ ] **Step 1: Failing test:** for every service slug and solution slug in `en`: page returns 200, has one `h1`, a CtaBand with BookCallButton, and ≥2 related-links; services index lists 6 cards, solutions index 7.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement templates per spec §7.2 / §7.2b, each with a service-specific hero visual card (reuse primitives). **Step 4:** Run → PASS. Commit `feat: add service and solution pages`.

### Task 7: Pricing, About, Book, Founder

**Files:** `src/components/pages/{PricingTable,AZGrid,JourneyLine}.tsx`, `src/app/[locale]/{pricing,about,book,founder}/page.tsx`; test `tests/e2e/pages.spec.ts`.

- [ ] **Step 1: Failing test:** pricing shows 5 packages with `$0`, `$99`, `$299`, `$699` and "Let's talk"; Growth card marked "Most popular"; every package button triggers booking (stub as in Task 4); ad-spend note visible. Book: title "Empire of Marketing", author "Md. Iqbal Hossain", Amazon link `https://www.amazon.com/dp/B0H71PC4QF` with `target=_blank rel~=noopener`; A–Z grid has 26 tiles A…Z; journey has 9 steps. Founder: LinkedIn and Medium links present, X link absent while `site.social.x` is null; founder page not linked from header.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. Book cover = CSS 3D book mockup (title/author typeset, no image). Founder photo = initials monogram "IH". **Step 4:** Run → PASS. Commit `feat: add pricing, about, book and founder pages`.

### Task 8: Legal pages and 404

**Files:** `src/components/pages/LegalArticle.tsx`, `src/app/[locale]/{privacy,terms}/page.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/not-found.tsx`; test `tests/e2e/notfound.spec.ts`.

- [ ] **Step 1: Failing test:** `/en/privacy/` mentions Calendly, WhatsApp, GDPR, PDPL, APPI, the operator line "Iqbal Hossain, operating as Empower of Marketing, Dammam, Saudi Arabia" and a "Last updated" date; `/en/terms/` mentions "Kingdom of Saudi Arabia"; `serve` of `/en/services/foo/` and `/fr/` returns the branded 404 containing a link to `/en/` and a booking button. (Configure `serve` to use `404.html`.)
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement per spec §7.3 Privacy/Terms. **Step 4:** PASS. Commit `feat: add legal pages and 404`.

### Task 9: SEO metadata, sitemap, robots, JSON-LD, OG

**Files:** `src/lib/metadata.ts`, `generateMetadata` in every page, `src/app/sitemap.ts`, `src/app/robots.ts`, `public/og/{en,ar,ja}.png` (generated once with Playwright screenshot of a hidden OG template, committed as PNG), JSON-LD in layout/founder/book; test `tests/e2e/seo.spec.ts`.

**Interfaces:** `buildMetadata({ locale, path, titleKey, descKey }): Promise<Metadata>` returns title, description, `alternates.canonical`, `alternates.languages` {en, ar, ja, 'x-default'→en}, openGraph (shared base spread), twitter card.

- [ ] **Step 1: Failing test:** every route has unique `<title>`, meta description, canonical, 3 hreflang alternates + x-default; `out/sitemap.xml` lists every locale×route; `/en/book/` has JSON-LD `@type: Book` with author; layout has `Organization`.
- [ ] **Step 2:** FAIL. **Step 3:** Implement (`export const dynamic = 'force-static'` on sitemap/robots). **Step 4:** PASS. Commit `feat: add seo metadata, sitemap and structured data`.

### Task 10: Arabic and Japanese translations

**Files:** `messages/ar.json`, `messages/ja.json`, legal content in both.

- [ ] **Step 1:** Translate all keys (marketing tone, natural not literal; Arabic MSA business register; Japanese polite です/ます business register). Keep brand names, prices and URLs unchanged; WhatsApp prefill and email subject localized.
- [ ] **Step 2:** `messages.test.ts` passes (parity, no empty values) and an added check fails if any ar/ja value equals the en value for keys longer than 20 chars (catches untranslated copy).
- [ ] **Step 3:** Full e2e suite passes for ar/ja routes (parametrize smoke/nav/home specs over locales). Commit `feat: add arabic and japanese translations`.

### Task 11: Quality pass, docs, push

**Files:** `lighthouserc.json`, `README.md`, `tests/e2e/visual.spec.ts`.

- [ ] **Step 1:** `visual.spec.ts`: for each locale × [home, a service, pricing, book] at 390px and 1440px: no horizontal overflow (`scrollWidth <= clientWidth`), no console errors, full-page screenshots saved to `test-results/screens/`. Review screenshots by eye against refs; fix issues.
- [ ] **Step 2:** Lighthouse CI (mobile) on `/en/` and `/en/services/business-growth/`: Performance ≥ 90, Accessibility ≥ 95, SEO = 100. Fix regressions.
- [ ] **Step 3:** Run `web-design-guidelines` review on components; fix findings.
- [ ] **Step 4:** README: run/build, edit copy per language, change contact/prices in `src/content/*`, add a language, deploy on Vercel (import repo, preset Next.js, output `out` is automatic) and on any static host (upload `out/`), Vercel Hobby commercial-use note, items needed from Iqbal (spec §13).
- [ ] **Step 5:** `npm run build && npx playwright test` all green. Commit `docs: add readme and quality checks`; `git push origin main`.
