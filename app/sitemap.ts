import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saverys.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/workshop`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Dynamic project pages from lib/projects
  const { projects } = require("@/lib/projects");
  const projectPages: MetadataRoute.Sitemap = projects.map(
    (p: { slug: string }) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })
  );

  // Dynamic journal pages from content/journal/
  const journalDir = path.join(process.cwd(), "content", "journal");
  let journalPages: MetadataRoute.Sitemap = [];
  if (fs.existsSync(journalDir)) {
    const files = fs
      .readdirSync(journalDir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".json"));
    journalPages = files.map((file) => {
      const slug = file.replace(/\.(md|json)$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return {
        url: `${SITE_URL}/journal/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  }

  return [...staticPages, ...projectPages, ...journalPages];
}
