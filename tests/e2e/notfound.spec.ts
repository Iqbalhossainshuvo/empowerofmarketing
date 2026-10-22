import { test, expect } from "@playwright/test";

test("privacy policy covers the spec's points", async ({ page }) => {
  await page.goto("/en/privacy/");
  await expect(page.locator("h1")).toHaveText("Privacy Policy");
  const text = await page.locator("main").innerText();
  for (const s of ["Calendly", "WhatsApp", "GDPR", "PDPL", "APPI", "Iqbal Hossain, operating as Empower of Marketing, Dammam, Saudi Arabia", "Last updated"]) {
    expect(text).toContain(s);
  }
});

test("terms name Saudi law", async ({ page }) => {
  await page.goto("/en/terms/");
  await expect(page.locator("h1")).toHaveText("Terms of Use");
  await expect(page.locator("main")).toContainText("Kingdom of Saudi Arabia");
});

for (const path of ["/en/services/foo/", "/fr/", "/ja/nothing-here/"]) {
  test(`${path} shows the branded 404`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("wrong turn");
    await expect(page.locator('a[href="/en/"]').first()).toBeVisible();
    await expect(page.locator("[data-book-call]").first()).toBeVisible();
  });
}
