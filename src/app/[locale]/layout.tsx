import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { isRtl, routing, type Locale } from "@/i18n/routing";
import { fontStylesheetFor } from "@/lib/fonts";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "../globals.css";

export const dynamicParams = false;

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

  return (
    <html lang={locale} dir={isRtl(locale as Locale) ? "rtl" : "ltr"}>
      <head>
        {/* Marks JS as available so entrance animations can start hidden; without JS everything shows. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {fontCss ? <link rel="stylesheet" href={fontCss} /> : null}
      </head>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
