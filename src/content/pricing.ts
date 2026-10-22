// Change prices here — every language reads them from this one file.
export type PackageId = "free" | "starter" | "growth" | "scale" | "custom";

export const packages: ReadonlyArray<{
  id: PackageId;
  priceUsd: number | null;
  period: "once" | "month" | null;
  featured: boolean;
}> = [
  { id: "free", priceUsd: 0, period: null, featured: false },
  { id: "starter", priceUsd: 99, period: "once", featured: false },
  { id: "growth", priceUsd: 299, period: "month", featured: true },
  { id: "scale", priceUsd: 699, period: "month", featured: false },
  { id: "custom", priceUsd: null, period: null, featured: false },
];
