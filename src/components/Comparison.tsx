import { useTranslations } from "next-intl";

export default function Comparison() {
  const t = useTranslations("comparison");
  const nearby = t.raw("nearby.items") as { name: string; distance: string; note: string }[];
  const tips = t.raw("tips.items") as string[];

  return (
    <section className="section" id="guide">
      <h2 className="section-title">{t("title")}</h2>

      <div className="guide-grid">
        <div className="guide-card">
          <h3>{t("duration.title")}</h3>
          <p>{t("duration.text")}</p>
        </div>
        <div className="guide-card">
          <h3>{t("worthIt.title")}</h3>
          <p>{t("worthIt.text")}</p>
        </div>
        <div className="guide-card full-width">
          <h3>{t("inside.title")}</h3>
          <p>{t("inside.text")}</p>
        </div>
      </div>

      <h3 className="subsection-title">{t("nearby.title")}</h3>
      <div className="nearby-grid">
        {nearby.map((item, i) => (
          <div key={i} className="nearby-card">
            <div className="nearby-name">{item.name}</div>
            <div className="nearby-distance">{item.distance}</div>
            <div className="nearby-note">{item.note}</div>
          </div>
        ))}
      </div>

      <h3 className="subsection-title">{t("tips.title")}</h3>
      <ol className="tips-list">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ol>
    </section>
  );
}
