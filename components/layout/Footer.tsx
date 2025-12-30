'use client';

import React from 'react';
import { useLanguage } from '@/components/Dictionary';
import { CONFIG } from '@/config';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p className="font-mono text-xs sm:text-sm tracking-tight">
          &copy; {year} <span className="text-yellow-400 font-bold">{CONFIG.site.title}</span> // {t('footerSecure')}
        </p>
      </div>
    </footer>
  );
}
