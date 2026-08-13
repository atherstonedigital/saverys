import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/lib/config";
import { getPageContent } from "@/lib/content";
import { renderInlineLinks } from "@/lib/inline-md";

interface CotswoldsContent {
  seo: { title: string; description: string; ogImage?: string };
  heading: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export function generateMetadata(): Metadata {
  const { seo } = getPageContent<CotswoldsContent>("cotswolds");
  const ogImage = seo.ogImage || "/og-image.webp";

  // Absolute title so the layout template does not append the brand
  // suffix a second time; the stored title already carries it.
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: "/cotswolds" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${siteConfig.url}/cotswolds`,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}: Interior design in the Cotswolds`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function CotswoldsPage() {
  const content = getPageContent<CotswoldsContent>("cotswolds");

  return (
    <>
      <section className="px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <Text as="h1">{content.heading}</Text>
          <Text variant="body" className="mt-6 text-stone">
            {renderInlineLinks(content.intro)}
          </Text>
        </div>
      </section>
      <Breadcrumbs
        items={[{ name: "Interior design in the Cotswolds", href: "/cotswolds" }]}
      />

      {content.sections.map((section) => (
        <section key={section.heading} className="px-6 py-10 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <SectionReveal>
              <Text as="h2">{section.heading}</Text>
              {section.paragraphs.map((p, i) => (
                <Text key={i} variant="body" className="mt-6 text-stone">
                  {renderInlineLinks(p)}
                </Text>
              ))}
            </SectionReveal>
          </div>
        </section>
      ))}
    </>
  );
}
