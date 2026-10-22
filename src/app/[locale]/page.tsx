import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Common");
  return <main>{t("brand")}</main>;
}
