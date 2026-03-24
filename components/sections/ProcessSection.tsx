"use client";

import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

const steps = [
  {
    number: "1",
    title: "Listening",
    text: "Every project begins with a conversation about how you live, what you value, and what a room should feel like.",
  },
  {
    number: "2",
    title: "Sourcing",
    text: "We work directly with mills, workshops, and craftspeople across Britain to select materials of genuine quality.",
  },
  {
    number: "3",
    title: "Composing",
    text: "From placement of furniture to final dressing, every detail is attended to until the room feels complete.",
  },
];

export function ProcessSection() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2">Our process</Text>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-0">
          {steps.map((step, i) => (
            <SectionReveal key={step.title} delay={i * 0.15}>
              <div
                className={
                  i > 0
                    ? "border-t border-clay/30 pt-8 md:border-t-0 md:border-l md:border-clay/30 md:pl-10 md:pt-0"
                    : ""
                }
              >
                <span className="font-caption text-sm tracking-wider text-clay">
                  {step.number}.
                </span>
                <Text as="h3" className="mt-3">
                  {step.title}
                </Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.text}
                </Text>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
