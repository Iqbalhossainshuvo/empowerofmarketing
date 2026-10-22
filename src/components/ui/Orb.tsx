import type { ReactNode } from "react";

/**
 * The glowing orb with orbit rings (CSS + SVG only). `cards` are positioned around it;
 * pass up to four nodes (top-start, top-end, bottom-start, bottom-end).
 */
export function Orb({ cards = [] }: { cards?: ReactNode[] }) {
  const slots = [
    "top-[4%] start-0 [animation-delay:0s]",
    "top-[10%] end-0 [animation-delay:1.2s]",
    "bottom-[8%] start-[2%] [animation-delay:2.1s]",
    "bottom-[2%] end-[3%] [animation-delay:0.6s]",
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* floor glow */}
      <div aria-hidden className="absolute inset-x-[18%] bottom-[6%] h-10 rounded-[50%] bg-sky/40 blur-2xl" />
      {/* orbit rings */}
      <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7cf5b4" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.15" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 60s linear infinite" }}>
          <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="url(#ring)" strokeWidth="1.2" transform="rotate(-18 200 200)" />
          <circle cx="23" cy="235" r="3.5" fill="#7cf5b4" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 90s linear infinite reverse" }}>
          <ellipse cx="200" cy="200" rx="175" ry="95" fill="none" stroke="url(#ring)" strokeWidth="0.8" strokeOpacity="0.7" transform="rotate(24 200 200)" />
          <circle cx="360" cy="140" r="2.5" fill="#8b5cf6" />
        </g>
      </svg>
      {/* sphere */}
      <div
        aria-hidden
        className="absolute inset-[24%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, #ffffff 0%, #c7f9e2 6%, #7dd3fc 18%, #3b82f6 42%, #6d4fe0 68%, #1e1b4b 88%, #0a0f1e 100%)",
          boxShadow:
            "0 0 90px 18px rgba(96,165,250,0.45), 0 0 180px 60px rgba(139,92,246,0.25), inset -24px -34px 60px rgba(5,7,13,0.55), inset 12px 12px 40px rgba(255,255,255,0.25)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div aria-hidden className="absolute inset-[24%] rounded-full border border-white/20" />
      {cards.slice(0, 4).map((card, i) => (
        <div key={i} className={`absolute ${slots[i]} motion-safe:animate-[float-y_7s_ease-in-out_infinite]`}>
          {card}
        </div>
      ))}
    </div>
  );
}
