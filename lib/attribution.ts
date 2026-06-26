// Enquiry source capture — 2026-06-26
// First-touch attribution for the contact form. On the visitor's first page
// load we read the UTM parameters, ad click IDs, referrer and landing page,
// then persist them in localStorage so they survive multi-page browsing and
// are only set once per device. `submitted_page` is intentionally not part of
// the stored first-touch payload — it is always read live at submit time.
//
// Every window/document/localStorage access is SSR-guarded so this module is
// safe to import from a client component that renders during the server pass.

const STORAGE_KEY = "sav_attr";

// First-touch field names. These must match the hidden input `name`
// attributes in the contact form and the build-time form in
// public/__forms.html character for character.
const FIRST_TOUCH_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "referrer",
  "landing_page",
] as const;

type FirstTouchKey = (typeof FIRST_TOUCH_KEYS)[number];

export type Attribution = Record<FirstTouchKey, string> & {
  submitted_page: string;
};

function emptyFirstTouch(): Record<FirstTouchKey, string> {
  return FIRST_TOUCH_KEYS.reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {} as Record<FirstTouchKey, string>,
  );
}

// Read the first-touch values from the current landing URL. Only called when
// nothing is stored yet, i.e. on the visitor's first page load in this device.
function readFirstTouch(): Record<FirstTouchKey, string> {
  const values = emptyFirstTouch();
  if (typeof window === "undefined") return values;

  const params = new URLSearchParams(window.location.search);
  const fromQuery = (name: FirstTouchKey) => params.get(name) ?? "";

  values.utm_source = fromQuery("utm_source");
  values.utm_medium = fromQuery("utm_medium");
  values.utm_campaign = fromQuery("utm_campaign");
  values.utm_term = fromQuery("utm_term");
  values.utm_content = fromQuery("utm_content");
  values.gclid = fromQuery("gclid");
  values.fbclid = fromQuery("fbclid");
  values.referrer =
    typeof document !== "undefined" ? document.referrer : "";
  values.landing_page = window.location.pathname + window.location.search;

  return values;
}

// Return the first-touch attribution, reading and persisting it on first call
// and reusing the stored values thereafter. Safe to call on every mount.
function getFirstTouch(): Record<FirstTouchKey, string> {
  if (typeof window === "undefined") return emptyFirstTouch();

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<Record<FirstTouchKey, string>>;
      const values = emptyFirstTouch();
      for (const key of FIRST_TOUCH_KEYS) {
        if (typeof parsed[key] === "string") values[key] = parsed[key] as string;
      }
      return values;
    }
  } catch {
    // Corrupt or unavailable storage — fall through and re-capture.
  }

  const fresh = readFirstTouch();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    // Storage unavailable (private mode, quota). The values still post for
    // this page load; we simply can't persist them across navigation.
  }
  return fresh;
}

// The page the form is actually submitted from, read live at call time.
export function getSubmittedPage(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname + window.location.search;
}

// Full attribution payload for populating the form's hidden inputs on mount.
// `submitted_page` is included for completeness but should be refreshed at
// submit via getSubmittedPage().
export function getAttribution(): Attribution {
  return {
    ...getFirstTouch(),
    submitted_page: getSubmittedPage(),
  };
}
