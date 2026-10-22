/** Original mark: an upward spark-arrow inside a glowing rounded square. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="eom-g" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.55" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#7cf5b4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0a0f1e" stroke="url(#eom-g)" strokeWidth="1.5" />
      <path d="M11 27 L18.5 19.5 L23 24 L30 14" fill="none" stroke="url(#eom-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 13.5 H30.5 V19.5" fill="none" stroke="#7cf5b4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <LogoMark />
      {withText ? (
        <span className="font-display text-[0.95rem] leading-none font-bold tracking-wide text-white">
          EMPOWER
          <span className="block text-[0.62rem] font-medium tracking-[0.28em] text-muted">OF MARKETING</span>
        </span>
      ) : null}
    </span>
  );
}
