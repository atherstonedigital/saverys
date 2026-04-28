import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/Analytics";
import { getSettings } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { generateSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Luxury Interior Design — Cotswolds, Ludlow & Chelsea | Savery's of Broadway",
    template: `%s | Savery's of Broadway`,
  },
  description:
    "Savery's of Broadway creates luxurious, timeless interiors for private residences and luxury hotels. Hand upholstery workshop, premium fabrics showroom, and expert design service. Established 1942. Studios in Broadway, Ludlow and Chelsea.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  // SEO launch prep — 2026-04-27 / OG swap — 2026-04-28
  // Brand-card OG image (Savery's wordmark + tower mark, "EST. 1942",
  // Broadway · London · Ludlow, on saverys-green ground). JPG is
  // universally accepted by all social platforms (LinkedIn especially
  // is patchy on WebP), so we use a single JPG entry rather than the
  // earlier WebP+JPG fallback pair.
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "Savery's of Broadway — Luxury Interior Design Cotswolds, Ludlow & Chelsea",
    description:
      "Luxury interior design studio established 1942. Showrooms in Broadway, Ludlow, and Chelsea. Bespoke fabrics, hand upholstery, and timeless interiors.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Savery's of Broadway — established 1942. Showrooms in Broadway, London, and Ludlow.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savery's of Broadway — Luxury Interior Design",
    description:
      "Luxury interior design studio established 1942. Showrooms in Broadway, Ludlow, and Chelsea.",
    images: ["/og-default.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "geo.region": "GB-WOR",
    "geo.placename": "Broadway, Worcestershire",
  },
};

interface NavData {
  items: { label: string; href: string; children?: { label: string; href: string }[] }[];
}

interface FooterData {
  tagline: string;
  email: string;
  instagram: string;
  locations: { name: string; address: string; phone: string; phoneTel: string }[];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navData = getSettings<NavData>("navigation");
  const footerData = getSettings<FooterData>("footer");

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Courier+Prime&family=Jost:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchema({ pageType: "page" }),
          }}
        />
      </head>
      <body>
        {/* SEO launch prep — 2026-04-27: GA4 gated on live hostname only */}
        <GoogleAnalytics />
        <Nav items={navData.items} />
        <main>{children}</main>
        <Footer data={footerData} />
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
