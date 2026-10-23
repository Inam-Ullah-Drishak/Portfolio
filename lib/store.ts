import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      // 1. Local state (Cart items)
      cart: cartReducer,
      // 2. Auth state (User login/logout)
      auth: authReducer,
    },
  });
};

// Standard types for TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];