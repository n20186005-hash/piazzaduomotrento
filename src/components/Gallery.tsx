import { useTranslations } from "next-intl";

export default function Gallery() {
  const t = useTranslations("gallery");
  return (
    <section className="section" id="gallery">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-desc">{t("declaration")}</p>
      <a className="more-link" href={t("moreLink")} target="_blank" rel="noopener noreferrer">Google Maps →</a>
    </section>
  );
}
