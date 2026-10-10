import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import ProductImage from "./ProductImage";
import QuantityStepper from "./QuantityStepper";

export default function CartDrawer() {
  const {
    items, totalItems, totalPrice, isOpen, closeCart, addItem, decrementItem, removeItem,
  } = useCart();
  const navigate = useNavigate();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (e) => e.key === "Escape" && closeCart();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus?.();
    };
  }, [isOpen, closeCart]);

  const goToCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-navy bg-cream transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-2 border-navy px-4 py-3">
          <h2 className="font-display text-2xl font-extrabold">
            Keranjang
            {totalItems > 0 && (
              <span className="ml-2 rounded-md bg-brand px-2 py-0.5 align-middle text-sm text-cream">
                {totalItems}
              </span>
            )}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="grid size-10 place-items-center rounded-xl border-2 border-navy bg-cream text-xl font-bold transition hover:bg-sun"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h3 className="font-display text-2xl font-extrabold leading-tight">
              Perut Masih Kosong, Keranjang Juga Kosong! 🛒
            </h3>
            <p className="mt-3 text-navy/75">Yuk pilih cemilan favoritmu dulu.</p>
            <Link to="/menu" onClick={closeCart} className="btn-primary mt-6">
              Lihat menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((item) => (
                <li key={item.id} className="card flex gap-3 p-2.5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border-2 border-navy">
                    <ProductImage product={item} className="absolute inset-0 size-full" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display font-bold leading-tight">{item.name}</h3>
                        <p className="text-sm text-navy/70">{formatRupiah(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Hapus ${item.name} dari keranjang`}
                        className="shrink-0 text-sm font-semibold text-navy/70 underline underline-offset-4 hover:text-navy"
                      >
                        Hapus
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
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

            <div className="border-t-2 border-navy p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-bold">Total</span>
                <span className="font-display text-2xl font-extrabold">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <button type="button" onClick={goToCheckout} className="btn-primary mt-4 w-full text-lg">
                Lanjut ke Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}