import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Design } from "@/data/atelier";

type CartItem = { design: Design; color: string; quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (design: Design, color: string) => void;
  removeItem: (designId: string, color: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem: (design: Design, color: string) => setItems((current) => {
      const match = current.find((item) => item.design.id === design.id && item.color === color);
      if (match) return current.map((item) => item === match ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { design, color, quantity: 1 }];
    }),
    removeItem: (designId: string, color: string) => setItems((current) => current.flatMap((item) => {
      if (item.design.id !== designId || item.color !== color) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    })),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
