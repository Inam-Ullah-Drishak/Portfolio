import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-28 text-center">
      <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">Error 404</span>
      <h1 className="mt-4 text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-6 text-[#0b0808]/70">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
        Back to home
      </Link>
    </main>
  );
}
