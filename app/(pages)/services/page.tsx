import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "What We Do",
};

const services = [
  {
    title: "Full interior design",
    description:
      "From initial concept through to final placement, we manage every detail of your interior with the care it deserves. Our process is unhurried and thorough — the way considered work should be.",
    image: "/images/hero/home.jpg",
  },
  {
    title: "Fabric and material sourcing",
    description:
      "We work directly with mills, workshops, and artisans across Britain and Europe to source materials of genuine quality. Hand-finished linens, aged timbers, stones with character.",
    image: "/images/hero/services.jpg",
  },
  {
    title: "Furniture curation",
    description:
      "A considered selection of antique and contemporary pieces, chosen for how they live rather than how they look. Each piece earns its place through proportion, comfort, and craftsmanship.",
    image: "/images/projects/old-mill-chair.jpg",
  },
  {
    title: "Colour and light consultation",
    description:
      "Colour is never chosen from a chart. We work with your rooms through the seasons, observing how light moves and changes, before a single shade is committed.",
    image: "/images/projects/old-mill-bedroom.jpg",
  },
  {
    title: "Project management",
    description:
      "We coordinate every craftsperson, supplier, and timeline so that the process feels as calm as the finished room. You should never have to chase a detail.",
    image: "/images/projects/old-mill-kitchen.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero heading="What we do" image="/images/hero/services.jpg" />

      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <Text variant="body" className="text-stone">
              Every project begins with listening. We take the time to understand
              how you live, what you value, and what a room should feel like
              before a single fabric is chosen.
            </Text>
          </SectionReveal>
        </div>
      </section>

      <ServicesOverview services={services} />

      <section className="bg-linen px-6 py-16 text-center md:px-12">
        <SectionReveal>
          <Text as="h2" className="mb-6">
            Every project begins with listening
          </Text>
          <Link
            href="/contact"
            className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
          >
            Start a conversation
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
