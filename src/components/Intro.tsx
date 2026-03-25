import { useTranslations } from "next-intl";

export default function Intro() {
  const t = useTranslations("intro");
  const highlights: string[] = t.raw("highlights");

  return (
    <section className="section" id="intro">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-desc">{t("description")}</p>
      <ul className="highlights-list">
        {highlights.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
