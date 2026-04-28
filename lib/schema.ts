import { siteConfig } from "@/lib/config";

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
  localBusiness?: keyof typeof siteConfig.locations;
}

function getOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.locations.broadway.phoneTel,
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.locations.broadway.phoneTel,
      email: siteConfig.email,
      contactType: "Customer Service",
      areaServed: "GB",
    },
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo-black.png`,
    },
    image: `${siteConfig.url}/og-image.webp`,
    foundingDate: siteConfig.foundingDate,
    founder: {
      "@type": "Person",
      name: "Lyndsey Savery",
    },
    sameAs: [siteConfig.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations.broadway.street,
      addressLocality: siteConfig.locations.broadway.locality,
      addressRegion: siteConfig.locations.broadway.region,
      postalCode: siteConfig.locations.broadway.postcode,
      addressCountry: siteConfig.locations.broadway.country,
    },
  };
}

function getLocalBusinessSchema(locationKey: keyof typeof siteConfig.locations) {
  const loc = siteConfig.locations[locationKey];
  return {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#${loc.locality.toLowerCase().replace(/,\s*/g, "-")}`,
    name: loc.name,
    description: `Luxury interior design showroom and studio in ${loc.locality}. Premium fabrics, bespoke furniture, and expert interior design services.`,
    url: siteConfig.url,
    telephone: loc.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.locality,
      addressRegion: loc.region,
      postalCode: loc.postcode,
      addressCountry: loc.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    },
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function generateSchema(options: SchemaOptions): string {
  const graph: Record<string, unknown>[] = [getOrganizationSchema()];

  if (options.pageType === "home") {
    // Two physical showrooms only — Broadway and Ludlow.
    graph.push(
      getLocalBusinessSchema("broadway"),
      getLocalBusinessSchema("ludlow"),
    );
    graph.push({
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      description: siteConfig.description,
    });
  }

  // Add specific LocalBusiness for store pages
  if (options.localBusiness) {
    graph.push(getLocalBusinessSchema(options.localBusiness));
  }

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
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
        name: siteConfig.name,
        "@id": `${siteConfig.url}/#organization`,
      },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      image: options.article.image
        ? `${siteConfig.url}${options.article.image}`
        : undefined,
      description: options.article.summary,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": options.url,
      },
    });
  }

  if (options.pageType === "project" && options.gallery) {
    graph.push({
      "@type": "ImageGallery",
      name: `${options.projectTitle} — Interior Design Portfolio`,
      description: `Interior design project by ${siteConfig.name}: ${options.projectTitle}`,
      image: options.gallery.map((img) => `${siteConfig.url}${img}`),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
