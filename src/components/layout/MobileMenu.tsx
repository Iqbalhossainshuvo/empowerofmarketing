"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { ChevronDown, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { Logo } from "@/components/ui/Logo";
import { BookCallButton } from "@/components/booking/BookCallButton";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const tS = useTranslations("Service");
  const tSo = useTranslations("Solution");
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<"services" | "solutions" | null>(null);
  useEffect(() => {
    if (open) onClose();
    // close after navigating
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prevFocus?.focus();
    };
  }, [open, onClose]);

  // Only ever opened by a tap after the page has loaded, so `document` is available here.
  if (!open) return null;

  const group = (key: "services" | "solutions") => {
    const items = key === "services" ? services : solutions;
    const tr = key === "services" ? tS : tSo;
    const isOpen = expanded === key;
    return (
      <li>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setExpanded(isOpen ? null : key)}
          className="flex w-full items-center justify-between py-4 text-start text-2xl font-semibold text-white"
        >
          {t(key)}
          <ChevronDown aria-hidden className={`size-6 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen ? (
          <ul className="grid gap-1 pb-4">
            <li>
              <Link href={`/${key}`} className="block rounded-xl px-3 py-2.5 font-semibold text-mint">
                {key === "services" ? t("allServices") : t("allSolutions")}
              </Link>
            </li>
            {items.map(({ slug, icon: Icon }) => (
              <li key={slug}>
                <Link href={`/${key}/${slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-fg hover:bg-white/5">
                  <Icon aria-hidden className="size-[18px] text-sky" />
                  {tr(`${slug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  };

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={tc("menu")}
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)] bg-ink-950/98 backdrop-blur-xl lg:hidden"
    >
      <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label={tc("close")}
          className="grid size-11 place-items-center rounded-full text-white hover:bg-white/5"
        >
          <X aria-hidden className="size-6" />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-x flex-1 pb-8">
        <ul className="divide-y divide-white/[0.07]">
          <li>
            <Link href="/" className="block py-4 text-2xl font-semibold text-white">{t("home")}</Link>
          </li>
          {group("services")}
          {group("solutions")}
          {(["pricing", "about", "book"] as const).map((k) => (
            <li key={k}>
              <Link href={`/${k}`} className="block py-4 text-2xl font-semibold text-white">{t(k)}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <BookCallButton className="w-full" />
          <p className="mt-3 text-center text-sm text-muted">{tc("callNote")}</p>
        </div>
      </nav>
    </div>,
    document.body,
  );
}
