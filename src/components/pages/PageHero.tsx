import type { ReactNode } from "react";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/primitives";

/** Inner-page hero: headline on one side, a visual on the other. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  visual,
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  visual?: ReactNode;
  tone?: "blue" | "violet";
}) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg" />
        <div className={`aura -top-48 start-[-8%] size-[38rem] ${tone === "blue" ? "bg-blue/30" : "bg-violet/30"}`} />
        <div className={`aura top-10 end-[-12%] size-[30rem] ${tone === "blue" ? "bg-violet/20" : "bg-blue/25"}`} />
      </div>
      <div className={`container-x grid items-center gap-14 ${visual ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div className={visual ? "" : "max-w-4xl"}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="page-title" data-words-intro className="text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.04] font-semibold text-white">
            <Words text={title} />
          </h1>
          <Reveal immediate delay={260}>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{subtitle}</p>
          </Reveal>
          {actions ? (
            <Reveal immediate delay={380} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actions}
            </Reveal>
          ) : null}
        </div>
        {visual ? (
          <Reveal immediate variant="scale" delay={200}>
            {visual}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
