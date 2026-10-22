// Usage: node tests/tools/shoot.mjs <path> <outPrefix> [widths]  — full-page screenshots of the built site
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
const [, , path = "/en/", out = "shot", widths = "1440,390"] = process.argv;
const server = spawn("npx", ["serve", "out", "-l", "4180", "-c", "../tests/serve.json"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2500));
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const w of widths.split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`http://localhost:4180${path}`, { waitUntil: "networkidle" });
  // reveal everything (scroll through the page)
  for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}-${w}.png`, fullPage: true });
  console.log(`${out}-${w}.png`);
}
await browser.close();
server.kill();
