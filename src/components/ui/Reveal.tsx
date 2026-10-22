import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "rise" | "scale" | "blur" | "slide" | "tilt" | "draw";

/** Entrance animation wrapper. Works without JS (content simply shows). */
export function Reveal({
  variant = "rise",
  delay = 0,
  as: Tag = "div",
  className,
  immediate = false,
  children,
}: {
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** For the first screen: animate on page load with CSS only, without waiting for JavaScript. */
  immediate?: boolean;
  children: ReactNode;
}) {
  const attrs = immediate ? { "data-intro": variant } : { "data-reveal": variant };
  return (
    <Tag {...attrs} className={className} style={{ "--d": delay } as CSSProperties}>
      {children}
    </Tag>
  );
}

/**
 * Splits text into words that rise in one after another. Languages written without
 * spaces (Japanese) are split into natural word segments so lines can still wrap.
 * `wordClassName` is applied to every word (e.g. a gradient, which must sit on each word).
 */
export function Words({ text, offset = 0, wordClassName = "" }: { text: string; offset?: number; wordClassName?: string }) {
  const hasSpaces = /\s/.test(text.trim());
  const parts =
    hasSpaces || typeof Intl === "undefined" || !("Segmenter" in Intl)
      ? text.split(/(\s+)/)
      : Array.from(new Intl.Segmenter("ja", { granularity: "word" }).segment(text), (s) => s.segment);
  let i = offset;
  return (
    <>
      {parts.map((w, idx) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={idx} className={`w ${wordClassName}`} style={{ "--i": i++ } as CSSProperties}>
            {w}
          </span>
        ),
      )}
    </>
  );
}
