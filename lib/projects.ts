import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectImage {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  year?: string;
  description: string;
  body: string;
  heroImage: string;
  // SEO launch prep — 2026-04-27
  heroImageAlt?: string;
  images: ProjectImage[];
  featured: boolean;
  order: number;
  date?: string;
}

interface ProjectFrontmatter {
  title?: string;
  slug?: string;
  location?: string;
  year?: string;
  description?: string;
  // SEO launch prep — 2026-04-27: accept either string or {src, alt}
  heroImage?: string | { src?: string; alt?: string };
  heroImageAlt?: string;
  gallery?: Array<{
    image?: string;
    src?: string;
    alt?: string;
    orientation?: "portrait" | "landscape";
  }>;
  featured?: boolean;
  order?: number;
  date?: string | Date;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const entries = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".md"));

  const projects = entries.map<Project>((entry) => {
    const filename = entry.name;
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as ProjectFrontmatter;

    const slug = fm.slug || filename.replace(/\.md$/, "");
    const images: ProjectImage[] = (fm.gallery || []).flatMap((g) => {
      const src = g.image || g.src;
      if (!src) return [];
      return [
        {
          src,
          alt: g.alt || "",
          orientation: g.orientation === "portrait" ? "portrait" : "landscape",
        },
      ];
    });

    // SEO launch prep — 2026-04-27: accept flat or object hero image
    let heroImage = "";
    let heroImageAlt: string | undefined =
      typeof fm.heroImageAlt === "string" ? fm.heroImageAlt : undefined;
    if (typeof fm.heroImage === "string") {
      heroImage = fm.heroImage;
    } else if (fm.heroImage && typeof fm.heroImage === "object") {
      heroImage = fm.heroImage.src || "";
      heroImageAlt = fm.heroImage.alt || heroImageAlt;
    }

    return {
      slug,
      name: fm.title || slug,
      location: fm.location || "",
      year: fm.year || undefined,
      description: fm.description || "",
      body: content.trim(),
      heroImage,
      heroImageAlt,
      images,
      featured: Boolean(fm.featured),
      order: typeof fm.order === "number" ? fm.order : 999,
      date: fm.date
        ? new Date(fm.date).toISOString()
        : undefined,
    };
  });

  return projects.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    if (a.date && b.date) return a.date.localeCompare(b.date);
    return a.slug.localeCompare(b.slug);
  });
}

export const projects: Project[] = readProjects();

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
