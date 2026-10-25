# Empower of Marketing — website

Multilingual (English · العربية · 日本語) marketing site for **Empower of Marketing**, built with Next.js 16 as a **fully static site**: no database, no server, no payment gateway. The build output is plain HTML/CSS/JS in `out/`, so it runs on Vercel or on any ordinary web host.

## Pages

| Page | URL (English) |
|---|---|
| Home | `/en/` |
| Growth services (6) | `/en/services/…` |
| Solutions (7) | `/en/solutions/…` |
| Pricing | `/en/pricing/` |
| About us | `/en/about/` |
| Book — *Empire of Marketing* | `/en/book/` |
| Professional profile (footer only, for job applications) | `/en/profile/` |
| Privacy policy / Terms | `/en/privacy/`, `/en/terms/` |

Arabic and Japanese live at `/ar/…` and `/ja/…`. The bare `/` sends visitors to their browser's language. Unknown URLs show a branded 404 page.

## Run it on your computer

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm run build      # writes the finished site to out/
```

## Change things yourself

| What | Where |
|---|---|
| Any text (all languages) | `messages/en.json`, `messages/ar.json`, `messages/ja.json` — same keys in each file |
| WhatsApp number, email, Calendly link, Amazon link, social links | `src/content/site.ts` |
| Package prices | `src/content/pricing.ts` (names and features are in the `Pricing` section of the message files) |
| Services / solutions list | `src/content/services.ts`, `src/content/solutions.ts` (+ their copy under `Service` / `Solution` in the message files) |
| Book facts | `src/content/book.ts` (+ `Book` in the message files) |
| Colours and fonts | `src/app/globals.css` (`@theme` block) and `src/lib/fonts.ts` |
| Social share images | `npm run og` regenerates `public/og/{en,ar,ja}.png` from the hero headline |
| Service illustrations | `node scripts/make-illustrations.mjs` regenerates `public/images/services/*.svg` and `public/images/solutions/*.svg` |
| Photos and book covers | `public/images/profile/`, `public/images/book/` (keep the same file names to swap them) |

After changing text, run `npm test` — it fails if a language is missing a key or still has untranslated English.

**Add your X (Twitter) link:** set `x` in `src/content/site.ts`; the icon appears in the footer and founder page automatically.

## Deploy

### Vercel (current plan)
1. On vercel.com choose **Add New → Project** and import `Iqbalhossainshuvo/empowerofmarketing`.
2. Name the project **empowerofmarket** (the site then lives at `https://empowerofmarket.vercel.app`). Framework preset: **Next.js** (detected automatically). No other settings to change.
3. Optional: add the environment variable `NEXT_PUBLIC_SITE_URL` = your final address (e.g. `https://empowerofmarketing.com`) so links in Google and social previews use your domain. Without it they use `https://empowerofmarket.vercel.app`.
4. Every push to `main` redeploys.

> **Important:** Vercel's free *Hobby* plan is for non-commercial use only. A site that advertises paid services counts as commercial, so before you promote the site, upgrade to Vercel Pro or move it to another host (below).

### Any other host (cPanel, Cloudflare Pages, Netlify, …)
Run `npm run build` and upload the **contents of `out/`** to the site's public folder. `out/404.html` is the not-found page; most hosts use it automatically.

## Quality checks

```bash
npm run test:unit   # translations complete, contact links, prices
npm run test:e2e    # browser tests on the built site (run `npm run build` first)
npm run lint
```

The browser tests cover every page in all three languages: menus, language switching, Arabic right-to-left layout, the Calendly popup (and its fallback when Calendly is blocked), no third-party requests on load, SEO tags and sitemap, the 404 page, reduced-motion and no-JavaScript visitors, and phone layouts with no sideways scrolling.

## Still needed from Iqbal

- More professional photos (e.g. from LinkedIn) for the profile page gallery.
- X (Twitter) profile URL.
- Confirm or change package names and prices, and the legal line "Iqbal Hossain, operating as Empower of Marketing, Dammam, Saudi Arabia".
- Have a native Arabic and a native Japanese speaker read the copy before running paid ads in those languages.
- Test the Calendly popup with the real account once the site is live.

## Tech notes

- Next.js 16 App Router, static export (`output: "export"`), `next-intl` for languages, Tailwind CSS v4.
- Animations are CSS-only (plus a tiny counter script) and respect "reduce motion" settings; content is fully visible without JavaScript.
- Fonts are self-hosted (Sora + Inter Tight; Alexandria + IBM Plex Sans Arabic for Arabic). Japanese uses the high-quality fonts built into every operating system to avoid an ~800 KB download.
- Design spec, research and reference images: `docs/`.
