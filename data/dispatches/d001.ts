
import { DispatchSummary, LocalizedContent } from '../../types';
import { CONFIG } from '../../config';

export const d001_meta: DispatchSummary = {
  id: 'd001',
  slug: 'zero-day-in-a-global-vpn-provider',
  title: {
    en: 'Zero-Day in a Global VPN Provider',
    id: 'Zero-Day pada Penyedia VPN Global'
  },
  author: CONFIG.authors.default,
  timestamp: '2024-07-15 14:30 UTC',
  excerpt: {
    en: 'We have identified a critical remote code execution vulnerability in the client software of a widely used commercial VPN. Mitigation requires immediate patching. Full technical write-up available to subscribers.',
    id: 'Kami telah mengidentifikasi kerentanan eksekusi kode jarak jauh (RCE) yang kritis dalam perangkat lunak klien VPN komersial yang banyak digunakan. Mitigasi memerlukan pembaruan segera.'
  },
  tags: ['VPN', 'Exploit', 'RCE', 'Zero-Day'],
  imageUrl: `${CONFIG.assets.imageBaseUrl}/hkn/hkn-2024-001.jpg`,
  promotionIds: [1, 19],
};

export const d001_content: LocalizedContent = {
  en: `[BEGIN TRANSMISSION]

A critical remote code execution (RCE) vulnerability has been discovered in the client software of a major commercial VPN provider. This flaw, designated HKN-2024-001, allows an attacker to gain complete control over a user's machine by tricking them into connecting to a malicious server.

The vulnerability resides in the custom protocol handler used by the VPN client. A buffer overflow can be triggered during the initial handshake process, allowing for arbitrary code execution with the same privilege level as the logged-in user.

We have developed a proof-of-concept exploit and have verified its effectiveness against the latest version of the client on both Windows and macOS platforms. Due to the sensitive nature of this vulnerability, we are not releasing the PoC publicly at this time. We have, however, initiated a coordinated disclosure process with the vendor.

**MITIGATION:**
- Users are advised to **immediately cease using the VPN service** until a patch is released.
- Check the vendor's official website and update the client software as soon as a new version is available.
- For our [Ghost Protocol](/en/services) and [Blacksite](/en/services) subscribers, a custom firewall rule set has been pushed to your systems to block malicious handshake packets.

Full technical details, including the vulnerable code paths and memory analysis, are available in our [Operations Archive](/en/archive) for subscribers.

[END TRANSMISSION]`,
  id: `[MULAI TRANSMISI]

Sebuah kerentanan eksekusi kode jarak jauh (RCE) kritis telah ditemukan dalam perangkat lunak klien penyedia VPN komersial utama. Celah ini, dengan kode HKN-2024-001, memungkinkan penyerang untuk mendapatkan kendali penuh atas mesin pengguna dengan menipu mereka agar terhubung ke server berbahaya.

Kerentanan ini berada di penangan protokol khusus yang digunakan oleh klien VPN. Buffer overflow dapat dipicu selama proses handshake awal, memungkinkan eksekusi kode arbitrer dengan tingkat hak istimewa yang sama dengan pengguna yang sedang login.

Kami telah mengembangkan eksploitasi proof-of-concept dan telah memverifikasi efektivitasnya terhadap versi terbaru klien pada platform Windows dan macOS. Karena sifat sensitif dari kerentanan ini, kami tidak merilis PoC secara publik saat ini. Namun, kami telah memulai proses pengungkapan terkoordinasi dengan vendor.

**MITIGASI:**
- Pengguna disarankan untuk **segera berhenti menggunakan layanan VPN** sampai patch dirilis.
- Periksa situs web resmi vendor dan perbarui perangkat lunak klien segera setelah versi baru tersedia.
- Untuk pelanggan [Protokol Hantu](/id/services) dan [Blacksite](/id/services) kami, set aturan firewall khusus telah didorong ke sistem Anda untuk memblokir paket handshake berbahaya.

Detail teknis lengkap, termasuk jalur kode yang rentan dan analisis memori, tersedia di [Arsip Operasi](/id/archive) kami untuk pelanggan.

[AKHIR TRANSMISI]`
};
