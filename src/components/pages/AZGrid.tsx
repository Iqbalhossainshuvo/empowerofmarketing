"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { chapterLetters } from "@/content/book";

/** 26 glowing letter tiles; choosing one shows that chapter's theme. */
export function AZGrid() {
  const t = useTranslations("Book.chapters");
  const [active, setActive] = useState(0);
  const letter = chapterLetters[active];
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div data-testid="az-grid" className="grid grid-cols-6 gap-2 sm:grid-cols-9 lg:grid-cols-7 xl:grid-cols-9" dir="ltr">
        {chapterLetters.map((l, i) => {
          const on = i === active;
          return (
            <button
              key={l}
              type="button"
              aria-pressed={on}
              aria-label={`${l} — ${t(l)}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`grid aspect-square place-items-center rounded-xl border font-display text-lg font-semibold transition-[transform,border-color,background-color,color,box-shadow] duration-300 md:text-xl ${
                on
                  ? "scale-110 border-mint/60 bg-mint/15 text-mint shadow-[0_0_30px_-4px_rgb(124_245_180/0.8)]"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>
      <div data-testid="az-detail" aria-live="polite" className="glass glow-edge relative overflow-hidden rounded-3xl p-8">
        <div aria-hidden className="aura -end-16 -top-16 size-56 bg-blue/40" />
        <p className="relative font-display text-7xl leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_rgb(124_245_180/0.8)]" dir="ltr">
          {letter}
        </p>
        <p className="relative mt-5 text-2xl font-semibold text-white">{t(letter)}</p>
      </div>
    </div>
  );
}
