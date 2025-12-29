
'use client';

import React, { useState } from 'react';
import SeoUpdater from './layout/SeoUpdater';
import { useLanguage } from '../utils/LanguageContext';
import Link from 'next/link';
import { SITE_URL, CONFIG } from '../config';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <SeoUpdater
        title={`${CONFIG.site.title} | ${CONFIG.site.tagline[language]}`}
        description={CONFIG.site.description[language]}
        canonicalUrl={`${SITE_URL}/${language}/`}
        ogType="website"
        isHome={true}
        keywords={CONFIG.site.keywords[language]}
        breadcrumbs={[
          { name: t('navHome'), item: `/${language}/` }
        ]}
      />
      <div className="flex flex-col items-center justify-center text-center min-h-[75vh]">
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 md:p-16 shadow-2xl shadow-yellow-400/5 w-full max-w-5xl relative overflow-hidden backdrop-blur-sm animate-fadeIn">
          <div className="mb-10 flex justify-center relative z-10">
            <div className="relative group">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                {!imgError ? (
                  <img 
                    src={CONFIG.assets.heroImage} 
                    alt={t('altHero')} 
                    width="200" 
                    height="200"
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-yellow-400/50 object-cover shadow-2xl filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-yellow-400 bg-black flex items-center justify-center shadow-2xl font-bold text-yellow-400">HN</div>
                )}
            </div>
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-yellow-400 mb-6 tracking-tighter relative z-10 font-mono">
            {CONFIG.site.tagline[language]}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-medium relative z-10">
            {t('homeDesc')}
          </p>
          <div className="flex justify-center relative z-10">
            <Link 
              href={`/${language}/about/`} 
              className="px-10 py-4 bg-yellow-400 text-black font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]"
            >
              {t('homeCta')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
