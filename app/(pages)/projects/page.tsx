import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Projects",
};

const projects = [
  {
    name: "The Mill House",
    description:
      "A considered restoration of a Georgian mill, marrying original stone with hand-finished English linen.",
  },
  {
    name: "Burford Rectory",
    description:
      "Quiet elegance in a Cotswold rectory. Every room composed around the light.",
  },
  {
    name: "Chipping Norton Estate",
    description:
      "An enduring country house, layered with provenance and warmth.",
  },
  {
    name: "Stow Manor",
    description:
      "A study in restraint. Natural materials and measured proportions throughout.",
  },
  {
    name: "Windrush Cottage",
    description:
      "Intimate spaces shaped by aged oak, local stone, and the quiet rhythm of the valley.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Hero heading="The collection" />

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

      <ProjectGrid projects={projects} />
    </>
  );
}
