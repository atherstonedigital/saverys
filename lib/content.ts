import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
}

export function getPageContent<T>(page: string): T {
  const filePath = path.join(process.cwd(), "content", "pages", `${page}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSettings<T>(file: string = "general"): T {
  const filePath = path.join(process.cwd(), "content", "settings", `${file}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function buildMetadata(
  seo: PageSeo | undefined,
  canonicalPath: string,
  fallbackTitle: string,
  fallbackDescription: string,
): Metadata {
  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const url = canonicalPath === "/"
    ? siteConfig.url
    : `${siteConfig.url}${canonicalPath}`;
  const ogImage = seo?.ogImage || "/og-image.webp";

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${siteConfig.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
