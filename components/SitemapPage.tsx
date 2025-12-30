'use client';

import React from 'react';
import { dispatchesList } from '../data/dispatches';
import { useLanguage } from '@/data/languages';
import Link from 'next/link';

const SitemapPage: React.FC = () => {
  const { t, language } = useLanguage();
  const mainPages = ['home', 'about', 'services', 'contact', 'dispatches', 'privacy'];
  
  return (
    <section className="max-w-5xl mx-auto animate-fadeIn overflow-hidden">
      <div className="text-center mb-16">
        <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
          {t('sitemapTitle')}
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('sitemapDesc')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 border border-gray-800 rounded-2xl bg-gray-900/30 backdrop-blur-sm shadow-xl">
              <h2 className="text-xl font-bold text-yellow-400 mb-6 border-b border-gray-800 pb-4 flex items-center gap-3 font-mono">
                  <span className="text-green-500 font-black">./</span> {t('sitemapSections')}
              </h2>
              <ul className="space-y-4 font-mono text-gray-300">
                  {mainPages.map(page => (
                      <li key={page} className="group">
                          <Link href={page === 'home' ? `/${language}/` : `/${language}/${page}/`} className="flex items-center gap-3 hover:text-yellow-400 transition-colors text-base">
                              <span className="text-gray-600 group-hover:text-yellow-400 transition-colors">&gt;</span> 
                              {t(`nav${page.charAt(0).toUpperCase() + page.slice(1)}`)}
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="p-8 border border-gray-800 rounded-2xl bg-gray-900/30 backdrop-blur-sm shadow-xl">
              <h2 className="text-xl font-bold text-yellow-400 mb-6 border-b border-gray-800 pb-4 flex items-center gap-3 font-mono">
                  <span className="text-green-500 font-black">./</span> {t('dispatchesTitle')}
              </h2>
              <ul className="space-y-4 font-mono text-gray-400 text-xs">
                  {dispatchesList.map(post => (
                      <li key={post.id} className="group">
                          <Link href={`/${language}/${post.slug}/`} className="flex items-start gap-3 hover:text-yellow-400 transition-colors leading-relaxed">
                              <span className="text-gray-700 group-hover:text-yellow-400 transition-colors mt-0.5 flex-shrink-0">&gt;</span>
                              <span className="truncate block flex-1">{post.title[language]}</span>
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
    </section>
  );
};

export default SitemapPage;
