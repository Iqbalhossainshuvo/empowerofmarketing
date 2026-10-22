import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  const t = useTranslations("Common");
  return (
    <a
      href={whatsappUrl(t("whatsappPrefill"))}
      target="_blank"
      rel="noopener"
      data-testid="whatsapp-float"
      aria-label={`${t("whatsapp")} ${t("opensNewTab")}`}
      className="fixed end-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-6px_rgb(37_211_102/0.7)] transition-transform duration-300 hover:scale-110 active:scale-95 md:end-6 md:bottom-6"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25d366]/50 motion-safe:animate-ping [animation-duration:2.6s]" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
