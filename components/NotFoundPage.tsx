'use client';

import React from 'react';
import SeoUpdater from './layout/SeoUpdater';
import { useLanguage } from '@/data/languages';
import Link from 'next/link';
import { SITE_URL } from '../config';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SeoUpdater 
        title={`${t('notFoundTitle')} | HackerNet`}
        description={t('notFoundDesc')}
        canonicalUrl={`${SITE_URL}/404`}
        robots="noindex, nofollow"
      />
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
        <div className="bg-gray-900/50 border border-red-500 rounded-xl p-8 md:p-12 shadow-2xl shadow-red-500/10 w-full max-w-2xl">
          <h1 className="text-[30px] font-bold text-red-500 mb-4 font-mono">
            {t('notFoundTitle')}
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mx-auto mb-8">
            {t('notFoundDesc')}
          </p>

          <div className="flex justify-center">
            <Link href="/" className="px-8 py-3 bg-gray-800 text-yellow-400 font-bold rounded-md border border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300 transform hover:scale-105">
              {t('returnBase')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
