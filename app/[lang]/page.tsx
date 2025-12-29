
import { Metadata } from 'next';
import { CONFIG } from '@/config';
import HomePageContent from '@/components/HomePage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${CONFIG.site.title} | ${CONFIG.site.tagline[l]}`,
    description: CONFIG.site.description[l],
  };
}

export default async function RootPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';

  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": CONFIG.site.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${CONFIG.site.url}/${l}/dispatches/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
      />
      <HomePageContent />
    </>
  );
}
