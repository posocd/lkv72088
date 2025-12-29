'use client';

import React from 'react';
import { HackerImage } from './layout/AnimEffects';
import SeoUpdater from './layout/SeoUpdater';
import { useLanguage } from '../utils/LanguageContext';
import Link from 'next/link';
import { SITE_URL, CONFIG } from '../config';
import { CheckIcon } from './icons/InterfaceIcons';

const PricingCard: React.FC<{
  tier: string; price: string; description: string; features: string[];
  isFeatured?: boolean; buttonText: string; unit: string; contactLink: string;
  image: string;
}> = ({ tier, price, description, features, isFeatured = false, buttonText, unit, contactLink, image }) => {
  const { t } = useLanguage();
  return (
    <article className={`p-8 border rounded-xl flex flex-col overflow-hidden transition-all duration-500 ${isFeatured ? 'border-yellow-400 bg-gray-900 shadow-[0_0_50px_rgba(250,204,21,0.1)] scale-105 z-10' : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'}`}>
      <div className="mb-6 -mx-8 -mt-8 h-48 relative group overflow-hidden">
        <HackerImage src={image} alt={`${t('tierLabel')} ${tier}`} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        {isFeatured && <div className="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 uppercase rounded shadow-lg">{t('statusActive')}</div>}
      </div>
      <h3 className="text-2xl font-bold font-mono tracking-tight text-white group-hover:text-yellow-400">{tier}</h3>
      <p className="mt-2 text-xs text-gray-500 font-mono uppercase tracking-widest">{description}</p>
      <div className="mt-8 flex items-baseline">
        <span className="text-4xl font-extrabold text-white tracking-tighter">{price}</span>
        <span className="ml-1 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{unit}</span>
      </div>
      <ul className="mt-8 space-y-4 flex-grow border-t border-gray-800 pt-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start group">
            <CheckIcon className="flex-shrink-0 h-4 w-4 text-yellow-400/80 mt-0.5" />
            <span className="ml-3 text-xs text-gray-400 font-mono">{f}</span>
          </li>
        ))}
      </ul>
      <Link href={contactLink} className={`mt-10 block w-full py-4 px-6 rounded-lg text-center font-black uppercase text-xs transition-all ${isFeatured ? 'bg-yellow-400 text-black hover:bg-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
        {buttonText}
      </Link>
    </article>
  );
};

const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();

  const productSchema = CONFIG.pricing.map(plan => ({
    name: plan.tier[language],
    description: plan.description[language],
    image: plan.image,
    sku: `HKN-SEC-${plan.id.toUpperCase()}`,
    offers: { price: plan.schemaPrice, priceCurrency: plan.currency },
    aggregateRating: { ratingValue: plan.rating, reviewCount: plan.reviewCount }
  }));

  const faqData = language === 'id' ? [
    { question: "Apa keunggulan HackerNet?", answer: "Keamanan berbasis kernel dan audit smart contract yang tak tertembus." }
  ] : [
    { question: "Why choose HackerNet?", answer: "Unbreakable kernel-level security and smart contract audits." }
  ];

  return (
    <>
      <SeoUpdater
        title={`${t('servicesTitle')} | Keamanan Siber Elite HackerNet`}
        description={t('servicesSubtitle')}
        canonicalUrl={`${SITE_URL}/${language}/services`}
        products={productSchema}
        faq={faqData}
        breadcrumbs={[{ name: t('navHome'), item: `/${language}/` }, { name: t('navServices'), item: `/${language}/services` }]}
      />
      <section className="animate-fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-yellow-400 tracking-tighter font-mono">
            {t('servicesTitle')}
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-mono">{t('servicesSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 max-w-7xl mx-auto">
          {CONFIG.pricing.map((plan, i) => (
            <PricingCard key={i} tier={plan.tier[language]} price={plan.price[language]} unit={t('priceUnit')} description={plan.description[language]} features={plan.features[language]} isFeatured={plan.isFeatured} image={plan.image} buttonText={t('initiateContract')} contactLink={`/${language}/contact`} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;