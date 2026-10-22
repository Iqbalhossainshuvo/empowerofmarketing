import { useTranslations } from "next-intl";
import { Check, Sparkles } from "lucide-react";
import { packages } from "@/content/pricing";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { Reveal } from "@/components/ui/Reveal";

export function PricingTable() {
  const t = useTranslations("Pricing");
  const tc = useTranslations("Common");
  return (
    <ul data-testid="packages" className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {packages.map((p, i) => {
        const features = t.raw(`packages.${p.id}.features`) as string[];
        const price =
          p.priceUsd === null ? tc("letsTalk") : p.priceUsd === 0 ? "$0" : `$${p.priceUsd}`;
        return (
          <Reveal
            as="li"
            key={p.id}
            variant="rise"
            delay={i * 80}
            className={p.featured ? "xl:-my-4" : ""}
          >
            <article
              data-testid="package"
              data-featured={p.featured}
              className={`relative flex h-full flex-col rounded-[1.75rem] p-7 ${
                p.featured
                  ? "glow-edge border border-mint/40 bg-gradient-to-b from-mint/[0.09] via-ink-900 to-ink-900 shadow-[0_30px_80px_-30px_rgb(124_245_180/0.5)]"
                  : "glass"
              }`}
            >
              {p.featured ? (
                <span className="absolute -top-3 start-7 inline-flex items-center gap-1 rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink-950">
                  <Sparkles aria-hidden className="size-3" />
                  {tc("mostPopular")}
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-white">{t(`packages.${p.id}.name`)}</h3>
              <p className="mt-1.5 min-h-[3rem] text-sm text-muted">{t(`packages.${p.id}.tagline`)}</p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5 whitespace-nowrap" dir="ltr">
                {p.priceUsd ? <span className="text-sm text-muted">{tc("startingFrom")}</span> : null}
                <span className="font-display text-[2.1rem] font-semibold text-white">{price}</span>
                {p.period === "month" ? <span className="text-sm text-muted">{tc("perMonth")}</span> : null}
                {p.period === "once" ? <span className="text-sm text-muted">{tc("oneTime")}</span> : null}
              </p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                {features.map((f, k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[0.93rem] text-fg">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-mint" />
                    {f}
                  </li>
                ))}
              </ul>
              <BookCallButton
                className="mt-8 w-full"
                variant={p.featured || p.id === "free" ? "primary" : "ghost"}
                packageId={p.id}
                label={t(`packages.${p.id}.cta`)}
              />
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
