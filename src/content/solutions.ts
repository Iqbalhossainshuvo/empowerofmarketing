import { CodeXml, FileText, GraduationCap, LayoutDashboard, Palette, Plane, Users, type LucideIcon } from "lucide-react";

export type SolutionSlug =
  | "web-development"
  | "ui-ux-design"
  | "graphic-design"
  | "documents"
  | "travel-ticketing"
  | "training"
  | "manpower";

export const solutions: ReadonlyArray<{ slug: SolutionSlug; icon: LucideIcon }> = [
  { slug: "web-development", icon: CodeXml },
  { slug: "ui-ux-design", icon: LayoutDashboard },
  { slug: "graphic-design", icon: Palette },
  { slug: "documents", icon: FileText },
  { slug: "travel-ticketing", icon: Plane },
  { slug: "training", icon: GraduationCap },
  { slug: "manpower", icon: Users },
];
