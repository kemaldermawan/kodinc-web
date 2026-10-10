import { SITE } from "../config/site";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <p className="inline-block -rotate-2 rounded-md border-2 border-navy bg-brand px-3 py-1 text-xs font-bold uppercase tracking-widest text-cream">
            Tentang Kami
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Kodinc, temen nyemil buat hari-hari sibukmu.
          </h1>
          <p className="mt-5 text-lg text-navy/80">
            Siap nemenin hari-hari sibukmu dengan asupan sweet treats, savory snacks, dan
            minuman segar berkualitas.
          </p>
          <p className="mt-4 text-lg text-navy/80">
            Semua menu dipesan lewat sistem pre-order: pilih menu, atur jadwal ambil, lalu ambil
            langsung di {SITE.pickupLocation} pada jam {SITE.hoursLabel}.
          </p>
          {/* Ganti atau tambahkan paragraf cerita asli Kodinc di sini */}
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold">Kontak</h2>
          <ul className="mt-4 space-y-3">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center justify-between p-4 font-bold transition hover:-translate-y-0.5 hover:bg-sun"
                >
                  {s.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border-2 border-dashed border-navy p-4 text-sm">
            <p className="font-bold">Pickup Point</p>
            <p className="mt-1 text-navy/75">
              {SITE.pickupLocation} • {SITE.hoursLabel}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}