'use client';

import React, { useState } from 'react';
import SeoUpdater from '@/components/layout/SeoUpdater';
import { useLanguage } from '@/components/Dictionary';
import { SITE_URL, CONFIG } from '@/config';
import { SendIcon, DownloadIcon, CheckIcon } from '@/components/icons/InterfaceIcons';

const ContactPage: React.FC = () => {
  const sessionId = CONFIG.contact.sessionId;
  const email = CONFIG.contact.email;
  const { t, language } = useLanguage();
  
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [emailCopyStatus, setEmailCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeType, setActiveType] = useState<'email' | 'session' | 'copy' | null>(null);

  const startActionAnimation = (type: 'email' | 'session' | 'copy', duration: number, onComplete: () => void) => {
    setActiveType(type);
    setShowOverlay(true);
    setProgress(0);
    
    const steps = 20;
    const stepDuration = duration / steps;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, stepDuration);

    setTimeout(() => {
      onComplete();
      setTimeout(() => {
        setShowOverlay(false);
        setActiveType(null);
      }, 1000);
    }, duration);
  };

  const handleCopy = () => {
    startActionAnimation('copy', 1500, () => {
      navigator.clipboard.writeText(sessionId).then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      });
    });
  };

  const handleCopyEmail = () => {
    startActionAnimation('copy', 1500, () => {
      navigator.clipboard.writeText(email).then(() => {
        setEmailCopyStatus('copied');
        setTimeout(() => setEmailCopyStatus('idle'), 2000);
      });
    });
  };

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    startActionAnimation('email', 2500, () => {
      window.location.href = `mailto:${email}`;
    });
  };

  const handleDownloadSession = (e: React.MouseEvent) => {
    e.preventDefault();
    startActionAnimation('session', 2000, () => {
      window.open('https://getsession.org/', '_blank');
    });
  };

  return (
    <>
      <SeoUpdater
        title={`${t('contactTitle')} | HackerNet`}
        description={t('contactSubtitle')}
        canonicalUrl={`${SITE_URL}/${language}/contact`}
        ogType="website"
        breadcrumbs={[
          { name: t('navHome'), item: `/${language}/` },
          { name: t('navContact'), item: `/${language}/contact` }
        ]}
        keywords={language === 'id' ? [
          'kontak hackernet', 'hubungi hacker', 'keamanan siber jakarta', 'layanan enkripsi'
        ] : [
          'contact hackernet', 'hire ethical hacker', 'cybersecurity support', 'encrypted communication'
        ]}
      />

      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="bg-black border-2 border-yellow-400 p-8 shadow-[0_0_60px_rgba(250,204,21,0.3)] max-w-xs w-full font-mono">
            <h3 className="text-yellow-400 font-bold text-xs tracking-widest mb-6 animate-pulse">{t('dataTransmission')}</h3>
            {progress < 100 ? (
                <div className="space-y-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-tighter space-y-1">
                      {activeType === 'copy' && (
                        <>
                          <p>{t('encryptingData')}</p>
                          <p>{t('targetClipboard')}</p>
                          <p>{t('secureHandshake')}</p>
                        </>
                      )}
                      {activeType === 'email' && (
                        <>
                          <p>{t('emailActionDesc')}</p>
                          <p>Port: 587 (TLS)</p>
                          <p>Relay: Local -&gt; HackerNet</p>
                        </>
                      )}
                      {activeType === 'session' && (
                        <>
                          <p>{t('sessionActionDesc')}</p>
                          <p>Encryption: Onion v3</p>
                          <p>Peer: Signal Network</p>
                        </>
                      )}
                    </div>
                    <div className="w-full h-3 bg-gray-900 border border-gray-800 relative overflow-hidden">
                        <div className="h-full bg-yellow-400 transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <div className="text-center animate-fadeIn">
                    <CheckIcon className="w-12 h-12 text-green-500 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <p className="text-green-500 font-bold text-[10px] tracking-widest uppercase">
                      {activeType === 'copy' && t('linkCopied')}
                      {activeType === 'email' && t('emailActionSuccess')}
                      {activeType === 'session' && t('sessionActionSuccess')}
                    </p>
                </div>
            )}
          </div>
        </div>
      )}

      <section className="animate-fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-[30px] font-black text-yellow-400 tracking-tighter font-mono">
            {t('contactTitle')}
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('contactSubtitle')}</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="p-10 border border-gray-800 rounded-2xl bg-gray-900/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-500 group flex flex-col shadow-xl">
                <h2 className="text-2xl text-green-500 font-bold mb-4 font-mono">{t('emailTitle')}</h2>
                <p className="text-sm text-gray-400 mb-8 font-mono leading-relaxed">{t('emailDesc')}</p>
                
                <div className="space-y-6 mt-auto">
                    <div className="p-6 bg-black/50 rounded-xl border border-gray-800 group-hover:border-green-500/20 transition-all">
                        <p className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-[0.2em]">{t('emailLabel')}</p>
                        <p className="text-green-400 font-mono break-all font-bold mb-6 text-base">{email}</p>
                        <button 
                            onClick={handleCopyEmail}
                            className="w-full py-3 bg-gray-800/50 border border-green-500/40 text-green-400 font-black text-xs uppercase tracking-widest rounded-lg hover:bg-green-500 hover:text-black transition-all"
                            aria-label={`Copy email ${email}`}
                        >
                            {emailCopyStatus === 'copied' ? t('copied') : t('copyEmail')}
                        </button>
                    </div>
                    <button 
                        onClick={handleSendEmail}
                        className="flex items-center justify-center gap-3 w-full py-5 bg-green-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                    >
                        {t('sendEmail')} <SendIcon />
                    </button>
                </div>
            </div>

            <div className="p-10 border border-gray-800 rounded-2xl bg-gray-900/30 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-500 group flex flex-col shadow-xl">
                <h2 className="text-2xl text-yellow-400 font-bold mb-4 font-mono">{t('sessionTitle')}</h2>
                <p className="text-sm text-gray-400 mb-8 font-mono leading-relaxed">{t('sessionDesc')}</p>

                <div className="space-y-6 mt-auto">
                    <div className="p-6 bg-black/50 rounded-xl border border-gray-800 group-hover:border-yellow-400/20 transition-all">
                        <p className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-[0.2em]">{t('sessionLabel')}</p>
                        <p className="text-yellow-400 font-mono break-all font-bold mb-6 text-xs leading-relaxed">{sessionId}</p>
                        <button 
                            onClick={handleCopy}
                            className="w-full py-3 bg-gray-800/50 border border-yellow-400/40 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                            aria-label="Copy Session ID"
                        >
                            {copyStatus === 'copied' ? t('copied') : t('copyId')}
                        </button>
                    </div>
                    <button 
                        onClick={handleDownloadSession}
                        className="flex items-center justify-center gap-3 w-full py-5 bg-yellow-400 text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)]"
                    >
                        {t('downloadSession')} <DownloadIcon />
                    </button>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;