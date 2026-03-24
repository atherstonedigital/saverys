export const SITE_NAME = "Saverys";
export const SITE_DESCRIPTION =
  "An interior design studio rooted in the Cotswolds, composing rooms with care and craftsmanship.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export const ANIMATION = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: {
    slow: 1.2,
    medium: 0.8,
    fast: 0.5,
  },
  reveal: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
} as const;
