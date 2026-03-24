"use client";

import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface MasonryProject {
  name: string;
  slug: string;
  description: string;
  image: string;
  orientation: "portrait" | "landscape";
}

interface MasonryGridProps {
  projects: MasonryProject[];
}

export function MasonryGrid({ projects }: MasonryGridProps) {
  // Split into two columns for masonry effect
  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Left column — starts flush */}
          <div className="flex flex-col gap-8 md:gap-12">
            {leftCol.map((project, i) => (
              <MasonryCard key={project.slug} project={project} delay={i * 0.1} />
            ))}
          </div>
          {/* Right column — offset down for masonry feel */}
          <div className="flex flex-col gap-8 md:mt-24 md:gap-12">
            {rightCol.map((project, i) => (
              <MasonryCard key={project.slug} project={project} delay={i * 0.1 + 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MasonryCard({
  project,
  delay,
}: {
  project: MasonryProject;
  delay: number;
}) {
  const aspect =
    project.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <SectionReveal delay={delay}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className={`relative ${aspect} w-full overflow-hidden`}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-saverys)] group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="mt-4">
          <Text variant="caption" className="text-stone">
            {project.name}
          </Text>
          <Text variant="small" className="mt-1 text-stone">
            {project.description}
          </Text>
        </div>
      </Link>
    </SectionReveal>
  );
}
