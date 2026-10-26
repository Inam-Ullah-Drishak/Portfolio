# Project Structure

No backend: data is mock and state is kept in Redux, with cart, wishlist and last order saved to localStorage.

```
app/
├── page.tsx                 # Home (sections below)
├── shop/                    # Product list with filters
├── product/[id]/            # Product page
├── cart/  checkout/  order-confirmation/
├── wishlist/  about/
├── login/  register/        # Mock auth
├── layout.tsx               # Providers, Navbar, Footer, cart drawer, toast
└── globals.css              # Design tokens, frame, animation classes

components/
├── ProductCard.tsx          # Card used by shop, wishlist, cart and product pages
├── AuthLayout.tsx           # Shell + fields for login and register
├── layout/                  # Navbar, Footer, CartDrawer, Toast, AuthInitializer
└── sections/                # Home page sections (Hero, Workout, TopPicks, LatestWear, ProductGallery, LevelUp)

lib/
├── mockData.ts              # The products
├── pricing.ts               # Shipping rule, promo codes, totals
├── store.ts  StoreProvider.tsx
├── features/                # Redux slices: auth, cart, wishlist, ui, order
├── hooks/useAuth.ts         # Typed Redux hooks and mock auth
└── services/storeApi.ts     # Product type and mock "query" hooks
```
