import { useTranslations } from "next-intl";

export default function LocalInformation() {
  const t = useTranslations("localInformation");
  const cards = t.raw("cards") as { title: string; text: string }[];
  const links = t.raw("links") as { title: string; url: string }[];

  return (
    <section className="section section-muted" id="local-information" aria-labelledby="local-information-title">
      <h2 className="section-title" id="local-information-title">{t("title")}</h2>
      <p className="section-desc">{t("credit")}</p>
      <div className="guide-grid">
        {cards.map((card) => (
          <div className="guide-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
      <h3 className="subsection-title">{t("linksTitle")}</h3>
      <ul className="sources-list">
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>{link.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
