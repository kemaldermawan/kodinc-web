import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import QuantityStepper from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { formatRupiah } from "../utils/format";

export default function Cart() {
  const { items, totalItems, totalPrice, addItem, decrementItem, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">Keranjangmu masih kosong</h1>
        <p className="mt-3 text-cocoa/75">Pilih menu dulu, nanti muncul di sini.</p>
        <Link to="/menu" className="btn-primary mt-8">
          Lihat menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Keranjang</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="card flex gap-4 p-3">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border-2 border-cocoa">
                <ProductImage product={item} className="absolute inset-0 size-full" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold leading-tight">{item.name}</h2>
                    <p className="text-sm text-cocoa/70">{formatRupiah(item.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Hapus ${item.name} dari keranjang`}
                    className="shrink-0 text-sm font-semibold text-cocoa/70 underline underline-offset-4 hover:text-cocoa"
                  >
                    Hapus
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                  <QuantityStepper
                    qty={item.qty}
                    label={item.name}
                    onIncrement={() => addItem(item.id)}
                    onDecrement={() => decrementItem(item.id)}
                  />
                  <p className="font-bold">{formatRupiah(item.price * item.qty)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="card p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-extrabold">Ringkasan</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Jumlah item</dt>
              <dd className="font-semibold">{totalItems}</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-cocoa pt-4">
            <span className="font-bold">Total</span>
            <span className="font-display text-2xl font-extrabold">{formatRupiah(totalPrice)}</span>
          </div>
          <Link to="/checkout" className="btn-primary mt-5 w-full">
            Lanjut ke checkout
          </Link>
          <Link to="/menu" className="mt-3 block text-center text-sm font-semibold underline underline-offset-4">
            Tambah menu lain
          </Link>
        </aside>
      </div>
    </div>
  );
}