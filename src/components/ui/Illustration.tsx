/** Service/solution illustration (public/images/<kind>/<slug>.svg) with localized, descriptive alt text for SEO. */
export function illustrationSrc(kind: "services" | "solutions", slug: string) {
  return `/images/${kind}/${slug}.svg`;
}

export function Illustration({
  kind,
  slug,
  alt,
  priority = false,
  className = "",
}: {
  kind: "services" | "solutions";
  slug: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; SVG needs no optimisation
    <img
      src={illustrationSrc(kind, slug)}
      alt={alt}
      width={800}
      height={600}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block h-auto w-full ${className}`}
    />
  );
}
