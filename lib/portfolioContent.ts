// Home page content for the Skills, Numbers, Testimonials and FAQ sections (mock data, no backend).
// ALL VALUES BELOW ARE PLACEHOLDERS: replace them with your real skills, figures, client quotes and answers before publishing.

// The home page shows the first 3 groups as cards; the /skills page shows every group with all its items.
export const skillGroups = [
  { id: "front-end", label: "Front end", description: "Fast, responsive, accessible interfaces.", items: ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { id: "back-end", label: "Back end", description: "Servers, databases and APIs that power your site.", items: ["Node.js", "Express", "NestJS", "MongoDB", "MySQL", "REST APIs"] },
  { id: "cms", label: "CMS & website builders", description: "Sites you can manage yourself, on the platform that fits you.", items: ["WordPress", "Shopify", "Wix", "Velo by Wix", "Webflow", "HubSpot"] },
  { id: "tools", label: "Tools", description: "The everyday tools behind a smooth workflow.", items: ["Git & GitHub", "VS Code", "Postman", "Vercel", "Chrome DevTools", "Figma"] },
];

export const stats = [
  { value: "4+", label: "Years of professional experience" },
  { value: "100+", label: "Projects delivered" },
  { value: "90%", label: "Happy clients" },
  { value: "24h", label: "Reply time" },
];

// Avatars are the dummy photos in /public
export const testimonials = [
  {
    quote: "Placeholder: Inam delivered our website on time, and it works perfectly on every device.",
    name: "Client Name",
    role: "Company, Role",
    avatar: "/avatar-1.jpg",
  },
  {
    quote: "Placeholder: Clear communication from start to finish, and a site that is fast and easy to manage.",
    name: "Client Name",
    role: "Company, Role",
    avatar: "/avatar-2.jpg",
  },
  {
    quote: "Placeholder: Exactly what we needed. Great attention to detail and quick turnaround on changes.",
    name: "Client Name",
    role: "Company, Role",
    avatar: "/avatar-3.jpg",
  },
];

export const faqs = [
  {
    q: "How long does a project take?",
    a: "It depends on the size and content. A simple website usually takes a few weeks; larger sites and web apps take longer. I give you a clear timeline before we start.",
  },
  {
    q: "How much does a website cost?",
    a: "Pricing depends on the scope: pages, features and integrations. Send me a short brief and I will reply with a quote.",
  },
  {
    q: "Will my site work on phones?",
    a: "Yes. Every site I build is responsive and tested on phones, tablets and desktops.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. I can handle fixes, updates and performance improvements after the site goes live.",
  },
  {
    q: "How do we get started?",
    a: "Email me with a few lines about your project. I reply within 24 hours and we take it from there.",
  },
];
