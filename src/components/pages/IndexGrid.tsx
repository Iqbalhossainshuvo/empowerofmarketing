import { useTranslations } from "next-intl";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/primitives";

/** Large linked cards for the Services and Solutions overview pages. */
export function IndexGrid({ items }: { items: { href: string; title: string; short: string; icon: LucideIcon }[] }) {
  const tc = useTranslations("Common");
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal as="li" key={it.href} variant={i % 2 ? "slide" : "rise"} delay={(i % 2) * 100}>
          <Link
            href={it.href}
            className="glass glow-edge group flex h-full flex-col gap-6 rounded-[2rem] p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 sm:flex-row sm:items-start md:p-10"
          >
            <IconTile icon={it.icon} size="lg" />
            <span className="flex-1">
              <span className="block text-2xl font-semibold text-white">{it.title}</span>
              <span className="mt-3 block text-muted">{it.short}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint">
                {tc("explore")}
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
