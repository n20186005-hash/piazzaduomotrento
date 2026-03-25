import { useTranslations } from "next-intl";

export default function Sources() {
  const t = useTranslations("sources");
  const items = t.raw("items") as string[];

  return (
    <section className="section section-muted" id="sources">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-desc">{t("text")}</p>
      <ul className="sources-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
