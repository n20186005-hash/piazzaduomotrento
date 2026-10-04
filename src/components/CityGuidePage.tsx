import Link from "next/link";
import { CityGuide } from "@/content/italianCityGuides";
import Footer from "./Footer";
import CityGuidesSection from "./CityGuidesSection";

type CityGuidePageProps = {
  guide: CityGuide;
  locale: string;
};

export default function CityGuidePage({ guide, locale }: CityGuidePageProps) {
  const faqJsonLd = guide.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Piazza del Duomo di Trento",
          item: "https://piazzaduomotrento.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: guide.shortTitle,
          item: `https://piazzaduomotrento.com/${guide.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.metaTitle,
      description: guide.metaDescription,
      inLanguage: "it-IT",
      mainEntityOfPage: `https://piazzaduomotrento.com/${guide.slug}`,
      about: ["Trento", "Piazza del Duomo di Trento", "Centro storico di Trento"],
      publisher: {
        "@type": "Organization",
        name: "Piazza del Duomo di Trento Guide",
        url: "https://piazzaduomotrento.com/",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqJsonLd,
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section legal-page">
        <div className="article-kicker">{guide.kicker}</div>
        <h1 className="section-title article-title">{guide.title}</h1>
        <p className="section-desc article-intro">{guide.intro}</p>

        <div className="article-chip-list">
          {guide.highlights.map((item) => (
            <span key={item} className="article-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="article-callout">
          <strong>Punto di partenza consigliato:</strong> <Link href="/">Piazza del Duomo di Trento</Link>. E il nodo migliore per orientarsi nel centro e collegare le altre tappe della visita.
        </div>

        <h2 className="subsection-title">{guide.itemsTitle}</h2>
        <div className="guide-links-grid">
          {guide.items.map((item) => (
            <article key={item.title} className="guide-link-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              {item.note ? <p className="guide-link-note">{item.note}</p> : null}
            </article>
          ))}
        </div>

        {guide.sections.map((section) => (
          <section key={section.title} className="article-section">
            <h2 className="subsection-title">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="section-desc article-paragraph">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="highlights-list article-bullets">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="article-section">
          <h2 className="subsection-title">Domande frequenti</h2>
          <div className="faq-list">
            {guide.faq.map((item) => (
              <article key={item.question} className="guide-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <CityGuidesSection locale={locale} currentSlug={guide.slug} />
      <Footer />
    </main>
  );
}
