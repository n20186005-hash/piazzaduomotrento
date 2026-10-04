import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CityGuidePage from "@/components/CityGuidePage";
import { italianCityGuides, italianGuideSlugs } from "@/content/italianCityGuides";

type PageProps = {
  params: Promise<{ locale: string; guideSlug: string }>;
};

export async function generateStaticParams() {
  return italianGuideSlugs.map((guideSlug) => ({
    locale: "it",
    guideSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, guideSlug } = await params;

  if (locale !== "it") {
    return {};
  }

  const guide = italianCityGuides[guideSlug];
  if (!guide) {
    return {};
  }

  const baseUrl = "https://piazzaduomotrento.com";
  const currentUrl = `${baseUrl}/${guide.slug}`;
  const imageUrl = `${baseUrl}/gallery/piazza-del-duomo-trento-hero.jpg`;
  const rootMeta = await getTranslations({ locale: "it", namespace: "meta" });

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: currentUrl,
      siteName: rootMeta("title"),
      locale: "it_IT",
      type: "article",
      images: [
        {
          url: imageUrl,
          alt: guide.shortTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        it: currentUrl,
        "x-default": currentUrl,
      },
    },
  };
}

export default async function ItalianGuideArticle({ params }: PageProps) {
  const { locale, guideSlug } = await params;

  if (locale !== "it") notFound();

  const guide = italianCityGuides[guideSlug];
  if (!guide) notFound();

  setRequestLocale(locale);

  return <CityGuidePage guide={guide} locale={locale} />;
}
