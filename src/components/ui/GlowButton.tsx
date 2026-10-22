import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color] duration-300 ease-out-expo active:scale-[0.97] focus-visible:outline-2";
const styles: Record<Variant, string> = {
  primary:
    "bg-mint text-ink-950 shadow-[0_0_0_1px_rgb(124_245_180/0.4),0_10px_40px_-8px_rgb(124_245_180/0.55)] hover:shadow-[0_0_0_1px_rgb(124_245_180/0.7),0_14px_50px_-6px_rgb(124_245_180/0.8)] hover:-translate-y-0.5",
  ghost:
    "glass text-fg hover:bg-white/10 hover:-translate-y-0.5",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${styles[variant]} ${extra}`;
}

type CommonProps = { variant?: Variant; icon?: ReactNode; children: ReactNode; className?: string };

/** Internal link (locale-aware) styled as a button. */
export function GlowLink({
  href,
  variant = "primary",
  icon,
  children,
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {icon}
    </Link>
  );
}

/** External link (WhatsApp, email, Amazon) styled as a button. */
export function GlowAnchor({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
      {icon}
    </a>
  );
}
