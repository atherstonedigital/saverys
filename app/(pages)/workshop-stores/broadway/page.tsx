import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("workshop");
  return buildMetadata(
    seo,
    "/workshop-stores/broadway",
    "Workshop & Showroom — Hand Upholstery & Luxury Fabrics, Broadway",
    "Visit the Savery's hand upholstery workshop and luxury fabrics showroom in Broadway, Cotswolds. Expert craftspeople and bespoke furniture.",
  );
}

interface WorkshopContent {
  hero: { heading: string; subtitle?: string; image: string };
  introduction: { heading: string; paragraphs: string[]; image: string };
  showroom: { heading: string; paragraphs: string[]; image: string };
  workshop: { heading: string; paragraphs: string[]; image: string };
  fabrics: { heading: string; paragraphs: string[]; image: string };
  expertise: { heading: string; paragraphs: string[]; image: string };
  visitUs: {
    heading: string;
    body: string;
    address: string;
    phone: string;
    visits: string;
    buttonText: string;
    buttonLink: string;
  };
}

export default function WorkshopPage() {
  const content = getPageContent<WorkshopContent>("workshop");

  const schemaJson = generateSchema({
    pageType: "page",
    localBusiness: "broadway",
    breadcrumbs: [
      { name: "Workshop & Stores", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://saverys.co.uk"}/workshop-stores/broadway` },
    ],
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
        imageAlt="Hand upholstery workshop at Savery's, Broadway, Cotswolds"
      />
      <Breadcrumbs items={[{ name: "Workshop & Stores", href: "/workshop-stores/broadway" }]} />

      {/* Introduction */}
      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">{content.introduction.heading}</Text>
              {content.introduction.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={content.introduction.image}
                alt="Hand-upholstered armchair in the Savery's Broadway showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Showroom */}
      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.showroom.image}
                alt="Curated showroom display with fabrics and ceramics"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">{content.showroom.heading}</Text>
              {content.showroom.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* The Workshop */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">{content.workshop.heading}</Text>
              {content.workshop.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={content.workshop.image}
                alt="Upholstered chair in the Savery's hand upholstery workshop, Broadway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fabrics & Rugs */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.fabrics.image}
                alt="Bespoke sofa with patterned upholstery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">{content.fabrics.heading}</Text>
              {content.fabrics.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Expert Service */}
      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">{content.expertise.heading}</Text>
              {content.expertise.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>

            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.expertise.image}
                alt="Elegant sofa in a light-filled Cotswolds interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">{content.visitUs.heading}</Text>
              <Text variant="body" className="mt-6 text-stone">
                {content.visitUs.body}
              </Text>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="space-y-6">
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Address
                  </Text>
                  <Text variant="body" className="mt-1 whitespace-pre-line text-stone">
                    {content.visitUs.address}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Telephone
                  </Text>
                  <a
                    href={`tel:+44${content.visitUs.phone.replace(/^0/, "").replace(/\s/g, "")}`}
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-stone transition-colors duration-[var(--duration-fast)] hover:text-clay"
                  >
                    {content.visitUs.phone}
                  </a>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Visits
                  </Text>
                  <Text variant="body" className="mt-1 text-stone">
                    {content.visitUs.visits}
                  </Text>
                </div>
                <div className="pt-2">
                  <Link
                    href={content.visitUs.buttonLink}
                    className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
                  >
                    {content.visitUs.buttonText}
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
