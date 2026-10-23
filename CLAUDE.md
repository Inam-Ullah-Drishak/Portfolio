@AGENTS.md

# Base & Balance: project notes and progress

Gym clothes, shoes and gear store. Next.js 16 (App Router), Tailwind v4, Redux Toolkit. **No backend**: all data is mock. Design is based on the Dribbble "Vexo eCommerce" concept (light frame, notched header, centred hero).

Keep this file updated: add to **Done**, move finished items out of **Next**, and record new gotchas.

## How the app works

- **Data:** `lib/mockData.ts` holds 20 products. `lib/services/storeApi.ts` exports the `Product` type and mock hooks (`useGetProductsQuery`, `useGetFeaturedProductsQuery`, `useGetProductByIdQuery`) that return data synchronously.
- **Auth:** mock, in `lib/hooks/useAuth.ts`. Any email/password works; the user is kept in localStorage under `mockUser`.
- **Cart:** local Redux (`lib/features/cartSlice.ts`). Cart count shows on the header cart button.
- **Removed:** `app/api/`, `models/`, `lib/db.ts`, `lib/auth.ts`, mongoose/bcryptjs/jsonwebtoken. `.env.local` still has old Mongo/JWT values and is unused (gitignored).

## Design system

- **Palette:** sky `#98aeb3`, mist `#d1d6d8`, ink `#0b0808`, brown `#5d4d45`, sand `#967d6a`, frame/white `#ffffff`, light grey `#e9ebed`. Tokens are in `:root` in `app/globals.css`.
- **Font:** Inter Tight via `next/font/google` (`--font-inter-tight`), applied through `--store-font`.
- **Page frame:** a fixed white ring with rounded corners floats `--frame-gap` (10 to 36px) inside the viewport (`body::after` in `globals.css`). Body padding is `--frame-gap + 12px`, so anything fixed/absolute at the top uses `calc(var(--frame-gap) + 12px)`.
- **Content width:** backgrounds go full width, content is capped at `max-w-360` (1440px).
- **Buttons:** one size, 13px. A global `button { font-size: 13px }` rule in `globals.css` wins over utility sizes on `<button>` elements. Links styled as buttons need `text-[13px]` explicitly. Header nav links are 13px too.

## Done

- Logo (`public/logo.png`) in the notch and as favicon (`app/icon.png`).
- Backend removed, mock data and mock auth added.
- **Header** (`components/layout/Navbar.tsx`): floating panel with a curved SVG notch holding logo + "BASE & BALANCE" (bottom-aligned), links on both sides, "Sign In / Up" pill, round cart button. Home: absolute over the hero and transparent. Other pages: sticky with its own sky gradient panel.
- **Footer** (`components/layout/Footer.tsx`): dark rounded card, columns, pill newsletter, outline wordmark.
- **Hero** (`components/sections/HomeHeroSection.tsx`): centred headline (words slide up), "SEASON" types/deletes in a loop (`TypingWord.tsx`, no caret, starts at 2.3s), Shop Now / Explore All pills, light rays, model cut-out (`public/hero-model.png`) that starts large and sliced into strips then drops into place, avatar stack (`public/avatar-1..3.jpg`) with blurb, looping video card (`public/hero-video.mp4`). Animation classes `hx-*` are in `globals.css`.
- **Workout section** (`components/sections/WorkoutSection.tsx`, white, directly under the hero): giant "WORKOUT" behind three photo cards (`hero-model.png`, `workout-left.jpg`, `workout-right.jpg`), centre card reveals as strips when scrolled into view (`wk-*` classes).
- Page sections below the Workout section sit on `#e9ebed` (`main` background in `app/page.tsx`); their white backgrounds were removed.
- Repo connected: `origin` = `git@github.com:Inam-Ullah-Drishak/base-n-balance.git`, branch `main`. Only the first commit was pushed; later work is uncommitted.

## Next / open

- Rewrite mock products as gym clothes, shoes and gear (names, descriptions, images are still developer-themed).
- Make the remaining home sections (Featured Products and below) match the new style, or decide on a uniform page background.
- Real avatar photos and final model/workout photos if the user supplies them.
- Mobile menu only lists the left links (Apparel / Accessories missing). Phone widths have not been checked.
- Right-side header links Apparel / Accessories and "About Us" all go to `/shop`.
- Shop, login and register pages not re-checked after the style changes.
- Update `STRUCTURE.md` (still describes the old `api/`, `models/`, `db.ts` layout).
- Pre-existing lint error: unescaped `'` in `app/login/page.tsx` line 54.

## Gotchas

- **Stale dev server:** on this machine (OneDrive folder) `next dev` often serves old CSS after edits. Fix: stop the process on port 3000, delete `.next`, run `npm run dev` again. Check with a computed-style lookup in the browser if a style change doesn't show.
- `button { font: inherit }` in `globals.css` overrides utility font settings on buttons; set sizes on an inner `span` or rely on the global 13px rule.
- Unsplash images are used for some mock products and the workout cards (free licence). Downloaded files live in `public/`.
