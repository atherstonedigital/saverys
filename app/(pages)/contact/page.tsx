import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Begin a Conversation",
};

interface ContactContent {
  hero: { heading: string; image: string };
}

export default function ContactPage() {
  const content = getPageContent<ContactContent>("contact");

  return (
    <>
      <Hero
        heading={content.hero.heading}
        image={content.hero.image}
      />
      <ContactSection />
    </>
  );
}
