import fs from "fs";
import path from "path";
import type { Metadata } from "next";

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

export function getSettings<T>(): T {
  const filePath = path.join(process.cwd(), "content", "settings", "general.json");
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
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: seo?.ogImage
      ? { images: [{ url: seo.ogImage }] }
      : undefined,
  };
}
