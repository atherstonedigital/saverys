import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generateSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Showrooms — Broadway & Ludlow | Saverys",
  description:
    "Visit a Saverys showroom in Broadway or Ludlow. Premium fabrics, curated furniture, and considered interiors at the heart of the Cotswolds and the Welsh Marches.",
  alternates: { canonical: "/showroom" },
  openGraph: {
    title: "Showrooms — Broadway & Ludlow",
    description:
      "Visit a Saverys showroom in Broadway or Ludlow. Premium fabrics, curated furniture, and considered interiors.",
    url: `${siteConfig.url}/showroom`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

const showrooms = [
  {
    name: "Broadway",
    href: "/showroom/broadway",
    image: "/images/saverys broadway shop 1.webp",
    description:
      "Our Cotswolds home — set within the Cotswold Design Centre on Kennel Lane. Premium fabrics, curated furniture, and considered interiors.",
    address: "Cotswold Design Centre, Kennel Lane, Broadway, WR12 7DJ",
  },
  {
    name: "Ludlow",
    href: "/showroom/ludlow",
    image: "/images/ludlow-store-hero.webp",
    description:
      "On Tower Street in the heart of Ludlow, serving Shropshire, Herefordshire and the Welsh Marches with the same care, library, and team.",
    address: "1 Tower Street, Ludlow, Shropshire, SY8 1RL",
  },
];

export default function ShowroomLandingPage() {
  const schemaJson = generateSchema({
    pageType: "page",
    breadcrumbs: [{ name: "Showroom", url: `${siteConfig.url}/showroom` }],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Hero
        heading="Our showrooms"
        subtitle="Visit Saverys in Broadway or Ludlow — places to see fabric, feel weight, and begin a conversation."
        image="/images/saverys broadway shop 1.webp"
        imageAlt="Saverys showroom interior"
      />
      <Breadcrumbs items={[{ name: "Showroom", href: "/showroom" }]} />

      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2">Two showrooms, one library</Text>
            <Text variant="body" className="mt-8 text-stone">
              Both showrooms hold the same fabric library, the same standards,
              and the same team. Choose whichever is closer to you, or visit
              both — the rooms are different, the materials are the same.
            </Text>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-linen px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {showrooms.map((showroom, i) => (
              <SectionReveal key={showroom.name} delay={i * 0.1}>
                <Link href={showroom.href} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={showroom.image}
                      alt={`Saverys showroom in ${showroom.name}`}
                      fill
                      className="object-cover transition-transform duration-[600ms] ease-[var(--ease-saverys)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-6">
                    <Text as="h3">{showroom.name}</Text>
                    <Text variant="body" className="mt-3 text-stone">
                      {showroom.description}
                    </Text>
                    <Text variant="small" className="mt-4 text-stone/70">
                      {showroom.address}
                    </Text>
                    <Text
                      variant="caption"
                      className="mt-6 inline-block text-clay"
                    >
                      Visit the {showroom.name} showroom &rarr;
                    </Text>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
