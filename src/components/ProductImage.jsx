import { useState } from "react";
import { CATEGORY_TONES } from "../data/products";

export default function ProductImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !product.image) {
    return (
      <div
        aria-hidden="true"
        className={`grid place-items-center font-display text-5xl font-extrabold text-cocoa/60 ${
          CATEGORY_TONES[product.category] ?? "bg-latte"
        } ${className}`}
      >
        {product.name[0]}
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}