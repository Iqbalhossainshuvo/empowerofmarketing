import { metaFor } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { GlowAnchor, GlowLink } from "@/components/ui/GlowButton";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/JsonLd";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "founder", "founder/");
}

export default function FounderPage() {
  const t = useTranslations("Founder");
  const tn = useTranslations("Nav");
  const about = t.raw("about") as string[];
  const expertise = t.raw("expertise") as string[];
  const facts = t.raw("facts") as { value: string; label: string }[];
  const links = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Medium", href: site.social.medium },
    ...(site.social.x ? [{ label: "X", href: site.social.x }] : []),
  ];

  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg" />
          <div className="aura -top-40 start-1/3 size-[40rem] bg-blue/30" />
        </div>
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal immediate variant="scale" className="flex justify-center">
            <div className="relative grid aspect-square w-[min(320px,70vw)] place-items-center">
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-br from-mint/40 via-blue/40 to-violet/50 blur-2xl" />
              <div aria-hidden className="absolute inset-0 rounded-full border border-white/15 motion-safe:animate-[spin-slow_40s_linear_infinite] [background:conic-gradient(from_0deg,transparent,rgba(124,245,180,0.5),transparent_30%)]" />
              <div className="relative grid size-[82%] place-items-center rounded-full border border-white/15 bg-ink-900" role="img" aria-label="Md. Iqbal Hossain">
                <span className="font-display text-7xl font-bold text-gradient" dir="ltr">IH</span>
              </div>
            </div>
          </Reveal>
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 id="page-title" data-words-intro className="text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.02] font-semibold text-white">
              <Words text={t("hero.name")} />
            </h1>
            <Reveal immediate delay={200}>
              <p className="mt-4 text-lg text-mint">{t("hero.role")}</p>
              <p className="mt-6 max-w-xl font-display text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-white">{t("hero.intro")}</p>
            </Reveal>
            <Reveal immediate delay={320} className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <GlowAnchor key={l.label} variant="ghost" href={l.href} target="_blank" rel="noopener" icon={<ArrowUpRight aria-hidden className="size-4" />}>
                  {l.label}
                </GlowAnchor>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="facts-title" className="pb-8">
        <h2 id="facts-title" className="sr-only">{t("factsTitle")}</h2>
        <div className="container-x">
          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]">
            {facts.map((f) => (
              <li key={f.label} className="bg-ink-950 px-4 py-8 text-center">
                <p dir="ltr" className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white">{f.value}</p>
                <p className="mt-1 text-sm text-muted">{f.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bio-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 id="bio-title" className="sr-only">{t("hero.eyebrow")}</h2>
            {about.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={i === 0 ? "text-xl leading-relaxed text-fg md:text-2xl" : "text-lg text-muted"}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={300} className="flex flex-wrap gap-3 pt-2">
              <GlowLink href="/book" variant="ghost">{tn("book")}</GlowLink>
              <GlowLink href="/about" variant="ghost">{tn("about")}</GlowLink>
            </Reveal>
          </div>
          <Reveal variant="slide" className="glass glow-edge self-start rounded-[2rem] p-8">
            <h2 className="text-xl font-semibold text-white">{t("expertiseTitle")}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {expertise.map((e) => (
                <li key={e} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-fg">{e}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Md. Iqbal Hossain",
          jobTitle: "Founder",
          worksFor: { "@type": "Organization", name: site.name },
          sameAs: links.map((l) => l.href),
        }}
      />
    </>
  );
}
