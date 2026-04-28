import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SourcingBlock } from "@/components/sections/SourcingBlock";
import { Text } from "@/components/ui/Text";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/config";
import {
  getPageContent,
  getSettings,
  buildMetadata,
  type PageSeo,
} from "@/lib/content";

interface Pillar {
  title: string;
  body: string;
}

interface ProcessStep {
  title: string;
  body: string;
}

interface WorkshopContent {
  seo?: PageSeo;
  hero: { heading: string; subtitle?: string; image: string };
  intro: { heading: string; body: string };
  pillars: { heading: string; items: Pillar[] };
  imageBreak?: { image: string; alt?: string };
  process: { heading: string; intro?: string; steps: ProcessStep[] };
  cta: { heading: string; body: string; buttonText: string; buttonLink: string };
}

interface SourcingSettings {
  heading: string;
  body: string;
}

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<WorkshopContent>("workshop");
  return buildMetadata(
    seo,
    "/workshop",
    "Workshop — Bespoke Curtains, Blinds & Reupholstery | Savery's of Broadway",
    "British craft at its finest, made in our Cotswolds workrooms. Bespoke curtains and blinds, exquisite reupholstery, and bespoke furniture.",
  );
}

export default function WorkshopPage() {
  const content = getPageContent<WorkshopContent>("workshop");
  const sourcing = getSettings<SourcingSettings>("sourcing");

  const schemaJson = generateSchema({
    pageType: "page",
    breadcrumbs: [{ name: "Workshop", url: `${siteConfig.url}/workshop` }],
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
        imageAlt="Hand upholstery in progress at the Savery's workshop in Broadway"
      />
      <Breadcrumbs items={[{ name: "Workshop", href: "/workshop" }]} />

      {/* Intro */}
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

      {/* What we make — three pillars */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              {content.pillars.heading}
            </Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3">
            {content.pillars.items.map((pillar, i) => (
              <SectionReveal key={pillar.title} delay={i * 0.1}>
                <Text as="h3">{pillar.title}</Text>
                <Text variant="body" className="mt-4 text-stone">
                  {pillar.body}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Imagery break */}
      {content.imageBreak?.image && (
        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionReveal>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={content.imageBreak.image}
                  alt={
                    content.imageBreak.alt ||
                    "Inside the Savery's workshop, Broadway"
                  }
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Sourcing — copy from /settings/sourcing.json */}
      <SourcingBlock
        className="bg-linen"
        heading={sourcing.heading}
        body={sourcing.body}
      />

      {/* The process */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              {content.process.heading}
            </Text>
            {content.process.intro && (
              <Text
                variant="body"
                className="mx-auto mt-6 max-w-2xl text-center text-stone"
              >
                {content.process.intro}
              </Text>
            )}
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-4 md:gap-12">
            {content.process.steps.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.1}>
                <Text variant="caption" className="text-clay">
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text as="h3" className="mt-3">
                  {step.title}
                </Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.body}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2" className="text-cream">
              {content.cta.heading}
            </Text>
            <Text variant="body" className="mx-auto mt-6 max-w-xl text-cream/70">
              {content.cta.body} Write to us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-cream underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              {" "}or use the contact form.
            </Text>
            <div className="mt-10">
              <Link
                href={content.cta.buttonLink}
                className="inline-block border border-cream/60 bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-cream transition-all duration-500 hover:bg-cream hover:text-ink"
              >
                {content.cta.buttonText}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
