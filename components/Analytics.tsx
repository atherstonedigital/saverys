"use client";

// SEO launch prep — 2026-04-27
// Hostname-based GA4 gating. NODE_ENV alone fires on Netlify deploy previews;
// gating on the live hostname keeps preview/staging traffic out of GA.
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Ads conversion tag. Conversion IDs are public in page source by
// design, so this is hardcoded rather than env-gated — it must not silently
// drop off if a Netlify env var goes missing.
const ADS_ID = "AW-18305074937";

const PRODUCTION_HOSTS = ["saverys.co.uk", "www.saverys.co.uk"];

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (PRODUCTION_HOSTS.includes(window.location.hostname)) {
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${
            GA_ID
              ? `gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });`
              : ""
          }
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
