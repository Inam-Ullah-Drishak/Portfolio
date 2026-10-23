import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Base &amp; Balance</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black text-sm transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-black text-sm transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-600 hover:text-black text-sm transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: support@ourstore.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Store Street</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe for new arrivals and exclusive offers.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row md:flex-col" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                className="min-w-0 border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black"
              />
              <button
                type="submit"
                className="store-control bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Base &amp; Balance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
