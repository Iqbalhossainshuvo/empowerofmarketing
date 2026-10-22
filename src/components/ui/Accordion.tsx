"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-p${i}`;
        return (
          <li key={i}>
            <h3 className="text-base">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start text-[1.05rem] font-semibold text-white transition-colors hover:bg-white/[0.03] md:px-8"
              >
                <span>{item.q}</span>
                <Plus
                  aria-hidden
                  className={`size-5 shrink-0 text-mint transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className="px-6 pb-6 text-muted md:px-8"
            >
              <p className="max-w-3xl">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
