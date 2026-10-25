import { metaFor } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  MousePointerClick,
  Search,
  Store,
  Target,
} from "lucide-react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";
import { Link } from "@/i18n/navigation";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Eyebrow, IconTile, SectionHeading } from "@/components/ui/primitives";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Illustration } from "@/components/ui/Illustration";
import { BookCover, covers } from "@/components/pages/BookMockup";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { JsonLd } from "@/components/JsonLd";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "profile", "profile/");
}

const PHOTO = "/images/profile/md-iqbal-hossain-digital-marketing-specialist.webp";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const tb = useTranslations("Book");
  const tS = useTranslations("Service");
  const tc = useTranslations("Common");
  const facts = t.raw("facts") as { value: string; label: string }[];
  const summary = t.raw("summary") as string[];
  const skills = t.raw("skills") as { title: string; text: string }[];
  const tools = t.raw("tools") as string[];
  const experience = t.raw("experience") as { role: string; org: string; where: string; when: string; points: string[] }[];
  const education = t.raw("education") as { degree: string; school: string; when: string }[];
  const certs = t.raw("certs") as string[];
  const langs = t.raw("languages") as { name: string; level: string }[];
  const industries = t.raw("industries") as string[];
  const skillIcons = [Target, Search, BarChart3, MousePointerClick, Store, Bot];
  const links = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Medium", href: site.social.medium },
    ...(site.social.x ? [{ label: "X", href: site.social.x }] : []),
  ];

  return (
    <>
      {/* Hero: photo + headline */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg" />
          <div className="aura -top-40 start-1/4 size-[40rem] bg-blue/30" />
          <div className="aura top-40 end-[-10%] size-[28rem] bg-violet/25" />
        </div>
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal immediate variant="scale" className="flex justify-center">
            <div className="relative w-[min(360px,78vw)]">
              <div aria-hidden className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-mint/50 via-blue/40 to-violet/50 opacity-70 blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized */}
                <img src={PHOTO} alt={t("hero.photoAlt")} width={394} height={389} fetchPriority="high" className="block aspect-square w-full object-cover" />
              </div>
              <span className="glass absolute -bottom-4 start-[-6%] rounded-2xl bg-ink-900/80 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
                {t("hero.chip1")}
              </span>
              <span className="glass absolute -top-3 end-[-6%] rounded-2xl bg-ink-900/80 px-4 py-2.5 text-xs font-semibold text-mint shadow-xl">
                {t("hero.chip2")}
              </span>
            </div>
          </Reveal>
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 id="page-title" data-words-intro className="text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.02] font-semibold text-white">
              <Words text={t("hero.name")} />
            </h1>
            <Reveal immediate delay={200}>
              <p className="mt-4 text-lg font-semibold text-mint">{t("hero.role")}</p>
              <p className="mt-5 max-w-xl text-lg text-fg md:text-xl">{t("hero.intro")}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-fg">
                  <MapPin aria-hidden className="size-4 text-violet" />
                  {t("hero.location")}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1.5 text-mint">
                  <span className="size-2 rounded-full bg-mint" />
                  {t("hero.open")}
                </li>
              </ul>
            </Reveal>
            <Reveal immediate delay={320} className="mt-8 flex flex-wrap gap-3">
              <GlowAnchor href={mailtoUrl(t("contactTitle"))} icon={<Mail aria-hidden className="size-4" />}>
                {t("hero.email")}
              </GlowAnchor>
              {links.map((l) => (
                <GlowAnchor key={l.label} variant="ghost" href={l.href} target="_blank" rel="noopener" icon={<ArrowUpRight aria-hidden className="size-4" />}>
                  {l.label}
                </GlowAnchor>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section aria-labelledby="facts-title" className="pb-8">
        <h2 id="facts-title" className="sr-only">{t("factsTitle")}</h2>
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label} className="bg-ink-950 px-4 py-8 text-center">
                <p dir="ltr" className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white">{f.value}</p>
                <p className="mt-1 text-sm text-muted">{f.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Summary + tools */}
      <section aria-labelledby="summary-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-testid="summary">
            <h2 id="summary-title" className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold text-white">{t("summaryTitle")}</h2>
            <div className="mt-6 space-y-5">
              {summary.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className={i === 0 ? "text-xl leading-relaxed text-fg md:text-2xl" : "text-lg text-muted"}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="slide" className="glass glow-edge self-start rounded-[2rem] p-8">
            <div data-testid="tools">
              <h2 className="text-xl font-semibold text-white">{t("toolsTitle")}</h2>
              <ul className="mt-6 flex flex-wrap gap-2" dir="ltr">
                {tools.map((e) => (
                  <li key={e} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-fg">{e}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-title" className="section bg-ink-900/60">
        <div className="container-x" data-testid="skills">
          <div id="skills-title"><SectionHeading title={t("skillsTitle")} /></div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal as="li" key={s.title} variant="blur" delay={(i % 3) * 90} className="glass glow-edge rounded-3xl p-7">
                <IconTile icon={skillIcons[i]} />
                <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience timeline + education, certifications, languages, industries */}
      <section aria-labelledby="exp-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div data-testid="experience">
            <h2 id="exp-title" className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold text-white">{t("experienceTitle")}</h2>
            <ol className="relative mt-10 space-y-10 border-s border-white/10 ps-8">
              {experience.map((e, i) => (
                <Reveal as="li" key={e.role + e.when} delay={Math.min(i, 3) * 100} className="relative">
                  <span aria-hidden className="absolute -start-[2.65rem] top-0.5 grid size-9 place-items-center rounded-full border border-white/15 bg-ink-900 text-mint shadow-[0_0_20px_-4px_rgb(124_245_180/0.8)]">
                    <BriefcaseBusiness className="size-4" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold text-white">{e.role}</h3>
                    <span dir="auto" className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-fg">{e.when}</span>
                  </div>
                  <p className="mt-1.5 text-sm">
                    <span className="font-semibold text-mint" translate="no">{e.org}</span>
                    <span className="text-muted"> · {e.where}</span>
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-fg">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-mint" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="grid content-start gap-6">
            <Reveal className="rounded-[2rem] border border-white/10 p-7">
              <div data-testid="education">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <GraduationCap aria-hidden className="size-5 text-violet" />
                  {t("educationTitle")}
                </h2>
                <ul className="mt-5 space-y-4">
                  {education.map((ed) => (
                    <li key={ed.degree}>
                      <p className="font-semibold text-white">{ed.degree}</p>
                      <p className="text-sm text-muted">{ed.school}</p>
                      <p dir="ltr" className="mt-0.5 text-xs font-semibold text-mint rtl:text-end">{ed.when}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80} className="rounded-[2rem] border border-white/10 p-7">
              <div data-testid="training">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Award aria-hidden className="size-5 text-gold" />
                  {t("certTitle")}
                </h2>
                <ul className="mt-5 space-y-3">
                  {certs.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-fg">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div data-testid="languages" className="rounded-[2rem] border border-white/10 p-7">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Languages aria-hidden className="size-5 text-sky" />
                  {t("languagesTitle")}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {langs.map((l) => (
                    <li key={l.name} className="flex items-center justify-between gap-4 text-fg">
                      {l.name}
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-testid="industries" className="rounded-[2rem] border border-white/10 p-7">
                <h2 className="text-xl font-semibold text-white">{t("industriesTitle")}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <li key={ind} className="glass rounded-full px-3 py-1.5 text-sm text-fg">{ind}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160} className="glass glow-edge overflow-hidden rounded-[2rem] p-7">
              <div data-testid="publication">
                <h2 className="text-xl font-semibold text-white">{t("publicationsTitle")}</h2>
                <div className="mt-6 flex items-end justify-center gap-4">
                  <BookCover src={covers.en} alt={tb("coverAlt")} size="sm" />
                  <div className="hidden sm:block">
                    <BookCover src={covers.bn} alt={tb("bangla.alt")} size="sm" tilt="right" />
                  </div>
                </div>
                <p className="mt-8 text-sm text-muted">{t("publication")}</p>
                <Link href="/book" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:underline">
                  {tb("hero.eyebrow")}: Empire of Marketing
                  <ArrowUpRight aria-hidden className="flip-rtl size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services as visual portfolio */}
      <section aria-labelledby="pservices-title" className="section !pt-0">
        <div className="container-x" data-testid="profile-services">
          <div id="pservices-title"><SectionHeading title={t("servicesTitle")} subtitle={t("servicesSubtitle")} /></div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ slug }, i) => (
              <Reveal as="li" key={slug} variant="rise" delay={(i % 3) * 90}>
                <Link href={`/services/${slug}`} className="glass glow-edge group block overflow-hidden rounded-3xl">
                  <span className="block overflow-hidden">
                    <Illustration kind="services" slug={slug} alt={tS(`${slug}.imageAlt`)} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                  </span>
                  <span className="block border-t border-white/10 px-6 py-5 font-semibold text-white">{tS(`${slug}.title`)}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Personal contact */}
      <section aria-labelledby="pcontact-title" className="section !pt-0">
        <div className="container-x">
          <Reveal variant="scale" className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue/20 via-ink-900 to-violet/20 p-10 md:flex md:items-center md:justify-between md:gap-10 md:p-14">
            <div className="max-w-2xl">
              <h2 id="pcontact-title" className="text-3xl font-semibold text-white md:text-4xl">{t("contactTitle")}</h2>
              <p className="mt-4 text-lg text-muted">{t("contactText")}</p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
              <GlowAnchor href={mailtoUrl(t("contactTitle"))} icon={<Mail aria-hidden className="size-4" />}>
                {site.email}
              </GlowAnchor>
              <GlowAnchor variant="ghost" href={whatsappUrl(tc("whatsappPrefill"))} target="_blank" rel="noopener" icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}>
                <span dir="ltr">{site.whatsappDisplay}</span>
              </GlowAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Md. Iqbal Hossain",
          jobTitle: "Performance Marketing Manager",
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "National University, Bangladesh" },
            { "@type": "EducationalOrganization", name: "Bangladesh Technical Education Board" },
          ],
          knowsLanguage: ["en", "bn", "ar"],
          image: `${site.url}${PHOTO}`,
          email: `mailto:${site.email}`,
          address: { "@type": "PostalAddress", addressCountry: "SA" },
          knowsAbout: ["Performance marketing", "Google Ads", "Meta Ads", "TikTok Ads", "SEO", "Google Analytics 4", "Google Tag Manager", "Conversion rate optimization"],
          sameAs: links.map((l) => l.href),
        }}
      />
    </>
  );
}
