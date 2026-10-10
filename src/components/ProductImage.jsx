import { useState } from "react";
import { SITE } from "../config/site";
import { CATEGORY_INFO } from "../data/products";
import FoodIllustration from "./FoodIllustration";

export default function ProductImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!SITE.usePhotos || failed || !product.image) {
    return (
      <FoodIllustration
        art={product.art}
        bg={CATEGORY_INFO[product.category]?.bg}
        label={product.name}
        className={className}
      />
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