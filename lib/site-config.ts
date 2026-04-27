// SEO launch prep — 2026-04-27
// Lightweight re-export shim so call sites can import a stable, framework-
// neutral URL/name/locale set without pulling the whole siteConfig.
import { siteConfig } from "@/lib/config";

export const SITE_URL = siteConfig.url;
export const SITE_NAME = siteConfig.name;
export const SITE_LOCALE = "en_GB";
