import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import { siteConfig } from '@/lib/siteConfig';

const linkCls = "text-sm text-white/60 transition hover:text-white";
const headCls = "mb-4 text-xs font-semibold uppercase tracking-wider text-[#967d6a]";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0b0808] px-3 pb-3 pt-6 sm:px-5 sm:pt-10">
      <div className="mx-auto max-w-360 overflow-hidden rounded-3xl bg-[#0b0808] [container-type:inline-size] px-6 pt-8 text-white sm:pt-12 sm:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold">{siteConfig.name}</h3>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={headCls}>Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className={linkCls}>Home</Link></li>
              <li><Link href="/shop" className={linkCls}>Shop</Link></li>
              <li><Link href="/about" className={linkCls}>About Us</Link></li>
              <li><Link href="/cart" className={linkCls}>Cart</Link></li>
              <li><Link href="/wishlist" className={linkCls}>Wishlist</Link></li>
              <li><Link href="/login" className={linkCls}>Sign In</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headCls}>Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={headCls}>Newsletter</h4>
            <p className="mb-4 text-sm text-white/60">
              Subscribe for new arrivals and exclusive offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Outline wordmark */}
        <p
          aria-hidden="true"
          className="vx-outline mt-8 select-none whitespace-nowrap pb-3 text-center text-[11cqw] font-bold uppercase leading-none tracking-tight"
        >
          {siteConfig.name}
        </p>

        <div className="border-t border-white/10 py-5 text-center">
          <p className="text-xs text-white/50">
            © {currentYear}{" "}{siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
