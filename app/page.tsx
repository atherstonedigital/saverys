import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";
import { generateSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("home");
  return buildMetadata(
    seo,
    "/",
    "Luxury Interior Design — Cotswolds, Ludlow & Chelsea",
    "Luxury interior design studio in the Cotswolds since 1991. Bespoke interiors, hand upholstery, premium fabrics. Showrooms in Broadway, Ludlow, and Chelsea.",
  );
}

interface HomeContent {
  hero: { heading: string; subtitle?: string; image: string };
  studioIntro: { heading: string; body: string; image: string };
  featuredProjects: { name: string; slug: string; image: string; description?: string }[];
  services: {
    heading: string;
    image: string;
    items: { title: string; description: string }[];
  };
  cta: { heading: string; buttonText: string; buttonLink: string };
}

export default function HomePage() {
  const content = getPageContent<HomeContent>("home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateSchema({ pageType: "home" }),
        }}
      />
      <Hero
        heading={content.hero.heading}
        subtitle={content.hero.subtitle}
        image={content.hero.image}
        imageAlt="Luxury interior by Savery's of Broadway — Cotswolds interior design"
        cta={{ label: "View our work", href: "/projects" }}
      />

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <SectionReveal>
              <Text as="h2">{content.studioIntro.heading}</Text>
              <Text variant="body" className="mt-6 max-w-2xl text-stone">
                {content.studioIntro.body}
              </Text>
              <div className="mt-10">
                <Button href="/about" variant="text">
                  Learn more
                </Button>
              </div>
            </SectionReveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={content.studioIntro.image}
                alt="Curated interior details"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <ProjectGrid projects={content.featuredProjects} />

      <section className="px-6 py-8 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <SectionReveal>
            <Button href="/projects">View the collection</Button>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-16">
            <div className="md:col-span-4">
              <SectionReveal>
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={content.services.image}
                    alt="Hand-selected fabrics and curtains"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </SectionReveal>
            </div>

            <div className="md:col-span-8">
              <SectionReveal>
                <Text as="h2">{content.services.heading}</Text>
              </SectionReveal>
              <div className="mt-10 flex flex-col">
                {content.services.items.map((service, i) => (
                  <SectionReveal key={service.title} delay={i * 0.1}>
                    <div
                      className={`py-6 ${
                        i > 0 ? "border-t border-clay/30" : ""
                      }`}
                    >
                      <Text as="h3">{service.title}</Text>
                      <Text variant="body" className="mt-2 max-w-xl text-stone">
                        {service.description}
                      </Text>
                    </div>
                  </SectionReveal>
                ))}
              </div>
              <div className="mt-8">
                <SectionReveal delay={0.3}>
                  <Button href="/services">View all services</Button>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
