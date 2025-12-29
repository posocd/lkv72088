// Adding explicit React import to resolve React namespace errors in TypeScript
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/utils/LanguageContext';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === 'en' ? 'en' : 'id';

  return (
    <LanguageProvider initialLanguage={locale}>
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Header lang={locale} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}