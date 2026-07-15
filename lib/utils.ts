import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Anchor ids for in-page navigation, e.g. "Curtains & soft furnishings"
// -> "curtains-and-soft-furnishings". Keep in step with any nav links
// that point at /services#<slug>.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
