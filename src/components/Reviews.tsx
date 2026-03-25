import { useTranslations } from "next-intl";

function Stars({ count }: { count: number }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as {
    name: string; date: string; stars: number; text: string;
  }[];

  return (
    <section className="section" id="reviews">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-declaration">
        {t("declaration")}{" "}
        <a href={t("moreLink")} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          →
        </a>
      </p>
      <div className="reviews-grid">
        {items.map((review, i) => (
          <article key={i} className="review-card">
            <div className="review-header">
              <div className="review-avatar">{review.name.charAt(0)}</div>
              <div>
                <strong className="review-name">{review.name}</strong>
                <span className="review-date">{review.date}</span>
              </div>
            </div>
            <Stars count={review.stars} />
            <p className="review-text">{review.text}</p>
          </article>
        ))}
      </div>
      <div className="reviews-more">
        <a
          href={t("moreLink")}
          target="_blank"
          rel="noopener noreferrer"
          className="more-link"
        >
          {t("moreText")} →
        </a>
      </div>
    </section>
  );
}
