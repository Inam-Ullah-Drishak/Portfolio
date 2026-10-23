import Link from 'next/link';

const linkCls = "text-sm text-white/60 transition hover:text-white";
const headCls = "mb-4 text-xs font-semibold uppercase tracking-wider text-[#967d6a]";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-3 pb-3 pt-10 sm:px-5">
      <div className="mx-auto max-w-360 overflow-hidden rounded-3xl bg-[#0b0808] px-6 pt-12 text-white sm:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold">Base &amp; Balance</h3>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={headCls}>Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className={linkCls}>Home</Link></li>
              <li><Link href="/shop" className={linkCls}>Shop</Link></li>
              <li><Link href="/login" className={linkCls}>Sign In</Link></li>
              <li><Link href="/register" className={linkCls}>Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headCls}>Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>support@ourstore.com</li>
              <li>(123) 456-7890</li>
              <li>123 Store Street</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={headCls}>Newsletter</h4>
            <p className="mb-4 text-sm text-white/60">
              Subscribe for new arrivals and exclusive offers.
            </p>
            <form className="flex items-center rounded-full bg-white/10 p-1" action="#">
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
          </div>
        </div>

        {/* Outline wordmark */}
        <p
          aria-hidden="true"
          className="vx-outline mt-12 select-none whitespace-nowrap text-center text-[11vw] font-bold uppercase leading-none tracking-tight"
        >
          Base &amp; Balance
        </p>

        <div className="border-t border-white/10 py-5 text-center">
          <p className="text-xs text-white/50">
            © {currentYear} Base &amp; Balance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
