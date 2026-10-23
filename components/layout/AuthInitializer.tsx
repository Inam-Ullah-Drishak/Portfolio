'use client';
import { useAuthCheck } from '@/lib/hooks/useAuth';

/**
 * This component checks if user is logged in when app loads
 * Place it in the root layout inside StoreProvider
 */
export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  // This hook automatically restores the mock session on mount
  useAuthCheck();

  return <>{children}</>;
}
