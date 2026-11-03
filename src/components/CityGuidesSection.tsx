import Link from "next/link";
import { italianGuideSlugs, italianCityGuides } from "@/content/italianCityGuides";

type CityGuidesSectionProps = {
  locale: string;
  currentSlug?: string;
};

export default function CityGuidesSection({ locale, currentSlug }: CityGuidesSectionProps) {
  if (locale !== "it") return null;

  const guides = italianGuideSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => italianCityGuides[slug]);

  return (
    <section className="section" id="city-guides">
      <h2 className="section-title">Approfondisci Trento</h2>
      <p className="section-desc">
        Scegli una guida alla piazza, ai suoi monumenti o alla città per preparare la tua visita e collegare le tappe che ti interessano.
      </p>

      <div className="guide-links-grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="guide-link-card">
            <div className="guide-link-kicker">{guide.kicker}</div>
            <h3>{guide.shortTitle}</h3>
            <p>{guide.metaDescription}</p>
            <Link href={`/${guide.slug}`} className="more-link">
              Apri la guida →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
