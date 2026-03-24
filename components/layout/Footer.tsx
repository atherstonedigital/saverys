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
              An interior design studio rooted in the Cotswolds, est. 1991.
            </Text>
          </div>

          <div className="text-right">
            <Text variant="caption" className="text-cream/40">
              Contact
            </Text>
            <Text variant="small" className="mt-3 text-cream/60">
              studio@saverys.co.uk
            </Text>
            <Text variant="small" className="mt-1 text-cream/60">
              Broadway, The Cotswolds
            </Text>
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
