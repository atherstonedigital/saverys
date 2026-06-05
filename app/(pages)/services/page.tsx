import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("services");
  return buildMetadata(
    seo,
    "/services",
    "Interior Design Services — Cotswolds, Ludlow & Chelsea | Savery's of Broadway",
    "Full home interior design, hand upholstery, bespoke furnishings, bespoke furniture, curtains and soft furnishings, fabric sourcing, antiques, colour consultation, home staging, and project management. Made on-site in the Cotswolds since 1942.",
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
        name: siteConfig.name,
        url: siteConfig.url,
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
      <Hero heading={content.hero.heading} image={content.hero.image} />
      <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />

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
