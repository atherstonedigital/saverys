"use client";

import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface Project {
  name: string;
  slug?: string;
  description: string;
  image?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {projects.map((project, i) => (
            <SectionReveal
              key={project.name}
              delay={i * 0.15}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} index={i} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[var(--ease-saverys)] group-hover:scale-105"
            sizes={index % 3 === 0 ? "100vw" : "50vw"}
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-all duration-[600ms] ease-[var(--ease-saverys)] group-hover:bg-ink/30">
          <span className="translate-y-2 font-body text-xs font-normal uppercase tracking-[0.1em] text-cream opacity-0 transition-all duration-[600ms] ease-[var(--ease-saverys)] group-hover:translate-y-0 group-hover:opacity-100">
            View project &rarr;
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Text variant="caption" className="text-stone">
          {project.name}
        </Text>
        <Text variant="small" className="mt-1 text-stone">
          {project.description}
        </Text>
      </div>
    </>
  );

  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="group block">
        {inner}
      </Link>
    );
  }

  return <div className="group">{inner}</div>;
}
