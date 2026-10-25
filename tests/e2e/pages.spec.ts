import { test, expect } from "@playwright/test";

test.describe("pricing", () => {
  test("shows five packages with the spec's prices", async ({ page }) => {
    await page.goto("/en/pricing/");
    const cards = page.getByTestId("package");
    await expect(cards).toHaveCount(5);
    const text = await page.getByTestId("packages").innerText();
    for (const s of ["$0", "$99", "$299", "$699", "Let's talk"]) expect(text).toContain(s);
    await expect(page.locator('[data-testid="package"][data-featured="true"]')).toContainText("Most popular");
    await expect(page.locator('[data-testid="package"][data-featured="true"]')).toContainText("Growth");
    await expect(page.getByText(/Ad spend is paid directly/)).toBeVisible();
  });

  test("every package button books a call", async ({ page }) => {
    await page.goto("/en/pricing/");
    const buttons = page.getByTestId("package").locator("[data-book-call]");
    await expect(buttons).toHaveCount(5);
    for (const href of await buttons.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
      expect(href).toBe("https://calendly.com/iqbalshuvo/discuss-problem-solution-growth");
    }
  });
});

test.describe("book", () => {
  test.beforeEach(async ({ page }) => page.goto("/en/book/"));

  test("title, author and Amazon link", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Empire of Marketing");
    await expect(page.locator("main")).toContainText("Md. Iqbal Hossain");
    const amazon = page.locator('main a[href="https://www.amazon.com/dp/B0H71PC4QF"]').first();
    await expect(amazon).toBeVisible();
    await expect(amazon).toHaveAttribute("target", "_blank");
    expect(await amazon.getAttribute("rel")).toContain("noopener");
  });

  test("shows the real English cover and a separate Bangla edition with its cover", async ({ page }) => {
    const en = page.locator('main img[src="/images/book/empire-of-marketing-english-edition-cover.webp"]').first();
    await expect(en).toBeVisible();
    expect(await en.getAttribute("alt")).toMatch(/English edition/);
    expect(await en.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    const bangla = page.locator("section", { has: page.locator("#bangla-title") });
    await bangla.scrollIntoViewIfNeeded();
    await expect(bangla.locator('img[src="/images/book/empire-of-marketing-bangla-edition-cover.webp"]')).toBeVisible();
    await expect(bangla).toContainText("এম্পায়ার অব মার্কেটিং");
    await expect(bangla.locator('a[href^="https://wa.me/966510356264"]')).toBeVisible();
  });

  test("A–Z grid has 26 chapters and the journey has 9 steps", async ({ page }) => {
    const tiles = page.getByTestId("az-grid").getByRole("button");
    await expect(tiles).toHaveCount(26);
    await expect(tiles.first()).toContainText("A");
    await expect(tiles.last()).toContainText("Z");
    await tiles.nth(18).click();
    await expect(page.getByTestId("az-detail")).toContainText("Search, SEO & Discovery");
    await expect(page.getByTestId("journey").locator("li")).toHaveCount(9);
  });
});

test.describe("founder", () => {
  test("links to LinkedIn and Medium, hides X until provided", async ({ page }) => {
    await page.goto("/en/founder/");
    await expect(page.locator("h1")).toContainText("Md. Iqbal Hossain");
    await expect(page.locator('main a[href="https://www.linkedin.com/in/mdiqbalhossainmarketingspecialist"]')).toBeVisible();
    await expect(page.locator('main a[href="https://medium.com/@mdiqbalhossain203050"]')).toBeVisible();
    await expect(page.locator('main a[href*="x.com"], main a[href*="twitter.com"]')).toHaveCount(0);
  });

  test("is not linked from the header", async ({ page }) => {
    await page.goto("/en/founder/");
    await expect(page.getByRole("banner").locator('a[href="/en/founder/"]')).toHaveCount(0);
  });
});

test("about page has story, approach, values and markets", async ({ page }) => {
  await page.goto("/en/about/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const m of ["USA", "Canada", "Europe", "Saudi Arabia", "Japan"]) await expect(page.getByTestId("markets")).toContainText(m);
  await expect(page.getByTestId("values").locator("li")).toHaveCount(4);
});
