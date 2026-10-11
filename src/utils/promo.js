const SERBA_5K_LABEL = "Serba Rp5K";
const SERBA_5K_PRICE = 5000;

// Produk di luar harga Rp5.000 yang tetap masuk "Serba Rp5K": isi dengan id produk
const SERBA_5K_IDS = ["choco-dreamy"];

export function getSavingBadge(product) {
  if (product.comingSoon || !product.price) return null;
  if (product.price === SERBA_5K_PRICE || SERBA_5K_IDS.includes(product.id)) {
    return SERBA_5K_LABEL;
  }
  return null;
}