'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthActions } from '@/lib/hooks/useAuth';
import AuthLayout, { AuthError, Field, authButton } from '@/components/AuthLayout';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthActions();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    setIsLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Registration failed');
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
      title="Create account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#0b0808] underline underline-offset-2">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <AuthError message={error} />}
        <Field label="Full name" id="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
        <Field label="Email address" id="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        <Field label="Password" id="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} placeholder="At least 6 characters" />
        <Field label="Confirm password" id="confirmPassword" type="password" autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" />
        <button type="submit" disabled={isLoading} className={authButton}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </AuthLayout>
  );
}
