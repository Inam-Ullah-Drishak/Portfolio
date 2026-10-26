"use client";
import { useState } from "react";

// Demo only: no email is sent or stored. Wire `onSubmit` to your mailing list provider.
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) return <p className="rounded-full bg-white/10 px-5 py-3 text-sm text-white">Thanks for subscribing!</p>;

  return (
    <form
      className="flex items-center rounded-full bg-white/10 p-1"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="Your email address"
        required
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
      />
      <button
        type="submit"
        className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold uppercase tracking-wider text-[#0b0808] transition hover:bg-[#d1d6d8]"
      >
        Subscribe
      </button>
    </form>
  );
}
