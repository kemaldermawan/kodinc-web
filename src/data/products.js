export const CATEGORIES = ["Semua", "Dimsum", "Donat & Cookies", "Minuman"];

// Dipakai kartu kategori di beranda dan background ilustrasi produk
export const CATEGORY_INFO = {
  Dimsum: {
    tagline: "Gurih & hangat",
    bg: "#F6DCAB",
    art: { type: "dimsum", dough: "#FFF8EA", sauce: "#F28C38" },
  },
  "Donat & Cookies": {
    tagline: "Manis & bikin nagih",
    bg: "#F8C3BB",
    art: { type: "donut", icing: "#F27A9B", sprinkles: ["#FFF8EA", "#FBBF24", "#C21121"] },
  },
  Minuman: {
    tagline: "Segar & creamy",
    bg: "#BFD7E3",
    art: { type: "drink", layers: ["#8A4B2E", "#5B3220"], whip: true },
  },
};

// TODO: ganti semua price dengan harga asli Kodinc
export const PRODUCTS = [
  // Dimsum
  {
    id: "dimsum-original",
    name: "Dimsum Original",
    category: "Dimsum",
    description: "Dimsum kukus klasik, disajikan dengan saus.",
    price: 12000,
    image: "/images/dimsum-original.jpg",
    art: { type: "dimsum", dough: "#FFF8EA" },
  },
  {
    id: "dimsum-mentai-original",
    name: "Dimsum Mentai Original",
    category: "Dimsum",
    description: "Dimsum kukus dengan lapisan saus mentai.",
    price: 15000,
    bestSeller: true,
    image: "/images/dimsum-mentai-original.jpg",
    art: { type: "dimsum", dough: "#FFF8EA", sauce: "#F28C38" },
  },
  {
    id: "dimsum-mentai-cheese",
    name: "Dimsum Mentai Cheese",
    category: "Dimsum",
    description: "Dimsum kukus dengan saus mentai dan keju.",
    price: 16000,
    image: "/images/dimsum-mentai-cheese.jpg",
    art: { type: "dimsum", dough: "#FFF8EA", sauce: "#F28C38", cheese: true },
  },
  {
    id: "dimsum-goreng-keju",
    name: "Dimsum Goreng Keju",
    category: "Dimsum",
    description: "Dimsum goreng yang renyah dengan keju.",
    price: 24000,
    image: "/images/dimsum-goreng-keju.jpg",
    art: { type: "dimsum", dough: "#E3A13A", cheese: true, fried: true },
  },

  // Donat & Cookies
  {
    id: "donat-coklat",
    name: "Donat Coklat",
    category: "Donat & Cookies",
    description: "Donat empuk dengan topping coklat.",
    price: 5000,
    image: "/images/donat-coklat.jpg",
    art: { type: "donut", icing: "#6B3A24" },
  },
  {
    id: "donat-strawberry",
    name: "Donat Strawberry",
    category: "Donat & Cookies",
    description: "Donat empuk dengan topping strawberry.",
    price: 5000,
    image: "/images/donat-strawberry.jpg",
    art: { type: "donut", icing: "#F27A9B", sprinkles: ["#FFF8EA", "#FBBF24"] },
  },
  {
    id: "donat-keju",
    name: "Donat Keju",
    category: "Donat & Cookies",
    description: "Donat empuk dengan taburan keju.",
    price: 5000,
    image: "/images/donat-keju.jpg",
    art: { type: "donut", icing: "#FFD966", sprinkles: ["#F2A900"] },
  },
  {
    id: "donat-coklat-keju",
    name: "Donat Coklat Keju",
    category: "Donat & Cookies",
    description: "Perpaduan topping coklat dan keju di atas donat empuk.",
    price: 5000,
    image: "/images/donat-coklat-keju.jpg",
    art: { type: "donut", icing: "#6B3A24", sprinkles: ["#FFD966"] },
  },
    {
    id: "donat-milky-snow",
    name: "Donat Tabur Susu",
    category: "Donat & Cookies",
    description: "Donat empuk dengan taburan susu bubuk yang lembut.",
    price: 5000,
    image: "/images/donat-milky-snow.jpg",
    art: { type: "donut", icing: "#FFFDF6", sprinkles: ["#BFD7E3"] },
  },
  {
    id: "cookies-classic",
    name: "Classic Choco Chip",
    category: "Donat & Cookies",
    description: "Cookies choco chip original, renyah di pinggir dan lembut di tengah.",
    price: 8000,
    image: "/images/cookies-classic.jpg",
    art: { type: "cookie", dough: "#D9A15B", chip: "#5B3220" },
  },
  {
    id: "cookies-red-velvet",
    name: "Red Velvet Cookies",
    category: "Donat & Cookies",
    description: "Cookies red velvet yang lembut.",
    price: 8000,
    image: "/images/cookies-red-velvet.jpg",
    art: { type: "cookie", dough: "#B3202B", chip: "#FFF8EA" },
  },

  // Minuman
  {
    id: "choco-dreamy",
    name: "Choco Dreamy",
    category: "Minuman",
    description: "Es coklat yang lembut dan creamy.",
    price: 5000,
    bestSeller: true,
    image: "/images/choco-dreamy.jpg",
    art: { type: "drink", layers: ["#8A4B2E", "#5B3220"], whip: true },
  },
  {
    id: "coffee-creamy",
    name: "Coffee Creamy",
    category: "Minuman",
    description: "Es kopi susu yang creamy.",
    price: 10000,
    bestSeller: true,
    image: "/images/coffee-creamy.jpg",
    art: { type: "drink", layers: ["#F6E6C8", "#7A4A2A"] },
  },

  // Coming soon (taruh paling bawah)
  {
    id: "donat-oreo",
    name: "Donat Oreo",
    category: "Donat & Cookies",
    description: "Segera hadir.",
    price: null,
    comingSoon: true,
    image: "/images/donat-oreo.jpg",
    art: { type: "donut", icing: "#2B2B3A", sprinkles: ["#FFF8EA"] },
  },
];