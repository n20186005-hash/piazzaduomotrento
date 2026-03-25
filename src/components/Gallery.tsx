"use client";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

const PHOTOS = Array.from({ length: 13 }, (_, i) => `/gallery/images (${i + 1}).jpg`);

export default function Gallery() {
  const t = useTranslations("gallery");
  const photos = t.raw("photos") as { caption: string }[];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % PHOTOS.length);
  }, []);

  const prevLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextLightboxImage, prevLightboxImage]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen]);

  return (
    <section className="section" id="gallery">
      <h2 className="section-title">{t("title")}</h2>
      <p className="section-subtitle">{t("subtitle")}</p>
      
      <p className="section-declaration" style={{ marginBottom: "2rem" }}>
        {t("declaration")}{" "}
        <a href={t("moreLink")} target="_blank" rel="noopener noreferrer" style={{ wordBreak: "break-all" }}>
          {t("moreLink")}
        </a>
      </p>

      <div className="gallery-carousel" style={{ position: "relative", overflow: "hidden", borderRadius: "12px", background: "#000", boxShadow: "var(--shadow-lg)" }}>
        <div 
          className="gallery-carousel-inner"
          style={{ display: "flex", transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)", transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PHOTOS.map((src, i) => (
            <figure key={i} style={{ minWidth: "100%", margin: 0, position: "relative", cursor: "pointer" }} onClick={() => openLightbox(i)}>
              <img
                src={src}
                alt={photos[i]?.caption || ""}
                loading="lazy"
                style={{ width: "100%", height: "60vh", maxHeight: "600px", objectFit: "cover", display: "block" }}
              />
              <figcaption style={{ 
                position: "absolute", bottom: 0, left: 0, right: 0, 
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)", 
                color: "#fff", padding: "3rem 1.5rem 1.5rem", textAlign: "center", fontSize: "1.1rem", fontWeight: 500
              }}>
                {photos[i]?.caption || ""}
              </figcaption>
            </figure>
          ))}
        </div>
        
        <button onClick={prevImage} aria-label="Previous image" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", color: "#1c1917", border: "none", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={nextImage} aria-label="Next image" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", color: "#1c1917", border: "none", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", backdropFilter: "blur(4px)" }}>
          {currentIndex + 1} / {PHOTOS.length}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
        {PHOTOS.map((src, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            style={{ 
              width: "60px", height: "40px", border: currentIndex === i ? "2px solid var(--accent)" : "2px solid transparent", 
              borderRadius: "6px", overflow: "hidden", cursor: "pointer", padding: 0, flexShrink: 0, opacity: currentIndex === i ? 1 : 0.6,
              transition: "opacity 0.2s, border-color 0.2s"
            }}
          >
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div 
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "48px", height: "48px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button onClick={prevLightboxImage} aria-label="Previous" style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "50%", width: "56px", height: "56px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={PHOTOS[lightboxIndex]} 
              alt={photos[lightboxIndex]?.caption || ""}
              style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
            />
            <div style={{ color: "#fff", textAlign: "center", marginTop: "1rem", fontSize: "1.1rem", fontWeight: 500, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {photos[lightboxIndex]?.caption || ""}
            </div>
          </div>

          <button onClick={nextLightboxImage} aria-label="Next" style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "50%", width: "56px", height: "56px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div style={{ position: "absolute", bottom: "1.5rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
            {lightboxIndex + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
}
