import { useTranslations } from "next-intl";
import { ArrowRight, Compass, Globe2, Layers, Workflow } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { book } from "@/content/book";
import { Accordion } from "@/components/ui/Accordion";
import { GlowLink } from "@/components/ui/GlowButton";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile, SectionHeading } from "@/components/ui/primitives";
import { BookMockup } from "@/components/pages/BookMockup";
import { WhichOneAreYou } from "./WhichOneAreYou";

export function WhichSection() {
  const t = useTranslations("Home.which");
  return (
    <section aria-labelledby="which-title" className="section">
      <div className="container-x">
        <div id="which-title">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        </div>
        <Reveal className="mt-12">
          <WhichOneAreYou />
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  const t = useTranslations("Home.servicesSection");
  const tS = useTranslations("Service");
  const tc = useTranslations("Common");
  return (
    <section aria-labelledby="services-title" className="section relative isolate overflow-hidden bg-ink-900/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aura top-1/3 start-[-15%] size-[30rem] bg-violet/20" />
      </div>
      <div className="container-x">
        <div id="services-title">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        </div>
        <ul data-testid="services-grid" className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, icon }, i) => (
            <Reveal as="li" key={slug} variant="blur" delay={(i % 3) * 90}>
              <Link
                href={`/services/${slug}`}
                className="glass glow-edge group flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
              >
                <IconTile icon={icon} />
                <h3 className="mt-6 text-xl font-semibold text-white">{tS(`${slug}.title`)}</h3>
                <p className="mt-2.5 flex-1 text-muted">{tS(`${slug}.short`)}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint">
                  {tc("learnMore")}
                  <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProcessSteps({ testId = "process", withHeading = true }: { testId?: string; withHeading?: boolean }) {
  const t = useTranslations("Home.process");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section aria-labelledby={`${testId}-title`} className="section">
      <div className="container-x">
        <div id={`${testId}-title`}>
          {withHeading ? <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} align="center" /> : null}
        </div>
        <ol data-testid={testId} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* glowing connector */}
          <Reveal variant="draw" className="absolute inset-x-[12%] top-7 hidden h-px md:block">
            <div aria-hidden className="h-px w-full bg-gradient-to-r from-mint via-sky to-violet shadow-[0_0_12px_1px_rgb(96_165_250/0.8)]" />
          </Reveal>
          {steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 140} className="relative text-center">
              <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border border-white/15 bg-ink-900 font-display text-lg font-semibold text-white shadow-[0_0_0_6px_rgb(5_7_13),0_0_30px_-4px_rgb(96_165_250/0.8)]">
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  const t = useTranslations("Home.why");
  const items = t.raw("items") as { title: string; text: string }[];
  const icons = [Layers, Compass, Workflow, Globe2];
  return (
    <section aria-labelledby="why-title" className="section relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aura bottom-0 end-[-10%] size-[30rem] bg-blue/20" />
      </div>
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div id="why-title" className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal as="li" key={i} variant="slide" delay={i * 100} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
              <div className="glass glow-edge h-full rounded-3xl p-7">
                <IconTile icon={icons[i]} />
                <h3 className="mt-6 text-lg font-semibold text-white">{it.title}</h3>
                <p className="mt-2 text-muted">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BookTeaser() {
  const t = useTranslations("Home.bookTeaser");
  return (
    <section data-testid="book-teaser" aria-labelledby="book-teaser-title" className="section">
      <div className="container-x">
        <div className="relative isolate grid items-center gap-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8 md:grid-cols-2 md:p-14">
          <div aria-hidden className="aura -start-20 top-0 size-96 bg-violet/30" />
          <Reveal variant="tilt" className="flex justify-center">
            <BookMockup title={book.title} author={book.author} />
          </Reveal>
          <div>
            <p className="mb-4 text-sm font-semibold text-mint">{t("eyebrow")}</p>
            <h2 id="book-teaser-title" className="text-[clamp(1.9rem,4vw,3rem)] font-semibold text-white">{t("title")}</h2>
            <Reveal delay={120}>
              <p className="mt-5 text-lg text-muted">{t("text")}</p>
            </Reveal>
            <Reveal delay={220} className="mt-8">
              <GlowLink href="/book" variant="ghost" icon={<ArrowRight aria-hidden className="flip-rtl size-4" />}>
                {t("learn")}
              </GlowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ namespace = "Home.faq", items: override }: { namespace?: string; items?: { q: string; a: string }[] }) {
  const t = useTranslations(namespace);
  const items = override ?? (t.raw("items") as { q: string; a: string }[]);
  return (
    <section data-testid="faq" aria-labelledby="faq-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div id="faq-title">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </div>
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
