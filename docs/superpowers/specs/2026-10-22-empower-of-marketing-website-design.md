# Empower of Marketing — Website Design

Date: 2026-10-22 · Owner: Iqbal Hossain · Repo: `Iqbalhossainshuvo/empowerofmarketing`
Technical research backing this doc: `docs/research/2026-10-22-nextjs-multilingual-landing-site.md`

Legend: **[Iqbal]** = decided by Iqbal. **[Claude's call]** = proposed by Claude, open to change.

---

## 1. Intent — why this site exists

Iqbal sells marketing, business-growth, business-setup, AI-automation and marketing video-editing services to international clients, plus his book *Empire of Marketing*. The site has one job: make a stranger **trust** him within seconds and then **contact** him through one of three channels: WhatsApp, email, or a 1:1 video call booked on Calendly. **[Iqbal]**

It must look premium, dark and "techy", in the style of the 13 reference images (glowing orb hero, glassmorphism cards, neon-edge grids, glowing connector lines between steps, animated counters). It must use marketing psychology, meaning it speaks to the visitor's pain first, then shows proof, then gives a frictionless next step. **[Iqbal]**

### Audience **[Iqbal]**
1. People who **want to start a business** (anywhere in the world).
2. Owners whose **business exists but has no sales**.
3. Owners whose **business is disorganized** (systems, processes, team, numbers).
4. Businesses that **want AI automation**.

### Target markets **[Iqbal]**
USA, Canada, Europe, Saudi Arabia, Japan.

### Success
- A visitor from any of the five markets can, in their language, recognise their own problem, see which service solves it, and book a call or message on WhatsApp in **≤ 2 clicks** from any page.
- The site is fast on mobile (Lighthouse Performance ≥ 90 on the home page, mobile profile) **[Claude's call]**.
- The site can be moved from Vercel to any other host without code changes **[Iqbal: will move later]**.

---

## 2. Goals, non-goals, anti-goals

**Goals**
- Multi-page site (not a one-pager) with a separate page per service, all linked from the menu. **[Iqbal]**
- Language toggle: **English (default), Arabic (right-to-left), Japanese**. **[Iqbal]**
- Calendly booking opens **inside the site** as a popup. **[Iqbal]**
- WhatsApp and email visible as calls to action. **[Iqbal]**
- Book page with details and an Amazon link. **[Iqbal]**
- Founder profile page reachable **only from the footer**, not the main menu. **[Iqbal]**
- Privacy Policy and Terms pages in the footer. **[Iqbal]**

**Non-goals**
- No database, no payment gateway, no login, no forms that store data. **[Iqbal]**
- No blog or CMS at launch. **[Claude's call]**
- No French, German or Spanish at launch (possible later). **[Iqbal]**

**Anti-goals (failure even if it "works")**
- **Fake proof.** No invented testimonials, client logos, "trusted by 99,000 brands" numbers or fake reviews. Stats are limited to true facts Iqbal has stated (6+ years experience, 50+ global clients, published author). Fake proof destroys trust with exactly the audience this site targets, and some markets (EU/Japan consumer-protection norms) punish it. **[Claude's call]**
- **Slow or janky on phones.** Heavy 3D or large videos that make the first screen load slowly. **[Iqbal chose approach A for this reason]**
- **Machine-translation feel** in Arabic or Japanese marketing copy. Translations are written by Claude and must be reviewed by a native speaker before paid traffic is sent to those languages.
- **Locked to Vercel.** Nothing that only works on Vercel's servers.

---

## 3. Constraints

- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS, `next-intl` 4.x, `motion` for animation. **[Claude's call; Iqbal asked for Next.js]**
- **Fully static output** (`output: 'export'`) so the build is plain HTML/CSS/JS. **[Iqbal: approach A]** Consequences:
  - URLs are always language-prefixed: `/en/...`, `/ar/...`, `/ja/...` (`localePrefix: 'always'`).
  - No `proxy.ts` (middleware). The bare `/` is a tiny static page that picks a language from `navigator.languages` (ar → `/ar`, ja → `/ja`, else `/en`). It includes a `<noscript>` link list and a meta-refresh fallback to `/en`.
  - `next/image` optimization is off (`images.unoptimized: true`). Images are pre-sized and compressed by hand (WebP/AVIF).
- **Hosting:** Vercel free (Hobby) for preview and early launch, connected to the GitHub repo. **Known risk, accepted by Iqbal:** Vercel's Hobby terms forbid commercial use, so the site should move to Pro or another host before real promotion. The static build makes that move a copy-paste. **[Iqbal]**
- **Contact details** **[Iqbal]**:
  - WhatsApp `+966 51 035 6264` → `https://wa.me/966510356264?text=<localized greeting>`
  - Email `empireofmarketing4@gmail.com` → `mailto:` with localized subject
  - Calendly `https://calendly.com/iqbalshuvo/discuss-problem-solution-growth`
- **Calendly embed:** official `widget.js` / `widget.css`, loaded lazily on first CTA hover/click with `Calendly.initPopupWidget({ url, utm })`. Fallback: if the script fails to load, the same button opens the Calendly URL in a new tab. The free Calendly plan keeps Calendly branding and allows one event type, which is fine. The popup must be tested against the real account.
- **No third-party requests on page load** apart from the deployed site itself. Fonts are self-hosted through `next/font` and Calendly loads only on intent. This keeps the privacy policy simple for GDPR/PDPL/APPI. **[Claude's call]**
- **Analytics:** none at launch. **[Claude's call]** Adding a cookieless analytics tool later is a one-line change plus a privacy-policy update.

---

## 4. Approaches considered (how it gets built)

| | Approach | Trade-off |
|---|---|---|
| **A** ✅ | Static Next.js + next-intl + Tailwind + Motion; orb, grids and glass cards built with CSS/SVG | Fastest, portable to any host; language auto-detect happens in a tiny client script instead of on the server |
| B | Same as A plus a real Three.js 3D orb in the hero | More "wow", but heavy JS and slow first load on mid-range phones, which hurts ads and SEO |
| C | Next.js with server features (proxy-based language detection, image optimization) | Ties the site to Vercel or a Node server; conflicts with the plan to move hosts |

**Chosen: A** **[Iqbal]**. A light 3D hero can be added later without changing anything else.

---

## 5. Brand and naming

- Company/site name: **Empower of Marketing** (wordmark "EMPOWER OF MARKETING"). **[Iqbal]**
- Book title: ***Empire of Marketing*** by **Iqbal Hossain**, Amazon: `https://www.amazon.com/dp/B0H71PC4QF`. Kindle, paperback and hardcover editions exist; there is also a Bangla edition (*এম্পায়ার অব মার্কেটিং*). **[Iqbal, from earlier conversations]** The book's own name stays "Empire" even though the company is "Empower". **[Claude's call — to confirm]**
- Logo: no logo file exists yet. Claude designs a simple original SVG mark (an upward-arrow/spark glyph inside a glowing rounded square) plus the text wordmark. It can be swapped later. **[Claude's call]**
- Book cover image and founder photo: **needed from Iqbal**. Until provided, the book page uses a CSS-rendered book mockup with the title, and the founder page uses an initials monogram.

---

## 6. Site map

All pages exist in `en`, `ar` and `ja`.

| Route | In main menu | Purpose |
|---|---|---|
| `/{locale}` | Home | Hook, "which one are you?", services, process, proof, book teaser, FAQ, final CTA |
| `/{locale}/services` | Services (click) | Overview of all six services |
| `/{locale}/services/digital-marketing` | Services ▸ dropdown | Paid ads (Google/Meta/TikTok), SEO, analytics, CRO |
| `/{locale}/services/traditional-marketing` | Services ▸ dropdown | Print, outdoor, events, local/community, WhatsApp marketing, partnerships |
| `/{locale}/services/business-growth` | Services ▸ dropdown | For "business exists, no sales" and "disorganized": funnel, offer, sales system, KPIs, operations clean-up |
| `/{locale}/services/business-setup` | Services ▸ dropdown | For "want to start": idea validation, step-by-step launch roadmap, market entry, brand setup, field guidance |
| `/{locale}/services/ai-automation` | Services ▸ dropdown | AI setup and workflow automation (lead capture, follow-ups, chatbots, reporting, content workflows) |
| `/{locale}/services/video-editing` | Services ▸ dropdown | Marketing videos: ads, reels/shorts, product and explainer videos |
| `/{locale}/about` | About Us | Company story, mission, how we work, values, markets served |
| `/{locale}/book` | Book | *Empire of Marketing* details plus Amazon CTA |
| `/{locale}/founder` | **Footer only** | Iqbal Hossain profile: experience, skills, links (LinkedIn, Medium, X) |
| `/{locale}/privacy` | Footer | Privacy policy (GDPR / Saudi PDPL / Japan APPI basics) |
| `/{locale}/terms` | Footer | Terms of use |
| `/` | — | Language picker/redirect (see Constraints) |
| 404 | — | Branded not-found page with links home and to booking |

**Solutions (individual services) [Iqbal: requested; name and grouping are Claude's call]** — one page each, lighter template (§7.2b):

| Route | Purpose |
|---|---|
| `/{locale}/solutions` | Overview of all individual solutions |
| `/{locale}/solutions/web-development` | Business websites and landing pages |
| `/{locale}/solutions/ui-ux-design` | App/web UI and UX design |
| `/{locale}/solutions/graphic-design` | Logos, branding, social posts, posters, print |
| `/{locale}/solutions/documents` | All kinds of document work: business documents, company profiles, proposals, CVs, form filling and document processing assistance |
| `/{locale}/solutions/travel-ticketing` | Flight tickets, hotel booking, visa assistance, Umrah travel support |
| `/{locale}/solutions/training` | Marketing, sales, AI-tools and business training for owners and teams |
| `/{locale}/solutions/manpower` | Manpower supply and recruitment support for businesses |

| Route | In main menu | Purpose |
|---|---|---|
| `/{locale}/pricing` | Pricing | Packages (§7.4) |

Main menu order: **Home · Services ▾ · Solutions ▾ · Pricing · About Us · Book**, then a language switcher and a primary **"Book a Free Call"** button. On mobile the menu becomes a full-screen sheet with collapsible groups.

Footer: logo + one-line promise; service links; company links (About, Book, **Founder**); contact (WhatsApp, email, "Dammam, Saudi Arabia"); legal (Privacy, Terms); social (LinkedIn, Medium, X); © year.

---

## 7. Page content structure

### 7.1 Home
1. **Hero:** badge ("Marketing · Growth · AI — for founders worldwide"), a big headline with a gradient word (e.g. *"Turn your business into a **sales machine**."*), a one-line subhead, and two CTAs: **Book a Free 1:1 Call** (Calendly popup) and **Chat on WhatsApp**. Visual: a glowing CSS/SVG orb with orbit rings and 4 floating glass cards (Ads ROI chart, AI workflow, Growth roadmap, Video reel), inspired by reference images 1, 5 and 6.
2. **Proof strip:** 6+ years · 50+ global clients · 3 languages (EN/AR/JA) · Published author. Animated counters, true numbers only. ("5 markets served" was dropped: the five markets are targets, not confirmed client locations.) **[Claude's call]**
3. **"Which one are you?":** the 4 audience cards (start a business / no sales / messy business / want AI automation). Each names the pain in the visitor's words, gives a one-line promise, and links to the matching service page. This is the core persuasion block.
4. **Services grid:** 6 glass cards with icon, title, 1-line outcome and link.
5. **How it works:** 4 steps (Free call → Diagnosis & roadmap → Execution → Track & scale), connected by a glowing line as in reference images 8 and 9.
6. **Why us:** 4 differentiators (both digital and traditional marketing, one partner from setup to scale, AI-first systems, experience across Asia, the Middle East and global clients).
7. **Book teaser:** book mockup plus 2 lines and buttons for "Get it on Amazon" and "Learn more".
8. **FAQ:** 6–8 questions (pricing approach, countries served, language, how calls work, timelines, what to prepare). Uses accordions.
9. **Final CTA band:** "Your growth starts with one conversation", with all three contact options.

### 7.2 Service page template (same structure for all 6, different content)
Hero with a service-specific visual card → "Is this you?" pain bullets → what you get (deliverables grid) → process for this service → outcomes you can expect (stated as goals, not guarantees) → who it's for / not for → service FAQ (3–5) → CTA band → links to related services.

### 7.2b Solution page template (shorter)
Hero → what we offer (service list as glass cards) → why choose us for this → simple 3-step process → FAQ (2–3) → CTA band.

### 7.4 Pricing **[Iqbal: one free package, the rest low-priced packages to attract customers. Exact names/prices are Claude's call — Iqbal can change them in one file]**
Prices in USD, shown as "starting from"; final quote after the free call.

| Package | Price | What's included |
|---|---|---|
| **Free Growth Call** | $0 | 30-min 1:1 video call, business diagnosis, top 3 quick wins |
| **Starter Audit** | from $99 one-time | Full marketing/business audit, competitor snapshot, 30-day action plan (PDF) |
| **Growth** (most popular) | from $299 / month | Ads management on 1–2 platforms, monthly content plan, basic SEO, monthly report, WhatsApp support |
| **Scale** | from $699 / month | Multi-platform ads, funnel + CRO, AI automation setup, 4 marketing videos/month, bi-weekly strategy calls |
| **Custom / Business Setup** | Let's talk | Business launch roadmap, market entry, solutions (web, design, documents, travel, training, manpower) |

Notes on the page: ad spend is paid separately by the client; no long-term lock-in; packages are tailored on the call. Every package button opens the Calendly popup (the free one is the primary CTA). A comparison toggle is not needed. Prices live in a single config file so Iqbal can change them.

### 7.3 About · Book · Founder · Legal
- **About:** story, mission, approach, values, markets, CTA.
- **Book:** cover mockup, title, author, short description, "what you'll learn" (5–7 points), who it's for, formats (Kindle, paperback, hardcover; Bangla edition mentioned), an "Buy on Amazon" CTA (opens in new tab), and a cross-sell: "Want this applied to your business? Book a call".
- **Founder:** Iqbal Hossain: 6+ years in digital and traditional marketing; performance marketing, Google/Meta/TikTok Ads, SEO, analytics (GA4, GTM, Looker Studio, Tableau), CRO; 50+ global clients; business-launch coaching; background spanning Bangladesh and Saudi Arabia; author of *Empire of Marketing*; links to LinkedIn (`linkedin.com/in/mdiqbalhossainmarketingspecialist`), Medium (`medium.com/@mdiqbalhossain203050`) and X (**handle needed from Iqbal**).
- **Privacy/Terms:** plain-language. They disclose: no database, the hosting provider's server logs, Calendly as a third-party processor when booking, WhatsApp/Meta when clicking, email, self-hosted fonts, a session language cookie if any, user rights under GDPR, PDPL and APPI, and contact email. Each page carries a "last updated" date and a note that it is not legal advice reviewed by a lawyer.

### Voice **[Iqbal]**
The site speaks as **"we"** (Empower of Marketing). The founder page introduces Iqbal Hossain as the founder. No invented team members, founding dates or office locations.

### Legal operator **[Claude's call — Iqbal to confirm]**
Privacy Policy and Terms name **Iqbal Hossain, operating as Empower of Marketing, Dammam, Saudi Arabia**, contact `empireofmarketing4@gmail.com`. Terms are governed by the laws of the Kingdom of Saudi Arabia. Easy to change once a company is registered.

### Book content **[Claude's call — Iqbal to replace]**
The Amazon page cannot be read automatically and no description or table of contents has been provided. The Book page uses only a short, general description (a practical marketing and business-growth guide by Iqbal Hossain), with the "what you'll learn" points kept in one editable content file, clearly marked in the README for Iqbal to replace with the real chapter themes.

### Copywriting rules **[Claude's call]**
- Lead with the visitor's pain and desired result, not with "we".
- Specific verbs and outcomes; no hype words that sound like spam.
- No revenue guarantees. Iqbal's "$1M in 6–12 months" coaching goal is **not** stated as a promise on the site, because an income claim without evidence is risky (FTC in the USA, consumer law in the EU and Japan) and undermines trust. It can appear as "our clients aim high", without a number.
- Every page ends with the CTA band.

---

## 8. Visual design system

Inspired by the reference images saved in `docs/references/ref-01.png` … `ref-13.png` (numbered in the order Iqbal sent them); the motion ideas come from `docs/references/build-instruction-prompt.pdf`. Dark base, luminous accents, glass, grids, glowing connectors.

- **Colors** (CSS variables / Tailwind theme):
  - Background `#05070D` → `#0A0F1E` (deep navy-black)
  - Surface glass: white 4–6% + 1px border white 8–10% + backdrop blur
  - Primary glow: electric blue `#3B82F6` → violet `#8B5CF6` gradient
  - Accent for primary CTA: mint/lime `#7CF5B4`, as in reference images 1 and 3
  - Text `#E8ECF5`, muted `#8A93A8`
- **Typography:**
  - Latin: **Sora** (display) + **Inter Tight** (body)
  - Arabic: **Alexandria** (display) + **IBM Plex Sans Arabic** (body)
  - Japanese: **Noto Sans JP** (`preload: false`)
  - Each language loads only its own fonts.
- **Signature elements:**
  - Animated dot/line grid background with a radial fade
  - Glowing orb hero
  - Glass cards with a subtle edge glow on hover
  - Gradient-shimmer headline word
  - Glowing connector lines for processes
  - Animated counters
- **Motion** (ideas borrowed from the build-instruction PDF):
  - Character/word-split headline reveal
  - Staggered card entrance (scale 0.96→1, y 24px→0, `cubic-bezier(0.16,1,0.3,1)`, 600 ms)
  - Counter roll-up when in view
  - Slow orbit rotation
  - Line draw-on for the process connector
  - Variety rule: adjacent sections don't reuse the same entrance animation.
  - Transform/opacity only. Everything respects `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` plus CSS media query).
- **Icons:** `lucide-react` line icons inside glowing rounded tiles. No brand or third-party characters.
- **RTL:** Tailwind logical utilities (`ms/me/ps/pe/start/end/text-start`); directional arrows and x-offset animations flip in Arabic.
- **Accessibility:** WCAG AA contrast, visible focus rings, keyboard-operable menu, dropdown, accordion and popup, semantic headings, `lang`/`dir` on `<html>`, alt text.
- **Floating WhatsApp button** bottom-end on all pages. **[Claude's call]**

---

## 9. Internationalisation and SEO

- `messages/en.json`, `ar.json`, `ja.json` hold all UI and copy. Long legal text lives in per-locale content files.
- **Language switcher:** a dropdown showing `EN · العربية · 日本語` that keeps the visitor on the same page in the new language.
- **Per page metadata:**
  - title template `%s · Empower of Marketing`
  - description
  - canonical
  - `alternates.languages` for en/ar/ja plus `x-default` → en
  - Open Graph/Twitter cards
- **`metadataBase`:** the site URL lives in one constant (`NEXT_PUBLIC_SITE_URL`) and defaults to the Vercel URL until the custom domain exists.
- **Crawling files:** `sitemap.xml` with hreflang alternates, `robots.txt`, a static OG image per locale, and JSON-LD for `Organization` / `ProfessionalService`, `Person` (founder) and `Book` (book page).
- **Localized contact text:** the WhatsApp prefill text and email subject follow the active language.

---

## 10. Quality checks before handover

- `next build` passes with static export; no type errors; ESLint clean.
- **Playwright smoke tests** across en/ar/ja at desktop and mobile widths:
  - every route renders
  - menu, dropdown and language switch keep the current path
  - Arabic has `dir="rtl"`
  - Calendly button opens the popup (or the new-tab fallback)
  - WhatsApp/email links are correct
  - no console errors
  - screenshots captured for visual review
- Lighthouse on the home page and one service page (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO = 100 target.
- Web Interface Guidelines review (`web-design-guidelines` skill) on the final UI.

## 11. Delivery

- Code pushed to `main` of `Iqbalhossainshuvo/empowerofmarketing`.
- Iqbal imports the repo in Vercel (framework preset Next.js). The static export also deploys on any static host.
- A `README.md` covers how to run, edit copy per language, change contact details, add a language, and deploy elsewhere.

## 12. Left to the builder
- Exact copy wording within the rules above, then translation into Arabic and Japanese.
- Component structure, file layout, exact animation timings within the stated style.
- The original logo SVG and icon choices.
- Section order tweaks on service pages if content flows better.

## 13. Needed from Iqbal (not blocking the build — placeholders until provided)
- Book cover image (front, high-res) and the real description / chapter themes.
- Confirm or change package names and prices (§7.4) and the legal operator line (§7).
- Founder photo.
- X (Twitter) profile URL.
- Confirm the book name stays *Empire of Marketing* while the company is *Empower of Marketing*.
- A native Arabic and a native Japanese speaker to review copy before paid promotion.
