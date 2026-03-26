export const SITE_NAME = "Savery's of Broadway";
export const SITE_DESCRIPTION =
  "Savery's of Broadway — a luxury interior design studio rooted in the Cotswolds, composing rooms with care and craftsmanship since 1991.";

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  {
    label: "Workshop & Stores",
    href: "/workshop-stores/broadway",
    children: [
      { label: "Broadway", href: "/workshop-stores/broadway" },
      { label: "Ludlow", href: "/workshop-stores/ludlow" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

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
