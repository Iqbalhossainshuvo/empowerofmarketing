import { metaFor } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import { Eye, Globe2, Handshake, Lightbulb, Ruler, ShieldCheck, Target, Users } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile, SectionHeading } from "@/components/ui/primitives";
import { GlowLink } from "@/components/ui/GlowButton";
import { CtaBand } from "@/components/layout/CtaBand";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "about", "about/");
}

export default function AboutPage() {
  const t = useTranslations("About");
  const tf = useTranslations("Footer");
  const story = t.raw("story") as string[];
  const approach = t.raw("approach") as { title: string; text: string }[];
  const values = t.raw("values") as { title: string; text: string }[];
  const markets = t.raw("markets") as string[];
  const approachIcons = [Eye, Ruler, Users, Target];
  const valueIcons = [ShieldCheck, Lightbulb, Handshake, Users];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section aria-labelledby="story-title" className="section !pt-4">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="story-title" className="text-[clamp(2rem,4vw,3.2rem)] font-semibold text-white">{t("storyTitle")}</h2>
          <div className="space-y-6">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={i === 0 ? "text-xl leading-relaxed text-fg md:text-2xl" : "text-lg text-muted"}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <GlowLink href="/profile" variant="ghost">{tf("profile")}</GlowLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-title" className="section !pt-0">
        <div className="container-x">
          <Reveal variant="scale" className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue/20 via-ink-900 to-violet/20 p-10 text-center md:p-16">
            <div aria-hidden className="grid-bg opacity-60" />
            <h2 id="mission-title" className="relative text-sm font-semibold text-mint">{t("missionTitle")}</h2>
            <p className="relative mx-auto mt-5 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-snug font-semibold text-white">
              {t("mission")}
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section !pt-0">
        <div className="container-x">
          <div id="approach-title"><SectionHeading title={t("approachTitle")} /></div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal as="li" key={i} variant="rise" delay={i * 100} className="glass glow-edge rounded-3xl p-7">
                <IconTile icon={approachIcons[i]} />
                <h3 className="mt-6 text-lg font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-muted">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values-title" className="section bg-ink-900/60">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <div id="values-title"><SectionHeading title={t("valuesTitle")} /></div>
            <div data-testid="markets" className="mt-12">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Globe2 aria-hidden className="size-5 text-mint" />
                {t("marketsTitle")}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {markets.map((m) => (
                  <li key={m} className="glass rounded-full px-4 py-2 text-sm text-fg">{m}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{t("marketsNote")}</p>
            </div>
          </div>
          <ul data-testid="values" className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal as="li" key={i} variant="slide" delay={i * 90} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <Icon aria-hidden className="size-6 text-sky" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
