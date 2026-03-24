"use client";

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
              <div className="group">
                <div className="aspect-[4/3] w-full bg-linen" />
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
