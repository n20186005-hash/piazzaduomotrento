import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "cookieSettings" });
  const baseUrl = "https://piazzaduomotrento.com";
  const pathPrefix = locale === "it" ? "" : `/${locale}`;
  const currentPath = `${pathPrefix}/cookie-settings`;

  return {
    title: `${t("title")} | Piazza del Duomo di Trento`,
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        "it": `${baseUrl}/cookie-settings`,
        "en": `${baseUrl}/en/cookie-settings`,
        "de": `${baseUrl}/de/cookie-settings`,
        "zh-Hant": `${baseUrl}/zh-Hant/cookie-settings`,
        "x-default": `${baseUrl}/cookie-settings`,
      },
    },
  };
}

export default function CookieSettings({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("cookieSettings");
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
