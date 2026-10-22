import { test, expect } from "@playwright/test";

test.describe("locale routing", () => {
  test("/en/ is English and left-to-right", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("/ar/ is Arabic and right-to-left", async ({ page }) => {
    await page.goto("/ar/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("/ja/ is Japanese", async ({ page }) => {
    await page.goto("/ja/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });
});

test.describe("bare / picks a language from the browser", () => {
  for (const [browserLocale, expected] of [
    ["ar-SA", "/ar/"],
    ["ja-JP", "/ja/"],
    ["de-DE", "/en/"],
  ] as const) {
    test(`${browserLocale} lands on ${expected}`, async ({ browser }) => {
      const context = await browser.newContext({ locale: browserLocale });
      const page = await context.newPage();
      await page.goto("/");
      await page.waitForURL(`**${expected}`);
      expect(new URL(page.url()).pathname).toBe(expected);
      await context.close();
    });
  }
});
