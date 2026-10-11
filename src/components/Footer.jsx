import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer className="on-dark mt-20 border-t-2 border-navy bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl font-extrabold">
            kodinc<span className="text-sun">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">{SITE.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Ikuti & hubungi kami</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border-2 border-cream/40 px-3 py-1.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:border-sun hover:bg-sun hover:text-navy"
                >
                  {s.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-cream/15 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Kodinc
      </p>
    </footer>
  );
}