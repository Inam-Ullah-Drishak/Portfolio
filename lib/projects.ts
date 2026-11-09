// Portfolio projects (mock data, no backend). ALL 8 ENTRIES ARE DUMMIES: replace titles, text, images, dates and URLs with real projects.
// The home Work section shows the first 3 with `featured: true` (1st = big centre card, 2nd = left, 3rd = right).
// The /projects page lists every entry (with filters), and each one has its own page at /projects/<id>.
// Images are paths under /public (portrait mobile screenshots).
export type GalleryImage = {
  src: string;
  alt: string;
  device: "desktop" | "mobile" | "other"; // tag: cards use the first "mobile" image, the project page opens on the first image
};

export type Project = {
  id: string; // used in the URL: /projects/<id>
  title: string;
  description: string; // one line, shown on the project page header
  gallery: GalleryImage[]; // screenshots on the project page. Convention: 1st = desktop, 2nd = mobile, the rest anything
  href: string; // live site URL ("Visit live site" button)
  featured: boolean;
  platform: string; // filter, e.g. "Shopify", "Wix", "Custom code"
  type: string; // filter, e.g. "Website", "Online store"
  industry: string; // filter, e.g. "Retail"
  client: string;
  tools: string[]; // chips on cards and the project page, and the Technology filter
  date: string; // YYYY-MM-DD, used for sorting and shown as month + year
  isNew: boolean; // shows the "New" badge and the "New only" filter
  problem: string; // case study text
  solution: string;
  result: string;
  role: string; // what you did, e.g. "Design and development" or "Front end only"
  duration: string; // e.g. "3 weeks"
  services: string[]; // ids from lib/services.ts, shown as links to /services#<id>
  metrics: { label: string; value: string }[]; // key results, 3 short facts (use true figures only)
  quote?: { text: string; author: string }; // client quote; leave out when there is no client (the section is hidden)
  status: "Live" | "Maintained" | "Archived";
  repoUrl?: string; // optional GitHub link; the button only shows when set
  shareImage?: string; // optional link-preview image (png/jpg), otherwise the site-wide one is used
};

// Dummy images. `alts` order: [mobile 1, desktop 1, mobile 2, desktop 2]; the result is ordered desktop, mobile, mobile, desktop.
const gallery = (n: number, alts: string[]): GalleryImage[] => [
  { src: "/project-wide-1.svg", alt: alts[1], device: "desktop" },
  { src: `/project-${n}.svg`, alt: alts[0], device: "mobile" },
  { src: `/project-${(n % 10) + 1}.svg`, alt: alts[2], device: "mobile" },
  { src: "/project-wide-2.svg", alt: alts[3], device: "desktop" },
];

// Image used on cards (Work page, home Work section): the first mobile screenshot, else the first image
export const cardImage = (p: Project) => (p.gallery.find((g) => g.device === "mobile") ?? p.gallery[0]).src;

