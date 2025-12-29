
'use client';

import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import Link from 'next/link';
import { CONFIG } from '../config';

const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

  const operatives = CONFIG.team.map(member => ({
    name: member.name,
    role: member.role[language],
    image: member.image
  }));

  return (
    <section className="animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
          {t('aboutTitle')}
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('aboutSubtitle')}</p>
      </div>

      <div className="space-y-12 max-w-5xl mx-auto">
        <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono">{t('missionTitle')}</h2>
          <p className="text-gray-200 leading-relaxed text-lg">{t('missionDesc')}</p>
        </div>
        <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono">{t('coreProtocol')}</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-200">
            {['Stealth', 'Integrity', 'Innovation', 'Resilience'].map(p => (
              <li key={p} className="space-y-1">
                <span className="text-yellow-400 font-bold block">{t(`protocol${p}`)}</span>
                <span className="text-sm text-gray-400">{t(`protocol${p}Desc`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-mono">{t('operativesTitle')}</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">{t('operativesDesc')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {operatives.map((op, idx) => (
              <div key={idx} className="p-4 bg-black/40 rounded-lg border border-gray-800 hover:border-yellow-400/50 transition-all group text-center">
                <div className="w-20 h-20 mx-auto bg-gray-900 rounded-full mb-4 flex items-center justify-center border-2 border-gray-800 group-hover:border-yellow-400 overflow-hidden shadow-lg">
                  <span className="font-mono font-bold text-2xl text-gray-500 group-hover:text-yellow-400">{op.name.charAt(0)}</span>
                </div>
                <p className="font-bold text-white tracking-tight">{op.name}</p>
                <p className="text-[10px] text-yellow-400 mt-1 uppercase tracking-widest font-mono">{op.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 text-center pb-12">
        <h2 className="text-2xl font-bold text-white mb-4 font-mono">{t('readyEngage')}</h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">{t('readyDesc')}</p>
        <Link href={`/${language}/contact/`} className="inline-block px-12 py-4 bg-yellow-400 text-black font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(250,204,21,0.2)]">
          {t('openChannel')}
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
