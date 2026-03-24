"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface HeroProps {
  heading: string;
  subtitle?: string;
  image?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function Hero({ heading, subtitle, image, cta }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <>
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {/* Dark bottom gradient — no colour tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
          <Text as="h1" className="text-cream">
            {heading}
          </Text>
          {subtitle && (
            <Text variant="body" className="mt-4 max-w-lg text-cream/80">
              {subtitle}
            </Text>
          )}
          {cta && (
            <div className="mt-8">
              <Button
                href={cta.href}
                className="border-cream/60 text-cream hover:bg-cream hover:text-ink"
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (shouldReduceMotion) {
    return (
      <section className="relative h-screen w-full bg-ink">
        {content}
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease,
        delay: 0.1,
      }}
      className="relative h-screen w-full bg-ink"
    >
      {content}
    </motion.section>
  );
}
