'use client';

import React, { useState, useEffect } from 'react';
import { ArchiveItem } from '@/types';
import { decryptArchive } from '@/security';
// Fix case-sensitive import
import { useLanguage } from '@/components/dictionary';
import { useRouter, usePathname } from 'next/navigation';
import { CONFIG } from '@/config';

interface ArchiveCardProps {
  item: ArchiveItem;
  onIntrusion: () => void;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ item, onIntrusion }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState<{en: string, id: string}>({ en: '', id: '' });
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  const { t, language } = useLanguage();

  useEffect(() => {
    const storedLockout = localStorage.getItem(`hackernet_lockout_${item.id}`);
    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout, 10);
      if (lockoutTime > Date.now()) {
        setLockedUntil(lockoutTime);
        setIsPrompting(true);
      }
    }
  }, [item.id]);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const diff = lockedUntil - Date.now();
      if (diff <= 0) {
        setLockedUntil(null);
        localStorage.removeItem(`hackernet_lockout_${item.id}`);
        clearInterval(interval);
      } else {
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setCountdown(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil, item.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil || !passwordInput.trim()) return;
    setIsValidating(true);
    try {
      const [resEn, resId] = await Promise.all([
          decryptArchive(item.description.en, passwordInput),
          decryptArchive(item.description.id, passwordInput)
      ]);
      setDecryptedContent({ en: resEn, id: resId });
      setIsUnlocked(true);
      setIsPrompting(false);
    } catch (err) {
      onIntrusion();
      setPasswordInput('');
      const lockoutTime = Date.now() + CONFIG.security.lockoutDuration;
      setLockedUntil(lockoutTime);
      localStorage.setItem(`hackernet_lockout_${item.id}`, lockoutTime.toString());
    } finally {
      setIsValidating(false);
    }
  };

  const activeContent = language === 'id' ? (decryptedContent.id || decryptedContent.en) : (decryptedContent.en || decryptedContent.id);

  return (
    <article className={`p-6 border rounded-lg bg-gray-900/50 transition-colors h-full flex flex-col ${isUnlocked ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : (lockedUntil ? 'border-red-600' : 'border-gray-800 hover:border-yellow-400/50 hover:bg-gray-900/80')}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-bold font-mono ${lockedUntil ? 'text-red-500' : 'text-yellow-400'}`}>{item.title}</h3>
        <span className="px-2 py-1 text-[9px] rounded bg-black/60 text-gray-400 border border-gray-800 uppercase tracking-widest">{t(`status${item.status}`)}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 text-[8px] font-mono border border-gray-800 bg-black/30 text-gray-500 uppercase tracking-wider rounded">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex-grow mt-2">
        {isUnlocked ? (
          <p className="text-gray-100 text-sm font-mono leading-relaxed whitespace-pre-wrap animate-fadeIn">{activeContent}</p>
        ) : (
          <div className="relative rounded bg-black/50 border border-gray-800 p-4 min-h-[100px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-bold tracking-widest text-[10px] border px-3 py-1.5 bg-black/90 ${lockedUntil ? 'text-red-600 border-red-600 animate-pulse' : 'text-red-500 border-red-500'}`}>
                {lockedUntil ? t('systemLocked') : t('encryptedBadge')}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        {!isUnlocked && (
          isPrompting ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              {lockedUntil ? (
                <div className="w-full px-3 py-4 bg-red-900/10 border border-red-900/50 rounded-md text-center">
                  <p className="text-red-400 font-mono text-xs uppercase tracking-widest">{t('retryTimer')} {countdown}</p>
                </div>
              ) : (
                <input
                  type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus disabled={isValidating} placeholder={isValidating ? t('decrypting') : t('passwordPlaceholder')}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-md text-yellow-400 font-mono text-sm focus:outline-none focus:border-yellow-400 transition-all placeholder:text-gray-700"
                />
              )}
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsPrompting(false)} disabled={!!lockedUntil} className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-gray-700 hover:text-white transition-all">{t('cancel')}</button>
                <button type="submit" disabled={isValidating || !passwordInput || !!lockedUntil} className="flex-1 px-4 py-2 bg-yellow-400 text-black font-black text-[10px] rounded-md uppercase tracking-widest hover:bg-white transition-all">
                  {isValidating ? '...' : t('decrypt')}
                </button>
              </div>
            </form>
          ) : (
            <button 
              onClick={() => setIsPrompting(true)} 
              className="w-full px-4 py-3 bg-gray-900/50 text-gray-300 text-[10px] rounded-md border border-gray-800 hover:border-yellow-400 hover:text-yellow-400 transition-all font-black uppercase tracking-[0.2em]"
            >
               {t('view')}
           </button>
          )
        )}
      </div>
    </article>
  );
};

// Fix: Added missing ArchivePageProps interface to fix type error.
interface ArchivePageProps {
  initialItems: ArchiveItem[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
}

const ArchivePage: React.FC<ArchivePageProps> = ({ initialItems, totalPages, currentPage, searchQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [intrusionAlert, setIntrusionAlert] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (inputValue) params.set('q', inputValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {intrusionAlert && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-red-900/10 backdrop-blur-[2px]">
             <h1 className="text-red-600 text-4xl sm:text-6xl font-black opacity-60 uppercase tracking-widest">{t('accessDenied')}</h1>
        </div>
      )}
      <section className="animate-fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
            {t('archiveTitle')}
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('archiveSubtitle')}</p>
        </div>
        <div className="mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleSearch}>
            <input
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder={t('searchPlaceholder')}
              className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-yellow-400 transition-all placeholder:text-gray-600 shadow-inner"
            />
          </form>
        </div>
        {initialItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialItems.map(item => (
              <ArchiveCard 
                key={item.id} 
                item={item} 
                onIntrusion={() => { setIntrusionAlert(true); setTimeout(() => setIntrusionAlert(false), 2000); }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center min-h-[400px] flex items-center justify-center">
              <div className="bg-gray-900/30 border border-red-900/50 rounded-2xl p-8 md:p-12 shadow-2xl shadow-red-900/5 w-full max-w-2xl animate-fadeIn">
                  <h2 className="text-2xl font-bold text-red-500 mb-4 font-mono">
                      {t('queryNotFound')}
                  </h2>
                  <p className="text-gray-400 mx-auto font-mono">{t('queryNotFoundDesc')}</p>
              </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ArchivePage;