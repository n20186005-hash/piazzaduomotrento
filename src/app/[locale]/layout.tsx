import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const locales = ["it", "en", "de", "zh-Hant"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  
  const baseUrl = "https://piazzaduomotrento.com";
  const path = locale === "it" ? "" : `/${locale}`;
  const imageUrl = `${baseUrl}/gallery/piazza-del-duomo-trento-hero.jpg`;
  const ogLocaleMap: Record<string, string> = {
    it: "it_IT",
    en: "en_US",
    de: "de_DE",
    "zh-Hant": "zh_TW",
  };
  
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}${path}`,
      siteName: "Piazza del Duomo di Trento",
      locale: ogLocaleMap[locale] || locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: "Piazza del Duomo di Trento",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        "it": `${baseUrl}/`,
        "en": `${baseUrl}/en`,
        "de": `${baseUrl}/de`,
        "zh-Hant": `${baseUrl}/zh-Hant`,
        "x-default": `${baseUrl}/`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    it: "it",
    en: "en",
    de: "de",
    "zh-Hant": "zh-Hant",
  };

  return (
    <html lang={langMap[locale] || locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
