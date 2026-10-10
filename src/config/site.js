const WHATSAPP_NUMBER = "6289517022938";

export const SITE = {
  name: "Kodinc",
  tagline: "Jajanan kampus yang dipesan dulu, diambil kemudian.",
  promo: "PO dibuka. Pilih sendiri tanggal & jam ambil di Kampus A UNJ.",
  whatsappNumber: WHATSAPP_NUMBER,
  pickupLocation: "Kampus A UNJ",
  // Minimal H+N dari hari ini. Ubah ke 0 kalau boleh ambil di hari yang sama.
  minLeadDays: 1,
  // Slot jam ambil tiap 30 menit: 09:00 sampai 16:00
  pickupSlots: Array.from({ length: 15 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
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