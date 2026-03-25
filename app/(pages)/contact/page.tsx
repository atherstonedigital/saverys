import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us | Saverys Interior Design — Broadway, Ludlow & Chelsea",
  description:
    "Get in touch with Saverys of Broadway. Visit our interior design studios in Broadway, Ludlow or Chelsea. Call 01386 858941 to discuss your project.",
  alternates: { canonical: "/contact" },
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
