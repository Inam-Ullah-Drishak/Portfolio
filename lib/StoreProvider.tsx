'use client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { hydrateCart } from './features/cartSlice';
import { hydrateWishlist } from './features/wishlistSlice';
import { setLastOrder } from './features/orderSlice';

const read = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null');
  } catch {
    return null;
  }
};

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  // No backend: cart, wishlist and last order live in localStorage. Load once, then save on every change.
  useEffect(() => {
    const cart = read('cart');
    const wishlist = read('wishlist');
    const order = read('lastOrder');
    if (Array.isArray(cart)) store.dispatch(hydrateCart(cart));
    if (Array.isArray(wishlist)) store.dispatch(hydrateWishlist(wishlist));
    if (order) store.dispatch(setLastOrder(order));

    return store.subscribe(() => {
      const s = store.getState();
      try {
        localStorage.setItem('cart', JSON.stringify(s.cart.items));
        localStorage.setItem('wishlist', JSON.stringify(s.wishlist.ids));
        localStorage.setItem('lastOrder', JSON.stringify(s.order.last));
      } catch {
        // storage blocked or full: carry on in memory
      }
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
