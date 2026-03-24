import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <Hero heading="Get in touch" />
      <ContactSection />
    </>
  );
}
