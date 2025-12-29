import { LocalizedContent } from '../types';
import { CONFIG } from '../config';

export interface LocalizedPromoTerms {
  en: string[];
  id: string[];
}

export interface Promotion {
  id: number;
  title: LocalizedContent;
  imageUrl: string;
  terms: LocalizedPromoTerms;
}

export const promotionsData: Promotion[] = [
  {
    id: 1,
    title: {
      en: '100% NEW MEMBER BONUS',
      id: 'BONUS NEW MEMBER 100%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/new-member-bonus.jpg`,
    terms: {
      en: [
        'Terms & Conditions apply.',
        'Promotion for new members only.',
        'Minimum deposit IDR 50,000.',
        'Full details available [HERE](/#action-button)',
        'Turnover (TO) requirement 10x.'
      ],
      id: [
        'Syarat & Ketentuan berlaku.',
        'Promosi untuk member baru.',
        'Minimal deposit IDR 50,000.',
        'Selengkapnya ada : [DISINI](/#action-button)',
        'Turnover (TO) 10x.'
      ]
    },
  },
  {
    id: 2,
    title: {
      en: 'MIX PARLAY EXTRA BONUS',
      id: 'EVENT MIX PARLAY EXTRA BONUS'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/mix-parlay.jpg`,
    terms: {
      en: [
        'Valid for all sportsbook providers.',
        'Minimum bet IDR 25,000.',
        'Must win all teams in 1 parlay ticket.',
        'Extra bonus up to IDR 1,000,000.',
        'Claim bonus via Live Chat.'
      ],
      id: [
        'Berlaku untuk semua provider sportsbook.',
        'Minimal bet IDR 25,000.',
        'Wajib menang semua tim dalam 1 tiket parlay.',
        'Bonus tambahan hingga IDR 1,000,000.',
        'Klaim melalui [LIVE CHAT](/#action-button)'
      ]
    },
  },
  {
    id: 3,
    title: {
      en: '5% SLOTS CASHBACK BONUS',
      id: 'BONUS CASHBACK SLOTS 5%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/cashback-slots.jpg`,
    terms: {
      en: [
        'Cashback calculated from total weekly losses.',
        'Minimum loss IDR 200,000.',
        'Bonus distributed every Tuesday.',
        'No TO requirement for withdrawal.',
        'Valid for slot games only.'
      ],
      id: [
        'Cashback dihitung dari total kekalahan mingguan.',
        'Minimal kekalahan IDR 200,000.',
        'Bonus dibagikan setiap hari Selasa.',
        'Tidak ada syarat TO untuk penarikan.',
        'Hanya berlaku untuk permainan slot.'
      ]
    },
  },
  {
    id: 4,
    title: {
      en: 'PURE FREESPIN & BUYSPIN 25%',
      id: 'FREESPIN & BUYSPIN MURNI 25%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/freespin.jpg`,
    terms: {
      en: [
        '25% bonus from Freespin winnings.',
        'Minimum Freespin winning IDR 100,000.',
        'Max claim 3x per day.',
        'Must share winnings on Facebook group.',
        'Resets every 00:00 WIB.'
      ],
      id: [
        'Bonus 25% dari kemenangan Freespin.',
        'Minimal kemenangan Freespin IDR 100,000.',
        'Maksimal klaim 3x sehari.',
        'Wajib share kemenangan di grup Facebook.',
        'Reset setiap pukul 00:00 WIB.'
      ]
    },
  },
  {
    id: 5,
    title: {
      en: 'NO DEDUCTION CREDIT DEPOSIT',
      id: 'DEPOSIT PULSA TANPA POTONGAN'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/deposit-pulsa.jpg`,
    terms: {
      en: [
        'Valid for Telkomsel & XL providers.',
        'Minimum deposit IDR 20,000.',
        '1x TO requirement for withdrawal.',
        'Must attach transfer proof.',
        '100% rate without deduction.'
      ],
      id: [
        'Berlaku untuk provider Telkomsel & XL.',
        'Minimal deposit IDR 20,000.',
        'Syarat TO 1x untuk melakukan withdraw.',
        'Wajib melampirkan bukti transfer.',
        'Rate 100% tanpa potongan.'
      ]
    },
  },
  {
    id: 6,
    title: {
      en: 'DAILY BONUS 10%',
      id: 'BONUS HARIAN 10%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/bonus-harian.jpg`,
    terms: {
      en: [
        'Can be claimed once daily.',
        'Minimum deposit IDR 100,000.',
        'Maximum bonus given IDR 200,000.',
        '3x TO requirement (deposit + bonus).',
        'Valid for all games except Poker.'
      ],
      id: [
        'Dapat diklaim satu kali setiap hari.',
        'Minimal deposit IDR 100,000.',
        'Maksimal bonus yang diberikan IDR 200,000.',
        'Syarat TO 3x dari nilai deposit + bonus.',
        'Berlaku untuk semua permainan kecuali Poker.'
      ]
    },
  },
  {
    id: 7,
    title: {
      en: 'LIVE CASINO ROLLING COMMISSION 0.8%',
      id: 'KOMISI ROLLINGAN LIVE CASINO 0.8%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/rollingan-casino.jpg`,
    terms: {
      en: [
        'Commission calculated from total weekly turnover.',
        'Minimum turnover to get bonus is IDR 1,000,000.',
        'Bonus distributed automatically every Monday.',
        'No maximum bonus limit.',
        'Valid for all Live Casino games.'
      ],
      id: [
        'Komisi dihitung dari total turnover mingguan.',
        'Minimal turnover untuk mendapatkan bonus adalah IDR 1,000,000.',
        'Bonus dibagikan secara otomatis setiap Senin.',
        'Tidak ada batas maksimal bonus.',
        'Berlaku untuk semua permainan Live Casino.'
      ]
    },
  },
  {
    id: 8,
    title: {
      en: 'PRAGMATIC PLAY SCATTER EVENT',
      id: 'GEBYAR SCATTER PRAGMATIC PLAY'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/scatter-pragmatic.jpg`,
    terms: {
      en: [
        'Get 4 scatters for extra bonus.',
        'Minimum bet IDR 1,000.',
        'Bonus varies depending on scatter count.',
        'Screenshot and claim via Live Chat.',
        'Event cannot be combined with other promos.'
      ],
      id: [
        'Dapatkan 4 scatter untuk bonus tambahan.',
        'Minimal bet IDR 1,000.',
        'Bonus bervariasi tergantung jumlah scatter.',
        'Screenshot dan klaim melalui Live Chat.',
        'Event tidak dapat digabung promo lain.'
      ]
    },
  },
  {
    id: 9,
    title: {
      en: 'LIFETIME REFERRAL BONUS',
      id: 'BONUS REFERRAL SEUMUR HIDUP'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/referral.jpg`,
    terms: {
      en: [
        'Invite friends to play with your referral code.',
        '0.3% bonus from your friend\'s turnover.',
        'Bonus is valid for a lifetime.',
        'Distributed automatically every month start.',
        'No maximum limit on referral members.'
      ],
      id: [
        'Ajak teman bermain dengan kode referral Anda.',
        'Bonus 0.3% dari turnover teman Anda.',
        'Bonus berlaku seumur hidup.',
        'Dibagikan otomatis setiap awal bulan.',
        'Tidak ada batas maksimal anggota referral.'
      ]
    },
  },
  {
    id: 10,
    title: {
      en: 'SPORTSBOOK WINSTREAK EVENT',
      id: 'EVENT WINSTREAK SPORTSBOOK'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/winstreak.jpg`,
    terms: {
      en: [
        'Win consecutively minimum 5x.',
        'Minimum bet IDR 50,000 per ticket.',
        'Valid for HDP & O/U bets only.',
        'Cash prize up to IDR 5,000,000.',
        'If draw occurs, count restarts.'
      ],
      id: [
        'Menang beruntun minimal 5x.',
        'Minimal bet IDR 50,000 per tiket.',
        'Hanya berlaku untuk taruhan HDP & O/U.',
        'Hadiah uang tunai hingga IDR 5,000,000.',
        'Jika ada hasil seri, maka hitungan dimulai dari awal.'
      ]
    },
  },
  {
    id: 11,
    title: {
      en: 'SLOT WELCOME BONUS 50%',
      id: 'WELCOME BONUS SLOT 50%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/welcome-slot.jpg`,
    terms: {
      en: [
        'Bonus 50% untuk member baru.',
        'Hanya berlaku untuk deposit pertama.',
        'Maksimal bonus IDR 1,000,000.',
        'Syarat TO 8x (deposit + bonus).',
        'Berlaku untuk semua provider slot.'
      ],
      id: [
        'Bonus 50% untuk member baru.',
        'Hanya berlaku untuk deposit pertama.',
        'Maksimal bonus IDR 1,000,000.',
        'Syarat TO 8x (deposit + bonus).',
        'Berlaku untuk semua provider slot.'
      ]
    },
  },
  {
    id: 12,
    title: {
      en: 'SPECIAL BIRTHDAY BONUS',
      id: 'BONUS ULANG TAHUN SPESIAL'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/birthday-bonus.jpg`,
    terms: {
      en: [
        'Claim bonus on your birthday.',
        'Minimum 3 months membership.',
        'Total deposit minimum IDR 1,000,000.',
        'Surprise gift from management.',
        'Claim by showing ID card.'
      ],
      id: [
        'Klaim bonus di hari ulang tahun Anda.',
        'Minimal sudah menjadi member selama 3 bulan.',
        'Total deposit minimal IDR 1,000,000.',
        'Hadiah kejutan dari manajemen.',
        'Klaim dengan menunjukkan KTP.'
      ]
    },
  },
  {
    id: 13,
    title: {
      en: 'WEEKLY SPORTSBOOK CASHBACK 7%',
      id: 'CASHBACK SPORTSBOOK MINGGUAN 7%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/cashback-sports.jpg`,
    terms: {
      en: [
        '7% Cashback from total sportsbook losses.',
        'Calculated from Monday to Sunday.',
        'Distributed every Tuesday.',
        'Minimum loss IDR 500,000.',
        'Bonus without withdrawal requirements.'
      ],
      id: [
        'Cashback 7% dari total kekalahan sportsbook.',
        'Dihitung dari Senin hingga Minggu.',
        'Dibagikan setiap hari Selasa.',
        'Minimal kekalahan IDR 500,000.',
        'Bonus tanpa syarat penarikan.'
      ]
    },
  },
  {
    id: 14,
    title: {
      en: 'SPADEGAMING KOI GATE EVENT',
      id: 'EVENT KOI JEJER SPADEGAMING'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/koi-gate.jpg`,
    terms: {
      en: [
        'Valid in Koi Gate game.',
        'Get 2 or 3 Koi in a row.',
        'Extra bonus according to bet value.',
        'Max claim 2x per day.',
        'Must screenshot when Koi appears.'
      ],
      id: [
        'Berlaku di game Koi Gate.',
        'Dapatkan 2 atau 3 Koi Jejer.',
        'Bonus tambahan sesuai dengan nilai bet.',
        'Maksimal klaim 2x per hari.',
        'Wajib screenshot saat Koi muncul.'
      ]
    },
  },
  {
    id: 15,
    title: {
      en: 'BLESSED FRIDAY RELOAD BONUS 20%',
      id: 'RELOAD BONUS JUMAT BERKAH 20%'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/reload-jumat.jpg`,
    terms: {
      en: [
        'Bonus valid every Friday.',
        'Minimum deposit IDR 150,000.',
        'Maximum bonus IDR 300,000.',
        'TO requirement only 5x.',
        'Can be claimed once every Friday.'
      ],
      id: [
        'Bonus berlaku setiap hari Jumat.',
        'Minimal deposit IDR 150,000.',
        'Maksimal bonus IDR 300,000.',
        'Syarat TO hanya 5x.',
        'Dapat diklaim sekali setiap Jumat.'
      ]
    },
  },
  {
    id: 16,
    title: {
      en: 'VIP LOYALTY BONUS',
      id: 'BONUS VIP LOYALTY'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/vip-loyalty.jpg`,
    terms: {
      en: [
        'For members with specific VIP levels.',
        'Exclusive monthly bonus.',
        'Priority service and personal account manager.',
        'Special terms and conditions apply.',
        'Increase turnover to level up VIP.'
      ],
      id: [
        'Untuk member dengan level VIP tertentu.',
        'Bonus eksklusif setiap bulan.',
        'Layanan prioritas dan manajer akun pribadi.',
        'Syarat dan ketentuan khusus berlaku.',
        'Tingkatkan turnover untuk naik level VIP.'
      ]
    },
  },
  {
    id: 17,
    title: {
      en: 'WEEKLY SLOT TOURNAMENT PRIZE IDR 50M',
      id: 'TURNAMEN SLOT MINGGUAN TOTAL HADIAH IDR 50 JUTA'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/turnamen-slot.jpg`,
    terms: {
      en: [
        'Tournament runs every week.',
        'Winners determined by highest turnover.',
        'Valid for specified slot providers.',
        'Prizes distributed to top 50 winners.',
        'Leaderboard updated daily.'
      ],
      id: [
        'Turnamen berlangsung setiap minggu.',
        'Pemenang ditentukan berdasarkan turnover tertinggi.',
        'Berlaku untuk provider slot yang ditentukan.',
        'Hadiah dibagikan kepada 50 pemenang teratas.',
        'Papan peringkat diperbarui setiap hari.'
      ]
    },
  },
  {
    id: 18,
    title: {
      en: 'WEEKLY ATTENDANCE BONUS',
      id: 'BONUS ABSENSI MINGGUAN'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/absensi.jpg`,
    terms: {
      en: [
        'Login and deposit every day for a week.',
        'Minimum deposit IDR 25,000 per day.',
        'Get Free Chip bonus at week\'s end.',
        'Bonus amount depends on total deposit.',
        'Claim bonus on Monday of next week.'
      ],
      id: [
        'Login dan deposit setiap hari selama seminggu.',
        'Minimal deposit IDR 25,000 per hari.',
        'Dapatkan bonus Free Chip di akhir minggu.',
        'Besaran bonus tergantung total deposit.',
        'Klaim bonus di hari Senin minggu berikutnya.'
      ]
    },
  },
  {
    id: 19,
    title: {
      en: '100% MONEY BACK LOSS GUARANTEE',
      id: 'GARANSI KALAH 100% MODAL KEMBALI'
    },
    imageUrl: `${CONFIG.assets.imageBaseUrl}/promo/garansi-kalah.jpg`,
    terms: {
      en: [
        'Valid for new members on first deposit.',
        'Claim if balance is empty without withdrawal.',
        'Balance will be refunded 100%.',
        'Maximum guarantee IDR 100,000.',
        '3x TO requirement before withdrawal.'
      ],
      id: [
        'Berlaku untuk member baru pada deposit pertama.',
        'Klaim jika saldo habis tanpa melakukan withdraw.',
        'Saldo akan dikembalikan 100%.',
        'Maksimal garansi IDR 100,000.',
        'Syarat TO 3x sebelum withdraw.'
      ]
    },
  },
];