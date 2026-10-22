import { site } from "../content/site";

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
