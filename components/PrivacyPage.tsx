'use client';

import React from 'react';
import SeoUpdater from './layout/SeoUpdater';
import { useLanguage } from '../utils/LanguageContext';
import { SITE_URL } from '../config';

const PrivacyPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SeoUpdater
        title={`${t('privacyTitle')} | HackerNet`}
        description={t('privacySubtitle')}
        canonicalUrl={`${SITE_URL}/${language}/privacy`}
        ogType="website"
        breadcrumbs={[
          { name: t('navHome'), item: `/${language}/` },
          { name: t('navPrivacy'), item: `/${language}/privacy` }
        ]}
      />
      <section className="animate-fadeIn max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
            {t('privacyTitle')}
          </h1>
          <p className="text-lg text-gray-400 mt-4 font-mono">{t('privacySubtitle')}</p>
        </div>

        <div className="space-y-10">
          <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 font-mono flex items-center gap-3">
              <span className="text-gray-600">01_</span> {t('privacyPhilTitle')}
            </h2>
            <p className="text-gray-200 leading-relaxed font-mono text-sm">
              {t('privacyPhilDesc')}
            </p>
          </div>

          <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 font-mono flex items-center gap-3">
              <span className="text-gray-600">02_</span> {t('privacyCollTitle')}
            </h2>
            <ul className="space-y-4 text-gray-200 font-mono text-sm">
              <li className="flex gap-4">
                <span className="text-yellow-400">&gt;&gt;</span>
                <span>{t('privacyCollLog')}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-yellow-400">&gt;&gt;</span>
                <span>{t('privacyCollComm')}</span>
              </li>
            </ul>
          </div>

          <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 font-mono flex items-center gap-3">
              <span className="text-gray-600">03_</span> {t('privacyEncTitle')}
            </h2>
            <p className="text-gray-200 leading-relaxed font-mono text-sm">
              {t('privacyEncDesc')}
            </p>
          </div>

          <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 font-mono flex items-center gap-3">
              <span className="text-gray-600">04_</span> {t('privacyTrackTitle')}
            </h2>
            <p className="text-gray-200 leading-relaxed font-mono text-sm">
              {t('privacyTrackDesc')}
            </p>
          </div>
        </div>

        <div className="mt-20 text-center pb-12">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">
            End_of_Transmission // Protocol_Safe
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;