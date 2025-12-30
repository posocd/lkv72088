
// SINGLE SOURCE OF TRUTH (SSOT)
// Optimized for Next.js 15 Environment

import { LocalizedContent } from "./types";

const getSiteUrl = (): string => {
  const fallback = 'https://hackernet.vercel.app';
  return (process.env.NEXT_PUBLIC_SITE_URL || fallback).trim().replace(/\/$/, '');
};

export const CONFIG = {
  site: {
    title: "HackerNet",
    name: "HackerNet Elite Technology & Security",
    tagline: {
      id: "Solusi Keamanan Siber & Teknologi Elite",
      en: "Elite Cyber Security & Technology Solutions"
    },
    description: {
      id: "HackerNet adalah agensi keamanan siber elit yang menyediakan audit smart contract, uji penetrasi (pentesting), dan solusi teknologi terskala dengan standar enkripsi militer.",
      en: "HackerNet is an elite cyber security agency providing smart contract audits, penetration testing (pentesting), and scalable tech solutions with military-grade encryption."
    },
    shortDescription: {
      id: "Agensi Keamanan Siber Elite untuk infrastruktur digital modern.",
      en: "Elite Cyber Security Agency for modern digital infrastructure."
    },
    url: getSiteUrl(),
    language: 'id',
    themeColor: '#0a0a0a',
    accentColor: '#facc15',
    keywords: {
      id: ['keamanan siber', 'jasa pentesting', 'audit smart contract', 'hacker etis jakarta', 'solusi blockchain', 'keamanan dApp', 'cyber security indonesia'],
      en: ['cyber security', 'pentesting services', 'smart contract audit', 'ethical hacking', 'blockchain security', 'dApp protection', 'offensive security']
    },
    foundingDate: "2024-01-01",
    founders: ["Cipher", "Glitch"]
  },
  assets: {
    favicon: '/favicon.svg',
    logo: '/web-app-manifest-512x512.png',
    defaultOgImage: '/default-og-image.jpg',
    imageBaseUrl: 'https://img.lv815.com',
    heroImage: '/assets/hacker.webp' 
  },
  contact: {
    email: 'secure@hackernet.com',
    sessionId: '0579e2d995991e46ed6baa25ba2c2798b46626a690d073708d329a1949df35c258',
    phone: '+62-812-3456-7890',
    priceRange: 'IDR 75.000.000 - IDR 500.000.000',
    address: {
      streetAddress: 'Cyber Tower Level 7, Kuningan',
      locality: 'Jakarta Selatan',
      region: 'DKI Jakarta',
      postalCode: '12950',
      country: 'ID'
    },
    geo: {
      latitude: -6.2297,
      longitude: 106.8295
    }
  },
  social: {
    twitter: '@hackernet',
    sameAs: [
      "https://twitter.com/hackernet",
      "https://github.com/hackernet",
      "https://linkedin.com/company/hackernet"
    ]
  },
  authors: {
    default: 'HackerNet Intelligence Command'
  },
  features: {
    enablePromotions: true,
    paginationLimit: 8,
  },
  security: {
    lockoutDuration: 60 * 60 * 1000,
  },
  team: [
    { name: 'Cipher', role: { id: 'Arsitek Keamanan Utama', en: 'Lead Security Architect' }, image: '/assets/operatives/cipher.webp' },
    { name: 'Glitch', role: { id: 'Pengembang Kernel', en: 'Kernel Developer' }, image: '/assets/operatives/glitch.webp' },
  ],
  services: [
    { 
      name: { id: 'Uji Penetrasi (Pentesting)', en: 'Penetration Testing' }, 
      description: { id: 'Simulasi serangan siber untuk mengidentifikasi celah keamanan kritis.', en: 'Cyber attack simulation to identify critical security gaps.' },
      type: 'Service' 
    }
  ],
  pricing: [
    {
      id: 'ghost',
      tier: { id: 'Protokol Hantu', en: 'Ghost Protocol' },
      price: { id: 'Rp 225jt', en: '$15K' },
      schemaPrice: '225000000',
      currency: 'IDR',
      image: 'https://img.lv815.com/hkn/pricing-ghost.webp',
      description: { id: 'Keamanan ofensif dan defensif tingkat lanjut untuk korporasi.', en: 'Advanced offensive and defensive capabilities for enterprises.' },
      features: {
        id: ['Patching Zero-Day', 'Audit dApp', 'Monitoring 24/7'],
        en: ['Zero-Day Patching', 'dApp Audit', '24/7 Monitoring']
      },
      rating: 5.0,
      reviewCount: 42,
      isFeatured: true
    }
  ]
};

export const SITE_URL = CONFIG.site.url;
