import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, Words } from "./Reveal";

export function Badge({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium text-fg/90">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint/70" />
        <span className="relative inline-flex size-2 rounded-full bg-mint" />
      </span>
      {icon}
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-mint">
      <span aria-hidden className="h-px w-6 bg-mint/70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag data-words className="text-[clamp(2rem,4.6vw,3.6rem)] font-semibold text-white">
        <Words text={title} />
      </Tag>
      {subtitle ? (
        <Reveal delay={200}>
          <p className={`mt-5 text-lg text-muted ${center ? "mx-auto" : ""} max-w-2xl`}>{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function IconTile({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-14" : "size-12";
  return (
    <span
      className={`relative grid ${box} shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] text-sky shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_30px_-6px_rgb(96_165_250/0.6)]`}
    >
      <Icon aria-hidden className={size === "lg" ? "size-6" : "size-5"} strokeWidth={1.75} />
    </span>
  );
}

export function GlassCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <Tag className={`glass glow-edge rounded-3xl ${className}`}>{children}</Tag>;
}
