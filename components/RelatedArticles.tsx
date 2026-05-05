import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";
import {
  formatDate,
  getPillarLabel,
  getRelatedByTags,
} from "@/lib/journal";

interface RelatedArticlesProps {
  currentSlug: string;
  tags?: string[];
}

export function RelatedArticles({ currentSlug, tags }: RelatedArticlesProps) {
  const related = getRelatedByTags(currentSlug, tags, 3);
  if (related.length === 0) return null;

  return (
    <section className="bg-linen px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2" className="mb-10">
            Further reading
          </Text>
        </SectionReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {related.map((post, i) => (
            <SectionReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={
                        post.featuredImageAlt ||
                        `${post.title} — Savery's Journal`
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
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
