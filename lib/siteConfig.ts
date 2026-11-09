// Edit this file first when reusing the template: brand name and contact details used across the site
export const siteConfig = {
  name: 'Inam Portfolio',
  description: 'Portfolio of Inam Ullah, a web developer based in Lahore, Pakistan.',
  tagline: 'Web developer building fast, responsive websites and web apps.',
  email: 'inam.ullah.ecomm@gmail.com',
  phone: '+92 315 4205168',
  // Profile links. A link left empty ('') is not shown anywhere on the site.
  linkedin: '',
  github: '',
  whatsapp: 'https://wa.me/923154205168',
  address: 'Lahore, Pakistan',
};

// Social links that are filled in, for the hero, footer and contact page
export const socialLinks = [
  { label: 'LinkedIn', url: siteConfig.linkedin },
  { label: 'GitHub', url: siteConfig.github },
  { label: 'WhatsApp', url: siteConfig.whatsapp },
].filter((l) => l.url);
