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

test.describe("profile", () => {
  test.beforeEach(async ({ page }) => page.goto("/en/profile/"));

  test("is a professional profile with photo, never calls him founder", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Md. Iqbal Hossain");
    await expect(page.locator("main")).toContainText("Performance Marketing Manager");
    const photo = page.locator('main img[src="/images/profile/md-iqbal-hossain-digital-marketing-specialist.webp"]');
    await expect(photo).toBeVisible();
    expect(await photo.getAttribute("alt")).toMatch(/Iqbal Hossain/);
    expect((await page.locator("main").innerText()).toLowerCase()).not.toContain("founder");
    expect((await page.title()).toLowerCase()).not.toContain("founder");
  });

  test("shows CV sections: skills, tools, experience, training, publication, services", async ({ page }) => {
    for (const id of ["summary", "skills", "tools", "experience", "education", "training", "languages", "industries", "publication", "profile-services"]) {
      await expect(page.getByTestId(id), id).toBeVisible();
    }
    await expect(page.getByTestId("tools")).toContainText("Google Analytics 4");
    await expect(page.getByTestId("training")).toContainText("Amadeus GDS");
    await expect(page.getByTestId("training").locator("li")).toHaveCount(7);
    const exp = page.getByTestId("experience");
    await expect(exp.locator("ol > li")).toHaveCount(5);
    for (const org of ["Sky Touch International", "Digital IT Zone", "Nano Deb Lab", "Fly Bird Express"]) await expect(exp).toContainText(org);
    await expect(exp).toContainText("2025 – Present");
    await expect(page.getByTestId("education")).toContainText("National University");
    await expect(page.getByTestId("languages")).toContainText("Bengali");
    await expect(page.locator("main")).toContainText("3×");
    await expect(page.getByTestId("profile-services").locator('img[src^="/images/services/"]')).toHaveCount(6);
    await expect(page.getByTestId("publication").locator("img")).toHaveCount(2);
  });

  test("links to LinkedIn, Medium and email; hides X until provided", async ({ page }) => {
    await expect(page.locator('main a[href="https://www.linkedin.com/in/mdiqbalhossainmarketingspecialist"]').first()).toBeVisible();
    await expect(page.locator('main a[href="https://medium.com/@mdiqbalhossain203050"]').first()).toBeVisible();
    await expect(page.locator('main a[href^="mailto:empireofmarketing4@gmail.com"]').first()).toBeVisible();
    await expect(page.locator('main a[href*="x.com"], main a[href*="twitter.com"]')).toHaveCount(0);
  });

  test("is not linked from the header, only the footer", async ({ page }) => {
    await expect(page.getByRole("banner").locator('a[href="/en/profile/"]')).toHaveCount(0);
    await expect(page.getByRole("contentinfo").locator('a[href="/en/profile/"]')).toBeVisible();
  });
});

test("about page has story, approach, values and markets", async ({ page }) => {
  await page.goto("/en/about/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const m of ["USA", "Canada", "Europe", "Saudi Arabia", "Japan"]) await expect(page.getByTestId("markets")).toContainText(m);
  await expect(page.getByTestId("values").locator("li")).toHaveCount(4);
});
