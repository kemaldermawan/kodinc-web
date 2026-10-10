import { useCart } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { addItem, getQty } = useCart();
  const qty = getQty(product.id);
  const soon = Boolean(product.comingSoon);

  return (
    <article className="card flex overflow-hidden sm:flex-col">
      <div className="relative w-32 shrink-0 border-r-2 border-navy sm:aspect-[4/3] sm:w-full sm:border-b-2 sm:border-r-0">
        <ProductImage
          product={product}
          className={`absolute inset-0 size-full ${soon ? "grayscale" : ""}`}
        />
        {product.bestSeller && (
          <span className="absolute left-2 top-2 rounded-md border-2 border-navy bg-sun px-1.5 py-0.5 text-[11px] font-extrabold sm:text-xs">
            ⭐ Best Seller
          </span>
        )}
        {soon && (
          <span className="absolute left-2 top-2 rounded-md border-2 border-navy bg-brand px-1.5 py-0.5 text-[11px] font-extrabold text-cream sm:text-xs">
            Coming soon
          </span>
        )}
        {!soon && qty > 0 && (
          <span className="absolute bottom-2 left-2 rounded-md border-2 border-navy bg-navy px-1.5 py-0.5 text-[11px] font-bold text-cream sm:text-xs">
            Keranjang ×{qty}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-navy/60">
          {product.category}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-bold leading-tight">{product.name}</h3>
        <p className="mt-1.5 text-sm text-navy/75">{product.description}</p>

        <div className="mt-auto pt-3">
          {soon ? (
            <div className="rounded-xl border-2 border-dashed border-navy px-4 py-2 text-center text-sm font-bold text-navy/70">
              Segera hadir
            </div>
          ) : (
            <>
              <span className="price-badge">{formatRupiah(product.price)}</span>
              <button
                type="button"
                onClick={() => addItem(product.id)}
                className="btn-dark mt-3 w-full px-4 py-2 text-sm"
              >
                Tambah ke Keranjang
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}