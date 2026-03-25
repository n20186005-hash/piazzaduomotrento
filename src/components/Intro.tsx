import { useTranslations } from "next-intl";

export default function Intro() {
  const t = useTranslations("intro");
  const highlights: string[] = t.raw("highlights");
  const historyParagraphs: string[] = t.raw("history") || [];

  return (
    <section className="section" id="intro">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>{t("title")}</h2>
        <p className="section-desc" style={{ textAlign: "center", fontSize: "1.15rem", marginBottom: "3rem" }}>{t("description")}</p>
        
        {historyParagraphs && historyParagraphs.length > 0 && (
          <div className="section-history" style={{ 
            marginTop: "3rem", 
            marginBottom: "3rem",
            background: "var(--bg-alt)",
            padding: "2.5rem",
            borderRadius: "16px",
            boxShadow: "var(--shadow)"
          }}>
            <h3 className="subsection-title" style={{ 
              fontSize: "1.5rem", 
              fontWeight: 700, 
              marginBottom: "1.5rem",
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--accent)"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              {t("historyTitle")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {historyParagraphs.map((para, i) => (
                <p key={i} style={{ 
                  lineHeight: 1.8, 
                  color: "var(--text-secondary)",
                  fontSize: "1.05rem",
                  margin: 0
                }}>{para}</p>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem" }}>
          <h3 className="subsection-title" style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            {t("highlightsTitle") || "Highlights"}
          </h3>
          <ul className="highlights-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {highlights.map((item: string, i: number) => (
              <li key={i} style={{ 
                background: "var(--bg-card)", 
                padding: "1rem 1.25rem", 
                borderRadius: "8px",
                boxShadow: "var(--shadow)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ fontSize: "0.95rem", color: "var(--text)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
