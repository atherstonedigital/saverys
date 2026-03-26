"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface NavProps {
  items: NavItem[];
}

export function Nav({ items }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

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

  function handleMouseEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  const linkClass = cn(
    "font-body text-xs font-normal uppercase tracking-[0.06em] transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)]",
    isScrolled
      ? "text-charcoal/70 hover:text-charcoal [text-shadow:none]"
      : "text-cream hover:text-cream [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
  );

  function renderDesktopLink(link: NavItem) {
    if (!link.children || link.children.length === 0) {
      return (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      );
    }

    return (
      <div
        key={link.label}
        className="relative"
        onMouseEnter={() => handleMouseEnter(link.label)}
        onMouseLeave={handleMouseLeave}
      >
        <button className={cn(linkClass, "cursor-pointer")}>
          {link.label}
        </button>
        <div
          className={cn(
            "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ease-[var(--ease-saverys)]",
            openDropdown === link.label
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-1 rounded-sm border px-5 py-3 shadow-sm",
              isScrolled
                ? "border-charcoal/10 bg-cream/95 backdrop-blur-xl"
                : "border-cream/10 bg-ink/90 backdrop-blur-xl"
            )}
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "whitespace-nowrap py-1.5 font-body text-xs font-normal uppercase tracking-[0.06em] transition-colors duration-200",
                  isScrolled
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-cream/70 hover:text-cream"
                )}
                onClick={() => setOpenDropdown(null)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderMobileLink(link: NavItem) {
    if (!link.children || link.children.length === 0) {
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsMobileOpen(false)}
          className="font-display text-2xl font-light tracking-[0.06em] text-cream"
        >
          {link.label}
        </Link>
      );
    }

    return (
      <div key={link.label} className="flex flex-col items-center gap-3">
        <span className="font-display text-2xl font-light tracking-[0.06em] text-cream/50">
          {link.label}
        </span>
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={() => setIsMobileOpen(false)}
            className="font-body text-sm font-light tracking-[0.04em] text-cream/80"
          >
            {child.label}
          </Link>
        ))}
      </div>
    );
  }

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
            {items.map(renderDesktopLink)}
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
            {items.map(renderMobileLink)}
          </div>
        </div>
      )}
    </>
  );
}
