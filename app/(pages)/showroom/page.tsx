import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generateSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

interface ShowroomCard {
  name: string;
  href: string;
  image: string;
  description: string;
  address: string;
}

interface ShowroomLandingContent {
  seo?: PageSeo;
  hero: { heading: string; subtitle?: string; image: string };
  intro: { heading: string; body: string };
  showrooms: ShowroomCard[];
}

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<ShowroomLandingContent>("showroom");
  return buildMetadata(
    seo,
    "/showroom",
    "Showrooms — Broadway & Ludlow | Savery's of Broadway",
    "Visit a Savery's of Broadway showroom in Broadway or Ludlow. Premium fabrics, curated furniture, and considered interiors at the heart of the Cotswolds and the Welsh Marches.",
  );
}

export default function ShowroomLandingPage() {
  const content = getPageContent<ShowroomLandingContent>("showroom");
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
        heading={content.hero.heading}
        subtitle={content.hero.subtitle}
        image={content.hero.image}
        imageAlt="Saverys showroom interior"
      />
      <Breadcrumbs items={[{ name: "Showroom", href: "/showroom" }]} />

      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2">{content.intro.heading}</Text>
            <Text variant="body" className="mt-8 text-stone">
              {content.intro.body}
            </Text>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-linen px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {content.showrooms.map((showroom, i) => (
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
