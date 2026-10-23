# Project Structure

This document outlines the organized folder structure of the application.

## 📁 Folder Organization

### `/app` - Next.js App Router
```
app/
├── api/              # API routes
│   ├── auth/        # Authentication endpoints
│   │   ├── login/
│   │   ├── logout/
│   │   ├── me/
│   │   └── register/
│   ├── products/    # Product endpoints
│   └── seed/        # Database seeding
├── login/           # Login page
├── register/        # Registration page
├── layout.tsx       # Root layout
├── page.tsx         # Home page
└── globals.css      # Global styles
```

### `/components` - React Components

#### **Organized by Type:**

```
components/
├── layout/          # Layout components (used in app layout)
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Footer.tsx          # Bottom footer
│   └── AuthInitializer.tsx # Auth session checker
│
└── sections/        # Page section components
    └── FeaturedProducts.tsx # Product grid section
```

**Guidelines:**
- **`layout/`** - Components that are part of the main layout (navbar, footer, etc.)
- **`sections/`** - Reusable page sections (hero, features, products, etc.)
- **Future folders:**
  - `ui/` - Reusable UI components (buttons, cards, inputs, etc.)
  - `forms/` - Form components
  - `modals/` - Modal/dialog components

### `/lib` - Business Logic & Utilities

```
lib/
├── features/        # Redux slices
│   ├── authSlice.ts       # User authentication state
│   └── cartSlice.ts       # Shopping cart state
│
├── services/        # API integration
│   └── storeApi.ts        # RTK Query API definitions
│
├── hooks/           # Custom React hooks
│   └── useAuth.ts         # Authentication hooks
│
├── auth.ts          # Auth helper functions (JWT, bcrypt)
├── db.ts            # MongoDB connection
├── store.ts         # Redux store configuration
└── StoreProvider.tsx # Redux provider wrapper
```

### `/models` - Database Models

```
models/
├── Product.ts       # Product schema
└── User.ts          # User schema
```

## 🎯 Import Patterns

### Component Imports
```typescript
// Layout components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Section components
import FeaturedProducts from '@/components/sections/FeaturedProducts';
```

### Library Imports
```typescript
// Hooks
import { useAuth } from '@/lib/hooks/useAuth';

// Redux
import { useGetProductsQuery } from '@/lib/services/storeApi';
import { addToCart } from '@/lib/features/cartSlice';

// Utils
import dbConnect from '@/lib/db';
```

## 📝 Best Practices

1. **Component Organization**
   - Keep components small and focused
   - One component per file
   - Use descriptive names

2. **Folder Structure**
   - Group related components together
   - Separate layout from content components
   - Keep business logic in `/lib`

3. **Naming Conventions**
   - Components: PascalCase (e.g., `FeaturedProducts.tsx`)
   - Utilities: camelCase (e.g., `auth.ts`)
   - Folders: lowercase or camelCase

4. **Import Aliases**
   - Use `@/` for absolute imports
   - Keeps imports clean and maintainable

## 🔄 Future Additions

Suggested folders to add as the app grows:

- `/components/ui` - Reusable UI elements
- `/components/forms` - Form components
- `/components/modals` - Modal dialogs
- `/lib/utils` - Utility functions
- `/lib/constants` - App constants
- `/types` - TypeScript type definitions
- `/config` - App configuration
