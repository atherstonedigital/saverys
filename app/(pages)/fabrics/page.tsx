import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/lib/config";

const TITLE = "Upholstery fabrics | Savery's of Broadway";
const DESCRIPTION =
  "Designer upholstery fabrics chosen and hand applied in our Cotswolds workshop since 1942. Plains, checks, stripes and tickings for sofas and chairs to order.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/fabrics" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/fabrics`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: Upholstery fabrics`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const PLAIN_COLOURS = [
  "Alabaster",
  "Ash",
  "Denim",
  "Eucalyptus",
  "Flint",
  "Graphite",
  "Indigo",
  "Ink",
  "Mineral",
  "Parchment",
  "Sand",
  "Shell",
  "Sky",
  "Stone",
];

const PATTERN_DESIGNS = [
  "Audley check",
  "Brodsworth stripe",
  "Darwin stripe",
  "Witley ticking",
];

const PATTERN_COLOURWAYS = [
  "Adriatic",
  "Cajun",
  "Ivy",
  "Linen",
  "Lovage",
  "Sakura",
  "Serandite",
  "Silver",
  "Sunflower",
  "Twilight",
];

const SHOP_COLLECTIONS = [
  {
    label: "Sofas",
    description: "Hand-sprung sofas built on beech frames in Broadway.",
    href: "https://shop.saverys.co.uk/collections/sofas",
  },
  {
    label: "Armchairs and chairs",
    description: "Wing chairs, reading chairs and occasional chairs.",
    href: "https://shop.saverys.co.uk/collections/armchairs-chairs",
  },
  {
    label: "Footstools and stools",
    description: "Footstools and stools in any fabric on this page.",
    href: "https://shop.saverys.co.uk/collections/footstools-stools",
  },
  {
    label: "Made to order",
    description: "Your dimensions, your fabric, made in the workshop.",
    href: "https://shop.saverys.co.uk/collections/made-to-order",
  },
];

const CONSULTATION_URL = "https://shop.saverys.co.uk/pages/book-a-consultation";

