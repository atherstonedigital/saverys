#!/usr/bin/env node
// SEO launch prep — 2026-04-27
// Surface markdown images with empty alt and HTML <img> tags missing alt
// across content/journal and content/projects, plus frontmatter images that
// don't have a sibling alt-text field set. Output a markdown report under
// audit-reports/ for the team to backfill.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOTS = ["content/journal", "content/projects"];
const issues = [];

async function listMarkdownFiles(root) {
  try {
    const entries = await fs.readdir(root, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .map((e) => path.join(root, e.name));
  } catch {
    return [];
  }
}

function frontmatterIssues(fm) {
  const reasons = [];
  if (fm.featuredImage && !fm.featuredImageAlt) {
    if (typeof fm.featuredImage === "string") {
      reasons.push("featuredImage set but featuredImageAlt missing");
    } else if (
      typeof fm.featuredImage === "object" &&
      fm.featuredImage !== null &&
      !fm.featuredImage.alt
    ) {
      reasons.push("featuredImage.alt missing");
    }
  }
  if (fm.heroImage && !fm.heroImageAlt) {
    if (typeof fm.heroImage === "string") {
      reasons.push("heroImage set but heroImageAlt missing");
    } else if (
      typeof fm.heroImage === "object" &&
      fm.heroImage !== null &&
      !fm.heroImage.alt
    ) {
      reasons.push("heroImage.alt missing");
    }
  }
  if (Array.isArray(fm.gallery)) {
    fm.gallery.forEach((g, i) => {
      if ((g.image || g.src) && !g.alt) {
        reasons.push(`gallery[${i}] missing alt`);
      }
    });
  }
  return reasons;
}

for (const root of ROOTS) {
  const files = await listMarkdownFiles(root);
  for (const fullPath of files) {
    const text = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(text);

    const emptyMarkdownAlt = (content.match(/!\[\]\([^)]+\)/g) || []).length;
    const htmlMissingAlt = (
      content.match(/<img(?![^>]*\salt=)[^>]*>/gi) || []
    ).length;
    const fmIssues = frontmatterIssues(data);

    if (emptyMarkdownAlt || htmlMissingAlt || fmIssues.length) {
      issues.push({
        file: fullPath,
        emptyMarkdownAlt,
        htmlMissingAlt,
        frontmatter: fmIssues,
      });
    }
  }
}

const today = new Date().toISOString().slice(0, 10);
const lines = [
  `# Alt text audit — ${today}`,
  "",
  issues.length === 0
    ? "No issues found."
    : `${issues.length} files with missing alt text.`,
  "",
  "| File | Markdown empty alt | HTML missing alt | Frontmatter issues |",
  "|------|-------------------:|-----------------:|--------------------|",
  ...issues.map(
    (i) =>
      `| ${i.file} | ${i.emptyMarkdownAlt} | ${i.htmlMissingAlt} | ${
        i.frontmatter.join("; ") || "—"
      } |`,
  ),
];

await fs.mkdir("audit-reports", { recursive: true });
await fs.writeFile("audit-reports/missing-alt-text.md", lines.join("\n"));
console.log("Report written to audit-reports/missing-alt-text.md");
console.log(`${issues.length} files with issues.`);
