import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleLocale = createMiddleware({
  locales: ['it', 'en', 'de', 'zh-Hant'],
  defaultLocale: 'it',
  localePrefix: 'as-needed',
  localeDetection: false,
  alternateLinks: false
});

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = (request.headers.get('host') || url.host).split(',')[0].trim().toLowerCase();
  const protocol = (request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')).split(',')[0].trim();
  const isPublicHost = ['piazzaduomotrento.com', 'www.piazzaduomotrento.com'].includes(host);
  if (isPublicHost && (host !== 'www.piazzaduomotrento.com' || protocol !== 'https')) {
    const canonical = url.clone();
    canonical.protocol = 'https:';
    canonical.hostname = 'www.piazzaduomotrento.com';
    canonical.port = '';
    return NextResponse.redirect(canonical, 308);
  }

  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/') || /\.[^/]+$/.test(url.pathname)) {
    return NextResponse.next();
  }
  return handleLocale(request);
}

export const config = {
  matcher: '/:path*'
};
