
import { Metadata } from 'next';
import ServicesPageContent from '@/components/ServicesPage';
import { CONFIG } from '@/config';
import { dictionary } from '@/data/languages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.servicesTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.servicesSubtitle[l],
  };
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
