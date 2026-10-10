import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer className="on-dark mt-20 border-t-2 border-navy bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold">
            kodinc<span className="text-sun">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">{SITE.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-bold">Ambil pesanan</p>
          <p className="mt-2 text-cream/70">{SITE.pickupLocation}</p>
          <p className="text-cream/70">
            Jam {SITE.pickupSlots[0]}–{SITE.pickupSlots.at(-1)} WIB
          </p>
        </div>

        <ul className="space-y-2 text-sm">
          {SITE.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline-offset-4 hover:underline"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-cream/15 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Kodinc
      </p>
    </footer>
  );
}