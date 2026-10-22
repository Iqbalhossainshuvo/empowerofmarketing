"use client";

import { useEffect, useRef, useState } from "react";

/** Number that counts up when it enters view. Server HTML already shows the final value. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // ease-out
          setValue(Math.round(eased * to));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setValue(0);
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
