import type { NextConfig } from "next";

// SEO launch prep — 2026-04-27
// Use explicit statusCode: 301 (not `permanent: true`, which Next.js maps to
// 308) so legacy WordPress URLs return the canonical permanent redirect that
// the migration plan calls for.
const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/webp"],
  },

  async redirects() {
    return [
      // SEO launch prep — 2026-04-27
      // WordPress legacy paths (also covered defensively in netlify.toml)
      { source: "/our-history", destination: "/about", statusCode: 301 },
      { source: "/our-history/", destination: "/about", statusCode: 301 },
      { source: "/our-portfolio", destination: "/projects", statusCode: 301 },
      { source: "/our-portfolio/", destination: "/projects", statusCode: 301 },
      { source: "/contact/", destination: "/contact", statusCode: 301 },
      { source: "/privacy-policy", destination: "/privacy", statusCode: 301 },
      { source: "/privacy-policy/", destination: "/privacy", statusCode: 301 },

      // Orphan WordPress assets and admin paths
      { source: "/wp-content/:path*", destination: "/", statusCode: 301 },
      { source: "/wp-admin/:path*", destination: "/", statusCode: 301 },
      { source: "/wp-includes/:path*", destination: "/", statusCode: 301 },
      { source: "/wp-login.php", destination: "/", statusCode: 301 },

      // Old RSS feeds
      { source: "/feed", destination: "/journal", statusCode: 301 },
      { source: "/feed/", destination: "/journal", statusCode: 301 },
      // www → apex is handled by Netlify primary-domain settings.
    ];
  },
};

export default nextConfig;
