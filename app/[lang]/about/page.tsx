import { Metadata } from 'next';
import AboutPageContent from '@/components/AboutPage';
import { CONFIG } from '@/config';
import { dictionary } from '@/components/Dictionary';

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
