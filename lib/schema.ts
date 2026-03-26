const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saverys.co.uk";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaOptions {
  pageType: "home" | "page" | "article" | "project";
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    summary?: string;
  };
  gallery?: string[];
  projectTitle?: string;
}

function getOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Savery's of Broadway",
    alternateName: "Saverys of Broadway",
    description:
      "Luxury interior design studio rooted in the Cotswolds since 1991. Bespoke interior schemes, hand upholstery, and the finest fabrics.",
    url: SITE_URL,
    telephone: "+441386858941",
    email: "studio@saverys.co.uk",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+441386858941",
      email: "studio@saverys.co.uk",
      contactType: "Customer Service",
    },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-black.png`,
    },
    image: `${SITE_URL}/og-image.webp`,
    foundingDate: "1991",
    founder: {
      "@type": "Person",
      name: "Lyndsey Savery",
    },
    sameAs: ["https://www.instagram.com/saverysofbroadway/"],
    knowsAbout: [
      "Interior Design",
      "Hand Upholstery",
      "Bespoke Furniture",
      "Luxury Fabrics",
      "Soft Furnishings",
      "Rugs",
      "Residential Interior Design",
      "Hotel Interior Design",
    ],
    areaServed: [
      { "@type": "Place", name: "Cotswolds" },
      { "@type": "Place", name: "Worcestershire" },
      { "@type": "Place", name: "Shropshire" },
      { "@type": "Place", name: "United Kingdom" },
    ],
  };
}

function getLocalBusinessSchemas() {
  return [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#broadway`,
      name: "Saverys of Broadway",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/og-image.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cotswold Design Centre, Kennel Lane",
        addressLocality: "Broadway",
        addressRegion: "Worcestershire",
        postalCode: "WR12 7DJ",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 52.0353,
        longitude: -1.8564,
      },
      telephone: "+441386858941",
      url: SITE_URL,
      priceRange: "$$$$",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#ludlow`,
      name: "Saverys of Broadway — Ludlow",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Tower Street",
        addressLocality: "Ludlow",
        addressRegion: "Shropshire",
        postalCode: "SY8 1RL",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 52.3677,
        longitude: -2.7181,
      },
      telephone: "+441584708381",
      url: SITE_URL,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#chelsea`,
      name: "Saverys of Broadway — Chelsea",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite 9, 405 Kings Road",
        addressLocality: "Chelsea",
        addressRegion: "London",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.4846,
        longitude: -0.1813,
      },
      telephone: "+442036681000",
      url: SITE_URL,
    },
  ];
}

export function generateSchema(options: SchemaOptions): string {
  const graph: Record<string, unknown>[] = [
    getOrganizationSchema(),
    ...getLocalBusinessSchemas(),
  ];

  if (options.pageType === "home") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Saverys of Broadway",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "Luxury interior design, hand upholstery, and premium fabrics in Broadway, Cotswolds.",
    });
  }

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        ...options.breadcrumbs.map((item, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: item.name,
          item: item.url,
        })),
      ],
    });
  }

  if (options.pageType === "article" && options.article) {
    graph.push({
      "@type": "Article",
      headline: options.article.headline,
      datePublished: options.article.datePublished,
      dateModified: options.article.dateModified || options.article.datePublished,
      author: {
        "@type": "Organization",
        name: "Saverys of Broadway",
        "@id": `${SITE_URL}/#organization`,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: options.article.image
        ? `${SITE_URL}${options.article.image}`
        : undefined,
      description: options.article.summary,
    });
  }

  if (options.pageType === "project" && options.gallery) {
    graph.push({
      "@type": "ImageGallery",
      name: `${options.projectTitle} — Interior Design Portfolio`,
      description: `Interior design project by Saverys of Broadway: ${options.projectTitle}`,
      image: options.gallery.map((img) => `${SITE_URL}${img}`),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
