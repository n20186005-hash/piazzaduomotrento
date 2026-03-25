import { unstable_setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Comparison from "@/components/Comparison";
import MapEmbed from "@/components/MapEmbed";
import Sources from "@/components/Sources";
import Footer from "@/components/Footer";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <Intro />
      <Gallery />
      <Reviews />
      <Comparison />
      <MapEmbed />
      <Sources />
      <Footer />
    </main>
  );
}
