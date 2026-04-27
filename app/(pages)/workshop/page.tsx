import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SourcingBlock } from "@/components/sections/SourcingBlock";
import { Text } from "@/components/ui/Text";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Workshop — Bespoke Curtains, Blinds & Reupholstery | Saverys",
  description:
    "British craft at its finest, made in our Cotswolds workrooms. Bespoke curtains and blinds, exquisite reupholstery, and bespoke furniture by Savery's of Broadway.",
  alternates: { canonical: "/workshop" },
  openGraph: {
    title: "Workshop — Bespoke Curtains, Blinds & Reupholstery",
    description:
      "British craft at its finest, made in our Cotswolds workrooms. Bespoke curtains and blinds, exquisite reupholstery, and bespoke furniture.",
    url: `${siteConfig.url}/workshop`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

const pillars = [
  {
    title: "Bespoke curtains & blinds",
    body: "Hand-finished to the highest standard, made in our Broadway workrooms with traditional techniques refined over decades.",
  },
  {
    title: "Exquisite reupholstery",
    body: "Frames stripped, springs hand-tied, and pieces brought back to life using the finest fabrics and materials.",
  },
  {
    title: "Bespoke furniture",
    body: "Sofas, armchairs and headboards, built from kiln-dried hardwoods and finished by hand for a lifetime of use.",
  },
];

const processSteps = [
  {
    title: "Consultation",
    body: "We listen first. A visit to the property, a careful look at the room, the light, and how the space is lived in.",
  },
  {
    title: "Design",
    body: "Schemes developed with physical samples and considered drawings, refined in conversation until every detail is right.",
  },
  {
    title: "Make",
    body: "Pieces built by hand in our Broadway workrooms — frames, springs, fabric, every stage on the same site.",
  },
  {
    title: "Install",
    body: "We're present on the day. Furniture positioned, curtains hung, cushions dressed — the room finished as drawn.",
  },
];

export default function WorkshopPage() {
  const schemaJson = generateSchema({
    pageType: "page",
    breadcrumbs: [
      { name: "Workshop", url: `${siteConfig.url}/workshop` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Hero
        heading="British craft at its finest, made in the heart of the Cotswolds."
        subtitle="Bespoke curtains, blinds, reupholstery and furniture — all made by hand in our Broadway workrooms."
        image="/images/workshop hero.webp"
        imageAlt="Hand upholstery in progress at the Savery's workshop in Broadway"
      />
      <Breadcrumbs items={[{ name: "Workshop", href: "/workshop" }]} />

      {/* Intro */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2">A workshop, not a showroom</Text>
            <Text variant="body" className="mt-8 text-stone">
              The workshop is the heart of the practice. It is where ideas
              become objects — frames cut and joined, fabrics chosen and stitched,
              springs tied by hand. Everything Saverys makes begins here, on the
              same site, by the same team. It is a quieter way of working, and
              an increasingly rare one in British interiors.
            </Text>
          </SectionReveal>
        </div>
      </section>

      {/* What we make — three pillars */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              What we make
            </Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <SectionReveal key={pillar.title} delay={i * 0.1}>
                <Text as="h3">{pillar.title}</Text>
                <Text variant="body" className="mt-4 text-stone">
                  {pillar.body}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Imagery break */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="/images/workshop hero 2.webp"
                alt="Inside the Savery's hand upholstery workshop, Broadway"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Sourcing */}
      <SourcingBlock className="bg-linen" />

      {/* The process */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              The process
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-stone"
            >
              From the first conversation to the moment a room is finished, every
              stage is handled in-house by people who know the work intimately.
            </Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-4 md:gap-12">
            {processSteps.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.1}>
                <Text variant="caption" className="text-clay">
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text as="h3" className="mt-3">
                  {step.title}
                </Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.body}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2" className="text-cream">
              Begin a conversation
            </Text>
            <Text variant="body" className="mx-auto mt-6 max-w-xl text-cream/70">
              Whether you&apos;re commissioning a single piece or planning a
              complete scheme, we&apos;d be glad to hear from you. Write to us
              at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-cream underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              {" "}or use the contact form.
            </Text>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block border border-cream/60 bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-cream transition-all duration-500 hover:bg-cream hover:text-ink"
              >
                Enquire about a commission
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
