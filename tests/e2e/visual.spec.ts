import { test, expect } from "@playwright/test";

const pages = ["", "services/business-growth/", "solutions/web-development/", "pricing/", "book/", "about/", "founder/"];

for (const width of [390, 1440]) {
  for (const locale of ["en", "ar", "ja"]) {
    test(`${locale} @${width}: no sideways scroll, no console errors`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      for (const p of pages) {
        await page.goto(`/${locale}/${p}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${locale}/${p}`).toBeLessThanOrEqual(0);
        if (p === "" || p === "pricing/") {
          await page.screenshot({ path: `test-results/screens/${locale}-${p.replace(/\//g, "") || "home"}-${width}.png`, fullPage: false });
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

test("headlines stay within two lines on phones (English)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const offenders: string[] = [];
  for (const p of pages) {
    await page.goto(`/en/${p}`);
    const tall = await page.$$eval("main h2", (els) =>
      els
        .filter((el) => getComputedStyle(el).position !== "absolute" && !el.classList.contains("sr-only"))
        .filter((el) => {
          const lh = parseFloat(getComputedStyle(el).lineHeight) || parseFloat(getComputedStyle(el).fontSize) * 1.1;
          return el.getBoundingClientRect().height / lh > 4.2;
        })
        .map((el) => el.textContent?.slice(0, 40) ?? ""),
    );
    offenders.push(...tall.map((t) => `${p}: ${t}`));
  }
  expect(offenders).toEqual([]);
});
