'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DispatchSummary, LocalizedContent } from '../../types';
import { loadDispatchContent } from '../../data/dispatches';
import { HackerImage } from '../layout/AnimEffects';
import SeoUpdater from '../../components/layout/SeoUpdater';
import { promotionsData } from '../../data/promotions';
// Fix case-sensitive import
import { useLanguage } from '@/components/dictionary';
import Link from 'next/link';
import { SITE_URL } from '../../config';

import { 
  TwitterIcon, FacebookIcon, WhatsAppIcon, TelegramIcon, MessengerIcon 
} from '../icons/SocialIcons';
import { 
  UserIcon, CalendarIcon, ClockIcon, ArrowUpIcon, ChevronDownIcon, CopyIcon, CheckIcon
} from '../icons/InterfaceIcons';

const parseInlineStyles = (text: string): React.ReactNode => {
  const codeParts = text.split(/(`[^`]+`)/g);
  return codeParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`code-${i}`} className="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-yellow-400 border border-gray-700">{part.slice(1, -1)}</code>;
    }
    const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g);
    return linkParts.map((subPart, j) => {
      const linkMatch = subPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a key={`link-${i}-${j}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:underline decoration-dotted underline-offset-4 transition-colors">
            {parseInlineStyles(linkMatch[1])}
          </a>
        );
      }
      const boldParts = subPart.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((boldPart, k) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`bold-${i}-${j}-${k}`} className="text-yellow-400 font-bold">{parseInlineStyles(boldPart.slice(2, -2))}</strong>;
        }
        const italicParts = boldPart.split(/(\_.*?\_)/g);
        return italicParts.map((italicPart, l) => {
          if (italicPart.startsWith('_') && italicPart.endsWith('_')) {
             return <em key={`italic-${i}-${j}-${k}-${l}`} className="italic text-gray-200 font-serif tracking-wide">{parseInlineStyles(italicPart.slice(1, -1))}</em>;
          }
          return italicPart;
        });
      });
    });
  });
};

const ContentParser: React.FC<{ content: string }> = ({ content }) => {
  const codeBlocks: string[] = [];
  const protectedContent = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  const blocks = protectedContent.split(/\n\s*\n/);

  return (
    <div className="text-[#ffffff] leading-relaxed font-mono text-lg space-y-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const codeBlockMatch = trimmed.match(/^__CODE_BLOCK_(\d+)__$/);
        if (codeBlockMatch) {
            const codeIndex = parseInt(codeBlockMatch[1], 10);
            const originalCode = codeBlocks[codeIndex];
            const codeContent = originalCode.replace(/^```[a-zA-Z0-9]*\n?/, '').replace(/```$/, '');
            return (
                <pre key={index} className="bg-black border border-gray-800 p-4 rounded-md overflow-x-auto my-6 font-mono text-sm text-green-300 shadow-inner whitespace-pre">
                    <code>{codeContent}</code>
                </pre>
            );
        }
        if (trimmed === '---' || trimmed === '***') {
             return <hr key={index} className="border-t-2 border-dashed border-gray-800 my-10" />;
        }
        if (trimmed.startsWith('## ')) {
            return <h1 key={index} className="text-3xl font-bold text-white mt-10 mb-6 border-b-2 border-yellow-400/20 pb-3">{parseInlineStyles(trimmed.replace('## ', ''))}</h1>;
        }
        if (trimmed.startsWith('### ')) {
            return <h2 key={index} className="text-2xl font-bold text-yellow-400 mt-8 mb-4 border-b border-gray-800 pb-2">{parseInlineStyles(trimmed.replace('### ', ''))}</h2>;
        }
        if (trimmed.startsWith('> ')) {
            return (
                <blockquote key={index} className="border-l-4 border-yellow-400 pl-4 italic text-gray-300 my-6 bg-gray-900/30 py-2 pr-4 rounded-r">
                    {parseInlineStyles(trimmed.replace('> ', ''))}
                </blockquote>
            );
        }
        if (trimmed.match(/^(\d+\.|-)\s/)) {
           const lines = trimmed.split('\n');
           return (
             <ul key={index} className="space-y-2 pl-6 border-l-2 border-gray-700 bg-gray-900/20 py-4 rounded-r-lg hover:border-yellow-400/50 transition-colors duration-300">
               {lines.map((line, i) => {
                 const cleanLine = line.replace(/^(\d+\.|-)\s+/, '');
                 return (
                    <li key={i} className="pl-2 flex items-start group">
                        <span className="text-yellow-400 mr-3 mt-1.5 text-xs group-hover:text-yellow-200 transition-colors" aria-hidden="true">▶</span>
                        <span>{parseInlineStyles(cleanLine)}</span>
                    </li>
                 );
               })}
             </ul>
           );
        }
        if (trimmed.includes('[BEGIN TRANSMISSION]') || trimmed.includes('[MULAI TRANSMISI]')) {
             return (
               <div key={index} className="text-center -mt-3 -mb-3">
                 <span className="inline-block text-green-100 font-black tracking-[0.25em] border-b-2 border-green-400 pb-1 my-1 animate-pulse text-base uppercase">
                   {trimmed.replace(/\[|\]/g, '')}
                 </span>
               </div>
             );
        }
        if (trimmed.includes('[END TRANSMISSION]') || trimmed.includes('[AKHIR TRANSMISI]')) {
             return (
               <div key={index} className="text-center -mt-3 -mb-3">
                 <span className="inline-block text-red-100 font-black tracking-[0.25em] border-b-2 border-red-400 pb-1 my-1 animate-pulse text-base uppercase">
                   {trimmed.replace(/\[|\]/g, '')}
                 </span>
               </div>
             );
        }
        return <p key={index} className="leading-8 text-[#ffffff] post-content-text">{parseInlineStyles(trimmed)}</p>;
      })}
    </div>
  );
};

