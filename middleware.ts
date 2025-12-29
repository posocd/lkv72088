
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Jangan arahkan file statis atau metadata penting
  const isPublicFile = pathname.match(/\.(xml|txt|ico|json|svg|png|webp|webmanifest)$/);
  const isRss = pathname === '/rss.xml';

  if (pathnameIsMissingLocale && !isPublicFile && !isRss) {
    const locale = 'id'; // Default locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '/' : pathname}/`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|rss.xml|fonts|assets).*)',
  ],
};
