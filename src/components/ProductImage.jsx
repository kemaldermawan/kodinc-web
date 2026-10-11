import { useState } from "react";
import { SITE } from "../config/site";
import { CATEGORY_INFO } from "../data/products";
import FoodIllustration from "./FoodIllustration";

export default function ProductImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);
  const bg = CATEGORY_INFO[product.category]?.bg;

  // Foto belum ada / gagal dimuat / dimatikan → pakai ilustrasi kartun
  if (!SITE.usePhotos || failed || !product.image) {
    return (
      <FoodIllustration art={product.art} bg={bg} label={product.name} className={className} />
    );
  }

  return (
    <div
      className={`grid place-items-center ${className}`}
      style={{
        backgroundColor: bg,
        backgroundImage: "radial-gradient(rgb(1 47 73 / 0.12) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="size-full object-contain p-2 drop-shadow-[3px_3px_0_#012F49]"
      />
    </div>
  );
}