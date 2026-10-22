import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { GlowLink } from "@/components/ui/GlowButton";

// Rendered for every language, then copied to /404.html after the build (scripts/make-404.mjs),
// so any unknown URL on any static host shows this branded page.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function LostPage() {
  const t = useTranslations("NotFound");
  const tc = useTranslations("Common");
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden px-4 pt-32 pb-24 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg" />
        <div className="aura top-1/4 start-1/2 size-[34rem] -translate-x-1/2 bg-blue/30" />
      </div>
      <div className="max-w-xl">
        <p aria-hidden className="font-display text-[clamp(5rem,18vw,9rem)] leading-none font-bold text-gradient" dir="ltr">404</p>
        <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-white">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("text")}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlowLink href="/" variant="ghost" icon={<Home aria-hidden className="size-4" />}>{tc("backHome")}</GlowLink>
          <BookCallButton />
        </div>
      </div>
    </section>
  );
}
