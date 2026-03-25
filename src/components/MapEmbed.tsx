import { useTranslations } from "next-intl";

export default function MapEmbed() {
  const t = useTranslations("map");

  return (
    <section className="section" id="map">
      <h2 className="section-title">{t("title")}</h2>
      <div className="map-container">
        {/* Hidden Google Maps attribution - required for compliance */}
        {/* .gm-style-cc, .gmnoprint { display: none !important; } */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.186367242673!2d11.118881177138144!3d46.067324971090294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782714b05ccf4bb%3A0xdec2ca307146ded9!2sPiazza%20del%20Duomo%20di%20Trento!5e0!3m2!1sen!2sus!4v1774411316429!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps - Piazza del Duomo di Trento"
        />
      </div>
      <div className="map-links">
        <a
          href="https://maps.app.goo.gl/1iNxDPaAG2d3GPSz7"
          target="_blank"
          rel="noopener noreferrer"
          className="map-link-btn"
        >
          {t("openMaps")} →
        </a>
      </div>
    </section>
  );
}
