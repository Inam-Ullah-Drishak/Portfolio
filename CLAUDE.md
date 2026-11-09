@AGENTS.md

## Progress
- Goal: convert this store template into a portfolio site for INAM ULLAH, section by section, starting from the header.
- Done: header notch logo image replaced with the text "INAM ULLAH" (`components/layout/Navbar.tsx`, notch 150px on phones).
- Done: hero text now "I build websites that [perform]" with About me / Hire me (mailto `siteConfig.email`) buttons; image/video still the fashion ones.
- Done: header menu is Home, Work (`/#work`, section not built yet), About, Contact (mailto); right side is a single "Hire me" mailto pill. Cart and account menu removed from the header (CartDrawer, auth pages and store routes still exist).
- Done: hero video card now plays `public/hero-portfolio.mp4` (10MB, renamed from `7989682-hd_1920_1080_25fps.mp4`); old `hero-video.mp4` is unused.
- Done: site name is "Inam Portfolio" (`lib/siteConfig.ts`: titles, footer, About copy); favicon is now `app/icon.svg` (white box, black I), old `icon.png` deleted. `logo.png` in `public/` is unused.
- Done: second home section (`WorkoutSection.tsx`) is now the Work section (`id="work"`, giant word "Work", portfolio blurbs). Its 3 cards are dynamic: they come from the first 3 `featured: true` entries in `lib/projects.ts` (1st = centre, 2nd = left, 3rd = right; links open in a new tab; section renders nothing if fewer than 3 are featured). Data is still dummy (`public/project-1..3.svg`, `https://example.com`); replace with real mobile screenshots + live URLs (best project = first). `workout-*.png/jpg` now unused.
- Done: Work section has a "View more" button to new `/projects` page (`app/projects/`), which lists every entry in `lib/projects.ts` (not only featured) in a 4-col grid.
- Done: third home section (`TopPicksSection.tsx`) is now Services (Websites, Web apps, Support) with new text; cards open a mailto. Images deliberately kept (gym cut-outs `top-pick-1..3.png`), to be replaced all at once later.
- Done: services are data in `lib/services.ts` (home section shows the first 3); Services section has a "View all" button to new `/services` page (`app/services/`) listing every service. Only the 3 real entries exist; add more there.
- Done: fourth home section (`LatestWearSection.tsx`) text updated: ghost lines "Clean code for / Your next project", card shows "Let's build", "With modern, fast web development". Image `level-up.png` kept (to be replaced).
- Done: fifth home section (`ProductGallerySection.tsx`, file name kept) is now "How I work": 4 steps (Discover, Design, Build, Launch) + "Start a project" mailto button. No fake testimonials.
- Done: last home section (`LevelUpSection.tsx`) is the closing CTA: scrolling "Let's work together!", corners (Inam Ullah / Web developer, Open for freelance work, Lahore, Pakistan, Reply within 24 hours), "Start a project" mailto button. Person cut-outs `person-1..4.png` kept (to be replaced).
- Done: footer (`Footer.tsx`) converted: links Home/Work/Projects/Services/About, contact = email + Lahore, Pakistan, "Let's talk" + Start a project mailto instead of the newsletter (`NewsletterForm.tsx` deleted). `siteConfig` tagline, description and address now portfolio values (phone still the placeholder, not shown).
- Done: footer Contact lists email, LinkedIn, GitHub, WhatsApp (links from `siteConfig`; LinkedIn/GitHub/WhatsApp URLs are PLACEHOLDERS until the owner supplies them). Outline wordmark removed from footer.
- Done: new home sections between "How I work" and the closing CTA: Skills & tools + numbers (`SkillsSection.tsx`), Testimonials (`TestimonialsSection.tsx`, uses `avatar-1..3.jpg`), FAQ (`FaqSection.tsx`, native `<details>`). Shared wrapper `SectionShell.tsx` (scroll fade-in + heading row). Content in `lib/portfolioContent.ts`: ALL PLACEHOLDERS (skills list, numbers, "Client Name" quotes, FAQ answers); replace before publishing. No About-me section (closing card + About page cover it) and no Resume button (no PDF yet).
- Done: Skills section on home now shows 3 cards (Front end, Back end, CMS & website builders; each links to `/skills#<id>`), the numbers row and a "View all" button to new `/skills` page (`app/skills/`), which lists all 4 groups (incl. Tools) with every item. Data: `skillGroups` in `lib/portfolioContent.ts`.
- Done: `/contact` page + `components/ContactForm.tsx` (posts to `NEXT_PUBLIC_FORM_ENDPOINT` if set, else opens mailto); all "Hire me"/"Start a project"/Contact buttons and service cards now link to `/contact`. About page rewritten for the portfolio (placeholder story, dummy photos). Hero: socials row + "Download CV" button that appears only when `public/cv.pdf` exists. `BackToTop` button + smooth scroll. Share image `app/opengraph-image.tsx`; `metadataBase` uses `NEXT_PUBLIC_SITE_URL`. Build passes (17 routes).
- Done: old store deleted with the owner's OK (shop, product, cart, checkout, order-confirmation, wishlist, login, register + ProductCard, AuthLayout, CartDrawer, Toast, AuthInitializer, StoreProvider, store, features, hooks, mockData, pricing, services/storeApi); layout is now just Navbar, Footer, BackToTop. Routes now: `/`, `/about`, `/contact`, `/projects`, `/services`, `/skills`, 404 (build passes, tsc/eslint clean). Redux/mongoose-era deps may still be in `package.json` (unused). The store notes in "Status" and below are LEGACY (history only); they are recoverable from git (commit de35a0c).
- Done: real contact details set in `lib/siteConfig.ts` (email inam.ullah.ecomm@gmail.com, phone +92 315 4205168, WhatsApp wa.me link). LinkedIn and GitHub left empty on purpose: empty links are hidden everywhere via `socialLinks` (fill them in `siteConfig` to show them). Phone shown in footer and contact page.
- Decision: the contact form will later become a real in-site submission (own API + leads dashboard), not Formspree; until then it opens mailto. Live site URL skipped (working locally). Images pending. Real testimonials to be added later when real projects are added (current ones are placeholders).
- Done: About page text finished by Claude from known facts (4+ years, 100+ projects, 90% happy, stack/builders, Lahore, 24h reply): longer story, numbers row (from `stats`), "See my skills" button, availability line in the closing card. Owner may still personalise the story (how they started, proudest work). Photos pending.
- Done: Services page is now one full section per service (alternating image/text, id = service id, "what's included" bullets from `includes` in `lib/services.ts` (generic wording to personalise), "Get a quote" button) plus a closing "Need something custom?" CTA. Adding an entry to `services` adds a section. Now 10 services in `lib/services.ts` (websites, web-apps, support, cms, redesign, api, ecommerce, design, backend, deployment), each with `details` paragraph, 6 `includes` bullets and "Built with" `tools` chips; wording is a draft. The home Services section still shows the first 3. Images are the dummy cut-outs (services 4 to 6 reuse them).
- Done: Contact page now has a "service interested in" dropdown (options from `lib/services.ts` pills, sent with the message; good field for the future leads dashboard) and a "What happens next" 3-step row. Form is still mailto until the real submission is built.
- Done: header and footer "Work" link now goes to the `/projects` page (page heading and tab title renamed "Work"; the URL stays `/projects`). The home Work section is still reachable by scrolling.
- Done: `lib/projects.ts` now has 8 DUMMY projects (Business Website, Online Store, Booking Web App, Restaurant Website, Real Estate Platform, Agency Landing Page, Analytics Dashboard, Personal Portfolio; images `public/project-1..8.svg`, links `https://example.com`). First 3 are featured (home Work section); `/projects` shows all 8. Replace with real projects later.
- Done: `/projects` (Work) page has filters via `components/ProjectsBrowser.tsx`: search, Platform chips, Type chips, "New only", sort (newest/oldest/A-Z); cards show a "New" badge and "platform · type · month year". Projects in `lib/projects.ts` gained `platform`, `type`, `date`, `isNew` (dummy values). Filter chips are built from whatever values exist in the data. Pagination: 8 projects per page (`PAGE_SIZE` in `ProjectsBrowser.tsx`), Previous/numbers/Next appear only when results exceed 8 (not visible yet: only 8 projects exist); filters reset to page 1.
- Done: Work page extras: each project has its own page `/projects/[id]` (facts row, 3 screenshots, challenge/solution/result cards, "Built with" chips, prev/next, "Visit live site"); cards use the gradient style with a "View project" hover and tool chips; extra Industry and Technology filters; ALL filters/sort/page are stored in the URL (`ProjectsBrowser` reads `useSearchParams`, page wraps it in `Suspense`); closing "Like what you see?" CTA. Home Work cards now open `/projects/<id>` (not the live URL). Projects also have `role`, `duration`, `status`, `services` (ids from `lib/services.ts`, shown as links to `/services#id`), `metrics` (3 key results), `quote`, `galleryAlts`, and optional `repoUrl` ("View code" button, shown only when set) and `shareImage` (link-preview image); all filled with dummy values except the two optional ones. The project page shows them all. The home Testimonials section is NOT wired to the project quotes yet (still placeholders in `lib/portfolioContent.ts`). RULE for project images: `gallery` is a list of `{ src, alt, device: "desktop" | "mobile" | "other" }` (the old `image` and `galleryAlts` fields are gone). Convention: 1st image = desktop, 2nd = mobile, the rest anything. Cards (Work page, home Work section) show the first `mobile` image via `cardImage(p)`; the project page gallery opens on the 1st image (desktop) and shows a Desktop/Mobile tag on each. Project page layout: from `lg` the gallery is on the left half and the details (facts as a vertical list, "Built with", "Services") on the right half (sticky); stacked on smaller screens. Below: key results and the case study (challenge/solution/result) are text-led, sharing the same 3 columns with a top rule (no gradient cards), then quote, prev/next and CTA, full width. Gallery (current): `components/ProjectGallery.tsx` takes `images` and `title`. It shows a rounded grey panel (height `min(62vh,28rem)`) with a sliding track of plain, UNCROPPED images (each `h-[calc(min(62vh,28rem)-3rem)] w-full object-contain drop-shadow-md`, no device frames, no arrows on the main image; written as literal Tailwind classes, do not build them from variables). Above it an "All / Desktop / Mobile" pill switch (only when both kinds exist); below it centred thumbnails with D/M badges (dots on phones), an uppercase caption row (tag pill + alt text + counter), fade-in on scroll (`wk-in`/`wk-item`). Click the image for a full-screen view (Esc, arrows, close, click outside). Swipe and arrow keys work. Portrait and landscape both fit. History: tried device frames and fixed-shape cropping; removed because a frame sized from an unsized image collapsed to a dot and the owner wanted uncropped plain images. There are now 10 dummy projects (images `project-1..10.svg`) so the pagination shows: page 1 has 8, page 2 has 2. `lib/projects.ts` fields (platform, type, industry, client, tools, date, isNew, problem, solution, result, gallery) are filled with DUMMY per-project text and "Sample ..." client names; replace with real data.
- Needs from owner: LinkedIn/GitHub URLs, CV PDF, photo + project screenshots, real numbers/FAQ answers.
- Next: replace dummy images and dummy project/testimonial/FAQ content with real data; connect Testimonials to project quotes; real contact form + leads dashboard; visual check of every page in a browser; compress hero video; sitemap/robots; commit.
- Decision: header design is kept as is; only content changes.

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
