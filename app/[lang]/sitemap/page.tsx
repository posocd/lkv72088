
import { Metadata } from 'next';
import SitemapPageContent from '@/components/SitemapPage';
import { CONFIG } from '@/config';
import { dictionary } from '@/data/languages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.sitemapTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.sitemapDesc[l],
  };
}

export default function SitemapPage() {
  return <SitemapPageContent />;
}
