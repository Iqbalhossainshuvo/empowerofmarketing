import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { GlowAnchor } from "@/components/ui/GlowButton";
import { Reveal, Words } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";
import { site } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CtaBand() {
  const t = useTranslations("CtaBand");
  const tc = useTranslations("Common");
  return (
    <section aria-labelledby="cta-band-title" className="section !pt-0">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden className="grid-bg opacity-70" />
          <div aria-hidden className="aura -bottom-40 start-1/2 size-[34rem] -translate-x-1/2 bg-blue/45" />
          <div aria-hidden className="aura -top-32 end-0 size-80 bg-violet/30" />
          <div aria-hidden className="absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-mint/70 to-transparent" />
          <div className="relative">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="cta-band-title" data-words className="mx-auto max-w-3xl text-[clamp(2rem,4.8vw,3.75rem)] font-semibold text-white">
              <Words text={t("title")} />
            </h2>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={250} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookCallButton label={tc("bookCallLong")} />
            </Reveal>
            <p className="mt-3 text-sm text-muted">{tc("callNote")}</p>
            <Reveal delay={350} className="mt-10">
              <p className="text-sm text-muted">{t("or")}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <GlowAnchor
                  variant="ghost"
                  href={whatsappUrl(tc("whatsappPrefill"))}
                  target="_blank"
                  rel="noopener"
                  icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}
                >
                  <span dir="ltr">{site.whatsappDisplay}</span>
                </GlowAnchor>
                <GlowAnchor variant="ghost" href={mailtoUrl(tc("emailSubject"))} icon={<Mail aria-hidden className="size-4 text-sky" />}>
                  {site.email}
                </GlowAnchor>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