const PostPage: React.FC<{ postSummary: DispatchSummary }> = ({ postSummary }) => {
  const { language, t } = useLanguage();
  const [content, setContent] = useState<LocalizedContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [copyProgress, setCopyProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchContent = async () => {
        const loadedContent = await loadDispatchContent(postSummary.id);
        if (mounted) {
            setContent(loadedContent);
            setLoading(false);
        }
    };
    fetchContent();
    return () => { mounted = false; };
  }, [postSummary.id]);
  
  const origin = SITE_URL;
  const canonicalUrl = `${origin}/${language}/${postSummary.slug}/`;
  const ampUrl = `${origin}/${language}/amp/${postSummary.slug}/`;
  
  const [isPromoSectionOpen, setIsPromoSectionOpen] = useState(false);
  const [openPromoIndex, setOpenPromoIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, progress));
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkedPromotions = useMemo(() => {
    const rawIds = postSummary.promotionIds || [];
    const uniqueIds = Array.from(new Set(rawIds));
    return promotionsData.filter(p => uniqueIds.includes(p.id));
  }, [postSummary.promotionIds]);
  
  const wordCount = useMemo(() => {
    if (!content) return 0;
    return content[language].trim().split(/\s+/).length;
  }, [content, language]);

  const publishedIsoTime = useMemo(() => new Date(postSummary.timestamp).toISOString(), [postSummary.timestamp]);

  const shareText = postSummary.title[language];
  const shareUrl = canonicalUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowCopyToast(true);
      setCopyProgress(0);
      const interval = setInterval(() => {
        setCopyProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 5; 
        });
      }, 30);
      
      setTimeout(() => setShowCopyToast(false), 3000);
    });
  };

  const seoProducts = useMemo(() => {
    return linkedPromotions.map(promo => ({
      name: promo.title[language],
      description: promo.terms[language][0],
      image: promo.imageUrl,
      sku: `PROMO-HKN-${promo.id}`,
      aggregateRating: {
        ratingValue: "5.0",
        reviewCount: "850"
      },
      offers: {
        price: "0",
        priceCurrency: "IDR",
        priceValidUntil: "2025-12-31"
      }
    }));
  }, [linkedPromotions, language]);

  const softwareAppData = useMemo(() => ({
    name: "HackerNet Intelligence Platform",
    operatingSystem: "Cloud-based / Decentralized",
    applicationCategory: "SecurityApplication",
    ratingValue: "4.9",
    ratingCount: "12500",
    price: "0",
    currency: "IDR"
  }), []);

  const seoBreadcrumbs = useMemo(() => [
    { name: t('navHome'), item: `/${language}/` },
    { name: t('navDispatches'), item: `/${language}/dispatches` },
    { name: postSummary.title[language], item: `/${language}/${postSummary.slug}` }
  ], [language, t, postSummary]);

  return (
    <>
      <SeoUpdater
        title={`${postSummary.title[language]} | HackerNet`}
        description={postSummary.excerpt[language]}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={postSummary.imageUrl}
        author={postSummary.author}
        article={{
          publishedTime: publishedIsoTime,
          author: postSummary.author,
          authorUrl: `${SITE_URL}/${language}/about`,
          tags: postSummary.tags.map(tag => t(tag)),
          wordCount: wordCount
        }}
        breadcrumbs={seoBreadcrumbs}
        products={seoProducts}
        softwareApp={softwareAppData}
        ampUrl={ampUrl}
      />

      <div className="fixed top-0 left-0 h-1 bg-yellow-400 z-[100] shadow-[0_0_15px_rgba(250,204,21,0.8)]" style={{ width: `${scrollProgress}%` }} />

      {showCopyToast && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/80 backdrop-blur-md animate-fadeIn" role="alert" aria-live="polite">
          <div className="bg-black border-2 border-yellow-400 p-8 rounded-none shadow-[0_0_50px_rgba(250,204,21,0.4)] max-w-sm w-full relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDFmgjEgaDFWMHptMiAyaDFWMmgtMXoiIGZpbGw9InJnYmEoMjUwLDIwNCwyMSwwLjEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>
             <div className="relative z-10 font-mono">
                <h3 className="text-yellow-400 font-bold text-xs tracking-[0.2em] animate-pulse mb-6">{t('dataTransmission')}</h3>
                {copyProgress < 100 ? (
                    <div className="space-y-4">
                        <div className="text-[10px] text-gray-100 space-y-1">
                            <p>{t('encryptingData')}</p>
                            <p>{t('targetClipboard')}</p>
                            <p>{t('secureHandshake')}</p>
                        </div>
                        <div className="w-full h-4 bg-gray-900 border border-gray-800 relative overflow-hidden">
                            <div className="h-full bg-yellow-400 transition-all duration-75 ease-out" style={{ width: `${copyProgress}%` }} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-fadeIn">
                        <div className="flex justify-center mb-4">
                             <CheckIcon className="w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" aria-hidden="true" />
                        </div>
                        <div className="border border-green-500 bg-green-900/20 p-2">
                             <p className="text-green-100 font-bold tracking-widest text-[10px] uppercase">{t('linkCopied')}</p>
                        </div>
                    </div>
                )}
             </div>
          </div>
        </div>
      )}

      <section className="max-w-4xl mx-auto relative select-none pb-2">
        <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            aria-label={t('scrollToTop')}
            className={`fixed bottom-10 right-10 p-3 bg-yellow-400 text-black rounded-full shadow-lg z-50 transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
        >
            <ArrowUpIcon aria-hidden="true" />
        </button>

        <article className="p-6 sm:p-10 border border-gray-800 rounded-lg bg-gray-900/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <header className="pb-5 mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 font-mono">
               {postSummary.title[language]}
            </h1>
            <div className="text-sm text-[#ffffff] mt-2 font-mono flex flex-wrap gap-x-4 gap-y-1.5 items-center">
              <span className="flex items-center gap-2"><UserIcon className="w-4 h-4 text-yellow-400" aria-hidden="true" /> {postSummary.author}</span>
              <span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-yellow-400" aria-hidden="true" /> {postSummary.timestamp}</span>
              <span className="flex items-center gap-2"><ClockIcon className="w-4 h-4 text-yellow-400" aria-hidden="true" /> {Math.ceil(wordCount / 200)} {t('minRead')}</span>
            </div>
          </header>

          <figure className="mb-10">
            <HackerImage 
              src={postSummary.imageUrl} 
              alt={`${t('altDispatch')} ${postSummary.title[language]}`} 
              className="rounded-lg border border-gray-800" 
              priority={true} 
              aspectRatio="auto"
              objectFit="contain"
            />
          </figure>

          <div className="min-h-[40vh] post-article-body">
            {loading ? <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div></div> : content && <ContentParser content={content[language]} />}
          </div>
          
          <footer className="mt-8 pt-6 border-t border-gray-800 text-left">
             <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                   <span className="w-2 h-5 bg-yellow-400" aria-hidden="true"></span>
                   <h2 className="text-xl font-mono font-black text-yellow-400 tracking-[0.3em] uppercase">{t('tags')}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                   {postSummary.tags.map(tag => (
                     <span key={tag} className="px-3 py-1.5 text-xs font-mono bg-gray-800 text-white border border-gray-600 rounded hover:border-yellow-400 transition-colors cursor-default">
                        #{t(tag)}
                     </span>
                   ))}
                </div>
             </div>

             <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                   <span className="w-2 h-5 bg-yellow-400" aria-hidden="true"></span>
                   <h2 className="text-xl font-mono font-black text-yellow-400 tracking-[0.3em] uppercase">{t('share')}</h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-yellow-400 hover:text-yellow-400 text-white transition-all duration-300 flex items-center justify-center group" aria-label={t('shareOnX')}>
                        <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-blue-600 hover:text-blue-600 text-white transition-all duration-300 flex items-center justify-center group" aria-label={t('shareOnFacebook')}>
                        <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-green-500 hover:text-green-500 text-white transition-all duration-300 flex items-center justify-center group" aria-label={t('shareOnWhatsApp')}>
                        <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-blue-400 hover:text-blue-400 text-white transition-all duration-300 flex items-center justify-center group" aria-label={t('shareOnTelegram')}>
                        <TelegramIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a href={`fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-blue-500 hover:text-blue-500 text-white transition-all duration-300 flex items-center justify-center group" aria-label={t('shareOnMessenger')}>
                        <MessengerIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <button 
                        onClick={handleCopyLink}
                        className="p-2 sm:p-2.5 bg-gray-900 rounded border border-gray-800 hover:border-yellow-400 hover:text-yellow-400 text-white transition-all duration-300 flex items-center justify-center group"
                        aria-label={t('copyLinkToClipboard')}
                    >
                        <CopyIcon className="w-4 h-4 sm:w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </button>
                </div>
             </div>

             <div className="mt-10 flex justify-center">
                <Link 
                    href={`/${language}/dispatches/`} 
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-800 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-lg border border-gray-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all group" 
                    aria-label={t('backToDispatchesAria')}
                >
                    <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">&larr;</span>
                    {t('backToDispatches')}
                </Link>
             </div>
          </footer>
        </article>

        {linkedPromotions.length > 0 && (
          <div className="mt-4 pt-0 animate-fadeIn">
              <button 
                onClick={() => setIsPromoSectionOpen(!isPromoSectionOpen)}
                aria-expanded={isPromoSectionOpen}
                aria-controls="promo-content-area"
                className={`w-full flex justify-between items-center p-4 rounded-md border transition-all duration-500 group ${isPromoSectionOpen ? 'border-yellow-400 bg-yellow-400/5 shadow-[0_0_20px_rgba(250,204,21,0.1)]' : 'border-gray-800 bg-gray-900/40 hover:border-yellow-400/50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-sm ${isPromoSectionOpen ? 'bg-yellow-400 animate-pulse' : 'bg-gray-700'} transition-colors`}></div>
                  <h2 className="text-base font-bold text-yellow-400 font-mono tracking-[0.2em] uppercase">{t('promotion')}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-gray-400 hidden sm:block">
                    {isPromoSectionOpen ? t('statusActive') : t('statusStandby')}
                  </span>
                  <ChevronDownIcon className={`w-6 h-6 text-yellow-400 transition-transform duration-500 ${isPromoSectionOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </div>
              </button>
              
              {isPromoSectionOpen && (
                <div id="promo-content-area" className="mt-6 grid gap-10 sm:grid-cols-2">
                  {linkedPromotions.map((promo, index) => (
                    <div key={promo.id} className="group animate-fadeIn flex flex-col">
                      <div className="relative overflow-hidden rounded-md mb-4 bg-gray-900">
                         <HackerImage 
                           src={promo.imageUrl} 
                           alt={`${t('altPromo')} ${promo.title[language]}: ${promo.terms[language][0]}`} 
                           aspectRatio="auto"
                           objectFit="contain"
                           className="w-full transform group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100 rounded-md" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                      </div>
                      
                      <div className="flex justify-between items-center gap-4 mb-2 px-1">
                        <h3 className="text-gray-100 font-bold text-[10px] tracking-[0.15em] uppercase leading-tight">{promo.title[language]}</h3>
                        <button 
                          onClick={() => setOpenPromoIndex(openPromoIndex === index ? null : index)}
                          aria-label={openPromoIndex === index ? `${t('altPromoClose')} ${promo.title[language]}` : `${t('promoDetail')} ${promo.title[language]}`}
                          aria-expanded={openPromoIndex === index}
                          className={`text-[9px] font-mono font-bold px-2 py-1 border transition-all flex-shrink-0 ${openPromoIndex === index ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-yellow-400 border-yellow-400/40 hover:border-yellow-400'}`}
                        >
                          {openPromoIndex === index ? `[ ${t('promoClose')} ]` : `[ ${t('promoDetail')} ]`}
                        </button>
                      </div>
                      
                      {openPromoIndex === index && (
                        <div className="mt-2 py-3 px-4 border-l-2 border-yellow-400/40 animate-fadeIn font-mono">
                          <ul className="list-none space-y-2 text-[10px] text-gray-300">
                            {promo.terms[language].map((term, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-yellow-400 font-bold mt-0.5" aria-hidden="true">»</span>
                                <span>{term}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </section>
    </>
  );
};

export default PostPage;