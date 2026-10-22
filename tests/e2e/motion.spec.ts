import { test, expect } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("every section heading is fully visible", async ({ page }) => {
    await page.goto("/en/");
    const opacities = await page.$$eval("main h1, main h2", (els) =>
      els.map((el) => Number(getComputedStyle(el).opacity)),
    );
    expect(opacities.length).toBeGreaterThan(4);
    expect(opacities.every((o) => o === 1)).toBe(true);
    const words = await page.$$eval("main [data-words] .w", (els) =>
      els.map((el) => Number(getComputedStyle(el).opacity)),
    );
    expect(words.every((o) => o === 1)).toBe(true);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("headline and content are readable", async ({ page }) => {
    await page.goto("/en/");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    expect(Number(await h1.evaluate((el) => getComputedStyle(el.querySelector(".w") ?? el).opacity))).toBe(1);
    const hidden = await page.$$eval("[data-reveal]", (els) =>
      els.filter((el) => Number(getComputedStyle(el).opacity) < 1).length,
    );
    expect(hidden).toBe(0);
  });
});

test("scrolled sections become visible with JS", async ({ page }) => {
  await page.goto("/en/");
  const faq = page.getByTestId("faq");
  await faq.scrollIntoViewIfNeeded();
  await expect(faq.locator("h2")).toHaveClass(/is-in/);
});