export default function FabricsPage() {
  return (
    <>
      <Hero
        heading="Upholstery fabrics"
        subtitle="Fabrics chosen for how they wear as much as how they look, cut and applied by hand in our Broadway workshop since 1942."
        image="/images/The-Old-Mill-Broadway-039-scaled-1.webp"
        imageAlt="Upholstery fabric samples displayed at the Savery's showroom in Broadway"
      />
      <Breadcrumbs items={[{ name: "Fabrics", href: "/fabrics" }]} />

      {/* How we choose fabric */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">How we choose fabric</Text>
              <Text variant="body" className="mt-6 text-stone">
                Start with fibre. Wool, linen and cotton each behave
                differently on a sofa: wool resists crushing and hides marks
                in its texture, linen relaxes and softens with use, cotton
                takes colour evenly and adds strength in a blend. The fibre
                decides how a fabric feels in year five, not just in week one.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Then check durability. The Martindale rub count measures how a
                weave stands up to use: 20,000 rubs and above suits a family
                sofa, occasional chairs can sit lower, and hall benches and
                window seats that work hard should sit higher. We check the
                rating before we recommend anything, because a beautiful
                fabric with the wrong rub count is money wasted.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Match the pattern to the frame. A large repeat needs a
                generous three-seater where it has room to read; on a compact
                chair it looks cropped. Small checks and tickings do the
                opposite, bringing quiet interest to smaller pieces. We plan
                placement before cutting so the pattern runs unbroken across
                seat, back and arms.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Finally, look at the colour where it will live. North light
                cools a colour, lamplight warms it, and a shade that sings in
                the showroom can fall flat in a dark sitting room. Take
                samples home and look at them morning and evening before you
                commit. If you would like help narrowing it down,{" "}
                <a
                  href={CONSULTATION_URL}
                  className="underline underline-offset-4 decoration-saverys-green transition-colors duration-300 hover:text-charcoal"
                >
                  book a consultation
                </a>{" "}
                and we will work through it with you.
              </Text>
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/upholstery work shop 1.webp"
                alt="Upholsterer working with fabric at the Savery's workshop in Broadway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plains */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              Plains
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-stone"
            >
              Our plain upholstery range runs to fourteen colours, from pale
              neutrals through greens and blues to near-black. All are woven
              for everyday seating and available on any piece we make or
              recover.
            </Text>
          </SectionReveal>
          {/* IMAGE NEEDED: flat-lay or draped shot of the plain fabric range showing several colours together */}
          <SectionReveal delay={0.1}>
            <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-4 text-center sm:grid-cols-3 md:grid-cols-4">
              {PLAIN_COLOURS.map((colour) => (
                <li
                  key={colour}
                  className="font-body text-base font-light tracking-[0.02em] text-charcoal"
                >
                  {colour}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Checks, stripes and tickings */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center">
              Checks, stripes and tickings
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-stone"
            >
              Four woven designs, each in the same ten colourways. The shared
              palette means a check on the sofa, a stripe on a chair and a
              ticking on the cushions will sit together without effort.
            </Text>
          </SectionReveal>
          {/* IMAGE NEEDED: the four patterned designs shown side by side, ideally in one shared colourway */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:mt-16 md:grid-cols-4">
            {PATTERN_DESIGNS.map((design, i) => (
              <SectionReveal key={design} delay={i * 0.1}>
                <Text as="h3" className="text-center">
                  {design}
                </Text>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <Text
              variant="body"
              className="mx-auto mt-12 max-w-2xl text-center text-stone"
            >
              Colourways: {PATTERN_COLOURWAYS.join(", ")}.
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-4 max-w-2xl text-center text-stone"
            >
              Ask for them by design and colour: Audley check in Ivy, Darwin
              stripe in Twilight, Witley ticking in Linen.
            </Text>
          </SectionReveal>
        </div>
      </section>

      {/* Natural fibres */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/saverys broadway shop 2.webp"
                alt="Natural upholstery fabric samples in the Savery's Broadway showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">Natural fibres</Text>
              <Text variant="body" className="mt-6 text-stone">
                Most of what we upholster is wool, linen or cotton. Wool is
                the hardest wearing of the three and stays warm to the touch
                on a stone-floored Cotswold room. Linen softens with use and
                takes dye in muted, chalky tones. Cotton adds strength to
                blends and washes well in loose covers.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Natural fibres age rather than deteriorate, which is why we
                reach for them first. For the long read on how each one
                behaves and where it suits, see our{" "}
                <Link
                  href="/journal/guide-to-natural-upholstery-fabrics"
                  className="underline underline-offset-4 decoration-saverys-green transition-colors duration-300 hover:text-charcoal"
                >
                  guide to natural upholstery fabrics
                </Link>
                .
              </Text>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* See the fabrics on furniture */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <Text as="h2" className="text-center text-cream">
              See the fabrics on furniture
            </Text>
            <Text
              variant="body"
              className="mx-auto mt-6 max-w-2xl text-center text-cream/70"
            >
              Every fabric on this page can be ordered on a finished piece
              from our workshop. Browse the collections, or talk to us about
              a commission.
            </Text>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {SHOP_COLLECTIONS.map((collection, i) => (
              <SectionReveal key={collection.href} delay={i * 0.1}>
                <a
                  href={collection.href}
                  className="group block h-full border border-cream/20 p-8 transition-colors duration-500 hover:border-cream/60"
                >
                  <Text as="h3" className="text-cream">
                    {collection.label}
                  </Text>
                  <Text variant="small" className="mt-3 text-cream/60">
                    {collection.description}
                  </Text>
                  <span className="mt-6 inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-cream/70 transition-colors duration-500 group-hover:text-cream">
                    View the collection
                  </span>
                </a>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <div className="mt-12 text-center md:mt-16">
              <a
                href={CONSULTATION_URL}
                className="inline-block border border-cream/60 bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-cream transition-all duration-500 hover:bg-cream hover:text-ink"
              >
                Book a consultation
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Visit a showroom */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <Text as="h2">Visit a showroom</Text>
            <Text variant="body" className="mt-6 text-stone">
              The full fabric books can be viewed at our{" "}
              <Link
                href="/showroom/broadway"
                className="underline underline-offset-4 decoration-saverys-green transition-colors duration-300 hover:text-charcoal"
              >
                Broadway
              </Link>{" "}
              and{" "}
              <Link
                href="/showroom/ludlow"
                className="underline underline-offset-4 decoration-saverys-green transition-colors duration-300 hover:text-charcoal"
              >
                Ludlow
              </Link>{" "}
              showrooms. Handling a full-width sample tells you more than any
              screen, and we are happy to lend books for a few days.
            </Text>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