// DUMMY CONTENT: every client name and text below is a made-up sample. Replace with your real projects.
export const projects: Project[] = [
  {
    id: "velvet-and-oak", title: "Velvet & Oak", description: "A modern furniture website built with Next.js.",
    gallery: [
      { src: "/velvet-and-oak-1.png", alt: "Home page on desktop", device: "desktop" },
      { src: "/velvet-and-oak-2.png", alt: "Home page on mobile", device: "mobile" },
      { src: "/velvet-and-oak-3.png", alt: "Catalogue page on desktop", device: "desktop" },
      { src: "/velvet-and-oak-4.png", alt: "Catalogue page on mobile", device: "mobile" },
    ], href: "https://checkmate-1fh2.vercel.app/", featured: true,
    platform: "Custom code", type: "Online store", industry: "Furniture", client: "Velvet & Oak (concept brand)",
    tools: ["Next.js", "React", "Tailwind CSS", "TypeScript"], date: "2026-11-09", isNew: true,
    problem: "Furniture is bought with the eyes, but most shop sites bury the pieces under clutter. I wanted to show what a calm, photo-led shop for an invented Scandinavian furniture maker could feel like, from first look to checkout.",
    solution: "I built a complete multi-page shop experience: an animated home page, a filterable catalogue of 37 pieces, product pages, eight ready-made rooms with a design-your-own builder, a materials guide, a slide-in bag, saved pieces, search and a demo checkout. Smooth spring-based motion and large photography keep it calm and fast.",
    result: "A full front-end shop that runs on mock data, with no database and no payment. Saved pieces and the bag survive a reload, and the site works on phones and desktops.",
    role: "Design and development", duration: "2 weeks", status: "Live",
    services: ["websites", "ecommerce"],
    metrics: [{ label: "Products", value: "37" }, { label: "Ready-made rooms", value: "8" }, { label: "Materials", value: "7" }],
  },
  {
    id: "online-store", title: "Online Store", description: "A Shopify store for a small clothing brand.",
    gallery: gallery(2, ["Home page on mobile", "Home page on desktop", "Collection page on mobile", "Collection page on desktop"]), href: "https://example.com", featured: true,
    platform: "Shopify", type: "Online store", industry: "Retail", client: "Sample Apparel Store",
    tools: ["Shopify"], date: "2026-09-20", isNew: true,
    problem: "The brand sold only through social media messages and had no way to take orders online.",
    solution: "I set up a Shopify store with a custom theme, product collections, payments and shipping rules.",
    result: "The brand started taking online orders soon after launch and manages its own products and stock.",
    role: "Store setup and theme customisation", duration: "3 weeks", status: "Maintained",
    services: ["cms", "ecommerce"],
    metrics: [{ label: "Products", value: "40+" }, { label: "Checkout steps", value: "3" }, { label: "Launch", value: "On time" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Apparel Store" },
  },
  {
    id: "booking-web-app", title: "Booking Web App", description: "A booking app for appointments and class schedules.",
    gallery: gallery(3, ["Booking screen on mobile", "Booking screen on desktop", "Calendar view on mobile", "Calendar view on desktop"]), href: "https://example.com", featured: true,
    platform: "Custom code", type: "Web app", industry: "Hospitality", client: "Sample Wellness Studio",
    tools: ["React", "Node.js", "MongoDB"], date: "2026-08-05", isNew: false,
    problem: "Bookings were handled by phone and chat messages, which caused double bookings and missed appointments.",
    solution: "I built a web app where customers pick a time slot, and staff manage schedules from a simple admin panel.",
    result: "Double bookings stopped and the staff spend far less time on scheduling.",
    role: "Full-stack development", duration: "8 weeks", status: "Live",
    services: ["web-apps", "backend"],
    metrics: [{ label: "Booking time", value: "Under 1 min" }, { label: "Admin panel", value: "Included" }, { label: "User roles", value: "2" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Wellness Studio" },
  },
  {
    id: "restaurant-website", title: "Restaurant Website", description: "A Wix website with menu, gallery and table enquiries.",
    gallery: gallery(4, ["Home page on mobile", "Home page on desktop", "Menu page on mobile", "Menu page on desktop"]), href: "https://example.com", featured: false,
    platform: "Wix", type: "Website", industry: "Hospitality", client: "Sample Bistro",
    tools: ["Wix", "Velo by Wix"], date: "2026-07-15", isNew: false,
    problem: "The restaurant had no website, only a social media page, so guests could not easily find the menu or opening hours.",
    solution: "I designed a Wix site with an online menu, photo gallery, opening hours and a reservation form built with Velo.",
    result: "Guests can browse the menu and send reservation requests online, and the owner updates the content alone.",
    role: "Design and Velo development", duration: "2 weeks", status: "Live",
    services: ["cms", "websites"],
    metrics: [{ label: "Pages", value: "5" }, { label: "Reservation form", value: "Included" }, { label: "Build time", value: "2 weeks" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Bistro" },
  },
  {
    id: "real-estate-platform", title: "Real Estate Platform", description: "A WordPress property listing website.",
    gallery: gallery(5, ["Listings page on mobile", "Listings page on desktop", "Property page on mobile", "Property page on desktop"]), href: "https://example.com", featured: false,
    platform: "WordPress", type: "Website", industry: "Real estate", client: "Sample Properties Ltd.",
    tools: ["WordPress"], date: "2026-05-30", isNew: false,
    problem: "Property listings were kept in spreadsheets and shared in chat groups, which was slow and easy to get wrong.",
    solution: "I built a WordPress site with searchable listings, location and price filters and enquiry forms the team updates themselves.",
    result: "Listings are quick to publish, and buyers can search by location and price.",
    role: "WordPress development", duration: "5 weeks", status: "Maintained",
    services: ["cms", "websites"],
    metrics: [{ label: "Listings", value: "100+" }, { label: "Search filters", value: "4" }, { label: "Updated by", value: "The team" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Properties Ltd." },
  },
  {
    id: "agency-landing-page", title: "Agency Landing Page", description: "A HubSpot landing page that captures leads.",
    gallery: gallery(6, ["Top of the landing page on mobile", "Top of the landing page on desktop", "Features section on mobile", "Features section on desktop"]), href: "https://example.com", featured: false,
    platform: "HubSpot", type: "Landing page", industry: "Marketing", client: "Sample Digital Agency",
    tools: ["HubSpot"], date: "2026-04-18", isNew: false,
    problem: "Campaign traffic landed on a generic page that did not guide visitors toward getting in touch.",
    solution: "I built a focused landing page in HubSpot with a short lead form connected to the agency's CRM.",
    result: "New leads arrive in the CRM automatically, with no copying and pasting.",
    role: "Landing page build and CRM setup", duration: "1 week", status: "Live",
    services: ["cms", "api"],
    metrics: [{ label: "Build time", value: "1 week" }, { label: "Form to CRM", value: "Automatic" }, { label: "Pages", value: "1" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Digital Agency" },
  },
  {
    id: "analytics-dashboard", title: "Analytics Dashboard", description: "A dashboard that turns raw data into clear charts.",
    gallery: gallery(7, ["Overview screen on mobile", "Overview screen on desktop", "Reports screen on mobile", "Reports screen on desktop"]), href: "https://example.com", featured: false,
    platform: "Custom code", type: "Web app", industry: "Technology", client: "Sample Tech Startup",
    tools: ["React", "NestJS", "MySQL"], date: "2026-02-02", isNew: false,
    problem: "The team tracked its key numbers in separate spreadsheets, so nobody had a single, up-to-date view.",
    solution: "I built a React dashboard with a NestJS API and a MySQL database that gathers the numbers in one place.",
    result: "The team now sees its key figures on one screen, with charts that update as the data changes.",
    role: "Front-end and API development", duration: "6 weeks", status: "Live",
    services: ["web-apps", "backend", "api"],
    metrics: [{ label: "Charts", value: "6" }, { label: "Data sources", value: "3" }, { label: "Updates", value: "Live" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Tech Startup" },
  },
  {
    id: "personal-portfolio", title: "Personal Portfolio", description: "A Webflow portfolio for a freelance designer.",
    gallery: gallery(8, ["Home page on mobile", "Home page on desktop", "Project page on mobile", "Project page on desktop"]), href: "https://example.com", featured: false,
    platform: "Webflow", type: "Website", industry: "Personal", client: "Sample Designer",
    tools: ["Webflow"], date: "2025-11-10", isNew: false,
    problem: "The designer's work was scattered across social profiles and hard to share with potential clients.",
    solution: "I built a clean Webflow portfolio with a page for each project and a simple contact form.",
    result: "All the work now lives in one place that is easy to share and easy to keep up to date.",
    role: "Design and build", duration: "2 weeks", status: "Live",
    services: ["design", "cms"],
    metrics: [{ label: "Pages", value: "6" }, { label: "Build time", value: "2 weeks" }, { label: "Hosting", value: "Included" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Designer" },
  },
  {
    id: "fitness-coaching-site", title: "Fitness Coaching Site", description: "A Shopify store that sells coaching plans and digital guides.",
    gallery: gallery(9, ["Home page on mobile", "Home page on desktop", "Plans page on mobile", "Plans page on desktop"]), href: "https://example.com", featured: false,
    platform: "Shopify", type: "Online store", industry: "Health & fitness", client: "Sample Fitness Coach",
    tools: ["Shopify"], date: "2025-09-01", isNew: false,
    problem: "The coach sold plans through direct messages and had no simple way to take payment or deliver files.",
    solution: "I set up a Shopify store for coaching plans and downloadable guides, with automatic delivery after purchase.",
    result: "Customers can buy and download a plan on their own, and the coach spends less time on admin.",
    role: "Store setup", duration: "2 weeks", status: "Live",
    services: ["ecommerce", "cms"],
    metrics: [{ label: "Products", value: "12" }, { label: "Delivery", value: "Automatic" }, { label: "Checkout steps", value: "3" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Fitness Coach" },
  },
  {
    id: "donation-website", title: "Donation Website", description: "A WordPress website for a small charity with online donations.",
    gallery: gallery(10, ["Home page on mobile", "Home page on desktop", "Story page on mobile", "Story page on desktop"]), href: "https://example.com", featured: false,
    platform: "WordPress", type: "Website", industry: "Non-profit", client: "Sample Community Charity",
    tools: ["WordPress"], date: "2025-08-14", isNew: false,
    problem: "The charity relied on bank transfers and had no clear page explaining its work or how to help.",
    solution: "I built a WordPress site with a story section, event updates and a simple online donation form.",
    result: "Supporters can learn about the charity and donate online in a few steps.",
    role: "WordPress development", duration: "3 weeks", status: "Live",
    services: ["cms", "websites"],
    metrics: [{ label: "Pages", value: "7" }, { label: "Donation form", value: "Included" }, { label: "Build time", value: "3 weeks" }],
    quote: { text: "Dummy quote: working with Inam was smooth from start to finish, and the result looks and works great.", author: "Client Name, Sample Community Charity" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

// UTC so the server and the browser print the same month
export const monthYear = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
