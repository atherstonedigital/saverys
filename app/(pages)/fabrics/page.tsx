import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/lib/config";
import { getPageContent } from "@/lib/content";
import { renderInlineLinks } from "@/lib/inline-md";

interface FabricsContent {
  seo: { title: string; description: string; ogImage?: string };
  hero: { heading: string; subtitle?: string; image: string; imageAlt: string };
  howWeChoose: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  plains: { heading: string; intro: string; colours: string[] };
  patterns: {
    heading: string;
    intro: string;
    designs: string[];
    colourways: string[];
    note?: string;
  };
  naturalFibres: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  shop: {
    heading: string;
    intro: string;
    collections: { label: string; description: string; href: string }[];
    buttonText: string;
    buttonLink: string;
  };
  showrooms: { heading: string; body: string };
}

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<FabricsContent>("fabrics");
  const ogImage = seo.ogImage || "/og-image.webp";

  // Absolute title so the layout template does not append the brand
  // suffix a second time; the stored title already carries it.
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: "/fabrics" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${siteConfig.url}/fabrics`,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}: Upholstery fabrics`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function FabricsPage() {
  const content = getPageContent<FabricsContent>("fabrics");

  return (
    <>
      <Hero
        heading={content.hero.heading}
        subtitle={content.hero.subtitle}
        image={content.hero.image}
        imageAlt={content.hero.imageAlt}
      />
      <Breadcrumbs items={[{ name: "Fabrics", href: "/fabrics" }]} />

      {/* How we choose fabric */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">{content.howWeChoose.heading}</Text>
              {content.howWeChoose.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {renderInlineLinks(p)}
                </Text>
              ))}
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={content.howWeChoose.image}
                alt={content.howWeChoose.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plains */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              {content.plains.heading}
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-stone"
            >
              {content.plains.intro}
            </Text>
          </SectionReveal>
          {/* IMAGE NEEDED: flat-lay or draped shot of the plain fabric range showing several colours together */}
          <SectionReveal delay={0.1}>
            <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-4 text-center sm:grid-cols-3 md:grid-cols-4">
              {content.plains.colours.map((colour) => (
                <li
                  key={colour}
                  className="font-body text-base font-light tracking-[0.02em] text-charcoal"
                >
                  {colour}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Checks, stripes and tickings */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              {content.patterns.heading}
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-stone"
            >
              {content.patterns.intro}
            </Text>
          </SectionReveal>
          {/* IMAGE NEEDED: the four patterned designs shown side by side, ideally in one shared colourway */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:mt-16 md:grid-cols-4">
            {content.patterns.designs.map((design, i) => (
              <SectionReveal key={design} delay={i * 0.1}>
                <Text as="h3" className="text-center">
                  {design}
                </Text>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <Text
              variant="body"
              className="mx-auto mt-12 max-w-2xl text-center text-stone"
            >
              Colourways: {content.patterns.colourways.join(", ")}.
            </Text>
            {content.patterns.note && (
              <Text
                variant="body"
                className="mx-auto mt-4 max-w-2xl text-center text-stone"
              >
                {content.patterns.note}
              </Text>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* Natural fibres */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.naturalFibres.image}
                alt={content.naturalFibres.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">{content.naturalFibres.heading}</Text>
              {content.naturalFibres.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {renderInlineLinks(p)}
                </Text>
              ))}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* See the fabrics on furniture */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center text-cream">
              {content.shop.heading}
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-cream/70"
            >
              {content.shop.intro}
            </Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {content.shop.collections.map((collection, i) => (
              <SectionReveal key={collection.href} delay={i * 0.1}>
                <a
                  href={collection.href}
                  className="group block h-full border border-cream/20 p-8 transition-colors duration-500 hover:border-cream/60"
                >
                  <Text as="h3" className="text-cream">
                    {collection.label}
                  </Text>
                  <Text variant="small" className="mt-3 text-cream/60">
                    {collection.description}
                  </Text>
                  <span className="mt-6 inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-cream/70 transition-colors duration-500 group-hover:text-cream">
                    View the collection
                  </span>
                </a>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <div className="mt-12 text-center md:mt-16">
              <a
                href={content.shop.buttonLink}
                className="inline-block border border-cream/60 bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-cream transition-all duration-500 hover:bg-cream hover:text-ink"
              >
                {content.shop.buttonText}
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Visit a showroom */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2">{content.showrooms.heading}</Text>
            <Text variant="body" className="mt-6 text-stone">
              {renderInlineLinks(content.showrooms.body)}
            </Text>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
