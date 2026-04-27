// SEO launch prep — 2026-04-27
// Thin wrapper around gtag for conversion-relevant events. Safe on the server
// (no-op when window is undefined) and when GA hasn't loaded (no-op when
// window.gtag isn't present, e.g. on staging).

export type EventName =
  | "form_submit"
  | "phone_click"
  | "email_click"
  | "directions_click";

export interface EventParams {
  location?: "broadway" | "ludlow" | "chelsea" | "general";
  form_name?: string;
  [key: string]: unknown;
}

export function trackEvent(name: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (!("gtag" in window)) return;
  // @ts-expect-error gtag is injected globally by GA4 script
  window.gtag("event", name, params);
}
