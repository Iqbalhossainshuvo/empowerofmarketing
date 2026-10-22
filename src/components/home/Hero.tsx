import { useTranslations } from "next-intl";
import { Bot, Clapperboard, Map, TrendingUp } from "lucide-react";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Orb } from "@/components/ui/Orb";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";

function MiniCard({ icon: Icon, title, children }: { icon: typeof Bot; title: string; children: React.ReactNode }) {
  return (
    <div className="glass glow-edge w-[clamp(150px,34vw,200px)] rounded-2xl bg-ink-900/60 p-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-2 text-[0.72rem] font-semibold text-white">
        <span className="grid size-6 place-items-center rounded-lg bg-white/10 text-mint">
          <Icon aria-hidden className="size-3.5" />
        </span>
        {title}
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("Home.hero");
  const tc = useTranslations("Common");

  const bars = [32, 44, 38, 58, 70, 88];
  const cards = [
    <MiniCard key="ads" icon={TrendingUp} title={t("cards.ads")}>
      <div className="flex h-12 items-end gap-1" dir="ltr">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-blue/60 to-mint"
            style={{ height: `${h}%`, opacity: 0.45 + i * 0.1 }}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[0.68rem] text-mint">{t("cards.adsDelta")}</p>
    </MiniCard>,
    <MiniCard key="ai" icon={Bot} title={t("cards.ai")}>
      <div className="flex items-center gap-1.5" dir="ltr">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-sky shadow-[0_0_10px_2px_rgb(96_165_250/0.7)]" />
            {i < 2 ? <span className="h-px w-5 bg-gradient-to-r from-sky to-violet" /> : null}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[0.68rem] text-muted">{t("cards.aiSteps")}</p>
    </MiniCard>,
    <MiniCard key="map" icon={Map} title={t("cards.roadmap")}>
      <ul className="space-y-1">
        {[1, 1, 0].map((done, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className={`size-2.5 rounded-full ${done ? "bg-mint" : "border border-white/30"}`} />
            <span className={`h-1.5 rounded-full ${done ? "bg-white/30" : "bg-white/12"}`} style={{ width: `${80 - i * 16}%` }} />
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-[0.68rem] text-muted">{t("cards.roadmapItems")}</p>
    </MiniCard>,
    <MiniCard key="video" icon={Clapperboard} title={t("cards.video")}>
      <div className="flex gap-1" dir="ltr">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-7 flex-1 rounded-md bg-gradient-to-br from-violet/50 to-blue/30" />
        ))}
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-white/10" dir="ltr">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet to-mint" />
      </div>
      <p className="mt-1.5 text-[0.68rem] text-muted">{t("cards.videoMeta")}</p>
    </MiniCard>,
  ];

  return (
    <section data-testid="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg" />
        <div className="aura -top-40 start-[-10%] size-[40rem] bg-blue/30" />
        <div className="aura top-20 end-[-10%] size-[34rem] bg-violet/25" />
      </div>
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="relative z-10">
          <Reveal variant="scale">
            <Badge>{t("badge")}</Badge>
          </Reveal>
          <h1
            id="hero-title"
            data-words
            className="mt-7 text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1.02] font-semibold text-white"
          >
            <Words text={t("titleA")} />{" "}
            <span className="text-gradient">
              <Words text={t("titleHighlight")} offset={t("titleA").split(/\s+/).length} />
            </span>
          </h1>
          <Reveal delay={350}>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={480} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCallButton />
            <GlowAnchor
              variant="ghost"
              href={whatsappUrl(tc("whatsappPrefill"))}
              target="_blank"
              rel="noopener"
              icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}
            >
              {tc("whatsapp")}
            </GlowAnchor>
          </Reveal>
          <Reveal delay={600}>
            <p className="mt-5 text-sm text-muted">{t("note")}</p>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={200} className="relative">
          <Orb cards={cards} />
        </Reveal>
      </div>
    </section>
  );
}
