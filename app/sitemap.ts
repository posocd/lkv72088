
import { MetadataRoute } from 'next';
import { CONFIG } from '@/config';
import { dispatchesList } from '@/data/dispatches';
import { staticRoutes } from '@/data/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CONFIG.site.url;
  const languages = ['id', 'en'];

  // 1. Static Routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq as any,
    priority: parseFloat(route.priority),
  }));

  // 2. Dynamic Dispatch Routes
  const dispatchEntries = dispatchesList.flatMap((post) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/${post.slug}/`,
      lastModified: new Date(post.timestamp),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...dispatchEntries];
}
