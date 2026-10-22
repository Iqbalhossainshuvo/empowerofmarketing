import { useTranslations } from "next-intl";
import { Reveal, Words } from "@/components/ui/Reveal";

export function LegalArticle({ namespace }: { namespace: "Privacy" | "Terms" }) {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as { h: string; p: string }[];
  return (
    <article className="relative isolate pt-32 pb-24 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] overflow-hidden">
        <div className="grid-bg" />
        <div className="aura -top-40 start-1/4 size-[32rem] bg-blue/25" />
      </div>
      <div className="container-x max-w-3xl">
        <h1 data-words className="text-[clamp(2.4rem,5vw,4rem)] font-semibold text-white">
          <Words text={t("title")} />
        </h1>
        <p className="mt-4 text-sm text-mint">{t("updated")}</p>
        <Reveal delay={150}>
          <p className="mt-8 text-lg text-fg">{t("intro")}</p>
        </Reveal>
        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="text-xl font-semibold text-white">{s.h}</h2>
              <p className="mt-3 text-muted">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-muted">{t("disclaimer")}</p>
      </div>
    </article>
  );
}
