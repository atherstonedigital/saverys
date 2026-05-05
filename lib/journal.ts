import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  summary?: string;
  body: string;
  pillar?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

const PILLAR_LABELS: Record<string, string> = {
  craft: "Craft & Making",
  fabric: "Fabric & Material",
  place: "Place & Cotswolds",
  design: "Design Thinking",
  project: "Project Stories",
};

export function getPillarLabel(pillar?: string): string | undefined {
  return pillar ? PILLAR_LABELS[pillar] : undefined;
}

const journalDir = path.join(process.cwd(), "content", "journal");

function getSlugFromFilename(filename: string): string {
  const name = filename.replace(/\.md$/, "");
  // Strip date prefixes like 2026-03-25-
  return name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

export function getAllJournalPosts(): JournalPost[] {
  if (!fs.existsSync(journalDir)) return [];

  const files = fs.readdirSync(journalDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(journalDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    const processedContent = remark().use(html, { allowDangerousHtml: true }).processSync(content);

    // SEO launch prep — 2026-04-27: accept either flat or object featuredImage
    // ("/path.jpg" or { src, alt }) so the lib stays compatible with both
    // historical content and any future migration to bundled image widgets.
    let featuredImage: string | undefined;
    let featuredImageAlt: string | undefined =
      typeof data.featuredImageAlt === "string" ? data.featuredImageAlt : undefined;
    if (typeof data.featuredImage === "string") {
      featuredImage = data.featuredImage;
    } else if (data.featuredImage && typeof data.featuredImage === "object") {
      const fi = data.featuredImage as { src?: string; alt?: string };
      featuredImage = fi.src;
      featuredImageAlt = fi.alt || featuredImageAlt;
    }

    return {
      slug: getSlugFromFilename(filename),
      title: data.title || "Untitled",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      featuredImage,
      featuredImageAlt,
      summary: data.summary || undefined,
      body: processedContent.toString(),
      pillar: data.pillar || undefined,
      tags: data.tags || undefined,
      seoTitle: data.seoTitle || undefined,
      seoDescription: data.seoDescription || undefined,
    } as JournalPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  const posts = getAllJournalPosts();
  return posts.find((p) => p.slug === slug);
}

export function getRelatedByTags(
  currentSlug: string,
  tags: string[] | undefined,
  limit: number = 3,
): JournalPost[] {
  const others = getAllJournalPosts().filter((p) => p.slug !== currentSlug);

  const tagged =
    tags && tags.length > 0
      ? others.filter((p) => p.tags?.some((t) => tags.includes(t)))
      : [];

  if (tagged.length >= limit) return tagged.slice(0, limit);

  const taggedSlugs = new Set(tagged.map((p) => p.slug));
  const fillers = others.filter((p) => !taggedSlugs.has(p.slug));
  return [...tagged, ...fillers].slice(0, limit);
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
