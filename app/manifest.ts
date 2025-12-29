
import { MetadataRoute } from 'next';
import { CONFIG } from '@/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONFIG.site.name,
    short_name: CONFIG.site.title,
    description: CONFIG.site.shortDescription.en,
    start_url: '/',
    display: 'standalone',
    background_color: CONFIG.site.themeColor,
    theme_color: CONFIG.site.themeColor,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
