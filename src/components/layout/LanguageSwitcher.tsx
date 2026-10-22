"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-fg/90 transition-colors hover:bg-white/5"
      >
        <Globe aria-hidden className="size-4" />
        <span className="sr-only">{t("language")}:</span>
        {compact ? <span className="sr-only">{localeLabels[locale]}</span> : <span>{locale.toUpperCase()}</span>}
        <ChevronDown aria-hidden className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          role="menu"
          className="glass absolute end-0 top-full z-50 mt-2 min-w-44 rounded-2xl bg-ink-900/95 p-1.5 shadow-2xl"
        >
          {routing.locales.map((l) => (
            <li key={l} role="none">
              <button
                type="button"
                role="menuitem"
                lang={l}
                onClick={() => choose(l)}
                className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-start text-sm text-fg hover:bg-white/8"
              >
                {localeLabels[l]}
                {l === locale ? <Check aria-hidden className="size-4 text-mint" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
