import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';

export interface Order {
  number: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  email: string;
  address: string;
}

// The most recent demo order (confirmation page) and the applied promo code
const orderSlice = createSlice({
  name: 'order',
  initialState: { last: null as Order | null, promo: null as string | null },
  reducers: {
    setLastOrder: (state, action: PayloadAction<Order | null>) => { state.last = action.payload; },
    setPromo: (state, action: PayloadAction<string | null>) => { state.promo = action.payload; },
  },
});

export const { setLastOrder, setPromo } = orderSlice.actions;
export default orderSlice.reducer;
