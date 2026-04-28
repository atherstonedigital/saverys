import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import {
  getAllJournalPosts,
  getJournalPostBySlug,
  getRelatedPosts,
  formatDate,
  getPillarLabel,
} from "@/lib/journal";
import { generateSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { siteConfig } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};

  const titleText =
    post.seoTitle || `${post.title} | Savery's of Broadway`;
  const description =
    post.seoDescription || post.summary || post.title;
  const url = `${siteConfig.url}/journal/${slug}`;

  return {
    title: { absolute: titleText },
    description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: siteConfig.name,
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const schemaJson = generateSchema({
    pageType: "article",
    url: `${siteConfig.url}/journal/${slug}`,
    breadcrumbs: [
      { name: "Journal", url: `${siteConfig.url}/journal` },
      { name: post.title, url: `${siteConfig.url}/journal/${slug}` },
    ],
    article: {
      headline: post.title,
      datePublished: post.date,
      image: post.featuredImage,
      summary: post.summary,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {post.featuredImage ? (
        <Hero
          heading={post.title}
          image={post.featuredImage}
        />
      ) : (
        <section className="px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-3xl">
            <Text as="h1">{post.title}</Text>
          </div>
        </section>
      )}
      <Breadcrumbs
        items={[
          { name: "Journal", href: "/journal" },
          { name: post.title, href: `/journal/${slug}` },
        ]}
      />

      <section className="px-6 pb-4 md:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <div className="flex flex-wrap items-center gap-4">
              <Text variant="small" className="text-stone/60">
                {formatDate(post.date)}
              </Text>
              {post.pillar && (
                <>
                  <span className="text-stone/30">·</span>
                  <Text variant="caption" className="text-saverys-green">
                    {getPillarLabel(post.pillar)}
                  </Text>
                </>
              )}
            </div>
          </SectionReveal>
        </div>
      </section>

      <article className="px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <div
              className="journal-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </SectionReveal>
        </div>
      </article>

      {post.tags && post.tags.length > 0 && (
        <section className="px-6 pb-8 md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap gap-2 border-t border-clay/20 pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-saverys-green/15 px-3 py-1 font-body text-xs font-normal uppercase tracking-[0.06em] text-stone/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-linen px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionReveal>
              <Text as="h2" className="mb-10">
                Further reading
              </Text>
            </SectionReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              {related.map((relPost, i) => (
                <SectionReveal key={relPost.slug} delay={i * 0.1}>
                  <Link
                    href={`/journal/${relPost.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                      {relPost.featuredImage ? (
                        <Image
                          src={relPost.featuredImage}
                          alt={
                            relPost.featuredImageAlt ||
                            `${relPost.title} — Savery's Journal`
                          }
                          fill
                          className="object-cover transition-transform duration-[600ms] ease-[var(--ease-saverys)] group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Text variant="caption" className="text-stone/40">
                            Savery&apos;s Journal
                          </Text>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <Text as="h3">{relPost.title}</Text>
                      <Text variant="small" className="mt-1 text-stone/60">
                        {formatDate(relPost.date)}
                      </Text>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-stone/10 px-6 py-12 text-center md:px-12">
        <Link
          href="/journal"
          className="inline-block font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal underline underline-offset-4 transition-colors duration-500 hover:text-clay"
        >
          &larr; Back to Journal
        </Link>
      </section>
    </>
  );
}
