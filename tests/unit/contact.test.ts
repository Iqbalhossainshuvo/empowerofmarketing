import { test } from "node:test";
import assert from "node:assert/strict";
import { whatsappUrl, mailtoUrl } from "../../src/lib/contact";
import { site } from "../../src/content/site";

test("whatsappUrl builds a wa.me link with encoded text", () => {
  assert.equal(
    whatsappUrl("Hi there"),
    "https://wa.me/966510356264?text=Hi%20there",
  );
});

test("whatsappUrl encodes non-latin text", () => {
  assert.equal(
    whatsappUrl("مرحبا"),
    `https://wa.me/966510356264?text=${encodeURIComponent("مرحبا")}`,
  );
});

test("mailtoUrl builds a mailto link with an encoded subject", () => {
  assert.equal(
    mailtoUrl("Hello"),
    "mailto:empireofmarketing4@gmail.com?subject=Hello",
  );
});

test("site holds the spec's contact values", () => {
  assert.equal(site.calendlyUrl, "https://calendly.com/iqbalshuvo/discuss-problem-solution-growth");
  assert.equal(site.amazonUrl, "https://www.amazon.com/dp/B0H71PC4QF");
  assert.equal(site.social.x, null);
});

test("every illustration is valid XML (browsers refuse to show broken SVG in <img>)", async () => {
  const { readdirSync, readFileSync } = await import("node:fs");
  for (const dir of ["services", "solutions"]) {
    for (const f of readdirSync(`public/images/${dir}`)) {
      const xml = readFileSync(`public/images/${dir}/${f}`, "utf8");
      // duplicate attributes are the classic hand-written SVG mistake
      for (const tag of xml.match(/<[a-zA-Z][^>]*>/g) ?? []) {
        const names = [...tag.matchAll(/\s([a-zA-Z:-]+)=/g)].map((m) => m[1]);
        assert.equal(new Set(names).size, names.length, `${dir}/${f}: duplicate attribute in ${tag.slice(0, 80)}`);
      }
      assert.ok(xml.trimStart().startsWith("<svg") && xml.trimEnd().endsWith("</svg>"), `${dir}/${f}: not a complete SVG`);
    }
  }
});
