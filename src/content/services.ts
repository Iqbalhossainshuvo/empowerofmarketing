import { Bot, Clapperboard, Megaphone, Rocket, Store, TrendingUp, type LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "digital-marketing"
  | "traditional-marketing"
  | "business-growth"
  | "business-setup"
  | "ai-automation"
  | "video-editing";

export const services: ReadonlyArray<{ slug: ServiceSlug; icon: LucideIcon }> = [
  { slug: "digital-marketing", icon: Megaphone },
  { slug: "traditional-marketing", icon: Store },
  { slug: "business-growth", icon: TrendingUp },
  { slug: "business-setup", icon: Rocket },
  { slug: "ai-automation", icon: Bot },
  { slug: "video-editing", icon: Clapperboard },
];
