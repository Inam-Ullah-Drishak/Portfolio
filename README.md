# Base & Balance

A gym clothes, shoes and gear store template. Next.js 16 (App Router), Tailwind v4, Redux Toolkit. There is no backend: products are mock data and the cart, wishlist, last order and "login" live in the browser (localStorage).

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, workout, top picks, latest wear, gallery, level up |
| `/shop` | Search, category, color, price and sort filters, load more |
| `/product/[id]` | Product page: variants, size guide, quantity, reviews slider |
| `/cart` | Cart with promo code (`BALANCE10`) and free-shipping progress |
| `/checkout`, `/order-confirmation` | Demo checkout (no payment is taken) |
| `/wishlist` | Hearted products |
| `/about` | About us |
| `/login`, `/register` | Mock auth: any email and password work |

## Making it yours

1. Brand name, tagline and contact details: `lib/siteConfig.ts`
2. Products (names, prices, images, colors, sizes): `lib/mockData.ts`. The first 8 also feed the home page gallery.
3. Colors and design tokens: `:root` in `app/globals.css`
4. Shipping and promo rules: `lib/pricing.ts`
5. Home page photos and copy: `components/sections/` and `public/`
6. Placeholder text to replace: About page (`app/about/page.tsx`), reviews and shipping/returns text (`app/product/[id]/page.tsx`)
7. To go live, replace the mock pieces: product hooks in `lib/services/storeApi.ts`, auth in `lib/hooks/useAuth.ts`, the newsletter form (`components/layout/NewsletterForm.tsx`) and checkout (`app/checkout/page.tsx`)

See `STRUCTURE.md` for the folder layout.
