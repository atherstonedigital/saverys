import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Begin a Conversation",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        heading="Get in touch"
        image="/images/hero/contact.webp"
      />
      <ContactSection />
    </>
  );
}
