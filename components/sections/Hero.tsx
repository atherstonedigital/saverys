"use client";

import { useEffect, useRef } from "react";
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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add("hero-visible");
    });
  }, []);

  return (
    <section
      ref={ref}
      className="hero-hidden relative h-screen w-full bg-ink"
    >
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
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/50 to-transparent" />
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
    </section>
  );
}
