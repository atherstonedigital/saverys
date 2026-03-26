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

    return {
      slug: getSlugFromFilename(filename),
      title: data.title || "Untitled",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      featuredImage: data.featuredImage || undefined,
      featuredImageAlt: data.featuredImageAlt || undefined,
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

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): JournalPost[] {
  const posts = getAllJournalPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  const others = posts.filter((p) => p.slug !== currentSlug);

  // Score by shared pillar and tags
  const scored = others.map((post) => {
    let score = 0;
    if (current.pillar && post.pillar === current.pillar) score += 3;
    if (current.tags && post.tags) {
      const shared = post.tags.filter((t) => current.tags!.includes(t));
      score += shared.length;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
