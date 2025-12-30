import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPage';
import { CONFIG } from '@/config';
import { dictionary } from '@/components/Dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.contactTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.contactSubtitle[l],
  };
}

export default function ContactPage() {
  return <ContactPageContent />;
}