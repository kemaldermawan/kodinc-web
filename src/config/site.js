const WHATSAPP_NUMBER = "62895326183306";

export const SITE = {
  name: "Kodinc",
  tagline: "Feed Your Mood. Sweet treats, savory snacks, and refreshing drinks.",
  announcement: "⚡✨ Siap Nemenin Hari Sibukmu • Pre-Order jajanan favoritmu sekarang di sini!",
  whatsappNumber: WHATSAPP_NUMBER,
  pickupLocation: "Kampus A UNJ",
  pickupArea: "Area Kampus A",
  DaysLabel: "Senin - Jumat",
  // Hari buka dalam angka JS: 0 = Minggu, 1 = Senin, ... 6 = Sabtu
  openDays: [1, 2, 3, 4, 5],
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
    { label: "Instagram", href: "https://instagram.com/thekodinc" },
    { label: "TikTok", href: "https://tiktok.com/@thekodinc" },
    { label: "X (Twitter)", href: "https://x.com/TheKodinc" },
    { label: "Facebook", href: "https://facebook.com/thekodinc" },
  ],
};

export const PAYMENT_METHODS = [
  {
    id: "qris",
    label: "QRIS",
    hint: "Scan QRIS, lalu kirim bukti bayar lewat WhatsApp.",
  },
  {
    id: "cash",
    label: "Cash / Tunai",
    hint: "Bayar tunai saat pesanan diambil. Kalau bisa, siapkan uang pas.",
  },
];