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
            <Text variant="small" className="mt-3 text-cream/60">
              studio@saverys.co.uk
            </Text>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 md:gap-16">
            <div>
              <Text variant="caption" className="text-cream/40">
                Broadway
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                Cotswold Design Centre, Kennel Lane, Broadway, WR12 7DJ
              </Text>
              <Text variant="small" className="mt-1 text-cream/50">
                01386 858941
              </Text>
            </div>
            <div>
              <Text variant="caption" className="text-cream/40">
                Ludlow
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                1 Tower Street, Ludlow, SY8 1RL
              </Text>
              <Text variant="small" className="mt-1 text-cream/50">
                01584 708381
              </Text>
            </div>
            <div>
              <Text variant="caption" className="text-cream/40">
                Chelsea
              </Text>
              <Text variant="small" className="mt-2 max-w-[11rem] text-cream/60">
                Suite 9, 405 Kings Road, Chelsea
              </Text>
              <Text variant="small" className="mt-1 text-cream/50">
                020 3668 1000
              </Text>
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
