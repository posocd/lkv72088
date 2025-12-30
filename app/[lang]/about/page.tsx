import { Metadata } from 'next';
import AboutPageContent from '@/components/AboutPage';
import { CONFIG } from '@/config';
// Fix case-sensitive import
import { dictionary } from '@/components/dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.navAbout[l]} | ${CONFIG.site.title}`,
    description: dictionary.aboutSubtitle[l],
  };
}

export default function AboutPage() {
  return <AboutPageContent />;
}