import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { isRtl, routing, type Locale } from "@/i18n/routing";
import { fontStylesheetFor } from "@/lib/fonts";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

export const dynamicParams = false;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { template: "%s · Empower of Marketing", default: "Empower of Marketing" },
  icons: { icon: "/icon.svg" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const fontCss = fontStylesheetFor(locale as Locale);
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    <html lang={locale} dir={isRtl(locale as Locale) ? "rtl" : "ltr"}>
      <head>
        {/* Marks JS as available so entrance animations can start hidden; without JS everything shows. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {fontCss ? <link rel="stylesheet" href={fontCss} /> : null}
      </head>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-ink-950"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="content">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: site.name,
                url: `${site.url}/${locale}/`,
                email: site.email,
                telephone: site.whatsappDisplay,
                areaServed: ["US", "CA", "EU", "SA", "JP"],
                address: { "@type": "PostalAddress", addressLocality: "Dammam", addressCountry: "SA" },
                founder: { "@type": "Person", name: "Md. Iqbal Hossain" },
                sameAs: [site.social.linkedin, site.social.medium],
              }}
            />
          </MotionProvider>
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
