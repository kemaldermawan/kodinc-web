import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/tentang", label: "Tentang & Kontak" },
];

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-cocoa bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
          kodinc<span className="text-tomato">.</span>
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
                `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition ${
                  isActive ? "bg-cocoa text-cream" : "hover:bg-cocoa/10"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/keranjang"
          className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa bg-white px-3.5 py-1.5 text-sm font-bold transition hover:bg-butter"
        >
          Keranjang
          {totalItems > 0 && (
            <span className="min-w-5 rounded-full bg-tomato px-1.5 text-center text-xs text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}