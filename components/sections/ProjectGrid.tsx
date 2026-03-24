"use client";

import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface Project {
  name: string;
  description: string;
  image?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {projects.map((project, i) => (
            <SectionReveal
              key={project.name}
              delay={i * 0.15}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-[var(--ease-saverys)] group-hover:scale-[1.02]"
                      sizes={i % 3 === 0 ? "100vw" : "50vw"}
                    />
                  )}
                </div>
                <div className="mt-4">
                  <Text variant="caption" className="text-stone">
                    {project.name}
                  </Text>
                  <Text variant="small" className="mt-1 text-stone">
                    {project.description}
                  </Text>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
