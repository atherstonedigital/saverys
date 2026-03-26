import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("contact");
  return buildMetadata(
    seo,
    "/contact",
    "Contact Us — Broadway, Ludlow & Chelsea",
    "Get in touch with Savery's of Broadway. Visit our studios in Broadway, Ludlow, or Chelsea, or enquire about a new project.",
  );
}

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
        seoHeading="Contact Savery's of Broadway — Interior Design Studios"
      />
      <ContactSection />
    </>
  );
}
