"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds `.is-in` to [data-reveal] / [data-words] elements as they enter the viewport. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __revealReady?: boolean }).__revealReady = true;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-words]:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
