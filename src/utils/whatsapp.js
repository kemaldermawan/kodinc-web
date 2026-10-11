import { PAYMENT_METHODS, SITE } from "../config/site";
import { formatLongDate, formatRupiah } from "./format";

export function buildOrderMessage({ name, notes, pickupDate, pickupTime, payment, items, total }) {
  const paymentMethod = PAYMENT_METHODS.find((m) => m.id === payment);

  const itemLines = items.map(
    (item, i) => `${i + 1}. ${item.name} x${item.qty} = ${formatRupiah(item.price * item.qty)}`
  );

  const lines = [
    `*PESANAN BARU - ${SITE.name.toUpperCase()}*`,
    "",
    `Nama: ${name}`,
    `Pickup: ${formatLongDate(pickupDate)}, pukul ${pickupTime} WIB`,
    `Lokasi: ${SITE.pickupLocation}`,
    `Pembayaran: ${paymentMethod?.label ?? "-"}`,
    "",
    "*Pesanan*",
    ...itemLines,
    "",
    `*Total: ${formatRupiah(total)}*`,
    "",
    `Catatan: ${notes || "-"}`,
  ];

  if (payment === "qris") {
    lines.push("", "Bukti pembayaran QRIS saya kirim setelah pesan ini.");
  }

  return lines.join("\n");
}

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;