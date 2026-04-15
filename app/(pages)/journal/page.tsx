import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import { getAllJournalPosts, formatDate, getPillarLabel } from "@/lib/journal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Journal — Interior Design Inspiration & Ideas",
  description:
    "Design commentary, craft insights, and interior inspiration from the Savery's of Broadway studio. Upholstery, fabrics, Cotswold interiors, and more.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — Interior Design Inspiration & Ideas",
    description:
      "Design commentary, craft insights, and interior inspiration from the Savery's of Broadway studio.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function JournalPage() {
  const posts = getAllJournalPosts();

  return (
    <>
      <Hero
        heading="Journal"
        subtitle="Design commentary, craft insights, and inspiration from the Savery's studio"
        image="/images/hero/services.webp"
      />
      <Breadcrumbs items={[{ name: "Journal", href: "/journal" }]} />

      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <SectionReveal>
              <Text variant="body" className="text-center text-stone">
                New entries coming soon.
              </Text>
            </SectionReveal>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {posts.map((post, i) => (
                <SectionReveal key={post.slug} delay={i * 0.1}>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={
                            post.featuredImageAlt ||
                            `${post.title} — Savery's Journal`
                          }
                          fill
                          className="object-cover transition-transform duration-[600ms] ease-[var(--ease-saverys)] group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Text
                            variant="caption"
                            className="text-stone/40"
                          >
                            Savery&apos;s Journal
                          </Text>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      {post.pillar && (
                        <Text variant="caption" className="text-saverys-green">
                          {getPillarLabel(post.pillar)}
                        </Text>
                      )}
                      <Text as="h3" className="mt-1">
                        {post.title}
                      </Text>
                      <Text variant="small" className="mt-1 text-stone/60">
                        {formatDate(post.date)}
                      </Text>
                      {post.summary && (
                        <Text variant="small" className="mt-2 text-stone">
                          {post.summary.length > 120
                            ? `${post.summary.slice(0, 120)}…`
                            : post.summary}
                        </Text>
                      )}
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
