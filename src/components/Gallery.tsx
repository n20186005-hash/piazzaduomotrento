import { useTranslations } from "next-intl";

const PHOTOS = [
  "https://images.unsplash.com/photo-1608898842757-6e5742df0d66?w=800&q=80",
  "https://images.unsplash.com/photo-1587212168936-8af847f51989?w=800&q=80",
  "https://images.unsplash.com/photo-1596627116790-af6f46dddbbd?w=800&q=80",
  "https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=800&q=80",
  "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80",
  "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=800&q=80",
  "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&q=80",
  "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&q=80",
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const photos = t.raw("photos") as { caption: string }[];

  return (
    <section className="section" id="gallery">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-subtitle">{t("subtitle")}</p>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <figure key={i} className="gallery-item">
            <img
              src={PHOTOS[i]}
              alt={photo.caption}
              loading="lazy"
              className="gallery-img"
            />
            <figcaption className="gallery-caption">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
