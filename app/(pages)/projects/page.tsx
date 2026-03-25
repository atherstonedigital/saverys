import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { MasonryGrid } from "@/components/sections/MasonryGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work",
};

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
  return (
    <>
      <Hero heading="The collection" image="/images/hero/projects.webp" />

      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Text variant="body" className="text-stone">
              Each project is a collaboration — shaped by the architecture, the
              landscape, and the lives that will unfold within. Here is a
              selection of our recent work.
            </Text>
          </SectionReveal>
        </div>
      </section>

      <MasonryGrid projects={masonryProjects} />

      <section className="bg-linen px-6 py-16 text-center md:px-12">
        <SectionReveal>
          <Text as="h2" className="mb-6">
            Ready to begin?
          </Text>
          <Link
            href="/contact"
            className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
          >
            Begin a conversation
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
