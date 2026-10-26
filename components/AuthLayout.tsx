import type { ComponentProps, ReactNode } from "react";

// Shared shell for login and register: form on the left, photo on the right (desktop only)
export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle: ReactNode; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white px-4 pb-12 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto grid max-w-360 items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto flex w-full max-w-md flex-col justify-center py-8">
          <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">{title}</h1>
          <p className="mt-4 text-sm text-[#0b0808]/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <div className="hidden overflow-hidden rounded-2xl bg-linear-to-b from-[#2f2b29] to-[#b4b4b4] lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/top-pick-3.png" alt="" className="h-full w-full object-contain object-bottom" />
        </div>
      </div>
    </main>
  );
}

export function Field({ label, id, ...props }: { label: string; id: string } & ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={id} className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="mt-2 w-full rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#0b0808] outline-none focus:border-[#0b0808]"
      />
    </div>
  );
}

export const authButton =
  "w-full rounded-full bg-[#0b0808] py-4 text-[13px] uppercase text-white transition hover:bg-[#5d4d45] disabled:cursor-not-allowed disabled:bg-[#0b0808]/30";

export function AuthError({ message }: { message: string }) {
  return <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{message}</div>;
}
