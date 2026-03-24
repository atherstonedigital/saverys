import type { Metadata } from "next";
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
      <Hero heading="The collection" image="/images/hero/projects.jpg" />

      <section className="px-6 py-16 md:px-12 md:py-32">
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
    </>
  );
}
