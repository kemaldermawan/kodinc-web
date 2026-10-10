import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("kategori");
  const active = CATEGORIES.includes(requested) ? requested : "Semua";

  const list = active === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  const select = (cat) => setParams(cat === "Semua" ? {} : { kategori: cat });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Menu</h1>
      <p className="mt-2 text-cocoa/75">
        Tambahkan ke keranjang, jumlahnya bisa diatur di halaman keranjang.
      </p>

      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2" role="group" aria-label="Filter kategori">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => select(cat)}
            aria-pressed={active === cat}
            className={`whitespace-nowrap rounded-full border-2 border-cocoa px-4 py-1.5 text-sm font-bold transition ${
              active === cat ? "bg-cocoa text-cream" : "bg-white hover:bg-butter"
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