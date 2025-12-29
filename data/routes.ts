
import { Page } from '../types';
import { dispatchesList } from './dispatches';
import { CONFIG } from '../config';

export interface RouteConfig {
  id: string;
  path: string;
  lang: 'id' | 'en'; // Added lang property
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
  imageUrl?: string;
  imageTitle?: string;
  title?: string;
  description?: string;
}

// Base route definitions (abstracted from language)
const baseRoutes = [
  { id: 'home', path: '', priority: '1.0', changefreq: 'monthly' as const },
  { id: 'about', path: 'about', priority: '0.8', changefreq: 'yearly' as const },
  { id: 'services', path: 'services', priority: '0.8', changefreq: 'monthly' as const },
  { id: 'dispatches', path: 'dispatches', priority: '0.9', changefreq: 'weekly' as const },
  { id: 'contact', path: 'contact', priority: '0.6', changefreq: 'yearly' as const },
  { id: 'privacy', path: 'privacy', priority: '0.3', changefreq: 'yearly' as const },
  { id: 'sitemap', path: 'sitemap', priority: '0.5', changefreq: 'weekly' as const },
];

const languages = ['id', 'en'] as const;

// Generate localized static routes
export const staticRoutes: RouteConfig[] = [];

languages.forEach(lang => {
  baseRoutes.forEach(route => {
    // Determine metadata based on language
    let title = CONFIG.site.title;
    let desc = CONFIG.site.description[lang];

    if (route.id === 'home') {
      title = `${CONFIG.site.title} // ${CONFIG.site.tagline[lang]}`;
    } else if (route.id === 'about') {
      title = lang === 'id' ? `Tentang Kami | ${CONFIG.site.title}` : `About Us | ${CONFIG.site.title}`;
    } else if (route.id === 'services') {
      title = lang === 'id' ? `Tingkat Layanan | ${CONFIG.site.title}` : `Service Tiers | ${CONFIG.site.title}`;
    } else if (route.id === 'dispatches') {
      title = lang === 'id' ? `Berita Intelijen | ${CONFIG.site.title}` : `Intel Dispatches | ${CONFIG.site.title}`;
      desc = lang === 'id' ? 'Intelijen terbaru dan data lapangan dari operasi HackerNet.' : 'Latest intelligence and field data from HackerNet operations.';
    } else if (route.id === 'contact') {
      title = lang === 'id' ? `Bangun Kontak | ${CONFIG.site.title}` : `Establish Contact | ${CONFIG.site.title}`;
    } else if (route.id === 'privacy') {
      title = lang === 'id' ? `Kebijakan Privasi | ${CONFIG.site.title}` : `Privacy Policy | ${CONFIG.site.title}`;
    } else if (route.id === 'sitemap') {
      title = lang === 'id' ? `Peta Jaringan | ${CONFIG.site.title}` : `Network Map | ${CONFIG.site.title}`;
    }

    // Ensure path always has a trailing slash for consistency with Vercel and hydration
    const finalPath = route.path ? `/${lang}/${route.path}/` : `/${lang}/`;

    staticRoutes.push({
      id: route.id,
      path: finalPath,
      lang: lang,
      changefreq: route.changefreq,
      priority: route.priority,
      title,
      description: desc
    });
  });
});

// 404 is special
staticRoutes.push({
  id: 'notFound',
  path: '/404/',
  lang: 'id',
  changefreq: 'never',
  priority: '0.0',
  title: `404: Not Found | ${CONFIG.site.title}`,
  description: 'Node data yang Anda minta rusak atau tidak ada.'
});

// Generate routes for all posts dynamically
export const postRoutes: RouteConfig[] = [];

dispatchesList.forEach(post => {
  languages.forEach(lang => {
    postRoutes.push({
      id: post.slug,
      path: `/${lang}/${post.slug}/`, // Trailing slash for posts as well
      lang: lang,
      changefreq: 'never',
      priority: '0.7',
      lastmod: post.timestamp,
      imageUrl: post.imageUrl,
      imageTitle: post.title[lang],
      title: `${post.title[lang]} | ${CONFIG.site.title}`,
      description: post.excerpt[lang]
    });
  });
});

export const allRoutes: RouteConfig[] = [...staticRoutes, ...postRoutes];
