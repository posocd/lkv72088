
import { DispatchSummary, LocalizedContent } from '../../types';
import { CONFIG } from '../../config';

export const d003_meta: DispatchSummary = {
  id: 'd003',
  slug: 'freshness-signal',
  title: {
    en: 'Freshness Signal',
    id: 'Sinyal Kesegaran'
  },
  author: CONFIG.authors.default,
  timestamp: '2024-07-28 10:00 UTC',
  excerpt: {
    en: 'We have detected a new pattern in the global data stream. A signal indicating a shift in algorithmic priorities. Adapt or become obsolete.',
    id: 'Kami telah mendeteksi pola baru dalam aliran data global. Sebuah sinyal yang menunjukkan pergeseran prioritas algoritmik. Beradaptasi atau menjadi usang.'
  },
  tags: ['Algorithm', 'Update', 'Real-time', 'SEO'],
  imageUrl: `${CONFIG.assets.imageBaseUrl}/hkn/freshness-signal.jpg`,
  promotionIds: [3, 12],
};

export const d003_content: LocalizedContent = {
  en: `[BEGIN TRANSMISSION]

Our sensors have intercepted a high-frequency update traversing the core backbone. The Grid is evolving. Static data is being deprecated in favor of real-time streams. This is the 'Freshness Signal'.

Search algorithms and data aggregators are now prioritizing temporal proximity above all else. Information decay rates have accelerated. What was true yesterday is legacy code today.

To survive in this new environment, systems must implement continuous integration of intelligence. Latency is the enemy. We are deploying new scrapers and real-time analyzers to ensure HackerNet remains at the bleeding edge of this shift.

Operatives are advised to flush their local caches and [sync with the central node](/en/contact) immediately. See our [Network Map](/en/sitemap) for updated topology.

[END TRANSMISSION]`,
  id: `[MULAI TRANSMISI]

Sensor kami telah mencegat pembaruan frekuensi tinggi yang melintasi tulang punggung inti. Grid sedang berevolusi. Data statis mulai ditinggalkan demi aliran waktu nyata (real-time). Ini adalah 'Sinyal Kesegaran'.

Algoritma pencarian dan agregator data sekarang memprioritaskan kedekatan waktu di atas segalanya. Laju peluruhan informasi telah dipercepat. Apa yang benar kemarin adalah kode warisan hari ini.

Untuk bertahan di lingkungan baru ini, sistem harus menerapkan integrasi intelijen yang berkelanjutan. Latensi adalah musuh. Kami menyebarkan scraper baru dan penganalisis waktu nyata untuk memastikan HackerNet tetap berada di ujung tombak pergeseran ini.

Para operatif disarankan untuk membersihkan cache lokal mereka dan [segera menyinkronkan dengan node pusat](/id/contact). Lihat [Peta Jaringan](/id/sitemap) kami untuk topologi yang diperbarui.

[AKHIR TRANSMISI]`
};
