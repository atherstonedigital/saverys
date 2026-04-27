import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { getProject, getAllProjectSlugs } from "@/lib/projects";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { siteConfig } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${siteConfig.url}/projects/${slug}`;
  return {
    title: { absolute: `${project.name} — ${project.location} | Savery's Portfolio` },
    description: `Interior design project by Savery's of Broadway: ${project.name} in ${project.location}. View the full gallery.`,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} — ${project.location}`,
      description: `Interior design project by Savery's of Broadway: ${project.name} in ${project.location}.`,
      url,
      siteName: siteConfig.name,
      images: [{ url: project.heroImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const leftImages = project.images.filter((_, i) => i % 2 === 0);
  const rightImages = project.images.filter((_, i) => i % 2 === 1);

  const schemaJson = generateSchema({
    pageType: "project",
    projectTitle: `${project.name}, ${project.location}`,
    gallery: project.images.map((img) => img.src),
    breadcrumbs: [
      { name: "Projects", url: `${siteConfig.url}/projects` },
      { name: project.name, url: `${siteConfig.url}/projects/${slug}` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Hero
        heading={project.name}
        subtitle={project.year ? `${project.location} — ${project.year}` : project.location}
        image={project.heroImage}
      />
      <Breadcrumbs
        items={[
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${slug}` },
        ]}
      />

      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Text variant="body" className="text-stone">
            {project.body}
          </Text>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col gap-6 md:gap-8">
              {leftImages.map((img) => (
                <div
                  key={img.src}
                  className={`relative w-full overflow-hidden ${
                    img.orientation === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6 md:mt-16 md:gap-8">
              {rightImages.map((img) => (
                <div
                  key={img.src}
                  className={`relative w-full overflow-hidden ${
                    img.orientation === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone/10 px-6 py-16 text-center md:px-12">
        <Button href="/projects" variant="text">
          &larr; Back to all projects
        </Button>
      </section>
    </>
  );
}
