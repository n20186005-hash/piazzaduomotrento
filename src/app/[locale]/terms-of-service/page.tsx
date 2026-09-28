import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const baseUrl = "https://piazzaduomotrento.com";
  const pathPrefix = locale === "it" ? "" : `/${locale}`;
  const currentPath = `${pathPrefix}/terms-of-service`;

  return {
    title: `${t("title")} | Piazza del Duomo di Trento`,
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        "it": `${baseUrl}/terms-of-service`,
        "en": `${baseUrl}/en/terms-of-service`,
        "de": `${baseUrl}/de/terms-of-service`,
        "zh-Hant": `${baseUrl}/zh-Hant/terms-of-service`,
        "x-default": `${baseUrl}/terms-of-service`,
      },
    },
  };
}

export default async function TermsOfService({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
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
