import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/tentang", label: "Tentang & Kontak" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="on-dark sticky top-0 z-40 border-b-2 border-navy bg-brand text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
          kodinc<span className="text-sun">.</span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="order-3 flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto"
        >
          {LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-bold transition ${
                  isActive ? "bg-cream text-navy" : "hover:bg-cream/15"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-navy bg-cream px-3.5 py-1.5 text-sm font-bold text-navy shadow-hard transition hover:bg-sun"
        >
          Keranjang
          {totalItems > 0 && (
            <span className="min-w-5 rounded-md bg-brand px-1.5 text-center text-xs text-cream">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}