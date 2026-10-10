import { Link } from "react-router-dom";
import FoodIllustration from "../components/FoodIllustration";
import ProductImage from "../components/ProductImage";
import { SITE } from "../config/site";
import { useCart } from "../context/CartContext";
import { CATEGORIES, CATEGORY_INFO, PRODUCTS } from "../data/products";
import { formatRupiah } from "../utils/format";

const PERKS = [
  {
    title: "Ambil di titik pickup",
    text: `Ambil langsung di ${SITE.pickupLocation}. Tanpa ongkir, tanpa nunggu kurir.`,
  },
  {
    title: "Pilih jam ambil sendiri",
    text: `Atur tanggal dan jam ambil di rentang ${SITE.hoursLabel}.`,
  },
  {
    title: "Bayar sesuai gayamu",
    text: "QRIS di muka, QRIS saat ambil, atau cash.",
  },
  {
    title: "Langsung ke penjual",
    text: "Pesanan terkirim rapi lewat WhatsApp, jadi gampang kalau mau tanya atau ubah.",
  },
];

function FloatingCard({ product, className }) {
  const { addItem, getQty } = useCart();
  const qty = getQty(product.id);

  return (
    <div className={`w-56 motion-safe:animate-bob sm:w-60 ${className}`}>
      <article className="card overflow-hidden transition hover:scale-105 hover:shadow-hard-lg">
        <div className="relative aspect-[4/3] border-b-2 border-navy">
          <ProductImage product={product} className="absolute inset-0 size-full" />
          <span className="absolute left-2 top-2 rounded-md border-2 border-navy bg-sun px-1.5 py-0.5 text-xs font-extrabold">
            ⭐ Best Seller
          </span>
        </div>
        <div className="p-3">
          <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="price-badge">{formatRupiah(product.price)}</span>
            <button
              type="button"
              onClick={() => addItem(product.id)}
              className="btn-primary px-3 py-1.5 text-sm"
            >
              {qty > 0 ? `+1 (${qty})` : "+ Tambah"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Home() {
  const [first, second] = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <>
      <div className="border-b-2 border-navy bg-navy px-4 py-2 text-center text-sm font-bold text-cream">
        {SITE.announcement}
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <h1 className="font-display font-extrabold tracking-tight">
            <span className="block text-5xl leading-[1.05] sm:text-7xl">
              Feed Your{" "}
              <span className="inline-block -rotate-2 rounded-lg border-2 border-navy bg-brand px-3 pb-1 text-cream shadow-hard">
                Mood.
              </span>
            </span>
            <span className="mt-5 block text-2xl leading-snug sm:text-3xl">
              Pilihan Pas Buat Temen Nyemil di Mana Saja.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy/80">
            Mau nyari yang manis, gurih, atau segar? Pilih kategori cemilan favoritmu, pesan,
            lalu ambil langsung di titik pickup {SITE.pickupLocation}.
          </p>
          <div className="mt-8">
            <Link to="/menu" className="btn-primary text-lg">
              Lihat Menu →
            </Link>
          </div>
        </div>

        {first && second && (
          <div className="relative mx-auto h-[31rem] w-full max-w-md" aria-label="Menu Best Seller">
            <div className="absolute right-0 top-0 z-10 grid size-20 rotate-12 place-items-center rounded-full border-2 border-navy bg-brand text-center font-display text-sm font-extrabold leading-tight text-cream shadow-hard">
              OPEN
              <br />
              PO!
            </div>
            <FloatingCard product={first} className="absolute left-0 top-0 -rotate-3" />
            <FloatingCard
              product={second}
              className="absolute bottom-0 right-0 rotate-3 [animation-delay:-2s]"
            />
          </div>
        )}
      </section>

      {/* Kategori cepat */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">
          Mau yang mana hari ini?
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {CATEGORIES.filter((c) => c !== "Semua").map((cat) => (
            <Link
              key={cat}
              to={`/menu?kategori=${encodeURIComponent(cat)}`}
              className="card group flex overflow-hidden transition hover:-translate-y-1 hover:shadow-hard-lg sm:flex-col"
            >
              <FoodIllustration
                art={CATEGORY_INFO[cat].art}
                bg={CATEGORY_INFO[cat].bg}
                className="h-28 w-28 shrink-0 border-r-2 border-navy sm:h-44 sm:w-full sm:border-b-2 sm:border-r-0"
              />
              <div className="flex flex-1 items-center justify-between gap-2 p-4">
                <div>
                  <h3 className="font-display text-xl font-extrabold leading-tight">{cat}</h3>
                  <p className="text-sm text-navy/70">{CATEGORY_INFO[cat].tagline}</p>
                </div>
                <span aria-hidden="true" className="text-2xl transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Jam operasional & pickup */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="card flex flex-wrap items-center justify-center gap-8 px-6 py-10 sm:gap-14">
          <div className="-rotate-3 rounded-xl border-2 border-navy bg-brand px-6 py-4 text-cream shadow-hard transition hover:rotate-0">
            <p className="text-xs font-bold uppercase tracking-widest">Jam Buka</p>
            <p className="font-display text-2xl font-extrabold">{SITE.hoursLabel}</p>
          </div>
          <div className="rotate-2 rounded-xl border-2 border-navy bg-sun px-6 py-4 text-navy shadow-hard transition hover:rotate-0">
            <p className="text-xs font-bold uppercase tracking-widest">Pickup Point</p>
            <p className="font-display text-2xl font-extrabold">{SITE.pickupLocation}</p>
          </div>
        </div>
      </section>

      {/* Tentang singkat & keunggulan */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Siap nemenin hari-hari sibukmu dengan asupan sweet treats, savory snacks, dan minuman
          segar berkualitas.
        </p>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {PERKS.map((perk) => (
            <div key={perk.title} className="border-t-2 border-navy pt-4">
              <h3 className="font-display text-xl font-bold">{perk.title}</h3>
              <p className="mt-1.5 text-navy/75">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}