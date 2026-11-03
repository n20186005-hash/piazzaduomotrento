import { useLocale, useTranslations } from "next-intl";

const BASE_URL = "https://www.piazzaduomotrento.com";
const MAPS_URL = "https://maps.app.goo.gl/1iNxDPaAG2d3GPSz7";

export default function StructuredData() {
  const locale = useLocale();
  const meta = useTranslations("meta");

  const pageUrl = locale === "it" ? BASE_URL : `${BASE_URL}/${locale}`;
  const localeMap: Record<string, string> = {
    it: "it_IT",
    en: "en_US",
    de: "de_DE",
    "zh-Hant": "zh_TW",
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Piazza del Duomo di Trento",
      url: BASE_URL,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta("title"),
      description: meta("description"),
      url: pageUrl,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: "Piazza del Duomo di Trento",
        url: BASE_URL,
      },
      about: {
        "@id": `${BASE_URL}#attraction`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Piazza del Duomo di Trento Guide",
      url: BASE_URL,
    },
    {
      "@context": "https://schema.org",
      "@id": `${BASE_URL}#attraction`,
      "@type": ["TouristAttraction", "Place"],
      name: "Piazza del Duomo di Trento",
      description: meta("description"),
      url: BASE_URL,
      sameAs: [MAPS_URL],
      touristType: ["Cultural tourism", "City break", "Architecture lovers"],
      isAccessibleForFree: true,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Piazza del Duomo, 18",
        postalCode: "38122",
        addressLocality: "Trento",
        addressRegion: "TN",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 46.067324971090294,
        longitude: 11.118881177138144,
      },
      publicAccess: true,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          jsonLd.map((item) => ({
            ...item,
            inLanguage: "inLanguage" in item ? localeMap[locale] || locale : undefined,
          }))
        ),
      }}
    />
  );
}
