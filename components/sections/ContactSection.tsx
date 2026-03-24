"use client";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function ContactSection() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2">Begin a conversation</Text>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2">
          <SectionReveal delay={0.1}>
            <div>
              <Text variant="body" className="max-w-md text-stone">
                Every project begins with listening. We take the time to
                understand how you live, what you value, and what a room should
                feel like.
              </Text>
              <div className="mt-8">
                <Text variant="caption" className="text-stone">
                  Email
                </Text>
                <Text variant="body" className="mt-1">
                  studio@saverys.co.uk
                </Text>
              </div>
              <div className="mt-6">
                <Text variant="caption" className="text-stone">
                  Studio
                </Text>
                <Text variant="body" className="mt-1">
                  Broadway, Worcestershire
                </Text>
                <Text variant="small" className="mt-1 text-stone">
                  The Cotswolds, England
                </Text>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <form className="flex flex-col gap-8">
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
      </div>
    </section>
  );
}
