import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Our History",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        heading="A room that remembers"
        image="/images/hero/about.jpg"
      />

      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text variant="body" className="text-stone">
                Savery&apos;s of Broadway is an interior design studio rooted in
                the heart of the Cotswolds. Established in 1991, we have spent
                over three decades working with those who understand that true
                quality is felt before it is seen.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Founded on the principle that restraint is the highest form of
                sophistication, we compose spaces that feel as though they have
                always existed — rooms layered with provenance, proportion, and
                an enduring sense of calm.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                From our studio in Broadway village, on the
                Worcestershire-Gloucestershire border, we draw on the landscape,
                craftsmanship, and unhurried rhythm of the English countryside.
              </Text>
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/projects/old-mill-details.jpg"
                alt="Curated interior details at The Old Mill"
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
                src="/images/projects/old-mill-chair.jpg"
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
            <Text as="h2">How we work</Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                title: "Listen",
                text: "We begin every project with conversation, not concepts. Understanding how you live shapes everything that follows.",
              },
              {
                title: "Compose",
                text: "Spaces are composed, not decorated. Each element is chosen for how it relates to the whole — proportion, light, and material.",
              },
              {
                title: "Craft",
                text: "From sourcing to final placement, every detail is managed with the unhurried care that enduring quality demands.",
              },
            ].map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.15}>
                <Text as="h3">{step.title}</Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.text}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
