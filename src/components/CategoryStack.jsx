import { useState } from "react";
import { SITE } from "../config/site";
import { CATEGORY_INFO, PRODUCTS } from "../data/products";
import FoodIllustration from "./FoodIllustration";

// Produk yang ditampilkan di tiap kartu kategori.
// Id pertama = produk utama (di tengah, paling depan).
const FEATURED_IDS = {
  Dimsum: ["dimsum-mentai-original", "dimsum-original", "dimsum-mentai-cheese"],
  "Donat & Cookies": ["donat-coklat", "cookies-classic", "donat-strawberry"],
  Minuman: ["choco-dreamy", "coffee-creamy"],
};

const DOTS = {
  backgroundImage: "radial-gradient(rgb(1 47 73 / 0.12) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

// Kemiringan tiap posisi + gerakan saat kartu di-hover (item menyebar)
const SLOT_STYLES = {
  1: ["z-10"],
  2: [
    "z-10 -rotate-6 group-hover:-translate-x-2 group-hover:-rotate-12",
    "z-20 rotate-6 group-hover:translate-x-2 group-hover:rotate-12",
  ],
  3: [
    "z-10 -rotate-6 group-hover:-translate-x-2 group-hover:-rotate-12",
    "z-20 scale-110 group-hover:-translate-y-2",
    "z-10 rotate-6 group-hover:translate-x-2 group-hover:rotate-12",
  ],
};

function pickProducts(category) {
  const inCategory = PRODUCTS.filter((p) => p.category === category && !p.comingSoon);
  const chosen = (FEATURED_IDS[category] ?? [])
    .map((id) => inCategory.find((p) => p.id === id))
    .filter(Boolean);
  return (chosen.length ? chosen : inCategory).slice(0, 3);
}

// Untuk 3 produk: yang utama ditaruh di tengah
const arrange = (items) => (items.length === 3 ? [items[1], items[0], items[2]] : items);

function StackItem({ product, className }) {
  const [failed, setFailed] = useState(false);
  const usePhoto = SITE.usePhotos && product.image && !failed;
  const shadow = "drop-shadow-[3px_3px_0_#012F49]";

  return (
    <div
      className={`aspect-square w-[36%] max-w-[7.5rem] -ml-[8%] transition duration-300 first:ml-0 ${className}`}
    >
      {usePhoto ? (
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`size-full object-contain ${shadow}`}
        />
      ) : (
        <FoodIllustration art={product.art} plain className={`size-full ${shadow}`} />
      )}
    </div>
  );
}

export default function CategoryStack({ category, className = "" }) {
  const items = arrange(pickProducts(category));
  const slots = SLOT_STYLES[Math.min(items.length, 3)] ?? [];

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center px-3 ${className}`}
      style={{ backgroundColor: CATEGORY_INFO[category]?.bg, ...DOTS }}
    >
      {items.map((product, i) => (
        <StackItem key={product.id} product={product} className={slots[i]} />
      ))}
    </div>
  );
}