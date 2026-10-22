// Renders public/og/{en,ar,ja}.png (1200×630 social share images). Run: node scripts/make-og.mjs
import { chromium } from "@playwright/test";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolve } from "node:path";

const exe = ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome", "/opt/google/chrome/chrome"].find(existsSync);
const font = (p) => `url(file://${resolve("node_modules", p)})`;
const jpCss = readFileSync("public/fonts/noto-sans-jp/index.css", "utf8").replace(/url\(\.\/files\//g, `url(file://${resolve("public/fonts/noto-sans-jp/files")}/`);
const msgs = Object.fromEntries(["en", "ar", "ja"].map((l) => [l, JSON.parse(readFileSync(`messages/${l}.json`, "utf8"))]));

const html = (l) => {
  const m = msgs[l];
  const dir = l === "ar" ? "rtl" : "ltr";
  return `<!doctype html><html lang="${l}" dir="${dir}"><head><meta charset="utf-8"><style>
@font-face{font-family:Sora;src:${font("@fontsource-variable/sora/files/sora-latin-wght-normal.woff2")};font-weight:100 900}
@font-face{font-family:Alex;src:${font("@fontsource-variable/alexandria/files/alexandria-arabic-wght-normal.woff2")};font-weight:100 900}
${jpCss}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#05070d;color:#fff;font-family:Sora,Alex,'Noto Sans JP Variable',sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 80% at 50% 40%,#000 30%,transparent 80%)}
.a1{position:absolute;width:560px;height:560px;border-radius:50%;background:#3b82f6;filter:blur(120px);opacity:.45;top:-160px;${dir === "rtl" ? "left" : "right"}:-80px}
.a2{position:absolute;width:420px;height:420px;border-radius:50%;background:#8b5cf6;filter:blur(120px);opacity:.35;bottom:-200px;${dir === "rtl" ? "right" : "left"}:120px}
.orb{position:absolute;width:300px;height:300px;border-radius:50%;top:150px;${dir === "rtl" ? "left" : "right"}:110px;background:radial-gradient(circle at 34% 28%,#fff 0%,#c7f9e2 6%,#7dd3fc 18%,#3b82f6 42%,#6d4fe0 68%,#1e1b4b 88%,#0a0f1e 100%);box-shadow:0 0 120px 30px rgba(96,165,250,.45)}
.ring{position:absolute;width:520px;height:180px;border:1.5px solid rgba(124,245,180,.55);border-radius:50%;top:210px;${dir === "rtl" ? "left" : "right"}:0;transform:rotate(-16deg)}
.c{position:absolute;inset:72px 80px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;letter-spacing:.06em;font-size:22px;direction:ltr}
.brand small{display:block;font-size:12px;letter-spacing:.3em;color:#9aa3b8;font-weight:500}
h1{margin-top:auto;font-size:${l === "en" ? 66 : 58}px;line-height:1.08;max-width:640px;font-weight:600;letter-spacing:${l === "en" ? "-.02em" : "0"}}
h1 span{background:linear-gradient(100deg,#7cf5b4,#60a5fa 50%,#8b5cf6);-webkit-background-clip:text;color:transparent}
p{margin-top:22px;font-size:22px;color:#9aa3b8;max-width:620px}
</style></head><body><div class="grid"></div><div class="a1"></div><div class="a2"></div><div class="ring"></div><div class="orb"></div>
<div class="c"><div class="brand"><svg width="44" height="44" viewBox="0 0 40 40"><defs><linearGradient id="g" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8b5cf6"/><stop offset=".55" stop-color="#3b82f6"/><stop offset="1" stop-color="#7cf5b4"/></linearGradient></defs><rect x="1" y="1" width="38" height="38" rx="11" fill="#0a0f1e" stroke="url(#g)" stroke-width="1.5"/><path d="M11 27 L18.5 19.5 L23 24 L30 14" fill="none" stroke="url(#g)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.5 13.5 H30.5 V19.5" fill="none" stroke="#7cf5b4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><div>EMPOWER<small>OF MARKETING</small></div></div>
<h1>${m.Home.hero.titleA} <span>${m.Home.hero.titleHighlight}</span></h1><p>${m.Home.hero.badge}</p></div></body></html>`;
};

const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const l of ["en", "ar", "ja"]) {
  // Load from a file:// URL so the local font files are allowed to load.
  const file = join(mkdtempSync(join(tmpdir(), "og-")), `${l}.html`);
  writeFileSync(file, html(l));
  await page.goto(`file://${file}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${l}.png` });
  console.log(`public/og/${l}.png`);
}
await browser.close();
