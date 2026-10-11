const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// "Rp 8.000" (ada spasi non-breaking) → "Rp8.000"
export const formatRupiah = (amount) => rupiah.format(amount).replace(/\s/g, "");

// "2026-10-12" → Date lokal (hindari bug zona waktu dari new Date("YYYY-MM-DD"))
export function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatLongDate(iso) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseISODate(iso));
}

export function minPickupDate(leadDays = 1) {
  const date = new Date();
  date.setDate(date.getDate() + leadDays);
  return toISODate(date);
}