import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("ludlow");
  return buildMetadata(
    seo,
    "/workshop-stores/ludlow",
    "Our Ludlow Store — Interior Design & Fabrics",
    "Visit Savery's in Ludlow — our curated interiors store at 1 Tower Street. Fabrics, furnishings, and design consultations.",
  );
}

interface LudlowContent {
  hero: { heading: string; locationLabel: string; image?: string };
  intro: { heading: string; paragraphs: string[]; image?: string };
  features: { title: string; description: string }[];
  gallery: { heading: string; images?: string[] };
  visitUs: {
    heading: string;
    address: string;
    phone: string;
    mobile?: string;
    hours: string;
    parking?: string;
  };
  cta: { heading: string; buttonText: string; buttonLink: string };
}

function Placeholder({
  label,
  aspect = "4/3",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-br from-linen to-cream"
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
  const content = getPageContent<LudlowContent>("ludlow");

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {content.hero.image ? (
          <Image
            src={content.hero.image}
            alt={`${content.hero.heading} — Saverys of Broadway`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-stone/30 to-linen" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-sm uppercase tracking-[0.1em] text-stone/40">
                Ludlow store hero image
              </span>
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-16 md:px-12 md:pb-24">
            <div className="mx-auto max-w-7xl">
              <Text variant="caption" className="mb-4 text-cream/70">
                {content.hero.locationLabel}
              </Text>
              <Text as="h1" className="text-cream">
                {content.hero.heading}
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
              <Text as="h2">{content.intro.heading}</Text>
              {content.intro.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {p}
                </Text>
              ))}
            </SectionReveal>

            {content.intro.image ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={content.intro.image}
                  alt="Inside the Saverys Ludlow store"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <Placeholder label="Ludlow store interior" aspect="3/4" />
            )}
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
            {content.features.map((feature, i) => (
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
              {content.gallery.heading}
            </Text>
          </SectionReveal>
          {content.gallery.images && content.gallery.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col gap-6 md:gap-8">
                {content.gallery.images
                  .filter((_, i) => i % 2 === 0)
                  .map((img, i) => (
                    <div
                      key={img}
                      className={`relative w-full overflow-hidden ${i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                    >
                      <Image
                        src={img}
                        alt={`Inside the Saverys Ludlow store`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-6 md:mt-16 md:gap-8">
                {content.gallery.images
                  .filter((_, i) => i % 2 === 1)
                  .map((img, i) => (
                    <div
                      key={img}
                      className={`relative w-full overflow-hidden ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                    >
                      <Image
                        src={img}
                        alt={`Inside the Saverys Ludlow store`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col gap-6 md:gap-8">
                <Placeholder label="Ludlow store — fabric display" aspect="4/3" />
                <Placeholder label="Ludlow store — furniture vignette" aspect="3/4" />
              </div>
              <div className="flex flex-col gap-6 md:mt-16 md:gap-8">
                <Placeholder label="Ludlow store — wallpaper samples" aspect="3/4" />
                <Placeholder label="Ludlow store — gifts & homeware" aspect="4/3" />
                <Placeholder label="Ludlow store — consultation area" aspect="4/3" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visit section */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
            <SectionReveal>
              <Text as="h2" className="text-cream">
                {content.visitUs.heading}
              </Text>
              <div className="mt-8 space-y-6">
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Address
                  </Text>
                  <Text variant="body" className="mt-1 whitespace-pre-line text-cream/70">
                    {content.visitUs.address}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Telephone
                  </Text>
                  <a
                    href={`tel:+44${content.visitUs.phone.replace(/^0/, "").replace(/\s/g, "")}`}
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-cream/70 transition-colors duration-[var(--duration-fast)] hover:text-cream"
                  >
                    {content.visitUs.phone}
                  </a>
                  {content.visitUs.mobile && (
                    <a
                      href={`tel:+44${content.visitUs.mobile.replace(/^0/, "").replace(/\s/g, "")}`}
                      className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-cream/70 transition-colors duration-[var(--duration-fast)] hover:text-cream"
                    >
                      {content.visitUs.mobile}
                    </a>
                  )}
                </div>
                <div>
                  <Text variant="caption" className="text-cream/40">
                    Opening Hours
                  </Text>
                  <Text variant="body" className="mt-1 whitespace-pre-line text-cream/70">
                    {content.visitUs.hours}
                  </Text>
                </div>
                {content.visitUs.parking && (
                  <div>
                    <Text variant="caption" className="text-cream/40">
                      Parking
                    </Text>
                    <Text variant="body" className="mt-1 text-cream/70">
                      {content.visitUs.parking}
                    </Text>
                  </div>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
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
