import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Mini cart drawer and the "added to cart" toast
const uiSlice = createSlice({
  name: 'ui',
  initialState: { drawerOpen: false, toast: null as { id: number; message: string } | null },
  reducers: {
    openDrawer: (state) => { state.drawerOpen = true; },
    closeDrawer: (state) => { state.drawerOpen = false; },
    showToast: (state, action: PayloadAction<string>) => {
      state.toast = { id: Date.now(), message: action.payload };
    },
    hideToast: (state) => { state.toast = null; },
  },
});

export const { openDrawer, closeDrawer, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
