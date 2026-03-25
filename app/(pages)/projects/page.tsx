import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { MasonryGrid } from "@/components/sections/MasonryGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { projects } from "@/lib/projects";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("projects");
  return buildMetadata(
    seo,
    "/projects",
    "Interior Design Portfolio | Saverys of Broadway — Cotswolds",
    "Browse the Saverys portfolio of luxury interior design projects — from private Cotswold residences to high-end hotels.",
  );
}

interface ProjectsContent {
  hero: { heading: string; image: string };
  intro: string;
  cta: { heading: string; buttonText: string; buttonLink: string };
}

const masonryProjects = projects.map((p) => ({
  name: `${p.name}, ${p.location.split(",")[0]}`,
  slug: p.slug,
  description: p.description,
  image: p.heroImage,
  orientation: (p.images[0]?.orientation ?? "landscape") as
    | "portrait"
    | "landscape",
}));

export default function ProjectsPage() {
  const content = getPageContent<ProjectsContent>("projects");

  return (
    <>
      <Hero heading={content.hero.heading} image={content.hero.image} />

      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Text variant="body" className="text-stone">
              {content.intro}
            </Text>
          </SectionReveal>
        </div>
      </section>

      <MasonryGrid projects={masonryProjects} />

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
