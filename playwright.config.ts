import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

// Use a locally installed Chromium when Playwright's own download is unavailable.
const localChrome = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/opt/google/chrome/chrome",
].find((p): p is string => !!p && existsSync(p));

const PORT = 4173;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    launchOptions: localChrome ? { executablePath: localChrome } : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx serve out -l ${PORT} -c ../tests/serve.json`,
    url: `http://localhost:${PORT}/en/`,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
