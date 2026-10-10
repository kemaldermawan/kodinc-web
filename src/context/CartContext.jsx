import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { PRODUCTS } from "../data/products";

const STORAGE_KEY = "kodinc-cart-v1";
const MAX_QTY = 20;

function cartReducer(lines, action) {
  switch (action.type) {
    case "ADD": {
      if (!lines.some((l) => l.id === action.id)) return [...lines, { id: action.id, qty: 1 }];
      return lines.map((l) =>
        l.id === action.id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l
      );
    }
    case "DECREMENT":
      return lines.flatMap((l) => {
        if (l.id !== action.id) return [l];
        return l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [];
      });
    case "REMOVE":
      return lines.filter((l) => l.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return lines;
  }
}

function loadLines() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => typeof l?.id === "string" && Number.isInteger(l?.qty) && l.qty > 0
    );
  } catch {
    return [];
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(cartReducer, [], loadLines);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage penuh / diblokir: abaikan */
    }
  }, [lines]);

  const value = useMemo(() => {
    const items = lines.flatMap((line) => {
      const product = PRODUCTS.find((p) => p.id === line.id);
      return product && !product.comingSoon ? [{ ...product, qty: line.qty }] : [];
    });

    return {
      items,
      totalItems: items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      getQty: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      addItem: (id) => dispatch({ type: "ADD", id }),
      decrementItem: (id) => dispatch({ type: "DECREMENT", id }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      isOpen,
      openCart,
      closeCart,
    };
  }, [lines, isOpen, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}