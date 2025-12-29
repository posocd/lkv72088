
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
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}/`} className="text-2xl font-bold text-yellow-400 font-mono">
              {CONFIG.site.title}
            </Link>
          </div>
          
          <div className="flex items-center">
            <nav className="hidden md:block">
              <ul className="ml-10 flex items-center space-x-4">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link 
                        href={item.path}
                        className={`px-3 py-2 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all duration-300 block ${
                        pathname === item.path
                            ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={toggleLanguage}
                    className="text-xs font-mono border border-gray-800 rounded px-2 py-1 text-gray-500 hover:text-yellow-400 hover:border-yellow-400 transition-colors ml-4"
                  >
                    [ <span className={lang === 'en' ? 'text-yellow-400' : ''}>EN</span> | <span className={lang === 'id' ? 'text-yellow-400' : ''}>ID</span> ]
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="-mr-2 flex md:hidden items-center gap-3">
              <button 
                onClick={toggleLanguage}
                className="text-[10px] font-mono border border-gray-800 rounded px-2 py-1 text-gray-400"
              >
                 {lang.toUpperCase()}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black border-b border-gray-800 animate-fadeIn">
          <ul className="px-4 pt-2 pb-6 space-y-2">
             {navItems.map(item => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`px-3 py-3 rounded-md text-xs font-bold uppercase tracking-widest block ${
                      pathname === item.path ? 'bg-yellow-400 text-black' : 'text-gray-400'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
