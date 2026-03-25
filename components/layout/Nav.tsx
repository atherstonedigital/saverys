"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)]",
          isScrolled
            ? "bg-cream/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" className="relative block h-12 w-[172px]">
            <Image
              src="/logo-black.png"
              alt="Saverys of Broadway — Luxury Interior Design"
              fill
              className={cn(
                "object-contain transition-all duration-[var(--duration-fast)]",
                isScrolled
                  ? ""
                  : "brightness-0 invert drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              )}
              sizes="172px"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body text-xs font-normal uppercase tracking-[0.06em] transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)]",
                  isScrolled
                    ? "text-charcoal/70 hover:text-charcoal [text-shadow:none]"
                    : "text-cream hover:text-cream [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={cn(
                "block h-px w-6 transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)]",
                isScrolled ? "bg-charcoal" : "bg-cream",
                isMobileOpen && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-6 transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)]",
                isScrolled ? "bg-charcoal" : "bg-cream",
                isMobileOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink">
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-display text-2xl font-light tracking-[0.06em] text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
