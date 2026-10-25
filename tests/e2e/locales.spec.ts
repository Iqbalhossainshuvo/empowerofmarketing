import { test, expect } from "@playwright/test";

const paths = [
  "", "services/", "services/business-growth/", "services/ai-automation/", "solutions/", "solutions/travel-ticketing/",
  "pricing/", "about/", "book/", "profile/", "privacy/", "terms/",
];

for (const locale of ["ar", "ja"] as const) {
  test.describe(locale, () => {
    test("every page renders translated, with one h1 and no raw message keys", async ({ page }) => {
      for (const p of paths) {
        const res = await page.goto(`/${locale}/${p}`);
        expect(res?.status(), p).toBe(200);
        await expect(page.locator("h1"), p).toHaveCount(1);
        const text = await page.locator("body").innerText();
        expect(text, p).not.toMatch(/\b(Home|Service|Solution|Pricing|Common|Nav)\.[a-z]/);
        if (locale === "ar") expect(text, p).toMatch(/[؀-ۿ]/);
        if (locale === "ja") expect(text, p).toMatch(/[぀-ヿ]/);
      }
    });

    test("navigation menus work in this language", async ({ page }) => {
      await page.goto(`/${locale}/`);
      const nav = page.getByRole("navigation", { name: "Main" });
      await nav.getByRole("button").first().click();
      await expect(nav.locator(`a[href="/${locale}/services/digital-marketing/"]`)).toBeVisible();
    });

    test.describe("phone", () => {
      test.use({ viewport: { width: 360, height: 780 } });
      test("no horizontal overflow on key pages", async ({ page }) => {
        for (const p of ["", "pricing/", "book/", "services/business-setup/"]) {
          await page.goto(`/${locale}/${p}`);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, p).toBeLessThanOrEqual(0);
        }
      });
    });
  });
}
