import { useTranslations } from "next-intl";
import { journeySteps } from "@/content/book";
import { Reveal } from "@/components/ui/Reveal";

/** The book's nine-step customer journey as a glowing connected line. */
export function JourneyLine() {
  const t = useTranslations("Book.journey");
  return (
    <ol data-testid="journey" className="relative grid grid-cols-3 gap-x-3 gap-y-10 md:grid-cols-9 md:gap-3">
      <Reveal variant="draw" className="absolute inset-x-[5%] top-6 hidden h-px md:block">
        <div aria-hidden className="h-px w-full bg-gradient-to-r from-mint via-sky to-violet shadow-[0_0_14px_1px_rgb(96_165_250/0.8)]" />
      </Reveal>
      {journeySteps.map((s, i) => (
        <Reveal as="li" key={s} variant="scale" delay={i * 90} className="relative flex flex-col items-center text-center">
          <span className="relative z-10 grid size-12 place-items-center rounded-full border border-white/15 bg-ink-900 shadow-[0_0_0_6px_rgb(5_7_13),0_0_24px_-4px_rgb(96_165_250/0.9)]">
            <span className={`size-2.5 rounded-full ${i === journeySteps.length - 1 ? "bg-mint" : "bg-sky"}`} />
          </span>
          <span className="mt-4 text-sm font-semibold text-white">{t(s)}</span>
        </Reveal>
      ))}
    </ol>
  );
}
