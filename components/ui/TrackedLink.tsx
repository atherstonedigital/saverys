"use client";

// SEO launch prep — 2026-04-27
// Client wrapper for plain anchors so server components (e.g. Footer) can
// emit GA4 conversion events on click without losing the static-render
// boundary for the rest of their tree.
import { trackEvent, type EventName, type EventParams } from "@/lib/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: EventName;
  eventParams?: EventParams;
  children: ReactNode;
}

export function TrackedLink({
  event,
  eventParams,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
