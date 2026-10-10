import { Link } from "react-router-dom";
import { SITE } from "../config/site";
import { CATEGORIES, CATEGORY_TONES } from "../data/products";

const STEPS = [
  "Pilih menu dan masukkan ke keranjang",
  "Tentukan tanggal dan jam ambil",
  "Kirim pesanan ke WhatsApp penjual",
];

const PERKS = [
  {
    title: "Ambil di kampus",
    text: `Pickup di ${SITE.pickupLocation}. Tanpa ongkir, tanpa nunggu kurir.`,
  },
  {
    title: "Jam ambil pilihanmu",
    text: "Atur sendiri tanggal dan jamnya, sesuaikan dengan jadwal kuliah.",
  },
  {
    title: "Bayar sesuai kebiasaan",
    text: "QRIS di muka, QRIS saat ambil, atau cash.",
  },
  {
    title: "Langsung ke penjual",
    text: "Pesanan terkirim rapi lewat WhatsApp, jadi gampang kalau mau tanya atau ubah.",
  },
];

export default function Home() {
  return (
    <>
      <div className="border-b-2 border-cocoa bg-butter px-4 py-2 text-center text-sm font-bold">
        {SITE.promo}
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.2fr_1fr] lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-tomato">
            Pre-order kuliner kampus
          </p>
          <h1 className="mt-3 text-balance font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Pesan sekarang, ambil pas jam kosong.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cocoa/75">
            Cookies, donat, es coklat, kopi, dan dimsum dari Kodinc. Pilih menu, tentukan jam
            ambil, kirim ke WhatsApp. Selesai.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn-primary">
              Lihat menu
            </Link>
            <Link to="/tentang" className="btn-light">
              Tentang & kontak
            </Link>
          </div>
        </div>

        <ol className="card divide-y-2 divide-cocoa/15 p-2 lg:rotate-1">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-4 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-cocoa bg-butter font-display text-lg font-extrabold">
                {i + 1}
              </span>
              <span className="font-bold">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Mau jajan apa?</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.filter((c) => c !== "Semua").map((cat) => (
            <Link
              key={cat}
              to={`/menu?kategori=${encodeURIComponent(cat)}`}
              className={`card flex aspect-square flex-col justify-between p-4 transition hover:-translate-y-1 ${CATEGORY_TONES[cat]}`}
            >
              <span className="font-display text-xl font-extrabold leading-tight">{cat}</span>
              <span aria-hidden="true" className="text-2xl">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">
          Kenapa pesan lewat Kodinc
        </h2>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {PERKS.map((perk) => (
            <div key={perk.title} className="border-t-2 border-cocoa pt-4">
              <h3 className="font-display text-xl font-bold">{perk.title}</h3>
              <p className="mt-1.5 text-cocoa/75">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}