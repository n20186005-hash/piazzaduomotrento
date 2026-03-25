import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function TermsOfService({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("terms");
  const sections = t.raw("sections") as { title: string; content: string }[];

  return (
    <main>
      <section className="section legal-page">
        <h1 className="section-title">{t("title")}</h1>
        <div className="section-desc">
          {sections ? (
            sections.map((sec, i) => (
              <div key={i} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text)" }}>{sec.title}</h2>
                <p style={{ lineHeight: 1.7, color: "var(--text-secondary)" }}>{sec.content}</p>
              </div>
            ))
          ) : (
            <p>{t("content")}</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
