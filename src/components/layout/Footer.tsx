import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const tc = useTranslations("Common");
  const tS = useTranslations("Service");
  const tSo = useTranslations("Solution");
  const year = new Date().getFullYear();

  const social = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Medium", href: site.social.medium },
    ...(site.social.x ? [{ label: "X", href: site.social.x }] : []),
  ];

  const col = "text-sm font-semibold text-white";
  const lnk = "text-[0.92rem] text-muted transition-colors hover:text-white";

  return (
    <footer className="relative mt-8 border-t border-white/[0.07] bg-ink-950">
      <div aria-hidden className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-sky/50 to-transparent" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-muted">{t("tagline")}</p>
          <ul className="mt-6 space-y-3 text-[0.92rem]">
            <li>
              <a href={whatsappUrl(tc("whatsappPrefill"))} target="_blank" rel="noopener" className={`${lnk} inline-flex items-center gap-2`}>
                <WhatsAppIcon className="size-4 text-[#25d366]" />
                <span dir="ltr">{site.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={mailtoUrl(tc("emailSubject"))} className={`${lnk} inline-flex items-center gap-2`}>
                <Mail aria-hidden className="size-4 text-sky" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-[0.92rem] text-muted">
              <MapPin aria-hidden className="size-4 text-violet" />
              {t("location")}
            </li>
          </ul>
        </div>

        <nav aria-label={t("servicesTitle")} className="md:col-span-3">
          <h2 className={col}>{t("servicesTitle")}</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map(({ slug }) => (
              <li key={slug}><Link href={`/services/${slug}`} className={lnk}>{tS(`${slug}.title`)}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("solutionsTitle")} className="md:col-span-3">
          <h2 className={col}>{t("solutionsTitle")}</h2>
          <ul className="mt-4 space-y-2.5">
            {solutions.map(({ slug }) => (
              <li key={slug}><Link href={`/solutions/${slug}`} className={lnk}>{tSo(`${slug}.title`)}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("companyTitle")} className="md:col-span-2">
          <h2 className={col}>{t("companyTitle")}</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/about" className={lnk}>{tn("about")}</Link></li>
            <li><Link href="/pricing" className={lnk}>{tn("pricing")}</Link></li>
            <li><Link href="/book" className={lnk}>{tn("book")}</Link></li>
            <li><Link href="/founder" className={lnk}>{t("founder")}</Link></li>
            <li><Link href="/privacy" className={lnk}>{t("privacy")}</Link></li>
            <li><Link href="/terms" className={lnk}>{t("terms")}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="container-x">
        <p aria-hidden className="pointer-events-none select-none bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-center font-display text-[clamp(1.3rem,6vw,5.3rem)] leading-none font-bold tracking-tight whitespace-nowrap text-transparent" dir="ltr" translate="no">
          EMPOWER OF MARKETING
        </p>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-6 text-sm text-muted md:flex-row">
        <p>© {year} {tc("brand")}. {t("rights")}</p>
        <ul className="flex items-center gap-5" aria-label={t("followUs")}>
          {social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener" className="transition-colors hover:text-white">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
