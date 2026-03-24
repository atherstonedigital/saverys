export interface ProjectImage {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  description: string;
  body: string;
  heroImage: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "the-old-mill-broadway",
    name: "The Old Mill",
    location: "Broadway, Worcestershire",
    description:
      "A considered restoration of a Cotswold mill, marrying original stone with hand-finished English linen.",
    body: "The Old Mill sits on the edge of Broadway village, its honey-coloured stone walls dating back three centuries. Our brief was to honour the building's character while creating a home that felt effortless and modern in its comfort. We sourced fabrics from British mills, commissioned bespoke curtains in botanical prints, and dressed every room with antiques that earned their place through proportion and provenance.",
    heroImage: "/images/projects/old-mill-kitchen.jpg",
    images: [
      {
        src: "/images/projects/old-mill-kitchen.jpg",
        alt: "AGA kitchen with hand-painted tiles",
        orientation: "landscape",
      },
      {
        src: "/images/hero/about.jpg",
        alt: "Floral chair by floor-to-ceiling window",
        orientation: "portrait",
      },
      {
        src: "/images/projects/old-mill-details.jpg",
        alt: "Curated table with blue and white china",
        orientation: "portrait",
      },
      {
        src: "/images/projects/old-mill-chair.jpg",
        alt: "Striped antique chair with botanical cushion",
        orientation: "landscape",
      },
      {
        src: "/images/hero/services.jpg",
        alt: "Window seat with floral curtains and countryside view",
        orientation: "landscape",
      },
      {
        src: "/images/projects/old-mill-bedroom.jpg",
        alt: "Bedroom with botanical headboard and tree-print cushions",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "jams-house",
    name: "Jams House",
    location: "The Cotswolds",
    description:
      "A country house layered with character. Exposed beams, rich velvets, and golden drapes.",
    body: "Jams House is a characterful Cotswold property where the owners wanted interiors that felt collected rather than designed. We layered rich velvets, golden botanical-print drapes, and a mix of vintage and contemporary cushions to create spaces that invite you to stay. Every room has its own personality, united by a shared sense of warmth and texture.",
    heroImage: "/images/projects/jams-house-living.jpg",
    images: [
      {
        src: "/images/projects/jams-house-living.jpg",
        alt: "Green velvet sofa with golden botanical drapes",
        orientation: "landscape",
      },
      {
        src: "/images/projects/jams-house-cushions.jpg",
        alt: "Reading corner with curated cushion collection",
        orientation: "portrait",
      },
    ],
  },
  {
    slug: "the-grantly-collection",
    name: "The Grantly Collection",
    location: "Broadway, Worcestershire",
    description:
      "Bold pattern meets timeless form. A celebration of fabric and colour.",
    body: "The Grantly Collection represents our love of pattern and colour at their most confident. A patterned sofa sits against rich blue block-printed wallpaper, paired with antique furniture and a blue-and-white porcelain lamp. The effect is layered, considered, and entirely its own — proof that bold choices, made with care, create rooms of genuine character.",
    heroImage: "/images/projects/grantly-sofa.jpg",
    images: [
      {
        src: "/images/projects/grantly-sofa.jpg",
        alt: "Patterned sofa against blue wallpaper",
        orientation: "portrait",
      },
      {
        src: "/images/hero/home.jpg",
        alt: "Light-filled room with pale sofa and garden view",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "manor-farm-chipping-campden",
    name: "Manor Farm",
    location: "Chipping Campden, Gloucestershire",
    description:
      "A quiet farmhouse brought to life with antique finds and artisan fabrics.",
    body: "Manor Farm is a Grade II listed farmhouse on the outskirts of Chipping Campden. The owners sought a home that honoured the building's agricultural past while offering every modern comfort. We mixed antique painted furniture with hand-blocked fabrics, and let the building's original features — flagstone floors, low beams, deep windowsills — guide every decision.",
    heroImage: "/images/projects/hallway-chair.jpg",
    images: [
      {
        src: "/images/projects/hallway-chair.jpg",
        alt: "Blue chair with botanical cushion beside painted chest",
        orientation: "portrait",
      },
      {
        src: "/images/hero/contact.jpg",
        alt: "Ikat armchair with botanical prints and floor lamp",
        orientation: "portrait",
      },
    ],
  },
  {
    slug: "the-dower-house",
    name: "The Dower House",
    location: "Moreton-in-Marsh, Gloucestershire",
    description:
      "Elegant restraint in a Georgian dower house. Light, linen, and quietness throughout.",
    body: "The Dower House is a handsome Georgian property where simplicity was the guiding principle. Every room was composed around the extraordinary light that floods through the tall sash windows. We chose natural linens, muted botanical prints, and a palette of soft creams and sage greens that shift gently through the seasons. The result is a home of uncommon calm.",
    heroImage: "/images/hero/home.jpg",
    images: [
      {
        src: "/images/hero/home.jpg",
        alt: "Pale sofa with botanical cushions and garden view",
        orientation: "landscape",
      },
      {
        src: "/images/hero/about.jpg",
        alt: "Floral nursing chair by window",
        orientation: "portrait",
      },
      {
        src: "/images/projects/old-mill-bedroom.jpg",
        alt: "Bedroom dressed in botanical tree-print fabric",
        orientation: "landscape",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
