import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a User
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Define the auth state
interface AuthState {
  user: User | null;  // null if not logged in
  isLoading: boolean;  // true while checking session
  isAuthenticated: boolean;  // true if logged in
}

// Initial state when app starts
const initialState: AuthState = {
  user: null,
  isLoading: true,  // Start as true, we'll check session on app load
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called when user logs in or registers
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    
    // Called when user logs out
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    
    // Called when we finish checking if user is logged in
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions to use in components
export const { setUser, clearUser, setLoading } = authSlice.actions;

// Export reducer to add to store
export default authSlice.reducer;
