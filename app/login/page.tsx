'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthActions } from '@/lib/hooks/useAuth';
import AuthLayout, { AuthError, Field, authButton } from '@/components/AuthLayout';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthActions();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    setIsLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-[#0b0808] underline underline-offset-2">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <AuthError message={error} />}
        <Field
          label="Email address"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
        />
        <button type="submit" disabled={isLoading} className={authButton}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  );
}
