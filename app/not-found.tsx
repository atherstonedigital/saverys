import type { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/components/ui/Text";

// SEO launch prep — 2026-04-27
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const helpfulLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Savery's" },
  { href: "/projects", label: "Our Projects" },
  { href: "/journal", label: "The Journal" },
  { href: "/showroom/broadway", label: "Broadway Showroom" },
  { href: "/showroom/ludlow", label: "Ludlow Showroom" },
  { href: "/contact", label: "Get in Touch" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-24 md:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <Text
          variant="caption"
          className="mb-6 block text-stone/60"
        >
          404
        </Text>
        <Text as="h1" className="mb-6">
          We can&rsquo;t find that page
        </Text>
        <Text variant="body" className="mb-12 text-stone">
          The page you were looking for may have moved, or perhaps the link you
          followed is out of date. Here are some places to start instead.
        </Text>
        <ul className="mx-auto grid max-w-md gap-4 text-left">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-charcoal underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-clay hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
