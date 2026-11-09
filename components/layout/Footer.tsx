import Link from 'next/link';
import { siteConfig, socialLinks } from '@/lib/siteConfig';

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
              <li><Link href="/projects" className={linkCls}>Work</Link></li>
              <li><Link href="/services" className={linkCls}>Services</Link></li>
              <li><Link href="/about" className={linkCls}>About</Link></li>
              <li><Link href="/contact" className={linkCls}>Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headCls}>Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href={`mailto:${siteConfig.email}`} className={linkCls}>{siteConfig.email}</a></li>
              <li><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={linkCls}>{siteConfig.phone}</a></li>
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{l.label}</a>
                </li>
              ))}
              <li>{siteConfig.address}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={headCls}>Let&apos;s talk</h4>
            <p className="mb-4 text-sm text-white/60">
              Have a project in mind? I reply within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-5 py-2 text-[13px] font-semibold uppercase tracking-wider text-[#0b0808] transition hover:bg-[#d1d6d8]"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 py-5 text-center">
          <p className="text-xs text-white/50">
            © {currentYear}{" "}{siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
