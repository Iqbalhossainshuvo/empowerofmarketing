import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const SITE = "https://empowerofmarket.vercel.app";
const paths = [
  "",
  "services/",
  ...["digital-marketing", "traditional-marketing", "business-growth", "business-setup", "ai-automation", "video-editing"].map((s) => `services/${s}/`),
  "solutions/",
  ...["web-development", "ui-ux-design", "graphic-design", "documents", "travel-ticketing", "training", "manpower"].map((s) => `solutions/${s}/`),
  "pricing/", "about/", "book/", "profile/", "privacy/", "terms/",
];

test("every page has a unique title, description, canonical and hreflang alternates", async ({ page }) => {
  const titles = new Set<string>();
  for (const p of paths) {
    await page.goto(`/en/${p}`);
    const title = await page.title();
    expect(title, p).toContain("Empower of Marketing");
    titles.add(title);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.length ?? 0, p).toBeGreaterThan(40);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href"), p).toBe(`${SITE}/en/${p}`);
    for (const [lang, loc] of [["en", "en"], ["ar", "ar"], ["ja", "ja"], ["x-default", "en"]]) {
      expect(await page.locator(`link[rel="alternate"][hreflang="${lang}"]`).getAttribute("href"), `${p} ${lang}`).toBe(`${SITE}/${loc}/${p}`);
    }
    expect(await page.locator('meta[property="og:image"]').first().getAttribute("content"), p).toMatch(/\/og\/en\.png$/);
  }
  expect(titles.size).toBe(paths.length);
});

test("Arabic pages point to the Arabic OG image and canonical", async ({ page }) => {
  await page.goto("/ar/pricing/");
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(`${SITE}/ar/pricing/`);
  expect(await page.locator('meta[property="og:image"]').first().getAttribute("content")).toMatch(/\/og\/ar\.png$/);
});

test("sitemap lists every page in every language, but not the 404 page", () => {
  const xml = readFileSync("out/sitemap.xml", "utf8");
  for (const l of ["en", "ar", "ja"]) for (const p of paths) expect(xml).toContain(`<loc>${SITE}/${l}/${p}</loc>`);
  expect(xml).not.toContain("/lost/");
  expect(xml).toContain('hreflang="ar"');
});

test("robots.txt points to the sitemap", () => {
  expect(readFileSync("out/robots.txt", "utf8")).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("structured data: organization everywhere, book and person on their pages", async ({ page }) => {
  const ld = async () =>
    (await page.locator('script[type="application/ld+json"]').allTextContents()).map((s) => JSON.parse(s));
  await page.goto("/en/");
  expect((await ld()).some((d) => d["@type"] === "ProfessionalService" && d.name === "Empower of Marketing")).toBe(true);
  await page.goto("/en/book/");
  expect((await ld()).some((d) => d["@type"] === "Book" && d.author?.name === "Md. Iqbal Hossain")).toBe(true);
  await page.goto("/en/profile/");
  const person = (await ld()).find((d) => d["@type"] === "Person");
  expect(person?.name).toBe("Md. Iqbal Hossain");
  expect(person?.jobTitle).toBe("Performance Marketing Manager");
  expect(person?.image).toContain("/images/profile/");
});
