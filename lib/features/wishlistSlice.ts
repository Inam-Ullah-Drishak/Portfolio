import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Ids of wished products; in memory only, like the cart
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] as string[] },
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const i = state.ids.indexOf(action.payload);
      if (i === -1) state.ids.push(action.payload);
      else state.ids.splice(i, 1);
    },
    hydrateWishlist: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
