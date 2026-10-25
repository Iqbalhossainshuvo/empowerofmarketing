import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/** Company facts (not personal CV numbers). */
export function ProofStrip() {
  const t = useTranslations("Home.proof");
  const items = [
    { value: <Counter to={services.length + solutions.length} />, label: t("services") },
    { value: <Counter to={50} suffix="+" />, label: t("clients") },
    { value: <Counter to={3} />, label: t("languages") },
    { value: <BookOpen aria-hidden className="size-9 text-mint" strokeWidth={1.5} />, label: t("author") },
  ];
  return (
    <section data-testid="proof" aria-labelledby="proof-title" className="relative">
      <h2 id="proof-title" className="sr-only">{t("title")}</h2>
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-4">
          {items.map((it, i) => (
            <Reveal as="li" key={i} variant="scale" delay={i * 90} className="bg-ink-950 px-6 py-8 text-center md:py-10">
              <p dir="ltr" className="flex h-12 items-center justify-center font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold text-white">
                {it.value}
              </p>
              <p className="mt-2 text-sm text-muted">{it.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
