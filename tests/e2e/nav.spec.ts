import { test, expect } from "@playwright/test";

const serviceSlugs = ["digital-marketing", "traditional-marketing", "business-growth", "business-setup", "ai-automation", "video-editing"];
const solutionSlugs = ["web-development", "ui-ux-design", "graphic-design", "documents", "travel-ticketing", "training", "manpower"];

test("main menu has the six top items and no Founder link", async ({ page }) => {
  await page.goto("/en/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const name of ["Home", "Services", "Solutions", "Pricing", "About Us", "Book"]) {
    await expect(nav.getByRole(/^(Services|Solutions)$/.test(name) ? "button" : "link", { name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("banner").getByRole("link", { name: /founder/i })).toHaveCount(0);
});

test("Services dropdown lists the six services, Solutions the seven solutions", async ({ page }) => {
  await page.goto("/en/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("button", { name: "Services", exact: true }).click();
  for (const slug of serviceSlugs) await expect(nav.locator(`a[href="/en/services/${slug}/"]`)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav.locator('a[href="/en/services/digital-marketing/"]')).toBeHidden();
  await nav.getByRole("button", { name: "Solutions", exact: true }).click();
  for (const slug of solutionSlugs) await expect(nav.locator(`a[href="/en/solutions/${slug}/"]`)).toBeVisible();
});

test("footer has Founder, Privacy and Terms links", async ({ page }) => {
  await page.goto("/en/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.locator('a[href="/en/founder/"]')).toBeVisible();
  await expect(footer.locator('a[href="/en/privacy/"]')).toBeVisible();
  await expect(footer.locator('a[href="/en/terms/"]')).toBeVisible();
});

test("language switch keeps the visitor on the same page", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("button", { name: /language/i }).first().click();
  await page.getByRole("menuitem", { name: "日本語" }).click();
  await page.waitForURL("**/ja/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
});

test("floating WhatsApp button opens a prefilled chat", async ({ page }) => {
  await page.goto("/en/");
  const href = await page.getByTestId("whatsapp-float").getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/966510356264\?text=.+/);
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test("menu opens as a dialog, holds focus and closes with Escape", async ({ page }) => {
    await page.goto("/en/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Pricing" })).toBeVisible();
    for (let i = 0; i < 25; i++) await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
