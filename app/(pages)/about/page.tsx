import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("about");
  return buildMetadata(
    seo,
    "/about",
    "Our History | Saverys of Broadway — Interior Design Since 1991",
    "Established in 1991 in the heart of the Cotswolds, Saverys has been creating exceptional interiors for discerning clients across the UK for over 30 years.",
  );
}

interface AboutContent {
  hero: { heading: string; image: string };
  about: { paragraphs: string[]; image1: string; image2: string };
  process: { heading: string; steps: { title: string; description: string }[] };
  cta: { heading: string; buttonText: string; buttonLink: string };
}

export default function AboutPage() {
  const content = getPageContent<AboutContent>("about");

  return (
    <>
      <Hero
        heading={content.hero.heading}
        image={content.hero.image}
      />

      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              {content.about.paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body" className={`text-stone${i > 0 ? " mt-6" : ""}`}>
                  {paragraph}
                </Text>
              ))}
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={content.about.image1}
                alt="Curated interior details"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.about.image2}
                alt="Antique chair with botanical fabric"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text variant="body" className="text-stone">
                Every project begins with listening. We take the time to
                understand how you live, what you value, and what a room should
                feel like before a single fabric is chosen.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Our work draws on a network of the finest mills, workshops, and
                artisans across Britain and Europe. We source materials of
                genuine quality — hand-finished linens, aged timbers, stones with
                character — because craftsmanship is never a detail. It is the
                foundation.
              </Text>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2">{content.process.heading}</Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {content.process.steps.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.15}>
                <Text as="h3">{step.title}</Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.description}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

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
