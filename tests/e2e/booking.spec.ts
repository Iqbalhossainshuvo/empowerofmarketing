import { test, expect, type Page } from "@playwright/test";

const CALENDLY = "https://calendly.com/iqbalshuvo/discuss-problem-solution-growth";

async function stubCalendlyPage(page: Page) {
  // The booking page itself is external; serve a stub so new tabs load offline.
  await page.context().route("https://calendly.com/**", (r) =>
    r.fulfill({ contentType: "text/html", body: "<title>Calendly stub</title>" }),
  );
}

test("Book a Free Call opens the Calendly popup when the widget loads", async ({ page }) => {
  await stubCalendlyPage(page);
  await page.route("https://assets.calendly.com/assets/external/widget.js", (r) =>
    r.fulfill({
      contentType: "application/javascript",
      body: "window.Calendly={initPopupWidget:function(o){window.__calendly=o;}};",
    }),
  );
  await page.route("https://assets.calendly.com/assets/external/widget.css", (r) =>
    r.fulfill({ contentType: "text/css", body: "" }),
  );
  await page.goto("/en/");
  await page.getByTestId("header-cta").click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __calendly?: { url: string } }).__calendly?.url)).toBe(CALENDLY);
});

test("Book a Free Call falls back to a new tab when Calendly is blocked", async ({ page }) => {
  await stubCalendlyPage(page);
  await page.route("https://assets.calendly.com/**", (r) => r.abort());
  await page.goto("/en/");
  const [popup] = await Promise.all([
    page.context().waitForEvent("page", { timeout: 8000 }),
    page.getByTestId("header-cta").click(),
  ]);
  await popup.waitForLoadState();
  expect(popup.url()).toContain("calendly.com/iqbalshuvo/discuss-problem-solution-growth");
});

test("no third-party request happens on page load", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (req) => {
    const u = new URL(req.url());
    if (u.hostname !== "localhost") external.push(req.url());
  });
  await page.goto("/en/");
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
});
