
'use client';

import React from 'react';
import { HackerImage } from './layout/AnimEffects';
import SeoUpdater from './layout/SeoUpdater';
import { useLanguage } from '@/components/dictionary';
import Link from 'next/link';
import { SITE_URL, CONFIG } from '../config';
import { CheckIcon } from './icons/InterfaceIcons';

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  buttonText: string;
  unit: string;
  contactLink: string;
  image: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, price, description, features, isFeatured = false, buttonText, unit, contactLink, image }) => {
  const { t } = useLanguage();
  return (
    <article className={`relative p-8 border-2 flex flex-col overflow-hidden transition-all duration-500 ${isFeatured ? 'border-yellow-400 bg-yellow-400/5 shadow-[0_0_30px_rgba(250,204,21,0.1)] scale-105 z-10' : 'border-green-500/20 bg-black/40 hover:border-green-500/60'}`}>
      <div className="mb-6 -mx-8 -mt-8 h-56 relative group overflow-hidden border-b-2 border-green-500/20">
        <HackerImage src={image} alt={`${t('tierLabel')} ${tier}`} className="w-full h-full object-cover filter brightness-50 group-hover:brightness-100 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        {isFeatured && <div className="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 uppercase tracking-tighter shadow-xl">HOT_NODE</div>}
      </div>
      
      <h3 className={`text-2xl font-black font-mono tracking-widest uppercase ${isFeatured ? 'text-yellow-400' : 'text-green-500'}`}>{tier}</h3>
      <p className="mt-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] border-l-2 border-gray-800 pl-3">{description}</p>
      
      <div className="mt-10 flex items-baseline">
        <span className={`text-5xl font-black tracking-tighter ${isFeatured ? 'text-white' : 'text-green-500'}`}>{price}</span>
        <span className="ml-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">{unit}</span>
      </div>

      <ul className="mt-8 space-y-4 flex-grow pt-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start group">
            <span className={`flex-shrink-0 h-1.5 w-1.5 rounded-full mt-1.5 ${isFeatured ? 'bg-yellow-400' : 'bg-green-500'}`} />
            <span className="ml-4 text-xs text-gray-400 font-mono tracking-tight leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      <Link href={contactLink} className={`mt-10 block w-full py-5 px-6 font-black uppercase text-xs tracking-[0.3em] transition-all border-2 ${isFeatured ? 'bg-yellow-400 border-yellow-400 text-black hover:bg-white hover:border-white' : 'bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-black'}`}>
        [ {buttonText} ]
      </Link>
    </article>
  );
};

const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SeoUpdater
        title={`${t('servicesTitle')} | HackerNet`}
        description={t('servicesSubtitle')}
        canonicalUrl={`${SITE_URL}/${language}/services`}
        breadcrumbs={[{ name: t('navHome'), item: `/${language}/` }, { name: t('navServices'), item: `/${language}/services` }]}
      />
      <section className="animate-fadeIn pb-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-green-500 tracking-tighter font-mono glow-green mb-4">
            {t('servicesTitle').toUpperCase()}
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-sm md:text-lg text-gray-500 mt-4 max-w-2xl mx-auto font-mono uppercase tracking-widest">{t('servicesSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          {CONFIG.pricing.map((plan, i) => (
            <PricingCard 
              key={i} 
              tier={plan.tier[language]} 
              price={plan.price[language]} 
              unit={t('priceUnit')} 
              description={plan.description[language]} 
              features={plan.features[language]} 
              isFeatured={plan.isFeatured} 
              image={plan.image} 
              buttonText={t('initiateContract')} 
              contactLink={`/${language}/contact`} 
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
