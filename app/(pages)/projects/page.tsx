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
    name: "The Old Mill, Broadway",
    description:
      "A considered restoration of a Cotswold mill, marrying original stone with hand-finished English linen.",
    image: "/images/projects/old-mill-kitchen.jpg",
  },
  {
    name: "The Old Mill — Bedroom Suite",
    description:
      "Quiet elegance composed around the light. Botanical fabrics and aged oak.",
    image: "/images/projects/old-mill-bedroom.jpg",
  },
  {
    name: "The Old Mill — Window Seat",
    description:
      "Intimate spaces shaped by floral prints, local stone, and the quiet rhythm of the valley.",
    image: "/images/projects/old-mill-chair.jpg",
  },
  {
    name: "Jams House",
    description:
      "A country house layered with character. Exposed beams, rich velvets, and golden drapes.",
    image: "/images/projects/jams-house-living.jpg",
  },
  {
    name: "Jams House — Reading Corner",
    description:
      "Curated cushions in muted tones. Every detail chosen for comfort and colour.",
    image: "/images/projects/jams-house-cushions.jpg",
  },
  {
    name: "The Grantly Collection",
    description:
      "Bold pattern meets timeless form. A patterned sofa against rich blue wallpaper.",
    image: "/images/projects/grantly-sofa.jpg",
  },
  {
    name: "Hallway Study",
    description:
      "A quiet corner with painted chest of drawers, botanical cushion, and a sense of calm.",
    image: "/images/projects/hallway-chair.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Hero
        heading="The collection"
        image="/images/hero/projects.jpg"
      />

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
