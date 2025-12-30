import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPage';
import { CONFIG } from '@/config';
// Fix case-sensitive import
import { dictionary } from '@/components/dictionary';

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