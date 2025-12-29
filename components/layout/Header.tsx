
'use client';

import React, { useState } from 'react';
import { MenuIcon, XIcon } from '../icons/InterfaceIcons';
import { useLanguage } from '../../utils/LanguageContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { CONFIG } from '../../config';

export default function Header({ lang }: { lang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: t('navDispatches'), path: `/${lang}/dispatches/` },
    { label: t('navAbout'), path: `/${lang}/about/` },
    { label: t('navServices'), path: `/${lang}/services/` },
    { label: t('navContact'), path: `/${lang}/contact/` },
    { label: t('navArchive'), path: `/${lang}/archive/` },
  ];

  const toggleLanguage = () => {
    const targetLang = lang === 'en' ? 'id' : 'en';
    const newPath = pathname.replace(`/${lang}/`, `/${targetLang}/`);
    router.push(newPath);
  };

  return (
    <header className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-green-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}/`} className="text-xl font-black text-green-500 font-mono tracking-tighter glow-green">
              {CONFIG.site.title.toUpperCase()} // SYS_ADM
            </Link>
          </div>
          
          <div className="flex items-center">
            <nav className="hidden md:block">
              <ul className="ml-10 flex items-center space-x-2">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link 
                        href={item.path}
                        className={`px-4 py-1.5 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all duration-300 block border border-transparent ${
                        pathname === item.path
                            ? 'bg-green-500 text-black border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                            : 'text-gray-500 hover:text-green-400 hover:border-green-900/50'
                        }`}
                    >
                      [{item.label}]
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={toggleLanguage}
                    className="text-[10px] font-mono border border-green-900/30 rounded-none px-3 py-1 text-gray-500 hover:text-green-400 hover:border-green-500 transition-colors ml-4"
                  >
                    MODE: <span className="text-green-500">{lang.toUpperCase()}</span>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="-mr-2 flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-green-500 hover:text-white"
              >
                {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black border-b border-green-900/50 animate-fadeIn">
          <ul className="px-4 pt-2 pb-6 space-y-1">
             {navItems.map(item => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`px-4 py-3 text-xs font-bold uppercase tracking-widest block ${
                      pathname === item.path ? 'bg-green-500 text-black' : 'text-gray-500'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    > {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button 
                  onClick={toggleLanguage}
                  className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-green-500 border-t border-green-900/20"
                >
                  > SWITCH_LANG: {lang === 'en' ? 'INDONESIAN' : 'ENGLISH'}
                </button>
              </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
