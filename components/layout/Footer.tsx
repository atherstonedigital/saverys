import Link from "next/link";
import { Text } from "@/components/ui/Text";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div>
            <Link
              href="/"
              className="font-display text-lg tracking-[0.12em] text-cream uppercase"
            >
              Saverys
            </Link>
            <Text variant="small" className="mt-4 max-w-xs text-cream/50">
              An interior design studio rooted in the Cotswolds.
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
              The Cotswolds, England
            </Text>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-6">
          <Text variant="caption" className="text-cream/30">
            &copy; {new Date().getFullYear()} Saverys. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
