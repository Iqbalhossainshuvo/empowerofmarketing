import { metaFor } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import { ArrowUpRight, BookOpen, Check, User } from "lucide-react";
import { book } from "@/content/book";
import { site } from "@/content/site";
import { BookCover, covers } from "@/components/pages/BookMockup";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { AZGrid } from "@/components/pages/AZGrid";
import { JourneyLine } from "@/components/pages/JourneyLine";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/JsonLd";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return metaFor(params, "book", "book/");
}

export default function BookPage() {
  const t = useTranslations("Book");
  const tc = useTranslations("Common");
  const description = t.raw("description") as string[];
  const learn = t.raw("learn") as string[];
  const forWho = t.raw("forWho") as string[];

  const amazon = (variant: "primary" | "ghost" = "primary") => (
    <GlowAnchor
      variant={variant}
      href={site.amazonUrl}
      target="_blank"
      rel="noopener"
      icon={<ArrowUpRight aria-hidden className="size-4" />}
      aria-label={`${tc("buyOnAmazon")} ${tc("opensNewTab")}`}
    >
      {tc("buyOnAmazon")}
    </GlowAnchor>
  );

  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg" />
          <div className="aura -top-40 end-[-5%] size-[40rem] bg-violet/30" />
          <div className="aura bottom-0 start-[-10%] size-[30rem] bg-blue/25" />
        </div>
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 id="page-title" data-words-intro className="text-[clamp(2.8rem,7vw,5.6rem)] leading-[1] font-semibold text-white">
              <Words text={book.title} />
            </h1>
            <Reveal immediate delay={250}>
              <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{t("hero.subtitle")}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-fg">
                <User aria-hidden className="size-4 text-mint" />
                {t("hero.by")} <strong className="font-semibold text-white">{book.author}</strong>
              </p>
            </Reveal>
            <Reveal immediate delay={380} className="mt-9 flex flex-col gap-3 sm:flex-row">
              {amazon()}
            </Reveal>
          </div>
          <Reveal immediate variant="tilt" delay={200} className="flex justify-center">
            <BookCover src={covers.en} alt={t("coverAlt")} size="lg" priority />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="desc-title" className="section !pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="desc-title" className="sr-only">{t("hero.eyebrow")}</h2>
          <BookOpen aria-hidden className="size-12 text-mint" strokeWidth={1.3} />
          <div className="space-y-6">
            {description.map((d, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className={i === 0 ? "font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-white" : "text-lg text-muted"}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="bangla-title" className="section !pt-0">
        <div className="container-x">
          <div className="relative isolate grid items-center gap-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1a1208] via-ink-900 to-ink-950 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-14">
            <div aria-hidden className="aura -top-24 start-[-6rem] size-80 bg-[#b8864b]/25" />
            <Reveal variant="tilt" className="flex justify-center">
              <BookCover src={covers.bn} alt={t("bangla.alt")} size="md" tilt="right" />
            </Reveal>
            <div>
              <p className="mb-4 text-sm font-semibold text-[#e2b77a]">{t("bangla.eyebrow")}</p>
              <h2 id="bangla-title" className="text-[clamp(1.9rem,4vw,3rem)] font-semibold text-white">
                {t("bangla.title")}{" "}
                <span lang="bn" className="block text-[0.8em] text-[#e2b77a]">এম্পায়ার অব মার্কেটিং</span>
              </h2>
              <Reveal delay={120}>
                <p className="mt-5 text-lg text-muted">{t("bangla.text")}</p>
                <p className="mt-4 text-sm text-muted">
                  <span lang="bn">মো. ইকবাল হোসেন</span> · {t("bangla.edition")}
                </p>
              </Reveal>
              <Reveal delay={220} className="mt-8">
                <GlowAnchor
                  variant="ghost"
                  href={whatsappUrl(t("bangla.whatsapp"))}
                  target="_blank"
                  rel="noopener"
                  icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}
                >
                  {t("bangla.cta")}
                </GlowAnchor>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="section bg-ink-900/60">
        <div className="container-x">
          <div id="journey-title"><SectionHeading title={t("journeyTitle")} subtitle={t("journeySubtitle")} align="center" /></div>
          <div className="mt-16"><JourneyLine /></div>
        </div>
      </section>

      <section aria-labelledby="az-title" className="section">
        <div className="container-x">
          <div id="az-title"><SectionHeading title={t("azTitle")} subtitle={t("azSubtitle")} /></div>
          <Reveal className="mt-12"><AZGrid /></Reveal>
        </div>
      </section>

      <section aria-labelledby="learn-title" className="section !pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="glass glow-edge rounded-[2rem] p-8 md:p-10">
            <h2 id="learn-title" className="text-3xl font-semibold text-white">{t("learnTitle")}</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {learn.map((l, i) => (
                <li key={i} className="flex items-start gap-3 text-fg">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink-950">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 p-8">
              <h2 className="text-xl font-semibold text-white">{t("forWhoTitle")}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {forWho.map((f) => (
                  <li key={f} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-fg">{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 p-8">
              <h2 className="text-xl font-semibold text-white">{t("formatsTitle")}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {book.formats.map((f) => (
                  <li key={f} className="glass rounded-full px-3.5 py-1.5 text-sm text-fg">{t(`formats.${f}`)}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{t("formats.bangla")}</p>
              <div className="mt-6">{amazon("ghost")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="bridge-title" className="section !pt-0">
        <div className="container-x">
          <Reveal variant="scale" className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue/20 via-ink-900 to-violet/20 p-10 md:flex md:items-center md:justify-between md:gap-10 md:p-14">
            <div className="max-w-2xl">
              <h2 id="bridge-title" className="text-3xl font-semibold text-white md:text-4xl">{t("bridgeTitle")}</h2>
              <p className="mt-4 text-lg text-muted">{t("bridgeText")}</p>
            </div>
            <div className="mt-8 shrink-0 md:mt-0"><BookCallButton packageId="book" /></div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          alternativeHeadline: book.subtitle,
          author: { "@type": "Person", name: book.author },
          bookEdition: book.edition,
          inLanguage: "en",
          url: site.amazonUrl,
          image: `${site.url}${covers.en}`,
          workExample: [
            { "@type": "Book", inLanguage: "en", bookEdition: "First English Edition", image: `${site.url}${covers.en}`, url: site.amazonUrl },
            { "@type": "Book", inLanguage: "bn", name: "এম্পায়ার অব মার্কেটিং", bookEdition: "First Bangla Edition", image: `${site.url}${covers.bn}` },
          ],
        }}
      />
    </>
  );
}
