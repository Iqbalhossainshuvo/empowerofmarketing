import { test, expect } from "@playwright/test";

test("Arabic header is mirrored: logo on the right, call button on the left", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ar/");
  const header = page.getByRole("banner");
  const logo = await header.getByTestId("logo-link").boundingBox();
  const cta = await header.getByTestId("header-cta").boundingBox();
  expect(logo && cta).toBeTruthy();
  expect(logo!.x).toBeGreaterThan(cta!.x);
});

test("English header: logo on the left", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  const header = page.getByRole("banner");
  const logo = await header.getByTestId("logo-link").boundingBox();
  const cta = await header.getByTestId("header-cta").boundingBox();
  expect(logo!.x).toBeLessThan(cta!.x);
});
