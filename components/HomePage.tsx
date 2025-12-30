
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/dictionary';
import Link from 'next/link';
import { CONFIG } from '@/config';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [showMain, setShowMain] = useState(false);

  const logs = [
    `> INITIALIZING KERNEL_HKN_V3.3...`,
    `> LOADING SECURITY_PROTOCOL_SUITE...`,
    `> ESTABLISHING SECURE_TUNNEL: ${CONFIG.contact.sessionId.slice(0, 8)}...`,
    `> BYPASSING FIREWALL_LEVEL_7...`,
    `> ACCESS_GRANTED: WELCOME OPERATIVE.`,
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootSequence(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowMain(true), 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] font-mono">
      {!showMain ? (
        <div className="w-full max-w-xl text-left space-y-1 p-8 border border-green-500/20 bg-green-950/5">
          {bootSequence.map((log, idx) => (
            <p key={idx} className="text-green-500 text-xs md:text-sm tracking-widest">{log}</p>
          ))}
          <p className="text-green-500 text-xs md:text-sm cursor-blink"></p>
        </div>
      ) : (
        <div className="max-w-4xl w-full p-10 border-2 border-green-500/30 bg-black relative overflow-hidden animate-flicker shadow-[0_0_40px_rgba(0,255,65,0.1)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse shadow-[0_0_10px_#00ff41]"></div>
          
          <div className="mb-10 text-left text-[10px] text-green-500/60 uppercase tracking-[0.3em] flex justify-between">
            <div>NODE_IDENT: {CONFIG.contact.sessionId.slice(0, 12)}</div>
            <div className="animate-pulse">STATUS: ENCRYPTED_STREAM_ON</div>
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-green-500 mb-8 tracking-tighter glow-green">
            {CONFIG.site.tagline[language].toUpperCase()}
          </h1>

          <div className="p-6 bg-green-500/5 border-l-4 border-green-500 mb-12">
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed italic">
              " {t('homeDesc')} "
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href={`/${language}/dispatches/`} 
              className="group relative px-10 py-4 bg-green-500 text-black font-black uppercase tracking-widest overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">[ DECRYPT_DISPATCHES ]</span>
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            <Link 
              href={`/${language}/services/`} 
              className="px-10 py-4 border-2 border-green-500 text-green-500 font-black uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
            >
              [ SERVICE_TIERS ]
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-green-500/20 text-[10px] text-green-500/40 uppercase flex justify-between tracking-widest">
            <span>UNAUTHORIZED_ACCESS_PROHIBITED</span>
            <span>SYSTEM_TIME: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
