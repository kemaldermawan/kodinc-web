const WHATSAPP_NUMBER = "6289517022938";

export const SITE = {
  name: "Kodinc",
  tagline: "Feed Your Mood. Sweet treats, savory snacks, dan minuman segar.",
  announcement: "⚡ JAM OPERASIONAL HARI INI: 10.00 - 15.00 WIB • Sikat sebelum kehabisan!",
  whatsappNumber: WHATSAPP_NUMBER,
  pickupLocation: "Kampus A UNJ",
  hoursLabel: "10.00 - 15.00 WIB",
  // Ubah ke true kalau foto produk asli sudah ada di public/images/
  usePhotos: false,
  // Minimal H+N dari hari ini. Ubah ke 0 kalau boleh ambil di hari yang sama.
  minLeadDays: 1,
  // Slot jam ambil tiap 30 menit: 10:00 sampai 15:00
  pickupSlots: Array.from({ length: 11 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    return `${String(hour).padStart(2, "0")}:${i % 2 ? "30" : "00"}`;
  }),
  socials: [
    { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { label: "Instagram", href: "https://instagram.com/GANTI_USERNAME" },
    { label: "TikTok", href: "https://tiktok.com/@GANTI_USERNAME" },
  ],
};

export const PAYMENT_METHODS = [
  {
    id: "qris-now",
    label: "Bayar sekarang via QRIS",
    hint: "Scan QRIS, lalu kirim bukti bayar lewat WhatsApp.",
  },
  {
    id: "qris-pickup",
    label: "QRIS saat ambil",
    hint: "Bayar dengan QRIS ketika pesanan diambil.",
  },
  {
    id: "cash-pickup",
    label: "Cash saat ambil",
    hint: "Kalau bisa, siapkan uang pas.",
  },
];