"use client";

// SEO launch prep — 2026-04-27
// Hostname-based GA4 gating. NODE_ENV alone fires on Netlify deploy previews;
// gating on the live hostname keeps preview/staging traffic out of GA.
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const PRODUCTION_HOSTS = ["saverys.co.uk", "www.saverys.co.uk"];

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (PRODUCTION_HOSTS.includes(window.location.hostname) && GA_ID) {
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
