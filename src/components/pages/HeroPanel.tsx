import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

/** Glass panel for inner-page heroes: a glowing icon with the real list of what's included. */
export function HeroPanel({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden className="absolute inset-[10%] rounded-full bg-blue/30 blur-3xl" />
      <div className="glass glow-edge relative rounded-[2rem] bg-ink-900/50 p-7 md:p-8">
        <div className="flex items-center gap-4">
          <span className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue/40 to-violet/40 text-white shadow-[0_0_50px_-6px_rgb(96_165_250/0.9)]">
            <Icon aria-hidden className="size-8" strokeWidth={1.6} />
            <span aria-hidden className="absolute -inset-2 rounded-[1.4rem] border border-white/10 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]" />
          </span>
          <p className="text-sm font-semibold text-muted">{title}</p>
        </div>
        <ul className="mt-7 space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3 text-[0.95rem] text-fg"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
                <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
