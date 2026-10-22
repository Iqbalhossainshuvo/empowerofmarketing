"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { Logo } from "@/components/ui/Logo";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

type Group = "services" | "solutions";

export function Header() {
  const t = useTranslations("Nav");
  const tS = useTranslations("Service");
  const tSo = useTranslations("Solution");
  const tc = useTranslations("Common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<Group | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverOpenedAt = useRef(0);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation, outside click and Escape.
  useEffect(() => setOpenGroup(null), [pathname]);
  useEffect(() => {
    if (!openGroup) return;
    const onDoc = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenGroup(null);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkCls = (href: string) =>
    `relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-white ${
      isActive(href) ? "text-white" : "text-fg/75"
    }`;

  const groups: Record<Group, { items: { slug: string; icon: typeof services[number]["icon"] }[]; base: string; label: string; intro: string; all: string; tr: (k: string) => string }> = {
    services: { items: [...services], base: "/services", label: t("services"), intro: t("servicesIntro"), all: t("allServices"), tr: (k) => tS(k) },
    solutions: { items: [...solutions], base: "/solutions", label: t("solutions"), intro: t("solutionsIntro"), all: t("allSolutions"), tr: (k) => tSo(k) },
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" data-testid="logo-link" aria-label={t("home")} className="shrink-0">
          <Logo />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          <Link href="/" className={linkCls("/")} aria-current={pathname === "/" ? "page" : undefined}>
            {t("home")}
          </Link>
          {(Object.keys(groups) as Group[]).map((g) => {
            const grp = groups[g];
            const open = openGroup === g;
            return (
              <div key={g} className="relative" onMouseLeave={() => open && setOpenGroup(null)}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`menu-${g}`}
                  onClick={() => {
                    // A hover just opened it: a click right after should keep it open, not toggle it shut.
                    if (open && Date.now() - hoverOpenedAt.current < 400) return;
                    setOpenGroup(open ? null : g);
                  }}
                  onMouseEnter={() => {
                    if (!open) hoverOpenedAt.current = Date.now();
                    setOpenGroup(g);
                  }}
                  className={`${linkCls(grp.base)} inline-flex items-center gap-1`}
                >
                  {grp.label}
                  <ChevronDown aria-hidden className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`menu-${g}`}
                  hidden={!open}
                  className="absolute start-1/2 top-full z-50 w-[min(640px,90vw)] -translate-x-1/2 pt-3 rtl:translate-x-1/2"
                >
                  <div className="glass rounded-3xl bg-ink-900/95 p-3 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
                    <p className="px-3 pt-2 pb-3 text-sm text-muted">{grp.intro}</p>
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {grp.items.map(({ slug, icon: Icon }) => (
                        <li key={slug}>
                          <Link
                            href={`${grp.base}/${slug}`}
                            className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-sky transition-colors group-hover:text-mint">
                              <Icon aria-hidden className="size-[18px]" />
                            </span>
                            <span>
                              <span className="block text-[0.92rem] font-semibold text-white">{grp.tr(`${slug}.title`)}</span>
                              <span className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug text-muted">{grp.tr(`${slug}.short`)}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={grp.base}
                      className="mt-2 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm font-semibold text-mint hover:bg-white/[0.08]"
                    >
                      {grp.all}
                      <ArrowRight aria-hidden className="flip-rtl size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {(["pricing", "about", "book"] as const).map((k) => (
            <Link key={k} href={`/${k}`} className={linkCls(`/${k}`)} aria-current={isActive(`/${k}`) ? "page" : undefined}>
              {t(k)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <span className="hidden sm:block">
            <BookCallButton testId="header-cta" className="!px-5 !py-2.5" />
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={tc("menu")}
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/5 lg:hidden"
          >
            <Menu aria-hidden className="size-6" />
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
