import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/primitives";
import type { LucideIcon } from "lucide-react";

export function Related({ items }: { items: { href: string; title: string; short: string; icon: LucideIcon }[] }) {
  const tc = useTranslations("Common");
  return (
    <section aria-labelledby="related-title" className="section !pt-0">
      <div className="container-x">
        <h2 id="related-title" className="text-2xl font-semibold text-white md:text-3xl">{tc("related")}</h2>
        <ul data-testid="related" className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal as="li" key={it.href} delay={i * 90}>
              <Link href={it.href} className="glass glow-edge group flex h-full items-start gap-4 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
                <IconTile icon={it.icon} />
                <span>
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    {it.title}
                    <ArrowRight aria-hidden className="flip-rtl size-4 text-mint opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-sm text-muted">{it.short}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
