"use client";

import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface Service {
  title: string;
  description: string;
}

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col divide-y divide-stone/20">
          {services.map((service, i) => (
            <SectionReveal key={service.title} delay={i * 0.1}>
              <div className="py-10 md:py-14">
                <Text as="h3">{service.title}</Text>
                <Text variant="body" className="mt-3 max-w-2xl text-stone">
                  {service.description}
                </Text>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
