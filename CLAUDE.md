@AGENTS.md

# Base & Balance: project notes and progress

Gym clothes, shoes and gear store, **treated as a template** (only add what a template needs). Next.js 16 (App Router), Tailwind v4, Redux Toolkit. **No backend**: all data is mock. Design is based on the Dribbble "Vexo eCommerce" concept (light frame, notched header, centred hero).

Keep this file updated: add to **Done**, move finished items out of **Next**, and record new gotchas.

## Status (latest)

Everything planned is built: home, shop, product, cart, mini cart drawer, checkout, order confirmation, wishlist, about, login/register, 404. `npm run build` passes (12 routes), `tsc` and `eslint` are clean (3 old warnings in `lib/hooks/useAuth.ts`). Responsive audit passed at 320 to 1920px. **All of this is uncommitted** in git (about 45 changed files); nothing from this work has been pushed.

## How the app works

- **Data:** `lib/mockData.ts` holds 15 products (the first 8 use the home-page photos, in the home gallery's order). `lib/services/storeApi.ts` exports the `Product` type (has optional `images` for gallery thumbnails) and mock hooks (`useGetProductsQuery`, `useGetFeaturedProductsQuery`, `useGetProductByIdQuery`) that return data synchronously.
- **Brand/contact:** `lib/siteConfig.ts` (name, tagline, email, phone, address). Used by Navbar, Footer, metadata and the About page.
- **Auth:** mock, in `lib/hooks/useAuth.ts`. Any email/password works; the user is kept in localStorage under `mockUser`.
- **Redux store** (`lib/store.ts`): `cart`, `auth`, `wishlist`, `ui` (cart drawer + toast), `order` (last order + applied promo). `lib/StoreProvider.tsx` loads cart, wishlist and last order from localStorage on start and saves them on every change.
- **Pricing:** `lib/pricing.ts` has the shipping rule (free over $100, else $8), promo codes (`BALANCE10` = 10% off) and `totals()`.
- **Removed:** `app/api/`, `models/`, `lib/db.ts`, `lib/auth.ts`, mongoose/bcryptjs/jsonwebtoken, swiper. `.env.local` still has old Mongo/JWT values and is unused (gitignored); delete it before sharing the template.

## Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | Hero, Workout, Top Picks, Latest Wear, Product gallery, Level Up (sections in `components/sections/`) |
| `/shop` | `app/shop/page.tsx` | Search, category chips, colour dots, price range, sort, Load more (8 per page). Default sort "Featured" keeps data order |
| `/product/[id]` | `app/product/[id]/page.tsx` | Breadcrumb, image (+ thumbnails if `images` set), wishlist heart, rating, colour/size pickers, size guide modal, quantity, add to cart + toast, trust row, Materials/Shipping accordions, reviews slider with avatars, related products, sticky buy bar on phones |
| `/cart` | `app/cart/page.tsx` | Line items, quantity, remove, free-shipping progress, promo code, order notes + gift checkbox (not saved anywhere), related products |
| `/checkout` | `app/checkout/page.tsx` | Contact + address; no card fields (payment is simulated) |
| `/order-confirmation` | `app/order-confirmation/page.tsx` | Shows the last order from the store |
| `/wishlist` | `app/wishlist/page.tsx` | Hearted products |
| `/about` | `app/about/page.tsx` | Intro, photos, story, values, process, CTA (copy is placeholder) |
| `/login`, `/register` | `app/login`, `app/register` | Share `components/AuthLayout.tsx` (form + photo) |
| 404 | `app/not-found.tsx` | |

Page titles come from per-route `layout.tsx` metadata with a `%s | Base & Balance` template (all product pages share the title "Product").

## Shared components

- `components/ProductCard.tsx`: the card used by shop, wishlist, cart, product and home gallery. Local `.png` images are treated as transparent cut-outs and stand on a dark-to-grey gradient. Heart toggles the wishlist.
- `components/layout/`: `Navbar`, `Footer`, `CartDrawer` (slides in from the header cart button, z-70 so it covers the frame ring), `Toast` ("added to cart"), `NewsletterForm` (demo only), `AuthInitializer`.

## Design system

- **Palette:** sky `#98aeb3`, mist `#d1d6d8`, body/frame backdrop `#cdd8db`, ink `#0b0808`, brown `#5d4d45`, sand `#967d6a`, frame/white `#ffffff`, light grey `#e9ebed`. Tokens are in `:root` in `app/globals.css`.
- **Font:** Inter Tight via `next/font/google` (`--font-inter-tight`), applied through `--store-font`.
- **Page frame:** a fixed white ring with rounded corners floats `--frame-gap` (10 to 36px) inside the viewport (`body::after` in `globals.css`, z-index 60). Body padding is `--frame-gap + 12px`, so anything fixed/absolute at the top uses `calc(var(--frame-gap) + 12px)`. Overlays that must cover the ring (drawer, size guide) use z-70.
- **Header:** transparent and `absolute` on every page, so it scrolls away with the page. The curved notch behind the logo is white on home and `#cdd8db` elsewhere. Non-home pages pad their top for it (`pt-28 sm:pt-36`). Links: Home, Shop, About Us (left); Sign In/Up pill and cart button (right). Cart button opens the drawer.
- **Content width:** backgrounds go full width, content is capped at `max-w-360` (1440px).
- **Buttons:** pills, 13px. A global `button { font-size: 13px }` rule in `globals.css` wins over utility sizes on `<button>` elements. Links styled as buttons need `text-[13px]` explicitly.

## Done (history)

- Logo in the notch and as favicon (`app/icon.png`); backend removed, mock data and auth added.
- Home sections: **Hero** (typing "SEASON", sliced model cut-out, avatars, video card; `hx-*` classes), **Workout** (`wk-*` strip reveal), **Top Picks** (3 cut-out cards, approved), **Latest Wear** (`lt-*`), **Product gallery** (first 8 `mockProducts` via `ProductCard`, fades in with `wk-*`), **Level Up** (`lv-*`, endless text lines + swapping cut-outs; corner copy is placeholder). Sections below Workout sit on `#e9ebed`.
- Mock products rewritten as gym gear; unsuitable photos removed (coffee cup, dress shoes, GG bag, socks, sunglasses). Three items use the local cut-outs `top-pick-1..3.png`.
- Shop, product, cart, drawer, toast, checkout, confirmation, wishlist, about, login/register, 404 (see Pages).
- Template setup: `siteConfig`, page titles, working newsletter demo, footer links (About, Cart, Wishlist, Sign In), README "Making it yours" checklist, rewritten `README.md` and `STRUCTURE.md`, package renamed `base-n-balance`.
- Cleanup: deleted unused old home sections, unused default SVGs, `img-text-img.jpg`, the 16MB `home-hero-bg-video.mp4`, and the `swiper` dependency.
- Repo: `origin` = `git@github.com:Inam-Ullah-Drishak/base-n-balance.git`, branch `main`. Latest local commit is `a86b716`; everything after it is uncommitted.

## Next / open

- Commit and push the current work.
- Replace placeholders: About copy, reviews (same set on every product), shipping/returns text, Level Up corner copy.
- Some Unsplash product photos may not match their names; replace with local images. No product has extra `images` yet, so no thumbnails show.
- Only 3 avatar photos exist (`avatar-1..3.jpg`), so reviews reuse them.
- Order notes and the gift checkbox on the cart page are not passed to checkout.
- Delete `.env.local` (unused secrets) before sharing the template.
- Not checked: phone landscape, real touch devices, browsers other than Chrome, keyboard/screen-reader use of the drawer and size-guide modal.
- Deliberately skipped (template scope): account/orders pages, real payment, newsletter backend, image compression.

## Responsive

- Latest audit: all 11 routes plus the 404 page at 320, 360, 390, 768, 1024, 1280, 1440 and 1920px (iframe of that width, `scrollWidth > clientWidth`): no horizontal overflow. The only failure was the shop colour row at 320px, now wrapping. Visually checked: product at about 390 and 768px, home at 768px, cart at 390px.
- Header: desktop links and hamburger switch at `xl` (1280px) because the 340px notch collides with the links below that. On phones the notch is 120px and shows only the B logo (text from `sm`). The mobile menu lists the three links.
- Hero avatar blurb and video card show from `lg`. Footer grid is 1 col, 2 cols from `sm`, 4 cols from `lg`.
- Product gallery/shop grids: 1 col on phones, 2 from `sm`, 4 from `lg`. Top Picks is a swipe carousel on phones, a 3-col grid from `md`. Workout has its own phone layout. Reviews are a snap-scroll slider (about 1, 2, 3 cards by width).

## Gotchas

- **Phone preview / audits:** the Chrome window cannot be resized below the screen. Add an iframe of the target width to the page and measure `contentDocument` (same origin). An iframe added by script is removed on reload. Long loops time out the browser tool after about 45s, so run one width per call.
- **Browser checks:** if the Chrome tool shows an error page for `localhost`, the session has probably slipped to Browser 2. Re-select Browser 1 (fba729d5-..., signed in as Inam Ullah) with `select_browser`; Browser 2 cannot open localhost.
- **Stale dev server:** on this machine (OneDrive folder) `next dev` often serves old CSS after edits. Fix: stop the process on port 3000, delete `.next`, run `npm run dev` again. Check with a computed-style lookup in the browser if a style change doesn't show. `npx next build` while the dev server runs was fine (Next 16 keeps dev output separate).
- **Editing files:** some files use CRLF line endings, so multi-line string replaces in scripts can silently miss; prefer the Edit tool, and re-Read a file before overwriting it if a script touched it.
- `button { font: inherit }` in `globals.css` overrides utility font settings on buttons; set sizes on an inner `span` or rely on the global 13px rule.
- Unsplash images are still used for some mock products (free licence); `next.config.ts` allows `images.unsplash.com`. Local images live in `public/`.
- The React lint rule flags impure calls like `Math.random()` inside components; keep such helpers at module level (see `orderNumber` in `app/checkout/page.tsx`).
