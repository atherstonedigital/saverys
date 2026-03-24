"use client";

import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface Service {
  title: string;
  description: string;
  image?: string;
}

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {services.map((service, i) => {
          const isEven = i % 2 === 0;
          return (
            <SectionReveal key={service.title} delay={i * 0.1}>
              <div className="border-t border-clay/30 py-12 md:py-20">
                <div
                  className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                    !isEven ? "md:direction-rtl" : ""
                  }`}
                >
                  {/* Text — alternates left/right */}
                  <div className={!isEven ? "md:order-2 md:text-right" : ""}>
                    <Text as="h2">{service.title}</Text>
                    <Text
                      variant="body"
                      className="mt-4 max-w-lg text-stone md:text-lg md:leading-relaxed"
                    >
                      {service.description}
                    </Text>
                    <a
                      href="/contact"
                      className="mt-6 inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal underline underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-clay"
                    >
                      Enquire about this service &rarr;
                    </a>
                  </div>

                  {/* Image */}
                  {service.image && (
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden ${
                        !isEven ? "md:order-1" : ""
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
