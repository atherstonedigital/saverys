import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// SEO launch prep — 2026-04-27
// Recommendation matrix: Saverys is a service business that benefits from
// AI visibility — allow retrieval, allow training. Block crawling on
// non-production Netlify contexts (deploy previews, branch deploys).
export default function robots(): MetadataRoute.Robots {
  const isNetlifyProduction = process.env.CONTEXT === "production";
  const isNonProductionNetlify =
    typeof process.env.CONTEXT === "string" && !isNetlifyProduction;

  if (isNonProductionNetlify) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/static/"],
      },
      // Explicit allow for AI retrieval and training bots
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
