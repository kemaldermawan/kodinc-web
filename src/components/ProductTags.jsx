import { getSavingBadge } from "../utils/promo";

const TAG = "rounded-md border-2 border-navy px-1.5 py-0.5 text-[11px] font-extrabold sm:text-xs";

export default function ProductTags({ product }) {
  const saving = getSavingBadge(product);
  if (!product.bestSeller && !saving && !product.comingSoon) return null;

  return (
    <div className="absolute left-2 top-2 z-[1] flex flex-col items-start gap-1">
      {product.comingSoon && <span className={`${TAG} bg-brand text-cream`}>Coming soon</span>}
      {product.bestSeller && <span className={`${TAG} bg-sun text-navy`}>⭐ Best Seller</span>}
      {saving && <span className={`${TAG} -rotate-2 bg-brand text-cream`}>{saving}</span>}
    </div>
  );
}