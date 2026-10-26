import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  variant?: {
    size: string;
    color: string;
  };
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// A line in the cart is a product plus its size/color
type LineKey = Pick<CartItem, 'id' | 'variant'>;
const sameLine = (a: LineKey, b: LineKey) =>
  a.id === b.id &&
  a.variant?.size === b.variant?.size &&
  a.variant?.color === b.variant?.color;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { quantity = 1, ...item } = action.payload;
      const existingItem = state.items.find(i => sameLine(i, item));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    setQuantity: (state, action: PayloadAction<LineKey & { quantity: number }>) => {
      const item = state.items.find(i => sameLine(i, action.payload));
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    removeFromCart: (state, action: PayloadAction<LineKey>) => {
      state.items = state.items.filter(i => !sameLine(i, action.payload));
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, setQuantity, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
