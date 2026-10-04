import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Comparison from "@/components/Comparison";
import MapEmbed from "@/components/MapEmbed";
import Sources from "@/components/Sources";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import CityGuidesSection from "@/components/CityGuidesSection";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <StructuredData />
      <Hero />
      <Intro />
      <Gallery />
      <Reviews />
      <Comparison />
      <CityGuidesSection locale={locale} />
      <MapEmbed />
      <Sources />
      <Footer />
    </main>
  );
}
