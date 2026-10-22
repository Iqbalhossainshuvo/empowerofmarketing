import { useTranslations } from "next-intl";
import { Check, CircleAlert, Target, X } from "lucide-react";
import { services, type ServiceSlug } from "@/content/services";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { CtaBand } from "@/components/layout/CtaBand";
import { Faq, ProcessSteps } from "@/components/home/sections";
import { whatsappUrl } from "@/lib/contact";
import { PageHero } from "./PageHero";
import { HeroPanel } from "./HeroPanel";
import { Related } from "./Related";

// Which services naturally go together (shown as "You may also need").
const relatedMap: Record<ServiceSlug, ServiceSlug[]> = {
  "digital-marketing": ["video-editing", "business-growth", "ai-automation"],
  "traditional-marketing": ["digital-marketing", "business-growth", "video-editing"],
  "business-growth": ["digital-marketing", "ai-automation", "business-setup"],
  "business-setup": ["business-growth", "digital-marketing", "traditional-marketing"],
  "ai-automation": ["business-growth", "digital-marketing", "video-editing"],
  "video-editing": ["digital-marketing", "traditional-marketing", "ai-automation"],
};

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations(`Service.${slug}`);
  const tS = useTranslations("Service");
  const tp = useTranslations("ServicePage");
  const tc = useTranslations("Common");
  const icon = services.find((s) => s.slug === slug)!.icon;

  const pains = t.raw("pains") as string[];
  const deliverables = t.raw("deliverables") as { title: string; text: string }[];
  const outcomes = t.raw("outcomes") as string[];
  const forWho = t.raw("forWho") as { yes: string[]; no: string[] };
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <BookCallButton packageId={slug} />
            <GlowAnchor
              variant="ghost"
              href={whatsappUrl(`${tc("whatsappPrefill")} (${t("title")})`)}
              target="_blank"
              rel="noopener"
              icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}
            >
              {tc("whatsapp")}
            </GlowAnchor>
          </>
        }
        visual={<HeroPanel icon={icon} title={tp("includedTitle")} items={deliverables.map((d) => d.title)} />}
      />

      {/* Pains */}
      <section aria-labelledby="pains-title" className="section !pt-8">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div id="pains-title">
            <SectionHeading title={tp("painsTitle")} subtitle={tp("painsSubtitle")} />
          </div>
          <ul data-testid="pains" className="grid gap-3">
            {pains.map((p, i) => (
              <Reveal as="li" key={i} variant="slide" delay={i * 90} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-violet" />
                <span className="text-[1.05rem] text-fg">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Deliverables */}
      <section aria-labelledby="deliv-title" className="section relative isolate bg-ink-900/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="aura top-1/4 end-[-10%] size-[28rem] bg-blue/20" />
        </div>
        <div className="container-x">
          <div id="deliv-title">
            <SectionHeading title={tp("deliverablesTitle")} subtitle={tp("deliverablesSubtitle")} />
          </div>
          <ul data-testid="deliverables" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal as="li" key={i} variant="blur" delay={(i % 3) * 90}>
                <div className="glass glow-edge h-full rounded-3xl p-7">
                  <span className="font-display text-sm font-semibold text-mint">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-2 text-muted">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps testId="service-process" />

      {/* Outcomes + who it's for */}
      <section aria-labelledby="outcomes-title" className="section !pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue/15 via-ink-900 to-violet/15 p-8 md:p-10">
            <Target aria-hidden className="size-8 text-mint" />
            <h2 id="outcomes-title" className="mt-5 text-3xl font-semibold text-white">{tp("outcomesTitle")}</h2>
            <ul data-testid="outcomes" className="mt-7 space-y-3.5">
              {outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[1.05rem] text-fg">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink-950">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm text-muted">{tp("outcomesNote")}</p>
          </Reveal>
          <Reveal delay={120} className="grid gap-6">
            <div className="glass rounded-[2rem] p-8">
              <h2 className="text-xl font-semibold text-white">{tp("forTitle")}</h2>
              <ul className="mt-5 space-y-3">
                {forWho.yes.map((y, i) => (
                  <li key={i} className="flex items-start gap-3 text-fg">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-mint" />
                    {y}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 p-8">
              <h2 className="text-xl font-semibold text-white">{tp("notForTitle")}</h2>
              <ul className="mt-5 space-y-3">
                {forWho.no.map((n, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <X aria-hidden className="mt-1 size-4 shrink-0 text-violet" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq namespace="ServicePage.faq" items={faq} />
      <CtaBand />
      <Related
        items={relatedMap[slug].map((s) => ({
          href: `/services/${s}`,
          title: tS(`${s}.title`),
          short: tS(`${s}.short`),
          icon: services.find((x) => x.slug === s)!.icon,
        }))}
      />
    </>
  );
}
