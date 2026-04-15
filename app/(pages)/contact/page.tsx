import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPageContent, buildMetadata, type PageSeo } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<{ seo?: PageSeo }>("contact");
  return buildMetadata(
    seo,
    "/contact",
    "Contact Us — Broadway, Ludlow & Chelsea",
    "Get in touch with Savery's of Broadway. Visit our interior design studios in Broadway, Ludlow, or Chelsea, or enquire about a new project.",
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
      />
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <ContactSection />
    </>
  );
}
