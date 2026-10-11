import { Link } from "react-router-dom";
import FoodIllustration from "../components/FoodIllustration";
import { CalendarIcon, ClockIcon, PinIcon } from "../components/Icons";
import Marquee from "../components/Marquee";
import Starburst from "../components/Starburst";
import { SITE } from "../config/site";
import { CATEGORY_INFO } from "../data/products";

const POLAROIDS = [
  { cat: "Dimsum", label: "Gurih", style: "-rotate-6 mt-6" },
  { cat: "Donat & Cookies", label: "Manis", style: "rotate-2" },
  { cat: "Minuman", label: "Segar", style: "rotate-6 mt-10" },
];

const FLAVORS = [
  {
    title: "Manis",
    sub: "Sweet treats",
    text: "Donat dan cookies buat nemenin hari-hari sibukmu.",
    cat: "Donat & Cookies",
    tone: "bg-sun",
    tilt: "md:-rotate-1",
  },
  {
    title: "Gurih",
    sub: "Savory snacks",
    text: "Dimsum dengan pilihan saus yang bikin nagih.",
    cat: "Dimsum",
    tone: "bg-cream",
    tilt: "",
  },
  {
    title: "Segar",
    sub: "Refreshing drinks",
    text: "Es coklat dan es kopi yang creamy, pas buat mood apa pun.",
    cat: "Minuman",
    tone: "bg-sun",
    tilt: "md:rotate-1",
  },
];

const PICKUP_INFO = [
  { label: "Hari", value: SITE.DaysLabel, Icon: CalendarIcon },
  { label: "Jam", value: SITE.hoursLabel, Icon: ClockIcon },
  { label: "Titik Pickup", value: SITE.pickupLocation, Icon: PinIcon },
];

const SOCIAL_NOTES = {
  WhatsApp: "Pesan & tanya langsung",
  Instagram: "Update & info terbaru",
  TikTok: "Ikuti kami di TikTok",
  "X (Twitter)": "Kabar & pengumuman",
  Facebook: "Kunjungi halaman kami",
};

const HALFTONE = {
  backgroundImage: "radial-gradient(rgb(1 47 73 / 0.16) 2px, transparent 2px)",
  backgroundSize: "16px 16px",
};

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div>
          <p className="inline-block -rotate-2 rounded-md border-2 border-navy bg-brand px-3 py-1 text-xs font-bold uppercase tracking-widest text-cream shadow-hard">
            Tentang Kami
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            Kodinc, temen nyemil buat{" "}
            <span className="inline-block -rotate-1 rounded-lg border-2 border-navy bg-sun px-2 shadow-hard">
              hari-hari sibukmu.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy/80">
            Siap nemenin hari-hari sibukmu dengan asupan sweet treats, savory snacks, dan minuman
            segar berkualitas.
          </p>
          <p className="mt-4 max-w-xl text-lg text-navy/80">
            Semua menu dipesan lewat sistem pre-order: pilih menu, atur jadwal ambil, lalu ambil
            langsung di {SITE.pickupLocation}.
          </p>
          {/* Ganti atau tambahkan paragraf cerita asli Kodinc di sini */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn-primary text-lg">
              Lihat Menu →
            </Link>
            <a href="#kontak" className="btn-light text-lg">
              Hubungi Kami
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Starburst
            fill="#FBBF24"
            textClass="text-navy"
            className="absolute -right-3 -top-8 z-10 size-24 rotate-12 motion-safe:animate-pulse-soft sm:size-28"
          >
            <span className="block text-xl sm:text-2xl">OPEN</span>
            <span className="block text-2xl sm:text-3xl">PO!</span>
          </Starburst>

          <div className="grid grid-cols-3 gap-3 pt-8">
            {POLAROIDS.map(({ cat, label, style }) => (
              <figure
                key={cat}
                className={`card p-1.5 transition duration-200 hover:-translate-y-1 hover:rotate-0 hover:shadow-hard-lg ${style}`}
              >
                <FoodIllustration
                  art={CATEGORY_INFO[cat].art}
                  bg={CATEGORY_INFO[cat].bg}
                  className="aspect-square w-full rounded-lg border-2 border-navy"
                />
                <figcaption className="py-1.5 text-center font-display text-sm font-extrabold">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={["Feed Your Mood", "Sweet treats", "Savory snacks", "Refreshing drinks"]}
        className="border-y-2 border-navy bg-navy py-3 text-cream"
      />

      {/* Manis, gurih, segar */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Manis, gurih, atau segar?
        </h2>
        <p className="mt-2 text-navy/75">Pilih sesuai mood-mu hari ini.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {FLAVORS.map(({ title, sub, text, cat, tone, tilt }) => (
            <article
              key={title}
              className={`card overflow-hidden transition duration-200 hover:-translate-y-1 hover:rotate-0 hover:shadow-hard-lg ${tilt}`}
            >
              <FoodIllustration
                art={CATEGORY_INFO[cat].art}
                bg={CATEGORY_INFO[cat].bg}
                className="h-36 border-b-2 border-navy"
              />
              <div className={`p-5 ${tone}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-navy/70">{sub}</p>
                <h3 className="font-display text-3xl font-extrabold">{title}</h3>
                <p className="mt-2 text-navy/80">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Info pickup */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border-4 border-navy bg-sun p-6 shadow-pop sm:p-8" style={HALFTONE}>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ambil di mana & kapan?
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {PICKUP_INFO.map(({ label, value, Icon }) => (
              <li
                key={label}
                className="card flex items-center gap-3 p-4 transition duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-navy bg-brand text-cream">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-navy/60">
                    {label}
                  </p>
                  <p className="font-display text-lg font-extrabold leading-tight">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-14">
        <p className="inline-block rotate-2 rounded-md border-2 border-navy bg-sun px-3 py-1 text-xs font-extrabold uppercase tracking-widest shadow-hard">
          Kontak
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Mau tanya atau ngobrol? Hubungi Kodinc
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {SITE.socials.map((s, i) => {
            const primary = i === 0;
            return (
              <li key={s.label} className={primary ? "sm:col-span-2" : ""}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card group flex items-center gap-4 p-4 transition duration-200 hover:-translate-y-1 hover:bg-sun hover:shadow-hard-lg ${
                    primary ? "bg-sun" : ""
                  }`}
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl border-2 border-navy font-display text-xl font-extrabold ${
                      primary ? "bg-cream" : "bg-brand text-cream"
                    }`}
                  >
                    {s.label[0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-extrabold leading-tight">
                      {s.label}
                    </span>
                    <span className="block text-sm text-navy/70">
                      {SOCIAL_NOTES[s.label] ?? "Buka tautan"}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl transition group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}