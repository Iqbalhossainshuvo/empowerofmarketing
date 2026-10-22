import { test } from "node:test";
import assert from "node:assert/strict";
import en from "../../messages/en.json";
import ar from "../../messages/ar.json";
import ja from "../../messages/ja.json";
import { services } from "../../src/content/services";
import { solutions } from "../../src/content/solutions";
import { packages } from "../../src/content/pricing";

type Tree = { [k: string]: unknown };

function flatten(obj: unknown, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => Object.assign(out, flatten(v, `${prefix}[${i}]`)));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Tree)) {
      Object.assign(out, flatten(v, prefix ? `${prefix}.${k}` : k));
    }
  } else {
    out[prefix] = obj;
  }
  return out;
}

const flat = { en: flatten(en), ar: flatten(ar), ja: flatten(ja) };

for (const locale of ["ar", "ja"] as const) {
  test(`${locale} has exactly the same keys as en`, () => {
    const enKeys = Object.keys(flat.en).sort();
    const otherKeys = Object.keys(flat[locale]).sort();
    const missing = enKeys.filter((k) => !(k in flat[locale]));
    const extra = otherKeys.filter((k) => !(k in flat.en));
    assert.deepEqual({ missing, extra }, { missing: [], extra: [] });
  });
}

for (const locale of ["en", "ar", "ja"] as const) {
  test(`${locale} has no empty strings`, () => {
    const empty = Object.entries(flat[locale])
      .filter(([, v]) => typeof v !== "string" || v.trim() === "")
      .map(([k]) => k);
    assert.deepEqual(empty, []);
  });
}

// Brand names and other text that legitimately stays the same in every language.
const sameEverywhere = new Set(["Empower of Marketing", "Md. Iqbal Hossain"]);

for (const locale of ["ar", "ja"] as const) {
  test(`${locale} copy is actually translated`, () => {
    const untranslated = Object.entries(flat.en)
      .filter(([k, v]) => typeof v === "string" && v.length > 20 && !sameEverywhere.has(v) && flat[locale][k] === v)
      .map(([k]) => k);
    assert.deepEqual(untranslated, []);
  });
}

test("Arabic copy is written in Arabic script, Japanese in Japanese script", () => {
  assert.ok(/[؀-ۿ]/.test(String(flat.ar["Home.hero.subtitle"])), "ar hero subtitle not Arabic");
  assert.ok(/[぀-ヿ一-鿿]/.test(String(flat.ja["Home.hero.subtitle"])), "ja hero subtitle not Japanese");
});

test("every service slug has its page copy", () => {
  for (const { slug } of services) {
    for (const part of ["title", "short", "hero", "pains", "deliverables", "outcomes", "forWho", "faq"]) {
      assert.ok(
        Object.keys(flat.en).some((k) => k.startsWith(`Service.${slug}.${part}`)),
        `missing Service.${slug}.${part}`,
      );
    }
  }
});

test("every solution slug has its page copy", () => {
  for (const { slug } of solutions) {
    for (const part of ["title", "short", "hero", "offer", "why", "faq"]) {
      assert.ok(
        Object.keys(flat.en).some((k) => k.startsWith(`Solution.${slug}.${part}`)),
        `missing Solution.${slug}.${part}`,
      );
    }
  }
});

test("every pricing package has its copy", () => {
  for (const { id } of packages) {
    for (const part of ["name", "tagline", "features", "cta"]) {
      assert.ok(
        Object.keys(flat.en).some((k) => k.startsWith(`Pricing.packages.${id}.${part}`)),
        `missing Pricing.packages.${id}.${part}`,
      );
    }
  }
});

test("content config has the spec's slugs and prices", () => {
  assert.deepEqual(
    services.map((s) => s.slug),
    ["digital-marketing", "traditional-marketing", "business-growth", "business-setup", "ai-automation", "video-editing"],
  );
  assert.deepEqual(
    solutions.map((s) => s.slug),
    ["web-development", "ui-ux-design", "graphic-design", "documents", "travel-ticketing", "training", "manpower"],
  );
  assert.deepEqual(
    packages.map((p) => [p.id, p.priceUsd, p.period, p.featured]),
    [
      ["free", 0, null, false],
      ["starter", 99, "once", false],
      ["growth", 299, "month", true],
      ["scale", 699, "month", false],
      ["custom", null, null, false],
    ],
  );
});

test("English copy contains no fake-proof or guarantee phrases", () => {
  const text = JSON.stringify(en).toLowerCase();
  for (const banned of ["testimonial", "trusted by", "guarantee", "$1m", "1 million"]) {
    assert.ok(!text.includes(banned), `found banned phrase: ${banned}`);
  }
});
