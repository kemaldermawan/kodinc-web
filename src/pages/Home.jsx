import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import CategoryStack from "../components/CategoryStack";
import { CalendarIcon, CartIcon, ChatIcon, ClockIcon, PinIcon, PlusIcon } from "../components/Icons";
import Marquee from "../components/Marquee";
import ProductImage from "../components/ProductImage";
import ProductTags from "../components/ProductTags";
import Starburst from "../components/Starburst";
import { SITE } from "../config/site";
import { CATEGORIES, CATEGORY_INFO, PRODUCTS } from "../data/products";
import { formatRupiah } from "../utils/format";
import { getSavingBadge } from "../utils/promo";

const INFO_CARDS = [
  {
    label: "Hari Operasional",
    value: SITE.DaysLabel,
    Icon: CalendarIcon,
    style: "bg-brand text-cream -rotate-2",
  },
  {
    label: "Jam Operasional",
    value: SITE.hoursLabel,
    Icon: ClockIcon,
    style: "bg-sun text-navy rotate-1",
  },
  {
    label: "Titik Pickup",
    value: SITE.pickupArea,
    Icon: PinIcon,
    style: "bg-navy text-cream -rotate-1",
  },
];

const STEPS = [
  {
    title: "Pilih Menu",
    text: "Tambahkan jajanan favoritmu ke keranjang. Jumlahnya bisa diubah kapan saja.",
    Icon: CartIcon,
  },
  {
    title: "Atur Jadwal Pickup",
    text: `Pilih tanggal dan jam ambil di ${SITE.pickupArea}, ${SITE.DaysLabel}, pukul ${SITE.hoursLabel}.`,
    Icon: CalendarIcon,
  },
  {
    title: "Kirim Pesanan via WA",
    text: "Pesananmu dirangkum otomatis dan terkirim ke WhatsApp penjual. Tinggal tunggu konfirmasi.",
    Icon: ChatIcon,
  },
];

const LEAD_TEXT =
  SITE.minLeadDays > 0
    ? `Pesan minimal ${SITE.minLeadDays} hari sebelum tanggal ambil, ya.`
    : "Kamu bisa pesan untuk hari yang sama selama masih dalam jam operasional.";

const FAQS = [
  {
    q: "Gimana cara pre-order di Kodinc?",
    a: "Pilih menu, masukkan ke keranjang, lalu isi nama, tanggal, dan jam pickup di halaman checkout. Pesananmu otomatis terangkum dan terkirim lewat WhatsApp. Pesanan dianggap masuk setelah kami balas di WhatsApp.",
  },
  {
    q: "Kapan aja jam ambil pesanan?",
    a: `Pickup dibuka ${SITE.DaysLabel}, pukul ${SITE.hoursLabel}, di ${SITE.pickupLocation}. Kamu bisa memilih jam ambil dalam rentang itu saat checkout.`,
  },
  {
    q: "Paling lambat kapan harus pesan?",
    a: LEAD_TEXT,
  },
  {
    q: "Pilihan pembayarannya apa aja?",
    a: "Ada dua: QRIS dan Cash / Tunai. Kalau pilih QRIS, kirim bukti pembayaran lewat WhatsApp. Kalau Cash, bayar langsung saat pesanan diambil.",
  },
  {
    q: "Mau nambahin catatan khusus, bisa?",
    a: "Bisa. Isi kolom Catatan Khusus di bagian paling bawah form checkout, misalnya minta saus dipisah atau es-nya dikit.",
  },
];

// Zig-zag bertingkat: kartu 2 turun di kolom kanan, kartu 3 naik merapat ke kartu 1
const FLOAT_STYLES = [
  "-rotate-2 [animation-delay:-1s]",
  "rotate-2 sm:mt-12 [animation-delay:-2s]",
  "rotate-1 sm:-mt-10 [animation-delay:-3s]",
];

const HALFTONE = {
  backgroundImage: "radial-gradient(rgb(1 47 73 / 0.16) 2px, transparent 2px)",
  backgroundSize: "16px 16px",
};

