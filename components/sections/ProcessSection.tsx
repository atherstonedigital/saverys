"use client";

import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessSectionProps {
  heading: string;
  steps: ProcessStep[];
}

export function ProcessSection({ heading, steps }: ProcessSectionProps) {
  return (
    <section className="px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Thin decorative rule */}
        <div className="mb-12 h-px w-16 bg-clay/40" />

        <SectionReveal>
          <Text as="h2">{heading}</Text>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-3 md:gap-0">
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
                  {String(i + 1)}.
                </span>
                <Text as="h3" className="mt-3">
                  {step.title}
                </Text>
                <Text variant="body" className="mt-3 text-stone">
                  {step.description}
                </Text>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
