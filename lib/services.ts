// Services (mock data, no backend). The home Services section shows the first 3; the /services page shows all, one section each.
// Images must be cut-outs (transparent PNG) that stand on the card gradient. Paths are under /public (dummy images for now).
// The wording below is a draft: edit it to match what you actually offer.
export type Service = {
  id: string; // also the anchor on /services, e.g. /services#cms
  tag: string;
  text: string; // short headline shown on the card
  pill: string;
  description: string; // short intro
  details: string; // longer paragraph shown on the /services page
  includes: string[]; // "What's included" bullets
  tools: string[]; // "Built with" chips
  image: string;
};

export const services: Service[] = [
  {
    id: "websites",
    tag: "01 / Websites",
    text: "Fast, responsive websites built around your brand",
    pill: "Development",
    description: "Business sites, landing pages and portfolios that load fast, look right on every screen and are easy to update.",
    details:
      "From a one-page landing site to a full multi-page business website, I design and build every page to match your brand and guide visitors toward contacting or buying from you. Each site is built mobile-first, optimized for speed and set up with the SEO basics so search engines can find you.",
    includes: [
      "Custom design that matches your brand",
      "Mobile-first, responsive layout",
      "Fast loading and optimized images",
      "On-page SEO basics",
      "Contact forms and analytics",
      "Launch support and handover",
    ],
    tools: ["HTML & CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    image: "/top-pick-1.png",
  },
  {
    id: "web-apps",
    tag: "02 / Web apps",
    text: "Custom web apps and online stores that convert",
    pill: "Ecommerce & stores",
    description: "Online stores, dashboards and custom web apps built around how your business actually works.",
    details:
      "When a template is not enough, I build custom web applications around the way your business really works: online stores, customer portals, booking systems, dashboards and internal tools. I handle the interface, the server and the database, so you get one connected solution instead of pieces that do not fit together.",
    includes: [
      "Online stores with payments",
      "Customer portals and dashboards",
      "Admin panels and internal tools",
      "User accounts and secure login",
      "Database design",
      "Documentation and handover",
    ],
    tools: ["React", "Next.js", "Node.js", "Express", "NestJS", "MongoDB", "MySQL"],
    image: "/top-pick-2.png",
  },
  {
    id: "support",
    tag: "03 / Support",
    text: "Speed, fixes and updates for existing sites",
    pill: "Optimization",
    description: "Performance tuning, bug fixes and ongoing updates to keep an existing site fast, secure and working.",
    details:
      "Launching is just the start. I keep existing websites fast, secure and up to date, fix problems quickly and make improvements as your business grows. You can hire me for a one-off fix or an ongoing maintenance plan.",
    includes: [
      "Speed and performance tuning",
      "Bug fixes",
      "Updates and backups",
      "Security checks",
      "Small feature changes",
      "Monthly maintenance plans",
    ],
    tools: ["Chrome DevTools", "Git & GitHub", "Vercel"],
    image: "/top-pick-3.png",
  },
  {
    id: "cms",
    tag: "04 / Builders & CMS",
    text: "Sites you can manage yourself, on the right platform",
    pill: "Website builders",
    description: "Sites built on WordPress, Shopify, Wix, Webflow and HubSpot, so you can update your own content without touching code.",
    details:
      "Not every project needs custom code. If you want to edit pages, products or blog posts yourself, I will pick the platform that fits your budget and goals, set it up properly and add custom features where the builder allows it, including Velo by Wix for advanced Wix functionality.",
    includes: [
      "Platform recommendation",
      "Theme and template customisation",
      "Custom sections and functionality",
      "Velo by Wix custom code",
      "Store and CRM setup",
      "Content setup and training",
    ],
    tools: ["WordPress", "Shopify", "Wix", "Velo by Wix", "Webflow", "HubSpot"],
    image: "/top-pick-1.png",
  },
  {
    id: "redesign",
    tag: "05 / Redesign",
    text: "Redesigns and migrations without losing your traffic",
    pill: "Redesign",
    description: "Give an outdated site a modern look and better performance, or move it to a new platform safely.",
    details:
      "An old site can cost you customers. I refresh the design, improve speed and usability and, when needed, move your content to a new platform while keeping your pages, links and search rankings in place.",
    includes: [
      "Design refresh",
      "Improved navigation and usability",
      "Content and page migration",
      "Redirects to protect search rankings",
      "Platform switches",
      "Testing before launch",
    ],
    tools: ["Next.js", "WordPress", "Webflow", "Wix", "Shopify"],
    image: "/top-pick-2.png",
  },
  {
    id: "api",
    tag: "06 / Integrations",
    text: "Connect your site to the tools you already use",
    pill: "APIs & integrations",
    description: "Custom APIs and third-party integrations that connect your website to payments, email, CRMs and other services.",
    details:
      "I build REST APIs and connect websites to the services a business depends on, such as payment providers, email tools, HubSpot and other CRMs. The result is less manual work and data that flows where it should.",
    includes: [
      "Custom REST APIs",
      "Payment gateway integration",
      "CRM and email integration",
      "Webhooks and automation",
      "Third-party API connections",
      "API documentation",
    ],
    tools: ["Node.js", "Express", "NestJS", "REST APIs", "Postman", "MongoDB", "MySQL"],
    image: "/top-pick-3.png",
  },
  {
    id: "ecommerce",
    tag: "07 / Online stores",
    text: "Online stores set up to sell from day one",
    pill: "Ecommerce",
    description: "Complete online stores on Shopify or WordPress, with products, payments and shipping ready to go.",
    details:
      "A good store makes it easy for customers to find a product and check out. I set up your catalogue, payments, shipping and taxes, customise the design to match your brand and test the full buying journey before launch, so your first order goes smoothly.",
    includes: [
      "Store setup and theme customisation",
      "Product and collection setup",
      "Payment and shipping configuration",
      "Checkout and cart improvements",
      "Product imports and migration",
      "Training on managing your store",
    ],
    tools: ["Shopify", "WordPress", "Wix", "Webflow"],
    image: "/top-pick-1.png",
  },
  {
    id: "design",
    tag: "08 / UI & UX design",
    text: "Clear, modern designs before a line of code is written",
    pill: "UI / UX design",
    description: "Page layouts and interface designs, planned in Figma and approved by you before development starts.",
    details:
      "Good design saves time and money later. I plan the structure of your site, design the key pages in Figma and share them for your feedback, so we agree on how it looks and works before the build begins.",
    includes: [
      "Site structure and page planning",
      "Wireframes",
      "Desktop and mobile designs in Figma",
      "Brand colours, fonts and style guide",
      "Revisions based on your feedback",
      "Design handover to development",
    ],
    tools: ["Figma", "Tailwind CSS", "Chrome DevTools"],
    image: "/top-pick-2.png",
  },
  {
    id: "backend",
    tag: "09 / Back end",
    text: "Secure, reliable servers and databases behind your site",
    pill: "Back end",
    description: "Server-side development, databases and secure user accounts for web apps and websites that need more than static pages.",
    details:
      "Behind every web app is a server and a database. I build the back end that stores your data, handles user accounts and logins and serves your front end, structured so it stays reliable and easy to extend as your needs grow.",
    includes: [
      "Server and API development",
      "Database design and setup",
      "User accounts and authentication",
      "Data validation and security",
      "File uploads and background tasks",
      "Testing and documentation",
    ],
    tools: ["Node.js", "Express", "NestJS", "MongoDB", "MySQL", "Postman"],
    image: "/top-pick-3.png",
  },
  {
    id: "deployment",
    tag: "10 / Hosting",
    text: "Domain, hosting and deployment handled for you",
    pill: "Deployment",
    description: "Getting your finished site live on the right hosting, with your domain connected and everything checked.",
    details:
      "Launch day should be stress-free. I help you choose hosting, connect your domain, set up HTTPS and deploy the site, then check it works on every device so you can launch with confidence.",
    includes: [
      "Hosting recommendation and setup",
      "Domain connection and DNS",
      "HTTPS and basic security setup",
      "Deployment from GitHub",
      "Pre-launch testing",
      "Post-launch check",
    ],
    tools: ["Vercel", "Git & GitHub", "Chrome DevTools"],
    image: "/top-pick-1.png",
  },
];
