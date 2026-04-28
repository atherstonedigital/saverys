#!/usr/bin/env node
// SEO polish pass — 2026-04-27
// Pre-merge / pre-launch smoke test.
//   Usage:
//     node scripts/smoke-test.mjs [base-url]
//   Default base-url:  https://saverys.netlify.app  (deploy preview / staging)
//   Production:        node scripts/smoke-test.mjs https://saverys.co.uk
//
// Exit code: 0 on full pass, 1 if any assertion fails.

const BASE = (process.argv[2] || "https://saverys.netlify.app").replace(/\/$/, "");
const PROD_HOSTNAME = "saverys.co.uk";

const REDIRECTS = [
  { from: "/our-portfolio", to: "/projects" },
  { from: "/our-history", to: "/about" },
  { from: "/contact/", to: "/contact" },
  { from: "/wp-content/uploads/2025/10/test.jpg", to: "/" },
  { from: "/feed", to: "/journal" },
  { from: "/stores/broadway", to: "/showroom/broadway" },
];

const CONTENT_PAGES = ["/llms.txt", "/robots.txt", "/sitemap.xml"];

let passed = 0;
let failed = 0;
const fail = (msg) => {
  console.log(`  ❌ ${msg}`);
  failed++;
};
const pass = (msg) => {
  console.log(`  ✅ ${msg}`);
  passed++;
};

async function head(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") };
}

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return {
    status: res.status,
    body: await res.text(),
    contentType: res.headers.get("content-type"),
  };
}

console.log(`\n🔍 Smoke test against ${BASE}\n`);

// 1. Redirects
console.log("1. Legacy URL redirects");
for (const { from, to } of REDIRECTS) {
  try {
    const { status, location } = await head(`${BASE}${from}`);
    if (status === 301 || status === 308) {
      const expectedAbs = `${BASE}${to}`;
      if (
        location === to ||
        location === expectedAbs ||
        location?.endsWith(to)
      ) {
        pass(`${from} → ${to} (${status})`);
      } else {
        fail(
          `${from} returned ${status} but Location was ${location}, expected ${to}`,
        );
      }
    } else {
      fail(`${from} returned ${status}, expected 301/308`);
    }
  } catch (err) {
    fail(`${from} threw: ${err.message}`);
  }
}

// 2. Critical content files
console.log("\n2. Content files (200 + non-empty body)");
for (const path of CONTENT_PAGES) {
  try {
    const { status, contentType, body } = await get(`${BASE}${path}`);
    if (status === 200 && body.length > 0) {
      pass(`${path} → 200 (${contentType})`);
    } else {
      fail(`${path} → ${status} (body length ${body.length})`);
    }
  } catch (err) {
    fail(`${path} threw: ${err.message}`);
  }
}

// 3. Production URL hygiene on homepage
console.log("\n3. Homepage SEO tags use production URL");
const home = await get(`${BASE}/`);
const hostPattern = `https?://(www\\.)?${PROD_HOSTNAME.replace(/\./g, "\\.")}`;
const checks = [
  {
    name: "og:url uses production hostname",
    pattern: new RegExp(
      `property=["']og:url["'][^>]*content=["']${hostPattern}`,
      "i",
    ),
  },
  {
    name: "canonical uses production hostname",
    pattern: new RegExp(
      `rel=["']canonical["'][^>]*href=["']${hostPattern}`,
      "i",
    ),
  },
  { name: "og:image present", pattern: /property=["']og:image["']/i },
  { name: "twitter:card present", pattern: /name=["']twitter:card["']/i },
];
for (const { name, pattern } of checks) {
  if (pattern.test(home.body)) pass(name);
  else fail(name);
}

// 4. Custom 404
console.log("\n4. Custom 404 page");
const notFoundPath = `/this-page-definitely-does-not-exist-${Date.now()}`;
const notFound = await get(`${BASE}${notFoundPath}`);
if (notFound.status === 404) pass(`returns 404 status`);
else fail(`returned ${notFound.status}, expected 404`);

if (/can.?t find|not found|moved/i.test(notFound.body)) {
  pass(`renders branded 404 content`);
} else {
  fail(`404 body does not contain expected branded copy`);
}

if (/noindex/i.test(notFound.body)) pass(`404 is noindexed`);
else fail(`404 page missing noindex meta`);

// 5. JSON-LD on homepage
console.log("\n5. Structured data");
const ldMatches =
  home.body.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  ) || [];
if (ldMatches.length > 0) {
  pass(`${ldMatches.length} JSON-LD block(s) on homepage`);
  let valid = 0;
  for (const block of ldMatches) {
    const json = block.replace(/<script[^>]*>|<\/script>/gi, "").trim();
    try {
      JSON.parse(json);
      valid++;
    } catch {
      // counted below
    }
  }
  if (valid === ldMatches.length) pass(`all JSON-LD blocks parse as valid JSON`);
  else fail(`${ldMatches.length - valid} JSON-LD block(s) failed to parse`);
} else {
  fail(`no JSON-LD blocks found on homepage`);
}

console.log(`\n${"─".repeat(50)}`);
console.log(`Passed: ${passed}    Failed: ${failed}`);
console.log(`${"─".repeat(50)}\n`);
process.exit(failed === 0 ? 0 : 1);
