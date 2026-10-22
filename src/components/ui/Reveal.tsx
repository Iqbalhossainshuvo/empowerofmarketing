import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "rise" | "scale" | "blur" | "slide" | "tilt";

/** Entrance animation wrapper. Works without JS (content simply shows). */
export function Reveal({
  variant = "rise",
  delay = 0,
  as: Tag = "div",
  className,
  children,
}: {
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-reveal={variant} className={className} style={{ "--d": delay } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Splits text into words that rise in one after another. */
export function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(/(\s+)/);
  let i = offset;
  return (
    <>
      {words.map((w, idx) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={idx} className="w" style={{ "--i": i++ } as CSSProperties}>
            {w}
          </span>
        ),
      )}
    </>
  );
}
