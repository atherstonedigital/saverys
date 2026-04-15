import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/Text";

interface FooterLocation {
  name: string;
  address: string;
  phone: string;
  phoneTel: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterData {
  tagline: string;
  email: string;
  instagram: string;
  locations: FooterLocation[];
  links?: FooterLink[];
}

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  const defaultLinks: FooterLink[] = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Broadway Workshop", href: "/workshop-stores/broadway" },
    { label: "Ludlow Store", href: "/workshop-stores/ludlow" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;

  return (
    <footer className="border-t-2 border-saverys-green/40 bg-ink px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div>
            <Link href="/" className="relative block h-10 w-36">
              <Image
                src="/logo-black.png"
                alt="Saverys of Broadway — Luxury Interior Design"
                fill
                className="object-contain brightness-0 invert"
                sizes="144px"
              />
            </Link>
            <Text variant="small" className="mt-4 max-w-xs text-cream/50">
              {data.tagline}
            </Text>
            <a
              href={`mailto:${data.email}`}
              className="mt-3 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/60 transition-colors duration-300 hover:text-cream"
            >
              {data.email}
            </a>
            <a
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-body text-xs uppercase tracking-[0.1em] text-cream/50 transition-colors duration-300 hover:text-cream"
            >
              Instagram
            </a>
          </div>

          <div>
            <Text variant="caption" className="text-cream/40">
              Explore
            </Text>
            <nav className="mt-3 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/50 transition-colors duration-300 hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 md:gap-16">
            {data.locations.map((location) => (
              <div key={location.name}>
                <Text variant="caption" className="text-cream/40">
                  {location.name}
                </Text>
                <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                  {location.address}
                </Text>
                <a
                  href={`tel:${location.phoneTel}`}
                  className="mt-1 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/50 transition-colors duration-300 hover:text-cream"
                >
                  {location.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <Text variant="caption" className="text-cream/30">
              &copy; {new Date().getFullYear()} Savery&apos;s of Broadway. All
              rights reserved.
            </Text>
            <div className="flex gap-3">
              <Link
                href="/privacy"
                className="font-body text-[0.6rem] font-light tracking-[0.04em] text-cream/25 transition-colors duration-300 hover:text-cream/50"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-body text-[0.6rem] font-light tracking-[0.04em] text-cream/25 transition-colors duration-300 hover:text-cream/50"
              >
                Terms
              </Link>
            </div>
          </div>
          <a
            href="https://www.atherstonedigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[0.6rem] font-light tracking-[0.06em] text-cream/20 transition-colors duration-300 hover:text-cream/40"
          >
            Built &amp; managed by Atherstone Digital
          </a>
        </div>
      </div>
    </footer>
  );
}
