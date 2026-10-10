import { SITE } from "../config/site";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <p className="text-sm font-bold uppercase tracking-widest text-tomato">Tentang kami</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Kodinc, jajanan kampus yang bisa dipesan dulu.
          </h1>
          <p className="mt-5 text-lg text-cocoa/75">
            Kodinc menjual cookies, donat, es coklat, kopi, dan dimsum untuk teman-teman kampus.
            Sistemnya pre-order: kamu pesan, pilih jadwal ambil, lalu pesanan diambil di{" "}
            {SITE.pickupLocation}.
          </p>
          {/* Ganti paragraf di bawah dengan cerita asli Kodinc */}
          <p className="mt-4 text-lg text-cocoa/75">
            Tulis di sini cerita singkat Kodinc: siapa yang bikin, kenapa mulai, dan apa yang
            bikin menunya beda.
          </p>
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
                  className="card flex items-center justify-between p-4 font-bold transition hover:-translate-y-0.5 hover:bg-butter"
                >
                  {s.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border-2 border-dashed border-cocoa p-4 text-sm">
            <p className="font-bold">Lokasi ambil</p>
            <p className="mt-1 text-cocoa/75">
              {SITE.pickupLocation}, pukul {SITE.pickupSlots[0]}–{SITE.pickupSlots.at(-1)} WIB.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}