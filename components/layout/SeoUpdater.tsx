
'use client';

import React from 'react';

interface SeoUpdaterProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  author?: string;
  isHome?: boolean;
  keywords?: string[];
  robots?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    authorUrl?: string;
    tags?: string[];
    wordCount?: number;
  };
  breadcrumbs?: Array<{ name: string; item: string }>;
  products?: any[];
  softwareApp?: any;
  faq?: Array<{ question: string; answer: string }>;
  ampUrl?: string;
}

/**
 * Optimized SeoUpdater for Next.js 15.
 * Handles only JSON-LD injection. Document title and meta tags are managed
 * via generateMetadata in page components for better SEO and performance.
 */
const SeoUpdater: React.FC<SeoUpdaterProps> = ({ 
  breadcrumbs, 
  products, 
  faq, 
  softwareApp 
}) => {
  const jsonLdData: any[] = [];

  // Generate BreadcrumbList JSON-LD
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item
      }))
    });
  }

  // Generate Product JSON-LD
  if (products && products.length > 0) {
    products.forEach(product => {
      jsonLdData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        ...product
      });
    });
  }

  // Generate FAQPage JSON-LD
  if (faq && faq.length > 0) {
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  // Generate SoftwareApplication JSON-LD
  if (softwareApp) {
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      ...softwareApp
    });
  }

  return (
    <>
      {jsonLdData.map((data, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
};

export default SeoUpdater;
