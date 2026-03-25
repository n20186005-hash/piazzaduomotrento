import { useTranslations } from "next-intl";

export default function Tips() {
  const t = useTranslations("comparison");
  const tips = t.raw("tips.items") as string[];

  return (
    <section className="section" id="tips">
      <h2 className="section-title">{t("tips.title")}</h2>
      <ol className="tips-list">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ol>
    </section>
  );
}
