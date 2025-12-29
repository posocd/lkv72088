
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = 'id'; // Default locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '/' : pathname}/`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    // Ditambahkan rss.xml ke regex pengecualian
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|rss.xml|fonts|assets).*)',
  ],
};
