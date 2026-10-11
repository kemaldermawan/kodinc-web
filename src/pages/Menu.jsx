import { useSearchParams } from "react-router-dom";
import FoodIllustration from "../components/FoodIllustration";
import ProductCard from "../components/ProductCard";
import Starburst from "../components/Starburst";
import { CATEGORIES, CATEGORY_INFO, PRODUCTS } from "../data/products";

const DOTS = {
  backgroundImage: "radial-gradient(rgb(1 47 73 / 0.16) 1.5px, transparent 1.5px)",
  backgroundSize: "18px 18px",
};

const STRIPES = {
  backgroundImage: "repeating-linear-gradient(-45deg, #FBBF24 0 10px, #012F49 10px 20px)",
};

const DISCS = [
  { cat: "Dimsum", style: "-rotate-6" },
  { cat: "Donat & Cookies", style: "rotate-3 mt-6" },
  { cat: "Minuman", style: "-rotate-3" },
];

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("kategori");
  const active = CATEGORIES.includes(requested) ? requested : "Semua";

  const list = active === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  const select = (cat) => setParams(cat === "Semua" ? {} : { kategori: cat });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="card overflow-hidden shadow-hard-lg">
        <div
          className="grid items-center gap-8 px-5 py-8 sm:px-10 sm:py-10 md:grid-cols-[1fr_auto]"
          style={DOTS}
        >
          <div>
            <span className="inline-block -rotate-2 rounded-md border-2 border-navy bg-brand px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-cream shadow-hard">
              Katalog Lengkap
            </span>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Pilih Menu{" "}
              <span className="inline-block rotate-1 rounded-lg border-2 border-navy bg-sun px-3 pb-1 shadow-hard">
                Favoritmu
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-navy/80">
              Dimsum, donat, cookies, dan minuman segar. Tambahkan ke keranjang, atur jumlahnya,
              lalu pesan.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative flex items-center justify-center gap-3 pt-6 md:pt-0"
          >
            <Starburst
              fill="#FBBF24"
              textClass="text-navy"
              className="absolute -top-6 right-0 z-10 size-24 rotate-12 motion-safe:animate-pulse-soft md:-top-10 md:size-28"
            >
              <span className="block text-sm">FRESHLY</span>
              <span className="block text-xl">MADE</span>
            </Starburst>

            {DISCS.map(({ cat, style }) => (
              <FoodIllustration
                key={cat}
                art={CATEGORY_INFO[cat].art}
                bg={CATEGORY_INFO[cat].bg}
                className={`size-20 overflow-hidden rounded-full border-2 border-navy shadow-hard sm:size-24 ${style}`}
              />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="h-3 border-t-2 border-navy" style={STRIPES} />
      </header>

      <div
        className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2"
        role="group"
        aria-label="Filter kategori"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => select(cat)}
            aria-pressed={active === cat}
            className={`whitespace-nowrap rounded-lg border-2 border-navy px-4 py-1.5 text-sm font-bold transition ${
              active === cat ? "bg-navy text-cream shadow-hard" : "bg-cream hover:bg-sun"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}