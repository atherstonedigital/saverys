"use client";

import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

const showrooms = [
  {
    name: "Broadway",
    address: "Cotswold Design Centre, Kennel Lane, Broadway, WR12 7DJ",
    phone: "01386 858941",
    mobile: "07894 096098",
  },
  {
    name: "Ludlow",
    address: "1 Tower Street, Ludlow, SY8 1RL",
    phone: "01584 708381",
    mobile: "07415 065580",
  },
  {
    name: "Chelsea",
    address: "Suite 9, 405 Kings Road, Chelsea",
    phone: "020 3668 1000",
  },
];

export function ContactSection() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2">Begin a conversation</Text>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2">
          {/* Left: details + form */}
          <div>
            <SectionReveal delay={0.1}>
              <Text variant="body" className="max-w-md text-stone">
                Every project begins with listening. We take the time to
                understand how you live, what you value, and what a room should
                feel like.
              </Text>

              <div className="mt-8">
                <Text variant="caption" className="text-charcoal">
                  Email
                </Text>
                <Text variant="body" className="mt-1">
                  studio@saverys.co.uk
                </Text>
              </div>

              <div className="mt-10">
                <Text variant="caption" className="text-charcoal">
                  Come and visit us
                </Text>
                <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {showrooms.map((showroom) => (
                    <div key={showroom.name}>
                      <Text
                        variant="small"
                        className="font-normal text-charcoal"
                      >
                        {showroom.name}
                      </Text>
                      <Text variant="small" className="mt-1 text-stone">
                        {showroom.address}
                      </Text>
                      <Text variant="small" className="mt-2 text-stone">
                        {showroom.phone}
                      </Text>
                      {showroom.mobile && (
                        <Text variant="small" className="text-stone">
                          {showroom.mobile}
                        </Text>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <form className="mt-12 flex flex-col gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                <div>
                  <Button type="submit">Send message</Button>
                </div>
              </form>
            </SectionReveal>
          </div>

          {/* Right: atmospheric image */}
          <div className="hidden md:block">
            <SectionReveal delay={0.15}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/hero/contact.jpg"
                  alt="Ikat armchair with botanical prints"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
