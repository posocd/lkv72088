import { Metadata } from 'next';
import PrivacyPageContent from '@/components/PrivacyPage';
import { CONFIG } from '@/config';
import { dictionary } from '@/components/Dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.privacyTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.privacySubtitle[l],
  };
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}