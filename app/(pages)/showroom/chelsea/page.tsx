import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("showroom-chelsea");
  return buildMetadata(
    seo,
    "/showroom/chelsea",
    "Chelsea Showroom — Interior Design",
    "Savery's of Broadway in Chelsea. Luxury interior design, designer fabrics and bespoke furniture for London homes, rooted in Cotswolds craftsmanship since 1942.",
  );
}

interface ChelseaContent {
  hero: { heading: string; locationLabel: string; image?: string };
  intro: { heading: string; paragraphs: string[] };
  features: { title: string; description: string }[];
  visitUs: {
    heading: string;
    address: string;
    phone: string;
    hours: string;
  };
  cta: { heading: string; buttonText: string; buttonLink: string };
}

export default function ChelseaPage() {
  const content = getPageContent<ChelseaContent>("showroom-chelsea");

  const schemaJson = generateSchema({
    pageType: "page",
    localBusiness: "chelsea",
    breadcrumbs: [
      { name: "Showroom", url: `${siteConfig.url}/showroom` },
      { name: "Chelsea", url: `${siteConfig.url}/showroom/chelsea` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {content.hero.image ? (
          <Image
            src={content.hero.image}
            alt={`${content.hero.heading} — Savery's of Broadway`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone/30 to-linen" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-16 md:px-12 md:pb-24">
            <div className="mx-auto max-w-7xl">
              <Text variant="caption" className="mb-4 text-cream/70">
                {content.hero.locationLabel}
              </Text>
              <Text as="h1" className="text-cream">
                {content.hero.heading}
              </Text>
            </div>
          </div>
        </div>
      </section>
      <Breadcrumbs
        items={[
          { name: "Showroom", href: "/showroom" },
          { name: "Chelsea", href: "/showroom/chelsea" },
        ]}
      />

      {/* Intro */}
      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Text as="h2">{content.intro.heading}</Text>
            {content.intro.paragraphs.map((p, i) => (
              <Text key={i} variant="body" className="mt-6 text-stone">
                {p}
              </Text>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* What happens here */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2">What happens at the Chelsea studio</Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {content.features.map((feature, i) => (
              <SectionReveal key={feature.title} delay={i * 0.1}>
                <Text as="h3">{feature.title}</Text>
                <Text variant="body" className="mt-3 text-stone">
                  {feature.description}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visit section */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
            <SectionReveal>
              <Text as="h2" className="text-cream">
                {content.visitUs.heading}
              </Text>
              <div className="mt-8 space-y-6">
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Address
                  </Text>
                  <Text variant="body" className="mt-1 whitespace-pre-line text-cream/70">
                    {content.visitUs.address}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Telephone
                  </Text>
                  <TrackedLink
                    href={`tel:+44${content.visitUs.phone.replace(/^0/, "").replace(/\s/g, "")}`}
                    event="phone_click"
                    eventParams={{ location: "chelsea" }}
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-cream/70 transition-colors duration-[var(--duration-fast)] hover:text-cream"
                  >
                    {content.visitUs.phone}
                  </TrackedLink>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Visits
                  </Text>
                  <Text variant="body" className="mt-1 whitespace-pre-line text-cream/70">
                    {content.visitUs.hours}
                  </Text>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
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
