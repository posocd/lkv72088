
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

export const dictionary: Translations = {
  // Navigation & Accessibility
  navHome: { en: 'Home', id: 'Beranda' },
  navAbout: { en: 'About', id: 'Tentang' },
  navServices: { en: 'Services', id: 'Layanan' },
  navArchive: { en: 'Archive', id: 'Arsip' },
  navContact: { en: 'Contact', id: 'Kontak' },
  navDispatches: { en: 'Dispatches', id: 'Berita' },
  navSitemap: { en: 'Sitemap', id: 'Peta Situs' },
  navPrivacy: { en: 'Privacy', id: 'Privasi' },
  skipToContent: { en: 'Skip to content', id: 'Lompat ke konten' },
  openMenu: { en: 'Open menu', id: 'Buka menu' },
  closeMenu: { en: 'Close menu', id: 'Tutup menu' },
  breadcrumbHome: { en: 'Home', id: 'Beranda' },
  breadcrumbNavigation: { en: 'Navigation', id: 'Navigasi' },
  faqDefaultName: { en: 'Frequently Asked Questions', id: 'Pertanyaan Umum' },
  
  // Pagination
  prev: { en: 'Previous', id: 'Sebelumnya' },
  next: { en: 'Next', id: 'Berikutnya' },
  
  // Footer
  footerSecure: { en: 'All transmissions secured.', id: 'Semua transmisi diamankan.' },
  
  // Post/Dispatch Meta
  metaPostedBy: { en: 'POSTED BY', id: 'DIPOSTING OLEH' },
  metaTimestamp: { en: 'TIMESTAMP', id: 'WAKTU' },
  minRead: { en: 'min read', id: 'menit baca' },
  readMore: { en: 'Read Full Dispatch', id: 'Baca Selengkapnya' },
  backToDispatches: { en: 'Back to Dispatches', id: 'Kembali ke Berita' },
  backToDispatchesAria: { en: 'Back to Intel Dispatches list', id: 'Kembali ke daftar Berita Intelijen' },
  scrollToTop: { en: 'Scroll to top', id: 'Kembali ke atas' },
  
  // Home Page
  homeTitle: { en: 'Elite Technology Solutions', id: 'Solusi Teknologi Elite' },
  homeDesc: { en: 'We are the architects of the new digital frontier. We build secure, scalable, and bleeding-edge solutions for a decentralized world.', id: 'Kami adalah arsitek batas digital baru. Kami membangun solusi aman, terskala, dan canggih untuk dunia yang terdesentralisasi.' },
  homeCta: { en: 'Intel Brief', id: 'Info Intel' },
  
  // About Page
  aboutTitle: { en: 'About Us', id: 'Tentang Kami' },
  aboutSubtitle: { en: 'Declassifying HackerNet Operatives', id: 'Deklasifikasi Operatif HackerNet' },
  missionTitle: { en: 'Our Mission', id: 'Misi Kami' },
  missionDesc: { en: 'To subvert the digital status quo. We provide unparalleled technological solutions that empower our clients to operate with absolute security and efficiency.', id: 'Untuk merombak status quo digital. Kami menyediakan solusi teknologi tak tertandingi yang memberdayakan klien kami untuk beroperasi dengan keamanan dan efisiensi mutlak.' },
  coreProtocol: { en: 'Core Protocol', id: 'Protokol Inti' },
  protocolStealth: { en: 'Stealth', id: 'Penyusupan (Stealth)' },
  protocolStealthDesc: { en: 'Operate without detection, ensuring client privacy.', id: 'Beroperasi tanpa terdeteksi, menjamin privasi klien.' },
  protocolIntegrity: { en: 'Integrity', id: 'Integritas' },
  protocolIntegrityDesc: { en: 'Unbreakable code, unshakeable principles.', id: 'Kode yang tak terpecahkan, prinsip yang tak tergoyahkan.' },
  protocolInnovation: { en: 'Innovation', id: 'Inovasi' },
  protocolInnovationDesc: { en: 'Always stay three steps ahead of the curve.', id: 'Selalu berada tiga langkah di depan kurva.' },
  protocolResilience: { en: 'Resilience', id: 'Ketahanan' },
  protocolResilienceDesc: { en: 'Building systems that anticipate and neutralize threats.', id: 'Membangun sistem yang mengantisipasi dan menetralisir ancaman.' },
  operativesTitle: { en: 'The Operatives', id: 'Para Operatif' },
  operativesDesc: { 
    en: 'Our team consists of anonymous, world-class engineers, cryptographers, and system architects. Recruited from the deepest corners of the web, our identities are irrelevant. Our results are everything.', 
    id: 'Tim kami terdiri dari insinyur anonim kelas dunia, kriptografer, dan arsitek sistem. Direkrut dari sudut terdalam web, identitas kami tidak relevan. Hasil kami adalah segalanya.' 
  },
  readyEngage: { en: 'Ready to Engage?', id: 'Siap Bergabung?' },
  readyDesc: { en: 'Our expertise is your advantage. Open a secure channel to discuss your operational needs.', id: 'Keadilan kami adalah keuntungan Anda. Buka saluran aman untuk mendiskusikan kebutuhan operasional Anda.' },
  openChannel: { en: 'Open Secure Channel', id: 'Buka Saluran Aman' },

  // Pricing & Services Page
  servicesTitle: { en: 'Service Tiers', id: 'Tingkat Layanan' },
  servicesSubtitle: { en: 'Secure Your Digital Assets. Choose Your Protocol.', id: 'Amankan Aset Digital Anda. Pilih Protokol Anda.' },
  initiateContract: { en: 'Initiate Contract', id: 'Mulai Kontrak' },
  initiateContractFor: { en: 'Initiate contract for', id: 'Mulai kontrak untuk' },
  priceUnit: { en: '/engagement', id: '/misi' },
  tierLabel: { en: 'Service Tier', id: 'Tingkat Layanan' },
  faqHeading: { en: 'General Questions', id: 'Pertanyaan Umum' },
  faqDescription: { en: 'Frequently asked questions about our elite security services and operational procedures.', id: 'Pertanyaan yang sering diajukan mengenai layanan keamanan elit dan prosedur operasional kami.' },
  faqName: { en: 'HackerNet Operational FAQ', id: 'FAQ Operasional HackerNet' },

  // Archive Page
  archiveTitle: { en: 'Operations Archive', id: 'Arsip Operasi' },
  archiveSubtitle: { en: 'A log of our most significant digital footprints.', id: 'Log jejak digital kami yang paling signifikan.' },
  searchPlaceholder: { en: '> Enter search query...', id: '> Masukkan kueri pencarian...' },
  searchArchivesAria: { en: 'Search the archives', id: 'Cari dalam arsip' },
  decrypt: { en: 'DECRYPT', id: 'DEKRIPSI' },
  cancel: { en: 'CANCEL', id: 'BATAL' },
  view: { en: 'VIEW', id: 'LIHAT' },
  viewDetailsFor: { en: 'View details for', id: 'Lihat detail untuk' },
  queryNotFound: { en: 'Query_Not_Found', id: 'Kueri_Tidak_Ditemukan' },
  queryNotFoundDesc: { en: 'Your search yielded no results.', id: 'Pencarian Anda tidak menghasilkan hasil.' },
  statusCompleted: { en: 'Completed', id: 'Selesai' },
  statusClassified: { en: 'Classified', id: 'Rahasia' },
  statusProcessing: { en: 'Processing', id: 'Sedang Proses' },
  passwordPlaceholder: { en: '> Password...', id: '> Kata Sandi...' },
  passwordAria: { en: 'Enter password to decrypt', id: 'Masukkan kata sandi untuk dekripsi' },
  decrypting: { en: 'Decrypting...', id: 'Mendekripsi...' },
  accessDenied: { en: 'ACCESS DENIED', id: 'AKSES DITOLAK' },
  retryTimer: { en: 'Retry in:', id: 'Coba lagi dalam:' },
  systemLocked: { en: 'SYSTEM_LOCKED', id: 'SISTEM_TERKUNCI' },
  encryptedBadge: { en: 'ENCRYPTED', id: 'TERENKRIPSI' },

  // Contact Page
  contactTitle: { en: 'Establish Contact', id: 'Bangun Kontak' },
  contactSubtitle: { en: 'Secure, end-to-end encrypted communication.', id: 'Komunikasi terenkripsi end-to-end yang aman.' },
  emailTitle: { en: 'E-Mail Protocol', id: 'Protokol E-Mail' },
  emailDesc: { en: 'Standard encrypted mailing for non-sensitive technical inquiries.', id: 'Surat terenkripsi standar untuk pertanyaan teknis non-sensitif.' },
  emailLabel: { en: 'SECURE_INBOX', id: 'INBOX_AMAN' },
  copyEmail: { en: 'Copy Email', id: 'Salin Email' },
  sendEmail: { en: 'Send Direct Email', id: 'Kirim Email Langsung' },
  sessionTitle: { en: 'Session Messenger', id: 'Session Messenger' },
  sessionDesc: { en: 'Ultra-secure, metadata-free messaging for mission-critical coordination.', id: 'Pesan ultra-aman, bebas metadata untuk koordinasi misi kritis.' },
  sessionLabel: { en: 'SESSION_ID', id: 'ID_SESSION' },
  copyId: { en: 'Copy ID', id: 'Salin ID' },
  downloadSession: { en: 'Download Session', id: 'Unduh Session' },

  // Privacy Policy Page
  privacyTitle: { en: 'Privacy Policy', id: 'Kebijakan Privasi' },
  privacySubtitle: { en: 'Data Protection Protocol // SS-01', id: 'Protokol Perlindungan Data // SS-01' },
  privacyPhilTitle: { en: 'Data Philosophy', id: 'Filosofi Data' },
  privacyPhilDesc: { en: 'HackerNet operates on the principle of "Privacy by Design." We believe your data belongs to you. We do not sell, rent, or trade personal information to any third parties.', id: 'HackerNet beroperasi dengan prinsip "Privasi secara Desain". Kami percaya bahwa data Anda adalah milik Anda. Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi kepada pihak ketiga mana pun.' },
  privacyCollTitle: { en: 'Information Collection', id: 'Pengumpulan Informasi' },
  privacyCollLog: { en: 'Server Logs: Our servers log minimal metadata (encrypted IP) for DDoS prevention, purged every 30 days.', id: 'Log Server: Server kami mencatat metadata minimal (IP terenkripsi) untuk pencegahan DDoS, dihapus setiap 30 hari.' },
  privacyCollComm: { en: 'Communication: Session messages are metadata-free. Emails are encrypted and used solely for responses.', id: 'Komunikasi: Pesan Session bersifat bebas metadata. Email dienkripsi dan digunakan hanya untuk respons.' },
  privacyEncTitle: { en: 'Encryption Standards', id: 'Standar Enkripsi' },
  privacyEncDesc: { en: 'All data within this site, including the "Archive," is protected by AES-256-GCM encryption. We do not maintain "backdoors" or master keys.', id: 'Semua data di dalam situs ini, termasuk "Archive", dilindungi oleh enkripsi AES-256-GCM. Kami tidak memiliki "backdoor" atau kunci utama.' },
  privacyTrackTitle: { en: 'Cookies & Tracking', id: 'Cookie & Pelacakan' },
  privacyTrackDesc: { en: 'We do not use third-party tracking cookies. Only functional Local Storage is used for your language preference.', id: 'Kami tidak menggunakan cookie pelacakan pihak ketiga. Hanya Local Storage fungsional yang digunakan untuk preferensi bahasa Anda.' },
  
  // Modal / Transmission Actions
  dataTransmission: { en: 'DATA_TRANSMISSION', id: 'TRANSMISI_DATA' },
  encryptingData: { en: 'Encrypting payload...', id: 'Enkripsi payload...' },
  targetClipboard: { en: 'Target: Local Clipboard', id: 'Target: Clipboard Lokal' },
  secureHandshake: { en: 'Secure handshake verified.', id: 'Handshake aman diverifikasi.' },
  emailActionDesc: { en: 'Initializing secure SMTP relay...', id: 'Menginisialisasi relai SMTP aman...' },
  sessionActionDesc: { en: 'Establishing signal handshake...', id: 'Membangun jabat tangan sinyal...' },
  emailActionSuccess: { en: 'MAIL_CLIENT_READY', id: 'KLIEN_MAIL_SIAP' },
  sessionActionSuccess: { en: 'SESSION_HANDSHAKE_OK', id: 'SESSION_HANDSHAKE_OK' },
  linkCopied: { en: 'LINK_COPIED_TO_CLIPBOARD', id: 'LINK_BERHASIL_DISALIN' },
  copied: { en: 'COPIED', id: 'TERSALIN' },

  // Social Share
  share: { en: 'SHARE', id: 'BAGIKAN' },
  shareOnX: { en: 'Share on X (Twitter)', id: 'Bagikan di X (Twitter)' },
  shareOnFacebook: { en: 'Share on Facebook', id: 'Bagikan di Facebook' },
  shareOnWhatsApp: { en: 'Share on WhatsApp', id: 'Bagikan di WhatsApp' },
  shareOnTelegram: { en: 'Share on Telegram', id: 'Bagikan di Telegram' },
  shareOnMessenger: { en: 'Share on Messenger', id: 'Bagikan di Messenger' },
  copyLinkToClipboard: { en: 'Copy Page Link to Clipboard', id: 'Salin Link Halaman ke Clipboard' },

  // Error Boundary
  errorTitle: { en: 'SYSTEM_CRITICAL_FAILURE', id: 'KEGAGALAN_KRITIS_SISTEM' },
  errorDesc: { en: 'An unexpected runtime exception has been detected. The secure environment has been compromised or encountered an unhandled state.', id: 'Pengecualian runtime tak terduga terdeteksi. Lingkungan aman telah terkompromi atau menghadapi status yang tidak tertangani.' },
  errorButton: { en: 'REBOOT_SYSTEM', id: 'INISIALISASI_ULANG_SISTEM' },

  // Other UI
  tags: { en: 'TAGS', id: 'TAG' },
  promotion: { en: 'PROMOTION', id: 'PROMOSI' },
  statusActive: { en: 'STATUS: ACTIVE_LINK', id: 'STATUS: LINK_AKTIF' },
  statusStandby: { en: 'STATUS: SIAGA', id: 'STATUS: SIAGA' },
  switchLanguage: { en: 'Switch language to Indonesian', id: 'Ganti bahasa ke Indonesia' },
  notFoundTitle: { en: '404: Not Found', id: '404: Tidak Ditemukan' },
  notFoundDesc: { en: 'The data node you requested is corrupted or does not exist.', id: 'Node data yang Anda minta rusak atau tidak ada.' },
  returnBase: { en: '> Return to Base Command', id: '> Kembali ke Markas' },
  dispatchesTitle: { en: 'Intel Dispatches', id: 'Berita Intelijen' },
  dispatchesDesc: { en: 'Latest intelligence and field data from HackerNet operations.', id: 'Intelijen terbaru dan data lapangan dari operasi HackerNet.' },
  sitemapTitle: { en: 'Network Map', id: 'Peta Jaringan' },
  sitemapDesc: { en: 'Full topological view of HackerNet public nodes.', id: 'Tampilan topologi penuh node publik HackerNet.' },
  sitemapSections: { en: 'CORE_NODES', id: 'NODE_INTI' },
  
  // Alt Texts
  altHero: { en: 'Futuristic digital interface and security operative avatar representing HackerNet.', id: 'Antarmuka digital futuristik dan avatar operatif keamanan yang mewakili HackerNet.' },
  altOperative: { en: 'Profile image of operative', id: 'Foto profil operatif' },
  altDispatch: { en: 'Main visual for intel dispatch:', id: 'Visual utama untuk berita intelijen:' },
  altPromo: { en: 'Promotional visual for', id: 'Visual promosi untuk' },
  altPromoClose: { en: 'Close details', id: 'Tutup detail' },
  promoDetail: { en: 'DETAILS', id: 'DETAIL' },
  promoClose: { en: 'CLOSE', id: 'TUTUP' },

  // --- Dynamic Dispatch Tags (Fix for t(tag) errors) ---
  'VPN': { en: 'VPN', id: 'VPN' },
  'Exploit': { en: 'Exploit', id: 'Eksploitasi' },
  'RCE': { en: 'RCE', id: 'RCE' },
  'Zero-Day': { en: 'Zero-Day', id: 'Zero-Day' },
  'Quantum': { en: 'Quantum', id: 'Kuantum' },
  'Cryptography': { en: 'Cryptography', id: 'Kriptografi' },
  'Security': { en: 'Security', id: 'Keamanan' },
  'Research': { en: 'Research', id: 'Riset' },
  'Algorithm': { en: 'Algorithm', id: 'Algoritma' },
  'Update': { en: 'Update', id: 'Pembaruan' },
  'Real-time': { en: 'Real-time', id: 'Waktu-Nyata' },
  'SEO': { en: 'SEO', id: 'SEO' },
  'Blockchain': { en: 'Blockchain', id: 'Blockchain' },
  'dApp': { en: 'dApp', id: 'dApp' },
  'Pentesting': { en: 'Pentesting', id: 'Pentesting' },
  'Red Team': { en: 'Red Team', id: 'Red Team' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
}> = ({ children, initialLanguage = 'id' }) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hackernet_lang', lang);
    }
  };

  const t = (key: string): string => {
    const translation = dictionary[key];
    if (!translation) {
      return key;
    }
    return translation[language] || translation['en'] || key;
  };

  // Fix: Use React.createElement instead of JSX in .ts file to prevent parsing errors
  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
