
import { DispatchSummary, LocalizedContent } from '../../types';
import { CONFIG } from '../../config';

export const d002_meta: DispatchSummary = {
  id: 'd002',
  slug: 'the-state-of-quantum-cryptography',
  title: {
    en: 'The State of Quantum Cryptography',
    id: 'Kondisi Kriptografi Kuantum'
  },
  author: CONFIG.authors.default,
  timestamp: '2024-07-10 09:00 UTC',
  excerpt: {
    en: 'An analysis of current quantum-resistant cryptographic algorithms. Are we prepared for the quantum threat? A deep dive into lattice-based cryptography and its potential weaknesses.',
    id: 'Analisis algoritma kriptografi tahan kuantum saat ini. Apakah kita siap menghadapi ancaman kuantum? Penyelaman mendalam ke dalam kriptografi berbasis kisi dan potensi kelebahannya.'
  },
  tags: ['Quantum', 'Cryptography', 'Security', 'Research'],
  imageUrl: `${CONFIG.assets.imageBaseUrl}/hkn/quantum-analysis.jpg`,
  promotionIds: [6, 9],
};

export const d002_content: LocalizedContent = {
  en: `[BEGIN TRANSMISSION]

The advent of quantum computing poses an existential threat to modern cryptography. Algorithms like RSA and ECC, which underpin the security of the internet, will be rendered obsolete. The race is on to develop and standardize quantum-resistant cryptography (QRC).

Currently, the most promising candidates for QRC are based on lattice cryptography. Algorithms like CRYSTALS-Kyber (for key exchange) and CRYSTALS-Dilithium (for digital signatures) have been selected by NIST for standardization.

However, these algorithms are not without their own challenges:
1.  **Key Size:** Quantum-resistant keys are significantly larger than their classical counterparts, which can impact performance and storage.
2.  **Implementation Complexity:** The underlying mathematics is complex, increasing the risk of implementation errors that could lead to vulnerabilities.
3.  **Unproven Security:** While theoretically sound, these algorithms have not been subjected to the decades of rigorous cryptanalysis that RSA and ECC have. New attack vectors, both classical and quantum, may yet be discovered.

Our internal research team is actively working on auditing QRC implementations and exploring novel post-quantum algorithms. For organizations looking to secure their future, consult our [Defensive Security](/en/services) packages. The transition to a quantum-safe world will be a long and arduous process, and organizations must begin preparing now.

[END TRANSMISSION]`,
  id: `[MULAI TRANSMISI]

Kemunculan komputasi kuantum menimbulkan ancaman eksistensial bagi kriptografi modern. Algoritma seperti RSA dan ECC, yang menopang keamanan internet, akan menjadi usang. Perlombaan sedang berlangsung untuk mengembangkan dan menstandarisasi kriptografi tahan kuantum (QRC).

Saat ini, kandidat paling menjanjikan untuk QRC didasarkan pada kriptografi kisi (lattice cryptography). Algoritma seperti CRYSTALS-Kyber (untuk pertukaran kunci) dan CRYSTALS-Dilithium (untuk tanda tangan digital) telah dipilih oleh NIST untuk standarisasi.

Namun, algoritma ini bukan tanpa tantangan tersendiri:
1.  **Ukuran Kunci:** Kunci tahan kuantum secara signifikan lebih besar daripada rekan klasiknya, yang dapat berdampak pada kinerja dan penyimpanan.
2.  **Kompleksitas Implementasi:** Matematika yang mendasarinya rumit, meningkatkan risiko kesalahan implementasi yang dapat menyebabkan kerentanan.
3.  **Keamanan Belum Terbukti:** Meskipun secara teoritis kuat, algoritma ini belum menjalani dekade kriptanalisis ketat seperti RSA dan ECC. Vektor serangan baru, baik klasik maupun kuantum, mungkin belum ditemukan.

Tim riset internal kami secara aktif bekerja untuk mengaudit implementasi QRC dan mengeksplorasi algoritma pasca-kuantum baru. Bagi organisasi yang ingin mengamankan masa depan mereka, konsultasikan paket [Keamanan Defensif](/id/services) kami. Transisi ke dunia yang aman secara kuantum akan menjadi proses yang panjang dan sulit, dan organisasi harus mulai bersiap sekarang.

[AKHIR TRANSMISI]`
};
