"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export type ProofItem = { image: string; w: number; h: number; title: string; caption: string };

/** Grid of platform screenshots that open full-size in a lightbox (native <dialog>, keyboard friendly). */
export function ProofGallery({ items, labels }: { items: ProofItem[]; labels: { open: string; close: string; prev: string; next: string } }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));
  const current = index === null ? null : items[index];

  return (
    <>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" data-testid="proof-gallery">
        {items.map((it, i) => (
          <li key={it.image} data-reveal="rise" style={{ "--d": (i % 5) * 70 } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${labels.open}: ${it.title}`}
              className="glass glow-edge group block w-full overflow-hidden rounded-3xl text-start"
            >
              <span className="relative block aspect-[16/11] overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized */}
                <img
                  src={it.image}
                  alt={it.caption}
                  width={it.w}
                  height={it.h}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink-950/0 opacity-0 transition duration-300 group-hover:bg-ink-950/45 group-hover:opacity-100 group-focus-visible:bg-ink-950/45 group-focus-visible:opacity-100">
                  <span className="grid size-11 place-items-center rounded-full bg-white/90 text-ink-950">
                    <Expand aria-hidden className="size-5" />
                  </span>
                </span>
              </span>
              <span className="block border-t border-white/10 px-5 py-4">
                <span className="block font-semibold text-white">{it.title}</span>
                <span className="mt-1 block text-xs text-muted">{it.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialogRef.current && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(document.dir === "rtl" ? -1 : 1);
          if (e.key === "ArrowLeft") step(document.dir === "rtl" ? 1 : -1);
        }}
        aria-label={current?.title}
        className="m-auto max-h-[92vh] w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 text-fg backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <figure className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={current.image}
              alt={current.caption}
              width={current.w}
              height={current.h}
              className="mx-auto max-h-[78vh] w-auto rounded-2xl bg-white object-contain shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)]"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span>
                <span className="block font-semibold text-white">{current.title}</span>
                <span className="text-sm text-muted">{current.caption}</span>
              </span>
              <span className="flex items-center gap-2">
                <span dir="ltr" className="me-2 text-xs text-muted">{(index ?? 0) + 1} / {items.length}</span>
                <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="glass grid size-10 place-items-center rounded-full text-white hover:bg-white/10">
                  <ChevronLeft aria-hidden className="flip-rtl size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={labels.next} className="glass grid size-10 place-items-center rounded-full text-white hover:bg-white/10">
                  <ChevronRight aria-hidden className="flip-rtl size-5" />
                </button>
                <button type="button" onClick={() => setIndex(null)} aria-label={labels.close} className="grid size-10 place-items-center rounded-full bg-white text-ink-950 hover:bg-mint">
                  <X aria-hidden className="size-5" />
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
