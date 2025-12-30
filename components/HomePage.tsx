'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/Dictionary';
import Link from 'next/link';
import { CONFIG } from '@/config';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const fullText = CONFIG.site.tagline[language].toUpperCase();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [language, fullText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center font-mono">
      <div className="max-w-4xl w-full p-8 border border-green-900/20 bg-green-950/5 relative overflow-hidden animate-flicker">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20"></div>
        
        <div className="mb-8 text-left text-[10px] text-green-800 uppercase tracking-widest">
          Node_ID: {CONFIG.contact.sessionId.slice(0, 16)}...<br />
          Status: Online<br />
          Auth: Level_4_Restricted
        </div>

        <h1 className="text-2xl md:text-5xl font-black text-green-500 mb-6 tracking-tighter glow-green min-h-[1.5em] flex items-center justify-center">
          <span className="cursor-blink">{typedText}</span>
        </h1>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed opacity-80">
          {t('homeDesc')}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href={`/${language}/dispatches/`} 
            className="px-8 py-3 bg-green-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            [Access_Briefing]
          </Link>
          <Link 
            href={`/${language}/services/`} 
            className="px-8 py-3 border border-green-500 text-green-500 font-black uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all duration-300"
          >
            [Service_Nodes]
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-green-900/10 text-[10px] text-green-900 uppercase flex justify-between">
          <span>HackerNet_OS v3.1.0</span>
          <span>© 2024 DECENTRALIZED_COMMAND</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;