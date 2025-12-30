import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/data/languages';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

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
      <div className="min-h-screen bg-[#050505] flex flex-col selection:bg-green-500 selection:text-black">
        <Header lang={locale} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
