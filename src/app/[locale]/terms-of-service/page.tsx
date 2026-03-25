import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";

export default function TermsOfService({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("terms");
  return (
    <main>
      <section className="section legal-page">
        <h1 className="section-title">{t("title")}</h1>
        <p className="section-desc">{t("content")}</p>
      </section>
      <Footer />
    </main>
  );
}
