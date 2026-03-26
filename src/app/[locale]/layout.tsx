import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const locales = ["it", "en", "de", "zh-Hant"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  
  const baseUrl = "https://piazzaduomotrento.com";
  const path = locale === "it" ? "" : `/${locale}`;
  
  return {
    title: t("title"),
    description: t("description"),
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();
  unstable_setRequestLocale(locale);
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
