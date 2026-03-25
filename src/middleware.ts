import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['it', 'en', 'de', 'zh-Hant'],
  defaultLocale: 'it',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(it|en|de|zh-Hant)/:path*']
};
