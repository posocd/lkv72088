'use client';

import React, { useState } from 'react';
import { DispatchSummary } from '@/types';
// Fix case-sensitive import
import { useLanguage } from '@/components/dictionary';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface DispatchCardProps {
  item: DispatchSummary;
  t: (key: string) => string;
  language: 'en' | 'id';
}

const DispatchCard: React.FC<DispatchCardProps> = ({ item, t, language }) => (
  <article className="p-8 border border-gray-800 rounded-2xl bg-gray-900/30 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 flex flex-col group shadow-lg">
    <header className="mb-4">
      <h3 className="text-xl font-bold text-yellow-400 group-hover:text-white transition-colors tracking-tight leading-snug font-mono">{item.title[language]}</h3>
      <p className="text-[10px] text-gray-500 mt-3 font-mono uppercase tracking-[0.2em]">&gt; {t('metaPostedBy')}: {item.author} // {item.timestamp}</p>
    </header>
    <p className="mt-2 text-gray-400 flex-grow text-sm leading-relaxed">{item.excerpt[language]}</p>
    <footer className="mt-6 border-t border-gray-800 pt-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {item.tags.map(tag => (
          <span key={tag} className="px-2 py-1 text-[9px] font-black font-mono bg-gray-800/80 text-gray-400 rounded border border-gray-700 uppercase tracking-widest">{t(tag)}</span>
        ))}
      </div>
      <Link href={`/${language}/${item.slug}/`} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-lg border border-gray-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all">
        {t('readMore')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
      </Link>
    </footer>
  </article>
);

interface DispatchesPageProps {
  initialItems: DispatchSummary[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
}

const DispatchesPage: React.FC<DispatchesPageProps> = ({ initialItems, totalPages, currentPage, searchQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (inputValue) params.set('q', inputValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  const navigatePage = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
           {t('dispatchesTitle')}
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('dispatchesDesc')}</p>
      </div>
      
      <div className="mb-12 max-w-2xl mx-auto">
        <form onSubmit={handleSearch}>
          <input
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder={t('searchPlaceholder')}
            className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-yellow-400 transition-all placeholder:text-gray-600 shadow-inner"
          />
        </form>
      </div>

      {initialItems.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-10 min-h-[400px]">
            {initialItems.map(item => <DispatchCard key={item.id} item={item} t={t} language={language} />)}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-16 space-x-4">
              <button 
                onClick={() => navigatePage(currentPage - 1)} 
                disabled={currentPage <= 1} 
                className="px-6 py-3 bg-gray-900/50 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-lg border border-gray-800 disabled:opacity-30 hover:bg-yellow-400 hover:text-black transition-all"
              >
                &larr; {t('prev') || 'Prev'}
              </button>
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">Page {currentPage} / {totalPages}</span>
              <button 
                onClick={() => navigatePage(currentPage + 1)} 
                disabled={currentPage >= totalPages} 
                className="px-6 py-3 bg-gray-900/50 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-lg border border-gray-800 disabled:opacity-30 hover:bg-yellow-400 hover:text-black transition-all"
              >
                {t('next') || 'Next'} &rarr;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center min-h-[400px] flex items-center justify-center">
            <div className="bg-gray-900/30 border border-red-900/50 rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-red-500 mb-4 font-mono">{t('queryNotFound')}</h2>
                <p className="text-gray-400 font-mono">{t('queryNotFoundDesc')}</p>
            </div>
        </div>
      )}
    </section>
  );
};

export default DispatchesPage;
