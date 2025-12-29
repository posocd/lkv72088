
import { MetadataRoute } from 'next';
import { CONFIG } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/*?q=*'],
    },
    sitemap: `${CONFIG.site.url}/sitemap.xml`,
  };
}
