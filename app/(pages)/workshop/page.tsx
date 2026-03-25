import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Workshop & Store",
  description:
    "Visit the Saverys workshop and showroom in Broadway, Cotswolds. Hand upholstery, premium fabrics, exquisite rugs, and expert interior design service from a team with over 50 years of expertise.",
};

export default function WorkshopPage() {
  return (
    <>
      <Hero
        heading="The Workshop & Store"
        subtitle="Broadway, Cotswolds — Where Craft Meets Design"
        image="/images/hero/services.webp"
      />

      {/* Introduction */}
      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">A Dying Art, Kept Alive in Broadway</Text>
              <Text variant="body" className="mt-6 text-stone">
                In the heart of Broadway, behind the showroom floor, there is a
                workshop where things are still made properly. Frames are built
                by hand. Fabrics are cut and stretched with the patience that
                good work demands. It is a quieter way of doing things — and an
                increasingly rare one.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Hand upholstery is a dying art in Britain. The number of
                workshops practising traditional techniques has dwindled to a
                handful. At Savery&apos;s, we are one of the few studios keeping
                this craft alive — not out of nostalgia, but because we know
                that nothing machine-made can match what skilled hands produce.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Our team brings over fifty years of combined expertise in hand
                upholstery, fabric selection, and bespoke furniture making.
                Every piece is crafted on-site by expert hands — not outsourced,
                not mass-produced. This is real making, done with real care.
              </Text>
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/WINCHELSEA-LORFORDS-CHAIR-MASTER-1-scaled-1 (1).webp"
                alt="Hand-upholstered armchair with ikat fabric in the Saverys showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Showroom */}
      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/projects/old-mill-details.webp"
                alt="Curated showroom display with fabrics and ceramics"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">An Exquisite Showroom</Text>
              <Text variant="body" className="mt-6 text-stone">
                The Savery&apos;s showroom, set within the Cotswold Design
                Centre in Broadway, is a destination for those who appreciate
                considered design. It is not a conventional shop — it is a
                curated space where premium fabrics, rugs, wallpapers, and
                finishes can be experienced as they are meant to be: in person,
                by touch.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Here, clients compare silks against linens, feel the weight of a
                velvet, and see how a colour shifts in natural Cotswolds light.
                There is no substitute for this tactile experience — it is how
                the finest interiors begin.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Our team is always on hand to guide selections, drawing on
                decades of experience with the world&apos;s most prestigious
                fabric houses.
              </Text>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* The Workshop */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">Crafted by Hand, Built to Last</Text>
              <Text variant="body" className="mt-6 text-stone">
                Step behind the showroom and you will find a working workshop —
                the kind of place that smells of timber and fabric, where
                progress is measured in careful, unhurried hours rather than
                production targets.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Frames are constructed from seasoned hardwoods. Springs are
                hand-tied. Fabrics are precisely cut and stretched over forms
                built to last generations. This is traditional upholstery as it
                has been practised for centuries — and as it should continue to
                be.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Clients are welcome to visit and see their furniture being
                crafted. There is something deeply reassuring about watching
                skilled hands at work — upholsterers, seamstresses, and
                finishers who have dedicated their careers to this quiet,
                exacting art.
              </Text>
            </SectionReveal>

            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/The-Old-Mill-Broadway-003-scaled-1 (1).webp"
                alt="Upholstered chair by the window in the Saverys workshop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fabrics & Rugs */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/Grantly-Sofa-crop-Final-New-Lamp-scaled-1 (1).webp"
                alt="Bespoke sofa with patterned upholstery and wallpaper"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <SectionReveal>
              <Text as="h2">The Finest Fabrics & Rugs</Text>
              <Text variant="body" className="mt-6 text-stone">
                Savery&apos;s sources from the world&apos;s most prestigious
                fabric houses — names trusted by the finest decorators in
                Britain and beyond. Our showroom holds an unrivalled selection of
                premium textiles: silks, linens, velvets, wools, and performance
                fabrics suited to every application.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Choosing the right fabric is an art in itself. Our team offers
                expert guidance on durability, drape, colour fastness, and
                texture — ensuring every selection is not only beautiful but
                entirely fit for purpose.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                Alongside our textile collection, we hold handpicked rug
                collections available to view and feel in the showroom. From
                hand-knotted wool to antique kilims, each piece is chosen for
                its character and quality.
              </Text>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Expert Service */}
      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">Guided by Expertise</Text>
              <Text variant="body" className="mt-6 text-stone">
                The Savery&apos;s team offers a consultative, personal service
                that begins with listening and ends only when every detail is
                right. From initial concept through to final installation,
                clients work with experienced designers who understand fabric,
                form, and function.
              </Text>
              <Text variant="body" className="mt-6 text-stone">
                With over fifty years of combined expertise across the team,
                there is very little we have not seen, solved, or made. Whether
                furnishing a single room or an entire country house, the level
                of care and attention remains the same.
              </Text>
            </SectionReveal>

            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/The-Old-Mill-Broadway-057-scaled-1.webp"
                alt="Elegant sofa with cushions in a light-filled Cotswolds interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <Text as="h2">Visit the Workshop & Store</Text>
              <Text variant="body" className="mt-6 text-stone">
                We welcome visitors to the showroom and workshop by appointment.
                Come and experience our fabrics, see our craftspeople at work,
                and begin a conversation about your next project.
              </Text>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="space-y-6">
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Address
                  </Text>
                  <Text variant="body" className="mt-1 text-stone">
                    Cotswold Design Centre, Kennel Lane
                    <br />
                    Broadway, Worcestershire WR12 7DJ
                  </Text>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Telephone
                  </Text>
                  <a
                    href="tel:+441386858941"
                    className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-stone transition-colors duration-[var(--duration-fast)] hover:text-clay"
                  >
                    01386 858941
                  </a>
                </div>
                <div>
                  <Text variant="caption" className="text-charcoal">
                    Visits
                  </Text>
                  <Text variant="body" className="mt-1 text-stone">
                    By appointment
                  </Text>
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
                  >
                    Get in touch
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
