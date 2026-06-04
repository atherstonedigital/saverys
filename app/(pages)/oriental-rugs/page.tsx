import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { getPage, getPageContent } from "@/lib/content";
import { siteConfig } from "@/lib/config";

interface OrientalRugsContent {
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  gallery: { image: string; alt: string }[];
  body: string;
}

interface BroadwayContent {
  visitUs: {
    heading: string;
    body: string;
    address: string;
    phone: string;
    visits: string;
    buttonText: string;
    buttonLink: string;
  };
}

export function generateMetadata(): Metadata {
  const page = getPage("oriental-rugs") as unknown as OrientalRugsContent;
  const title = page.seoTitle;
  const description = page.metaDescription;

  return {
    title,
    description,
    alternates: { canonical: "/oriental-rugs" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/oriental-rugs`,
      siteName: "Saverys",
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: `${siteConfig.url}/og-image.webp`,
          width: 1200,
          height: 630,
          alt: `Saverys — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function OrientalRugsPage() {
  const page = getPage("oriental-rugs") as unknown as OrientalRugsContent;
  const { visitUs } = getPageContent<BroadwayContent>("showroom-broadway");

  return (
    <>
      <Hero
        heading={page.title}
        image={page.heroImage}
        imageAlt={page.heroImageAlt}
      />
      <Breadcrumbs
        items={[{ name: "Oriental Rugs", href: "/oriental-rugs" }]}
      />

      <article className="px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <div
              className="journal-body"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </SectionReveal>
        </div>
      </article>

      {page.gallery && page.gallery.length > 0 && (
        <section className="px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.gallery.map((item, i) => (
                <SectionReveal key={item.image} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">Visit us in Broadway</Text>
              <Text variant="body" className="mt-6 text-stone">
                {visitUs.body}
              </Text>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="space-y-6">
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Address
                  </Text>
                  <Text
                    variant="body"
                    className="mt-1 whitespace-pre-line text-stone"
                  >
                    {visitUs.address}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Telephone
                  </Text>
                  <TrackedLink
                    href={`tel:${siteConfig.locations.broadway.phoneTel}`}
                    event="phone_click"
                    eventParams={{ location: "broadway" }}
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-stone transition-colors duration-[var(--duration-fast)] hover:text-clay"
                  >
                    {visitUs.phone}
                  </TrackedLink>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Visits
                  </Text>
                  <Text variant="body" className="mt-1 text-stone">
                    {visitUs.visits}
                  </Text>
                </div>
                <div className="pt-2">
                  <Link
                    href="/showroom/broadway"
                    className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
                  >
                    View the Broadway showroom
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
