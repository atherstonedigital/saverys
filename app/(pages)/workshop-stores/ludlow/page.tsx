import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Our Ludlow Store | Savery's of Broadway — Luxury Interior Design",
  description:
    "Visit Savery's of Broadway in Ludlow — our carefully curated interiors store at 1 Tower Street, in the heart of this historic market town. Fabrics, furnishings & design consultations.",
  alternates: { canonical: "/workshop-stores/ludlow" },
};

const features = [
  {
    title: "Fabric Library",
    description:
      "Browse an extensive collection of the finest fabrics from leading British and European houses — available to view, touch, and take away as samples.",
  },
  {
    title: "Wallpapers & Finishes",
    description:
      "From hand-printed wallpapers to artisan paint finishes, discover the materials that bring walls to life with character and depth.",
  },
  {
    title: "Furniture & Pieces",
    description:
      "A changing selection of furniture, lighting, and decorative accessories — sourced for quality, beauty, and that unmistakable sense of place.",
  },
  {
    title: "Design Consultations",
    description:
      "Book a one-to-one consultation with our team to discuss your project. Whether it's a single room or an entire property, we're here to help.",
  },
  {
    title: "Curtain & Soft Furnishings",
    description:
      "All our curtains and soft furnishings are made in-house at our own workroom — ensuring impeccable quality and a truly bespoke result.",
  },
  {
    title: "Gifts & Home",
    description:
      "Thoughtfully chosen candles, ceramics, and homeware — perfect for gifting or adding a considered finishing touch to any room.",
  },
];

function Placeholder({
  label,
  aspect = "4/3",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-linen to-cream`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="px-4 text-center font-body text-xs font-normal uppercase tracking-[0.06em] text-stone/40">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function LudlowPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone/30 to-linen" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-body text-sm uppercase tracking-[0.1em] text-stone/40">
            Ludlow store hero image
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-16 md:px-12 md:pb-24">
            <div className="mx-auto max-w-7xl">
              <Text variant="caption" className="mb-4 text-cream/70">
                1 Tower Street, Ludlow
              </Text>
              <Text as="h1" className="text-cream">
                Our Ludlow Store
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">A destination for exceptional interiors</Text>
              <Text variant="body" className="mt-6 text-stone">
                Nestled in the heart of one of England&apos;s finest market
                towns, our Ludlow store brings the Savery&apos;s experience to
                the Welsh Marches. Set within a beautifully appointed space on
                Tower Street, it&apos;s a place to explore our curated
                collection of fabrics, wallpapers, furniture, and decorative
                pieces — each chosen to reflect the quality and craftsmanship
                that defines everything we do.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Whether you&apos;re embarking on a full renovation or searching
                for that one perfect finishing touch, our Ludlow team is on hand
                to guide, inspire, and bring your vision to life.
              </Text>
            </SectionReveal>

            <Placeholder label="Ludlow store interior" aspect="3/4" />
          </div>
        </div>
      </section>

      {/* What you'll find */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2">What you&apos;ll find</Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <SectionReveal key={feature.title} delay={i * 0.1}>
                <Text as="h3">{feature.title}</Text>
                <Text variant="body" className="mt-3 text-stone">
                  {feature.description}
                </Text>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="mb-10">
              Step inside
            </Text>
          </SectionReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col gap-6 md:gap-8">
              <Placeholder label="Ludlow store — fabric display" aspect="4/3" />
              <Placeholder
                label="Ludlow store — furniture vignette"
                aspect="3/4"
              />
            </div>
            <div className="flex flex-col gap-6 md:mt-16 md:gap-8">
              <Placeholder
                label="Ludlow store — wallpaper samples"
                aspect="3/4"
              />
              <Placeholder
                label="Ludlow store — gifts & homeware"
                aspect="4/3"
              />
              <Placeholder
                label="Ludlow store — consultation area"
                aspect="4/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit section */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
            <SectionReveal>
              <Text as="h2" className="text-cream">
                Visit us in Ludlow
              </Text>
              <div className="mt-8 space-y-6">
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Address
                  </Text>
                  <Text variant="body" className="mt-1 text-cream/70">
                    1 Tower Street
                    <br />
                    Ludlow, Shropshire
                    <br />
                    SY8 1RL
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Telephone
                  </Text>
                  <a
                    href="tel:+441584708381"
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-cream/70 transition-colors duration-[var(--duration-fast)] hover:text-cream"
                  >
                    01584 708381
                  </a>
                  <a
                    href="tel:+447415065580"
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-cream/70 transition-colors duration-[var(--duration-fast)] hover:text-cream"
                  >
                    07415 065580
                  </a>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Opening Hours
                  </Text>
                  <Text variant="body" className="mt-1 text-cream/70">
                    Monday – Saturday: 10am – 5pm
                    <br />
                    Sunday: By appointment
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Parking
                  </Text>
                  <Text variant="body" className="mt-1 text-cream/70">
                    Castle Square car park is a short walk away
                  </Text>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Placeholder label="Map embed placeholder" aspect="4/3" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linen px-6 py-16 text-center md:px-12">
        <SectionReveal>
          <Text as="h2" className="mb-6">
            Start a conversation
          </Text>
          <Link
            href="/contact"
            className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
          >
            Get in touch
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
