
import React from 'react';
import './globals.css';
import { Metadata, Viewport } from 'next';
import { CONFIG } from '@/config';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const viewport: Viewport = {
  themeColor: CONFIG.site.themeColor,
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: CONFIG.site.name,
    template: `%s | ${CONFIG.site.title}`,
  },
  description: CONFIG.site.description.en,
  metadataBase: new URL(CONFIG.site.url),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/web-app-manifest-512x512.png',
  },
  alternates: {
    languages: {
      'en-US': '/en/',
      'id-ID': '/id/',
    },
    types: {
      'application/rss+xml': `${CONFIG.site.url}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": CONFIG.site.title,
    "url": CONFIG.site.url,
    "logo": `${CONFIG.site.url}${CONFIG.assets.logo}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONFIG.contact.phone,
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": CONFIG.social.sameAs
  };

  return (
    <html lang="id" suppressHydrationWarning className={robotoMono.variable}>
      <head>
        <link rel="preconnect" href="https://lkv72088.vercel.app" />
        {/* RSS Autodiscovery Link */}
        <link rel="alternate" type="application/rss+xml" title={`RSS Feed ${CONFIG.site.title}`} href="/rss.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white selection:bg-yellow-400 selection:text-black antialiased font-mono">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
