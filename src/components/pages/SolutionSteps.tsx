import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function SolutionSteps() {
  const t = useTranslations("SolutionsIndex");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section aria-labelledby="sol-steps-title" className="section !pt-0">
      <div className="container-x">
        <h2 id="sol-steps-title" className="text-center text-3xl font-semibold text-white md:text-4xl">{t("stepsTitle")}</h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 120} className="relative rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <span className="font-display text-5xl font-semibold text-transparent [-webkit-text-stroke:1px_rgb(124_245_180/0.6)]">{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
