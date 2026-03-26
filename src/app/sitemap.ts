import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://piazzaduomotrento.com'
  const locales = ['en', 'de', 'zh-Hant'] // 'it' is default (no prefix)
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings']

  const sitemapEntries: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    // Default language (Italian) - no prefix
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    })

    // Other languages
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}