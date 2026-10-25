import { test, expect } from "@playwright/test";

const serviceSlugs = ["digital-marketing", "traditional-marketing", "business-growth", "business-setup", "ai-automation", "video-editing"];
const solutionSlugs = ["web-development", "ui-ux-design", "graphic-design", "documents", "travel-ticketing", "training", "manpower"];

for (const [base, slugs] of [["services", serviceSlugs], ["solutions", solutionSlugs]] as const) {
  for (const slug of slugs) {
    test(`/en/${base}/${slug}/ renders a complete page`, async ({ page }) => {
      const res = await page.goto(`/en/${base}/${slug}/`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByTestId("faq")).toBeVisible();
      await expect(page.getByTestId("related").locator("a")).toHaveCount(await page.getByTestId("related").locator("a").count());
      expect(await page.getByTestId("related").locator("a").count()).toBeGreaterThanOrEqual(2);
      await expect(page.locator("#cta-band-title")).toBeVisible();
      await expect(page.locator("main [data-book-call]").first()).toBeVisible();
    });
  }
}

for (const [base, slugs] of [["services", serviceSlugs], ["solutions", solutionSlugs]] as const) {
  test(`every ${base} page shows its own illustration with descriptive alt text and Service schema`, async ({ page }) => {
    for (const slug of slugs) {
      await page.goto(`/en/${base}/${slug}/`);
      const img = page.locator(`main img[src="/images/${base}/${slug}.svg"]`).first();
      await expect(img, slug).toBeVisible();
      expect((await img.getAttribute("alt"))?.length ?? 0, slug).toBeGreaterThan(30);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth), { message: slug }).toBeGreaterThan(0);
      const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((s) => JSON.parse(s));
      const svc = ld.find((d) => d["@type"] === "Service");
      expect(svc?.image, slug).toContain(`/images/${base}/${slug}.svg`);
    }
  });
}

test("Arabic illustrations use Arabic alt text", async ({ page }) => {
  await page.goto("/ar/services/ai-automation/");
  const alt = await page.locator('main img[src="/images/services/ai-automation.svg"]').first().getAttribute("alt");
  expect(alt).toMatch(/[؀-ۿ]/);
});

test("services index lists six services", async ({ page }) => {
  await page.goto("/en/services/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const slug of serviceSlugs) await expect(page.locator(`main a[href="/en/services/${slug}/"]`).first()).toBeVisible();
});

test("solutions index lists seven solutions", async ({ page }) => {
  await page.goto("/en/solutions/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const slug of solutionSlugs) await expect(page.locator(`main a[href="/en/solutions/${slug}/"]`).first()).toBeVisible();
});

test("a service page shows its pains, deliverables and outcomes", async ({ page }) => {
  await page.goto("/en/services/business-growth/");
  await expect(page.getByTestId("pains").locator("li")).toHaveCount(4);
  await expect(page.getByTestId("deliverables").locator("li")).toHaveCount(6);
  await expect(page.getByTestId("outcomes").locator("li")).toHaveCount(4);
});

test("language switch on a deep page keeps the page", async ({ page }) => {
  await page.goto("/en/services/business-growth/");
  await page.getByRole("button", { name: /language/i }).first().click();
  await page.getByRole("menuitem", { name: "العربية" }).click();
  await page.waitForURL("**/ar/services/business-growth/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});
