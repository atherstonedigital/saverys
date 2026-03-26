import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME } from "@/lib/constants";
import { getSettings } from "@/lib/content";
import { generateSchema } from "@/lib/schema";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saverys.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Luxury Interior Design — Cotswolds, Ludlow & Chelsea | Savery's of Broadway",
    template: `%s | Savery's of Broadway`,
  },
  description:
    "Saverys of Broadway creates luxurious, timeless interiors for private residences and luxury hotels. Hand upholstery workshop, premium fabrics showroom, and expert design service. Established 1991. Studios in Broadway, Ludlow and Chelsea.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: SITE_NAME,
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: SITE_URL,
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
