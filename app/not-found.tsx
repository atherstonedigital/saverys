import type { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center md:px-12">
      <Text as="h1">Page not found</Text>
      <Text variant="body" className="mt-6 max-w-md text-stone">
        The page you are looking for may have been moved or no longer exists.
      </Text>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link
          href="/"
          className="inline-block border border-charcoal bg-transparent px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-cream"
        >
          Return home
        </Link>
        <Link
          href="/projects"
          className="inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal underline underline-offset-4 transition-colors duration-500 hover:text-clay"
        >
          View projects
        </Link>
        <Link
          href="/contact"
          className="inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal underline underline-offset-4 transition-colors duration-500 hover:text-clay"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
