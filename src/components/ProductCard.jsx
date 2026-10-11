import { useCart } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import AddToCartButton from "./AddToCartButton";
import ProductImage from "./ProductImage";
import ProductTags from "./ProductTags";

export default function ProductCard({ product }) {
  const { getQty } = useCart();
  const qty = getQty(product.id);
  const soon = Boolean(product.comingSoon);

  return (
    <article className="card group flex overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-hard-lg sm:flex-col">
      <div className="relative w-32 shrink-0 overflow-hidden border-r-2 border-navy sm:aspect-[4/3] sm:w-full sm:border-b-2 sm:border-r-0">
        <ProductImage
          product={product}
          className={`absolute inset-0 size-full transition duration-300 group-hover:scale-110 ${
            soon ? "grayscale" : ""
          }`}
        />
        <ProductTags product={product} />
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
              <AddToCartButton
                productId={product.id}
                className="btn-dark mt-3 w-full px-4 py-2 text-sm"
              />
            </>
          )}
        </div>
      </div>
    </article>
  );
}