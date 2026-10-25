import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { solutions, type SolutionSlug } from "@/content/solutions";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { CtaBand } from "@/components/layout/CtaBand";
import { Faq } from "@/components/home/sections";
import { whatsappUrl } from "@/lib/contact";
import { PageHero } from "./PageHero";
import { Illustration, illustrationSrc } from "@/components/ui/Illustration";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { Related } from "./Related";
import { SolutionSteps } from "./SolutionSteps";

const relatedMap: Record<SolutionSlug, SolutionSlug[]> = {
  "web-development": ["ui-ux-design", "graphic-design", "documents"],
  "ui-ux-design": ["web-development", "graphic-design", "training"],
  "graphic-design": ["web-development", "documents", "ui-ux-design"],
  documents: ["graphic-design", "travel-ticketing", "manpower"],
  "travel-ticketing": ["documents", "manpower", "training"],
  training: ["manpower", "documents", "web-development"],
  manpower: ["training", "documents", "travel-ticketing"],
};

export function SolutionPage({ slug }: { slug: SolutionSlug }) {
  const t = useTranslations(`Solution.${slug}`);
  const tSo = useTranslations("Solution");
  const tp = useTranslations("SolutionPage");
  const tc = useTranslations("Common");
  const offer = t.raw("offer") as { title: string; text: string }[];
  const why = t.raw("why") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <PageHero
        tone="violet"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <GlowAnchor
              href={whatsappUrl(`${tc("whatsappPrefill")} (${t("title")})`)}
              target="_blank"
              rel="noopener"
              icon={<WhatsAppIcon className="size-4" />}
            >
              {tc("whatsapp")}
            </GlowAnchor>
            <BookCallButton variant="ghost" packageId={slug} />
          </>
        }
        visual={
          <div className="relative mx-auto w-full max-w-xl">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-blue/30 blur-3xl" />
            <div className="glow-edge relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
              <Illustration kind="solutions" slug={slug} alt={t("imageAlt")} priority />
            </div>
          </div>
        }
      />

      <section aria-labelledby="offer-title" className="section !pt-8">
        <div className="container-x">
          <div id="offer-title">
            <SectionHeading title={tp("offerTitle")} subtitle={tp("offerSubtitle")} />
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {offer.map((o, i) => (
              <Reveal as="li" key={i} variant="rise" delay={(i % 2) * 100}>
                <div className="glass glow-edge h-full rounded-3xl p-7 md:p-8">
                  <h3 className="text-xl font-semibold text-white">{o.title}</h3>
                  <p className="mt-2 text-muted">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-sol-title" className="section !pt-0">
        <div className="container-x">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet/15 via-ink-900 to-blue/15 p-8 md:p-12">
            <h2 id="why-sol-title" className="text-3xl font-semibold text-white">{tp("whyTitle")}</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {why.map((w, i) => (
                <Reveal as="li" key={i} variant="scale" delay={i * 100} className="flex items-start gap-3 rounded-2xl bg-white/[0.05] p-5 text-fg">
                  <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" />
                  {w}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SolutionSteps />
      <Faq namespace="SolutionPage.faq" items={faq} />
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: t("title"),
          serviceType: t("title"),
          description: t("short"),
          image: `${site.url}${illustrationSrc("solutions", slug)}`,
          provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
          areaServed: ["US", "CA", "EU", "SA", "JP"],
        }}
      />
      <Related
        items={relatedMap[slug].map((s) => ({
          href: `/solutions/${s}`,
          title: tSo(`${s}.title`),
          short: tSo(`${s}.short`),
          icon: solutions.find((x) => x.slug === s)!.icon,
        }))}
      />
    </>
  );
}
