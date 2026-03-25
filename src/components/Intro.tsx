import { useTranslations } from "next-intl";

export default function Intro() {
  const t = useTranslations("intro");
  const highlights: string[] = t.raw("highlights");
  const historyParagraphs: string[] = t.raw("history") || [];

  return (
    <section className="section" id="intro">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-desc">{t("description")}</p>
      
      {historyParagraphs && historyParagraphs.length > 0 && (
        <div className="section-history" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <h3 className="subsection-title" style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
            {t("historyTitle")}
          </h3>
          {historyParagraphs.map((para, i) => (
            <p key={i} className="section-desc" style={{ marginBottom: "1rem" }}>{para}</p>
          ))}
        </div>
      )}

      <h3 className="subsection-title" style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        {t("highlightsTitle") || "Highlights"}
      </h3>
      <ul className="highlights-list">
        {highlights.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