function FloatingCard({ product, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[13rem] motion-safe:animate-bob ${className}`}>
      <article className="card group overflow-hidden transition duration-200 hover:scale-105 hover:shadow-hard-lg">
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-navy">
          <ProductImage
            product={product}
            className="absolute inset-0 size-full transition duration-300 group-hover:scale-110"
          />
          <ProductTags product={product} />
        </div>
        <div className="p-2">
          <h3 className="font-display text-sm font-bold leading-tight">{product.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1">
            <span className="price-badge text-xs px-2 py-0.5">{formatRupiah(product.price)}</span>
            <AddToCartButton
              productId={product.id}
              label="+ Tambah"
              addedLabel="✓ Masuk"
              className="btn-primary px-2 py-1 text-xs"
            />
          </div>
        </div>
      </article>
    </div>
  );
}

function PromoCard({ product }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition duration-200 odd:-rotate-1 even:rotate-1 hover:-translate-y-1 hover:rotate-0 hover:shadow-hard-lg">
      <div className="relative aspect-square overflow-hidden border-b-2 border-navy">
        <ProductImage
          product={product}
          className="absolute inset-0 size-full transition duration-300 group-hover:scale-110"
        />
        <ProductTags product={product} />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-base font-bold leading-tight">{product.name}</h3>
        <span className="price-badge mt-2 self-start">{formatRupiah(product.price)}</span>
        <AddToCartButton
          productId={product.id}
          label="+ Tambah"
          className="btn-dark mt-3 w-full px-3 py-1.5 text-sm"
        />
      </div>
    </article>
  );
}

function FaqItem({ q, a }) {
  return (
    <details name="faq" className="card group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
        {q}
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-navy bg-sun transition duration-200 group-open:rotate-45 group-open:bg-brand group-open:text-cream">
          <PlusIcon className="size-4" />
        </span>
      </summary>
      <p className="animate-fade-in px-4 pb-4 text-navy/80">{a}</p>
    </details>
  );
}

export default function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 3);
  const savingProducts = PRODUCTS.filter((p) => getSavingBadge(p));

  return (
    <>
      <div className="border-b-2 border-navy bg-navy px-4 py-2 text-center text-sm font-bold text-cream">
        {SITE.announcement}
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="font-display font-extrabold tracking-tight">
            <span className="block text-5xl leading-[1.05] sm:text-7xl">
              Feed Your{" "}
              <span className="inline-block -rotate-2 rounded-lg border-2 border-navy bg-brand px-3 pb-1 text-cream shadow-hard">
                Mood.
              </span>
            </span>
            <span className="mt-5 block text-balance text-2xl leading-snug sm:text-3xl">
              Pilihan Pas Buat Temen Nyemil di Mana Saja.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy/80">
            Mau yang manis, gurih, atau segar? Pilih kategori favoritmu, pesan, lalu siap
            dinikmati kapan saja.
          </p>
          <div className="mt-8">
            <Link to="/menu" className="btn-primary text-lg">
              Lihat Menu →
            </Link>
          </div>
        </div>

        {bestSellers.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-5" aria-label="Menu Best Seller">
            {bestSellers.map((product, i) => (
              <FloatingCard
                key={product.id}
                product={product}
                className={FLOAT_STYLES[i % FLOAT_STYLES.length]}
              />
            ))}
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
              className="card group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
            >
              <CategoryStack category={cat} className="aspect-[16/9] border-b-2 border-navy" />
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

      {/* Info operasional */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {INFO_CARDS.map(({ label, value, Icon, style }) => (
            <div
              key={label}
              className={`rounded-2xl border-2 border-navy p-5 shadow-hard transition duration-200 hover:-translate-y-1 hover:rotate-0 hover:shadow-hard-lg ${style}`}
            >
              <Icon className="size-8" />
              <p className="mt-3 text-xs font-bold uppercase tracking-widest">{label}</p>
              <p className="mt-1 font-display text-2xl font-extrabold leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serba Rp5K */}
      {savingProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="overflow-hidden rounded-3xl border-4 border-navy bg-sun shadow-pop">
            <Marquee
              items={["Serba Rp5K", "Jajan Hemat", "Pre-Order Sekarang"]}
              className="border-b-4 border-navy bg-navy py-2 text-cream"
            />

            <div className="p-5 sm:p-8" style={HALFTONE}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                <Starburst className="size-28 shrink-0 -rotate-6 motion-safe:animate-pulse-soft sm:size-36">
                  <span className="block text-lg sm:text-2xl">SERBA</span>
                  <span className="block text-3xl sm:text-5xl">Rp5K</span>
                </Starburst>

                <div className="min-w-0 flex-1 basis-64">
                  <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                    Jajan Hemat,
                    <br />
                    <span className="inline-block -rotate-1 rounded-lg border-2 border-navy bg-cream px-2 shadow-hard">
                      Tetep Puas!
                    </span>
                  </h2>
                  <p className="mt-4 max-w-md font-semibold">
                    Pilihan jajan yang ramah di dompet. Tinggal pilih, tambah, dan pesan.
                  </p>
                </div>

                <Link to="/menu" className="btn-dark text-sm">
                  Lihat semua menu →
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {savingProducts.map((product) => (
                  <PromoCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cara pesan */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Cara Pesan</h2>
        <p className="mt-2 text-navy/75">Gampang banget, cuma tiga langkah.</p>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ title, text, Icon }, i) => (
            <li
              key={title}
              className="card relative p-5 transition duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full border-2 border-navy bg-sun font-display text-xl font-extrabold">
                  {i + 1}
                </span>
                <Icon className="size-7 text-brand" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-1.5 text-navy/75">{text}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-2xl font-bold md:block"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
            {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block -rotate-2 rounded-md border-2 border-navy bg-brand px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-cream shadow-hard">
                  FAQ
                </span>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  Tanya{" "}
                  <span className="inline-block rotate-1 rounded-lg border-2 border-navy bg-sun px-2 shadow-hard">
                    Jawab
                  </span>
                </h2>
                <p className="mt-3 text-navy/75">Yang sering ditanyain soal pre-order Kodinc.</p>
              </div>

              <Starburst className="size-24 shrink-0 rotate-12 motion-safe:animate-pulse-soft sm:size-28">
                <span className="block text-5xl sm:text-6xl">?</span>
              </Starburst>
            </div>

            <div
              className="mt-8 rounded-2xl border-2 border-navy bg-sun p-5 shadow-hard"
              style={HALFTONE}
            >
              <p className="font-display text-xl font-extrabold leading-tight">
                Masih ada yang bingung?
              </p>
              <p className="mt-1 text-navy/80">
                Chat langsung aja, nanti dibantu lewat WhatsApp.
              </p>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Kodinc, aku mau tanya soal pre-order."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark mt-4 w-full"
              >
                Tanya via WhatsApp ↗
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {FAQS.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}