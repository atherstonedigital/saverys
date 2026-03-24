import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        heading="Get in touch"
        image="https://images.unsplash.com/photo-1600566753086-00f18f6b6cf3?w=1920&q=80"
      />
      <ContactSection />
    </>
  );
}
