import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("services");
  return buildMetadata(
    seo,
    "/services",
    "Interior Design Services — Cotswolds, Ludlow & Chelsea",
    "Full interior design, fabric sourcing, furniture curation, colour consultation, and project management. From concept to completion.",
  );
}

interface ServicesContent {
  hero: { heading: string; image: string };
  intro: string;
  services: { title: string; description: string; image: string }[];
  cta: { heading: string; buttonText: string; buttonLink: string };
}

export default function ServicesPage() {
  const content = getPageContent<ServicesContent>("services");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": content.services.map((s) => ({
      "@type": "Service",
      serviceType: "Interior Design",
      name: s.title,
      description: s.description,
      provider: {
        "@type": "Organization",
        name: "Savery's of Broadway",
        url: "https://saverys.co.uk",
      },
      areaServed: { "@type": "Country", name: "United Kingdom" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero heading={content.hero.heading} image={content.hero.image} seoHeading="Bespoke Interior Design & Sourcing Services" />

      <section className="px-6 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Text variant="body" className="text-stone">
              {content.intro}
            </Text>
          </SectionReveal>
        </div>
      </section>

      <ServicesOverview services={content.services} />

      <section className="bg-linen px-6 py-16 text-center md:px-12">
        <SectionReveal>
          <Text as="h2" className="mb-6">
            {content.cta.heading}
          </Text>
          <Link
            href={content.cta.buttonLink}
            className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
          >
            {content.cta.buttonText}
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
