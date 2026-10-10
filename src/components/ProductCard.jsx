import { useCart } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { addItem, getQty } = useCart();
  const qty = getQty(product.id);

  return (
    <article className="card flex overflow-hidden sm:flex-col">
      <div className="relative w-32 shrink-0 border-r-2 border-cocoa sm:aspect-[4/3] sm:w-full sm:border-b-2 sm:border-r-0">
        <ProductImage product={product} className="absolute inset-0 size-full" />
        {qty > 0 && (
          <span className="absolute left-2 top-2 rounded-full border-2 border-cocoa bg-butter px-2 py-0.5 text-xs font-bold">
            Keranjang ×{qty}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-cocoa/60">
          {product.category}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-bold leading-tight">{product.name}</h3>
        <p className="mt-1.5 text-sm text-cocoa/75">{product.description}</p>

        <div className="mt-auto pt-3">
          <p className="font-display text-lg font-extrabold">{formatRupiah(product.price)}</p>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="btn-primary mt-2 w-full px-4 py-2 text-sm"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </article>
  );
}