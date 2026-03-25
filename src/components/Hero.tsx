import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Hero() {
  const t = useTranslations("hero");
  const nav = useTranslations("nav");
  const tags: string[] = t.raw("tags");

  return (
    <section className="hero" id="hero">
      <header className="header">
        <nav className="header-nav">
          <a href="#intro" className="nav-link">{nav("discover")}</a>
          <a href="#gallery" className="nav-link">{nav("photos")}</a>
          <a href="#reviews" className="nav-link">{nav("reviews")}</a>
          <a href="#map" className="nav-link">{nav("map")}</a>
        </nav>
        <div className="header-actions">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1608898842757-6e5742df0d66?w=1600&q=80"
          alt="Piazza del Duomo di Trento"
          className="hero-img"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">{t("title")}</h1>
        <p className="hero-subtitle">{t("subtitle")}</p>

        <div className="hero-meta">
          <span className="hero-rating">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {t("rating")} <span className="rating-count">{t("ratingCount")}</span>
          </span>
          <span className="hero-hours">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {t("hours")}
          </span>
        </div>

        <p className="hero-address">{t("address")}</p>

        <a
          href="https://maps.app.goo.gl/1iNxDPaAG2d3GPSz7"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-maps-link"
        >
          {t("openMaps")} →
        </a>

        <div className="hero-tags">
          {tags.map((tag: string) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
