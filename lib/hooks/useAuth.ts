'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/lib/store';
import { setUser, clearUser, setLoading, type User } from '@/lib/features/authSlice';

/**
 * Typed hooks for Redux
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);

/**
 * Hook to get current auth state
 * Returns: user, isAuthenticated, isLoading
 */
export function useAuth() {
  return useSelector((state: RootState) => state.auth);
}

/**
 * Hook to perform auth actions (login, logout, check session)
 */
export function useAuthActions() {
  const dispatch = useDispatch<AppDispatch>();

  // Mock auth, no backend: the "session" is a user object kept in localStorage
  const KEY = 'mockUser';
  const save = (user: User): { success: boolean; user?: User; error?: string } => {
    localStorage.setItem(KEY, JSON.stringify(user));
    dispatch(setUser(user));
    return { success: true, user };
  };

  const checkSession = async () => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) dispatch(setUser(JSON.parse(saved)));
      else dispatch(clearUser());
    } catch {
      dispatch(clearUser());
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Any email/password is accepted
  const login = async (email: string, _password: string) =>
    save({ id: email, name: email.split('@')[0], email, isAdmin: false });

  const register = async (name: string, email: string, _password: string) =>
    save({ id: email, name, email, isAdmin: false });

  const logout = async () => {
    localStorage.removeItem(KEY);
    dispatch(clearUser());
    return { success: true };
  };

  return { checkSession, login, register, logout };
}

/**
 * Hook that automatically checks session when component mounts
 * Use this in your root layout to check auth on app load
 */
export function useAuthCheck() {
  const { checkSession } = useAuthActions();
  const { isLoading } = useAuth();

  useEffect(() => {
    checkSession();
  }, []);

  return { isLoading };
}
