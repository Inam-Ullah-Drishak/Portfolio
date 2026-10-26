import type { CartItem } from '@/lib/features/cartSlice';

export const FREE_SHIPPING_OVER = 100;
export const SHIPPING = 8;
// Demo promo codes: code -> fraction off the subtotal
export const PROMOS: Record<string, number> = { BALANCE10: 0.1 };

export const money = (n: number) => `USD ${n.toFixed(2)}`;

export function totals(items: CartItem[], promo: string | null) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = promo ? subtotal * (PROMOS[promo] ?? 0) : 0;
  const after = subtotal - discount;
  const shipping = after === 0 || after >= FREE_SHIPPING_OVER ? 0 : SHIPPING;
  return { subtotal, discount, shipping, total: after + shipping };
}
