"use client";

import type { MouseEvent, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { buttonClass } from "@/components/ui/GlowButton";
import { isCalendlyReady, loadCalendly } from "./calendly";

const WAIT_MS = 800;

/**
 * Opens the Calendly booking popup. It is a real link to the booking page, so if the
 * widget is blocked or slow, the visitor still reaches booking in a new tab.
 */
export function BookCallButton({
  label,
  variant = "primary",
  packageId,
  className = "",
  icon,
  testId,
}: {
  label?: ReactNode;
  variant?: "primary" | "ghost";
  packageId?: string;
  className?: string;
  icon?: ReactNode;
  testId?: string;
}) {
  const t = useTranslations("Common");
  const locale = useLocale();

  const open = () =>
    window.Calendly?.initPopupWidget({
      url: site.calendlyUrl,
      utm: { utmSource: "website", utmMedium: locale, utmCampaign: packageId ?? "cta" },
    });

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let users open a tab on purpose
    e.preventDefault();
    if (isCalendlyReady()) {
      open();
      return;
    }
    let done = false;
    const fallback = () => {
      if (done) return;
      done = true;
      window.open(site.calendlyUrl, "_blank", "noopener");
    };
    const timer = window.setTimeout(fallback, WAIT_MS);
    loadCalendly().then((ok) => {
      if (done) return;
      window.clearTimeout(timer);
      if (ok) {
        done = true;
        open();
      } else fallback();
    });
  };

  return (
    <a
      href={site.calendlyUrl}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      onPointerEnter={() => void loadCalendly()}
      onFocus={() => void loadCalendly()}
      data-testid={testId}
      data-book-call=""
      className={buttonClass(variant, className)}
    >
      {icon ?? <CalendarDays aria-hidden className="size-4" />}
      {label ?? t("bookCall")}
    </a>
  );
}
