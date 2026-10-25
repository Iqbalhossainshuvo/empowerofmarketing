import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/en/");
});

test("one h1 and hero calls to action", async ({ page }) => {
  await expect(page.locator("h1")).toHaveCount(1);
  const hero = page.getByTestId("hero");
  await expect(hero.locator("[data-book-call]")).toBeVisible();
  await expect(hero.locator('a[href^="https://wa.me/966510356264"]')).toBeVisible();
});

test("proof strip shows only true facts", async ({ page }) => {
  const proof = page.getByTestId("proof");
  await expect(proof).toContainText("13");
  await expect(proof).toContainText("50+");
  await expect(proof).toContainText("3");
  await expect(proof).toContainText(/playbook/i);
  await expect(proof).not.toContainText("6+");
  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("testimonial");
  expect(body).not.toContain("trusted by");
});

test("'Which one are you?' selector leads each situation to the right service", async ({ page }) => {
  const which = page.getByTestId("which");
  const tabs = which.getByRole("tab");
  await expect(tabs).toHaveCount(4);
  const expected = [
    "/en/services/business-setup/",
    "/en/services/business-growth/",
    "/en/services/business-growth/",
    "/en/services/ai-automation/",
  ];
  for (let i = 0; i < 4; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    await expect(which.getByRole("tabpanel").getByTestId("which-cta")).toHaveAttribute("href", expected[i]);
  }
});

test("'Which one are you?' supports arrow keys", async ({ page }) => {
  const tabs = page.getByTestId("which").getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
});

test("six service cards, four process steps, FAQ accordion", async ({ page }) => {
  const services = page.getByTestId("services-grid");
  await expect(services.locator('a[href^="/en/services/"]')).toHaveCount(6);
  await expect(services.locator('img[src^="/images/services/"]')).toHaveCount(6);
  await expect(page.getByTestId("process").locator("li")).toHaveCount(4);
  const faq = page.getByTestId("faq");
  const second = faq.getByRole("button").nth(1);
  await expect(second).toHaveAttribute("aria-expanded", "false");
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
});

test("service cards list what each service includes", async ({ page }) => {
  const cards = page.getByTestId("services-grid").locator(":scope > li");
  await expect(cards).toHaveCount(6);
  for (let i = 0; i < 6; i++) await expect(cards.nth(i).locator("ul li")).toHaveCount(3);
});

test("success section shows four journeys with milestones and an honest note", async ({ page }) => {
  const success = page.getByTestId("success");
  await expect(success.locator("article")).toHaveCount(4);
  for (let i = 0; i < 4; i++) await expect(success.locator("article").nth(i).locator("ol li")).toHaveCount(4);
  await expect(success).toContainText(/not promises/i);
});

test("solutions showcase links all seven solutions with illustrations", async ({ page }) => {
  const sol = page.getByTestId("solutions-home");
  await expect(sol.locator('a[href^="/en/solutions/"][href$="/"]').filter({ has: page.locator("img") })).toHaveCount(7);
  await expect(sol.locator('a[href="/en/solutions/"]')).toBeVisible();
});

test("book teaser shows both real covers", async ({ page }) => {
  const teaser = page.getByTestId("book-teaser");
  await expect(teaser.locator('img[src*="english-edition"]')).toHaveCount(1);
  await expect(teaser.locator('img[src*="bangla-edition"]')).toHaveCount(1);
});

test("book teaser links to the book page", async ({ page }) => {
  await expect(page.getByTestId("book-teaser").locator('a[href="/en/book/"]')).toBeVisible();
});
