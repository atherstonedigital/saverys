import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

const featuredProjects = [
  {
    name: "The Old Mill, Broadway",
    description:
      "A considered restoration of a Cotswold mill, marrying original stone with hand-finished English linen.",
    image: "/images/projects/old-mill-kitchen.jpg",
  },
  {
    name: "Jams House",
    description:
      "Quiet elegance in a country house. Every room composed around the light.",
    image: "/images/projects/jams-house-living.jpg",
  },
  {
    name: "The Grantly Collection",
    description:
      "An enduring country house, layered with provenance and warmth.",
    image: "/images/projects/grantly-sofa.jpg",
  },
];

const services = [
  {
    title: "Full interior design",
    description:
      "From initial concept through to final placement, we manage every detail of your interior with the care it deserves.",
  },
  {
    title: "Fabric and material sourcing",
    description:
      "We work directly with mills, workshops, and artisans across Britain and Europe to source materials of genuine quality.",
  },
  {
    title: "Furniture curation",
    description:
      "A considered selection of antique and contemporary pieces, chosen for how they live rather than how they look.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        heading="Rooms composed with care"
        subtitle="An interior design studio rooted in the Cotswolds, where craftsmanship and restraint define every space."
        image="/images/hero/home.jpg"
      />

      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2">A studio of quiet intention</Text>
            <Text variant="body" className="mt-6 max-w-2xl text-stone">
              Savery&apos;s works with those who understand that true quality is
              felt before it is seen. We compose interiors that endure — rooms
              built on provenance, proportion, and an unhurried attention to
              detail.
            </Text>
            <div className="mt-10">
              <Button href="/about" variant="text">
                Learn more
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <ProjectGrid projects={featuredProjects} />

      <section className="px-6 py-8 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <SectionReveal>
            <Button href="/projects">View the collection</Button>
          </SectionReveal>
        </div>
      </section>

      <ServicesOverview services={services} />

      <ContactSection />
    </>
  );
}
