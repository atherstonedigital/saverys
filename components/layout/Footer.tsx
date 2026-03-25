import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/Text";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div>
            <Link href="/" className="relative block h-10 w-36">
              <Image
                src="/logo-black.png"
                alt="Savery's of Broadway"
                fill
                className="object-contain brightness-0 invert"
                sizes="144px"
              />
            </Link>
            <Text variant="small" className="mt-4 max-w-xs text-cream/50">
              Luxury interior design, rooted in the Cotswolds since 1991.
            </Text>
            <a
              href="mailto:studio@saverys.co.uk"
              className="mt-3 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/60 transition-colors duration-300 hover:text-cream"
            >
              studio@saverys.co.uk
            </a>
            <a
              href="https://instagram.com/saverycotswolds"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-body text-xs uppercase tracking-[0.1em] text-cream/50 transition-colors duration-300 hover:text-cream"
            >
              Instagram
            </a>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 md:gap-16">
            <div>
              <Text variant="caption" className="text-cream/40">
                Broadway
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                Cotswold Design Centre, Kennel Lane, Broadway, WR12 7DJ
              </Text>
              <a
                href="tel:+441386858941"
                className="mt-1 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                01386 858941
              </a>
            </div>
            <div>
              <Text variant="caption" className="text-cream/40">
                Ludlow
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                1 Tower Street, Ludlow, SY8 1RL
              </Text>
              <a
                href="tel:+441584708381"
                className="mt-1 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                01584 708381
              </a>
            </div>
            <div>
              <Text variant="caption" className="text-cream/40">
                Chelsea
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                Suite 9, 405 Kings Road, Chelsea
              </Text>
              <a
                href="tel:+442036681000"
                className="mt-1 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                020 3668 1000
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-6">
          <Text variant="caption" className="text-cream/30">
            &copy; {new Date().getFullYear()} Savery&apos;s of Broadway. All
            rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
