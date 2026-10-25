export const covers = {
  en: "/images/book/empire-of-marketing-english-edition-cover.webp",
  bn: "/images/book/empire-of-marketing-bangla-edition-cover.webp",
} as const;

/** A real book cover shown as a 3D book (page edge, shadow, tilt that straightens on hover). */
export function BookCover({
  src,
  alt,
  size = "md",
  priority = false,
  tilt = "left",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  tilt?: "left" | "right";
}) {
  const w = { sm: "w-[min(200px,52vw)]", md: "w-[min(250px,62vw)]", lg: "w-[min(320px,72vw)]" }[size];
  const rest = tilt === "left" ? "[transform:rotateY(-16deg)_rotateX(3deg)]" : "[transform:rotateY(16deg)_rotateX(3deg)]";
  return (
    <div className={`relative ${w} [perspective:1300px]`} dir="ltr">
      <div aria-hidden className="absolute inset-x-[8%] -bottom-6 h-10 rounded-[50%] bg-blue/40 blur-2xl" />
      <div
        className={`relative aspect-[5/8] w-full ${rest} [transform-style:preserve-3d] transition-transform duration-700 ease-out-expo hover:[transform:rotateY(-4deg)_rotateX(1deg)]`}
      >
        {/* page block */}
        <div
          aria-hidden
          className={`absolute inset-y-[1.2%] w-[14px] bg-gradient-to-r from-neutral-200 to-neutral-400 ${
            tilt === "left" ? "end-[-12px] rounded-e-sm" : "start-[-12px] rounded-s-sm"
          }`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, image is pre-sized */}
        <img
          src={src}
          alt={alt}
          width={800}
          height={1280}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="relative size-full rounded-e-md rounded-s-sm object-cover shadow-[24px_30px_60px_-12px_rgb(0_0_0/0.85)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-4 rounded-s-sm bg-gradient-to-r from-black/35 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-e-md rounded-s-sm bg-gradient-to-br from-white/15 via-transparent to-transparent" />
      </div>
    </div>
  );
}
