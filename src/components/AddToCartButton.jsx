import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({
  productId,
  label = "Tambah ke Keranjang",
  addedLabel = "✓ Ditambahkan",
  className = "",
}) {
  const { addItem } = useCart();
  const [addedAt, setAddedAt] = useState(0);

  useEffect(() => {
    if (!addedAt) return;
    const timer = setTimeout(() => setAddedAt(0), 1200);
    return () => clearTimeout(timer);
  }, [addedAt]);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId);
        setAddedAt(Date.now());
      }}
      className={className}
    >
      <span key={addedAt} className={addedAt ? "inline-block animate-pop" : ""}>
        {addedAt ? addedLabel : label}
      </span>
    </button>
  );
}