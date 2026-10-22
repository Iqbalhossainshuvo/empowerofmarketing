"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Bot, Rocket, Shuffle, TrendingDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ServiceSlug } from "@/content/services";
import type { PackageId } from "@/content/pricing";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { buttonClass } from "@/components/ui/GlowButton";

const situations: { key: "start" | "nosales" | "messy" | "ai"; icon: typeof Bot; service: ServiceSlug; pkg: PackageId }[] = [
  { key: "start", icon: Rocket, service: "business-setup", pkg: "custom" },
  { key: "nosales", icon: TrendingDown, service: "business-growth", pkg: "growth" },
  { key: "messy", icon: Shuffle, service: "business-growth", pkg: "starter" },
  { key: "ai", icon: Bot, service: "ai-automation", pkg: "scale" },
];

/** The page's one interactive moment: pick your situation, see where we'd start. */
export function WhichOneAreYou() {
  const t = useTranslations("Home.which");
  const tS = useTranslations("Service");
  const tP = useTranslations("Pricing.packages");
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % 4
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i + 3) % 4
      : e.key === "Home" ? 0
      : e.key === "End" ? 3
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const s = situations[active];
  const Icon = s.icon;

  return (
    <div data-testid="which" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
      <div role="tablist" aria-orientation="vertical" aria-label={t("eyebrow")} className="grid gap-3">
        {situations.map((it, i) => {
          const selected = i === active;
          const ItIcon = it.icon;
          return (
            <button
              key={it.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`which-tab-${it.key}`}
              aria-selected={selected}
              aria-controls="which-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-start transition-[border-color,background-color,box-shadow] duration-300 ${
                selected
                  ? "border-mint/50 bg-mint/[0.07] shadow-[0_0_40px_-12px_rgb(124_245_180/0.6)]"
                  : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                  selected ? "bg-mint text-ink-950" : "bg-white/[0.07] text-sky group-hover:text-mint"
                }`}
              >
                <ItIcon aria-hidden className="size-5" />
              </span>
              <span className="text-[1.05rem] font-semibold text-white">{t(`items.${it.key}.title`)}</span>
              <ArrowRight
                aria-hidden
                className={`flip-rtl ms-auto size-5 shrink-0 transition-colors ${selected ? "text-mint" : "text-white/20 group-hover:text-white/50"}`}
              />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="which-panel"
        aria-labelledby={`which-tab-${s.key}`}
        className="glass glow-edge relative overflow-hidden rounded-3xl p-7 md:p-10"
      >
        <div aria-hidden className="aura -top-24 end-[-4rem] size-72 bg-blue/35" />
        <div key={s.key} className="relative motion-safe:animate-[which-in_0.5s_cubic-bezier(0.16,1,0.3,1)]">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue/30 to-violet/30 text-white shadow-[0_0_40px_-8px_rgb(96_165_250/0.8)]">
            <Icon aria-hidden className="size-7" />
          </span>
          <p className="mt-6 text-xl leading-relaxed text-fg md:text-2xl">“{t(`items.${s.key}.pain`)}”</p>
          <p className="mt-5 text-lg text-muted">{t(`items.${s.key}.promise`)}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-muted">{t("recommended")}</dt>
              <dd className="mt-1 font-semibold text-white">{tS(`${s.service}.title`)}</dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <dt className="text-xs font-medium text-muted">{t("package")}</dt>
              <dd className="mt-1 font-semibold text-white">{tP(`${s.pkg}.name`)}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link data-testid="which-cta" href={`/services/${s.service}`} className={buttonClass("ghost")}>
              {t(`items.${s.key}.cta`)}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </Link>
            <BookCallButton packageId={s.pkg} />
          </div>
        </div>
      </div>
    </div>
  );
}
