import Link from "next/link";
import { siteConfig } from "@/lib/config";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item:
        item.href === "/"
          ? siteConfig.url
          : `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={className || "px-6 py-4 md:px-12"}
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 font-body text-xs font-normal tracking-[0.04em] text-stone/50">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-charcoal"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-stone/70">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
