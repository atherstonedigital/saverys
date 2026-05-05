# Savery's of Broadway — Complete Site Build: Master Reference

## What this document is

This is the single reference for the entire Saverys website build on Next.js / Netlify. It brings together six detailed Claude Code prompts created across multiple sessions, establishes the execution order, maps dependencies between them, and provides the business context that every prompt needs.

**Use this document as your CLAUDE.md project file.** Place it in the root of the Saverys repo so that every Claude Code session starts with full context.

---

## The business

**Savery's of Broadway** (canonical brand name; "Saverys" is acceptable as a casual inline form in body copy only) is a luxury interior design studio established in 1942 by Lyndsey Savery. The practice specialises in hand upholstery, bespoke furniture, premium fabric sourcing, rugs, and full interior design services for private residences, country houses, and luxury hotels.

The brand identity is refined, understated British luxury. Think country house, not corporate. Confident but never loud. Editorial, not advertorial. The Cotswolds is not just a location — it's embedded in the aesthetic.

### Locations

| Location | Address | Phone |
|---|---|---|
| **Broadway (HQ + Workshop)** | Cotswold Design Centre, Kennel Lane, Broadway, Worcestershire, WR12 7DJ | 01386 858941 |
| **Ludlow** | 1 Tower Street, Ludlow, Shropshire, SY8 1RL | 01584 708381 |
| **Chelsea** | Suite 9, 405 Kings Road, Chelsea, London | 020 3668 1000 |

### Key facts

- Legal name: Lyndsey Savery Interior Design Ltd
- Founded: 1942
- Instagram: https://www.instagram.com/saverysofbroadway/
- Production domain: `www.saverys.co.uk` (apex `saverys.co.uk` 301s to www at the Netlify edge)
- Staging domain: `saverys.netlify.app`
- GA4 Property: `G-HEYQ32WKC0`
- Previous WordPress site: GoDaddy managed hosting (being replaced by this build)

### Primary competitor

**Pavilion Broadway** (pavilionbroadway.co.uk) — currently dominates "interior design Broadway" searches. They sell furniture; Saverys *makes* it. That distinction is Saverys' primary competitive advantage.

---

## Tech stack

- **Framework:** Next.js (deployed on Netlify)
- **CMS:** Decap CMS (formerly Netlify CMS) — Git-based, stores content as markdown in `content/`
- **Content:** Markdown files with YAML frontmatter, parsed with `gray-matter` + `remark`
- **Hosting:** Netlify with Git Gateway for CMS authentication
- **Domain:** `saverys.co.uk` (DNS to be pointed to Netlify on go-live)
- **Analytics:** GA4 (`G-HEYQ32WKC0`) — no GTM, no other tracking
- **Search Console:** Already verified and indexing the WordPress site

---

## SEO target keywords (priority order)

1. `interior design Broadway` / `interior designer Broadway`
2. `interior design Cotswolds` / `interior designer Cotswolds`
3. `luxury interior design Cotswolds`
4. `interior design Ludlow`
5. `bespoke upholstery Cotswolds`
6. `interior design showroom Broadway`
7. `luxury fabrics Broadway Cotswolds`
8. `hand upholstery workshop Cotswolds`
9. `bespoke furniture Cotswolds`
10. `interior design studio Worcestershire`

---

## The six prompts — execution order

Each prompt is a self-contained Claude Code instruction file. They must be executed in this order because later prompts depend on infrastructure created by earlier ones.

### Phase 1: Foundation

#### Prompt 1 → `saverys-seo-implementation-prompt.md`
**What it does:** Implements the complete SEO infrastructure across the entire site — page-level metadata for every page, image alt text audit, JSON-LD structured data (Organisation, LocalBusiness ×3, WebSite, BreadcrumbList, Article, ImageGallery), dynamic XML sitemap, robots.txt, llms.txt, heading hierarchy, internal linking strategy, 404 page, Netlify headers, and WordPress migration redirects.

**Why it's first:** Every subsequent prompt assumes this SEO infrastructure exists. The structured data component, the sitemap generator, and the metadata patterns are referenced by later prompts.

**Key outputs:**
- Metadata on every page (title, description, OG, Twitter, canonical, geo)
- `<StructuredData>` component or `lib/schema.ts` utility
- `app/sitemap.ts` (dynamic sitemap)
- `public/robots.txt`
- `public/llms.txt` + `public/llms-full.txt`
- `app/not-found.tsx` (custom 404)
- `public/_redirects` or `netlify.toml` redirect rules
- `public/_headers` or `netlify.toml` cache headers

**Depends on:** Nothing — this is the starting point.

---

#### Prompt 2 → `saverys-ga4-search-console-prompt.md`
**What it does:** Adds GA4 tracking (`G-HEYQ32WKC0`) with environment-aware loading (only fires in production), Google Search Console verification, environment variable setup, and the migration redirect safety net for WordPress URLs.

**Why it's second:** GA4 and Search Console are infrastructure that should be in place before content pages are built, so tracking is verified early.

**Key outputs:**
- GA4 script in root layout (production-only)
- Search Console verification meta tag
- `.env.example`, `.env.local`, `.env.production`
- `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_SITE_URL` environment variables
- WordPress → Next.js redirect map in `public/_redirects`

**Depends on:** Prompt 1 (root layout must exist, redirects may overlap — merge rather than duplicate).

**Note on overlap:** Both Prompt 1 and Prompt 2 create redirect rules. When running Prompt 2, check if redirects already exist from Prompt 1 and merge them rather than overwriting. The combined redirect file should contain both the SEO redirects (trailing slashes, canonical paths) and the WordPress migration redirects.

---

### Phase 2: Content pages

#### Prompt 3 → `saverys-workshop-page-prompt.md`
**What it does:** Creates the Workshop & Store page at `/workshop` — hero section, introduction ("A Dying Art, Kept Alive in Broadway"), showroom section, workshop section, fabrics & rugs section, expert service section, and visit CTA with address and phone.

**Why it's third:** The Workshop page is referenced by journal articles (internal linking). It needs to exist before the Journal is built so those links work.

**Key outputs:**
- Workshop page component/route
- Workshop page added to navigation
- Images assigned from `public/`
- Full metadata and structured data on the page

**Depends on:** Prompt 1 (metadata patterns, structured data component), navigation component must be identified.

---

#### Prompt 4 → `saverys-journal-build-prompt.md`
**What it does:** Builds the entire Journal section — updates the Decap CMS config with new fields (pillar, alt text, SEO overrides), creates the content utility for reading markdown, builds the listing page at `/journal`, builds the dynamic post template at `/journal/[slug]`, adds Journal to the nav, creates the first article ("How to Choose Upholstery Fabric for a Country House"), and implements Article structured data on post pages.

**Why it's fourth:** The Journal section depends on the SEO infrastructure (Prompt 1), the GA4 tracking (Prompt 2), and the Workshop page existing for internal links (Prompt 3).

**Key outputs:**
- Updated `public/admin/config.yml` with enhanced journal fields
- `lib/journal.ts` (or equivalent content utility)
- Journal listing page (`/journal`)
- Journal post template (`/journal/[slug]`)
- Journal added to navigation
- First article in `content/journal/`
- Article JSON-LD on post pages

**Depends on:** Prompts 1–3. The first article links to `/workshop` — that page must exist.

---

#### Prompt 5 → `saverys-journal-articles-2-to-8.md`
**What it does:** Creates seven additional journal articles as markdown files in `content/journal/`, covering all five editorial pillars and all three locations. Assigns images from `public/` to each article.

**Why it's fifth:** The Journal infrastructure must be built (Prompt 4) before content can be added. This prompt adds articles into the existing system.

**Key outputs:**
- 7 markdown files in `content/journal/`:
  - `cotswold-design-centre-broadway.md` (Place — Broadway)
  - `commissioning-a-bespoke-sofa.md` (Craft)
  - `designing-for-a-cotswold-stone-house.md` (Place — Cotswolds)
  - `anatomy-of-a-hand-sprung-seat.md` (Craft)
  - `how-we-approach-a-new-project.md` (Design)
  - `guide-to-natural-upholstery-fabrics.md` (Fabric)
  - `ludlow-design-lovers-guide.md` (Place — Ludlow)

**Depends on:** Prompt 4 (journal section must be built and rendering correctly).

---

### Phase 3: Strategy reference (not code — editorial guide)

#### Prompt 6 → `saverys-journal-content-strategy.md`
**What it does:** Defines the ongoing editorial strategy — voice and tone guidelines, five content pillars with topic ideas and keyword targets, publishing cadence (2 per month), the full launch sequence of 12 articles, SEO rules for every article, competitive gaps to exploit, and distribution/measurement guidance.

**This is not a Claude Code prompt — it's a strategy document.** Keep it in the repo as a reference for anyone writing future content. Suggested location: `docs/journal-content-strategy.md` or the project root.

**Depends on:** Nothing — it's a reference document, not executable code.

---

## Execution sequence summary

```
Phase 1 — Foundation (do these first, on staging)
  1. SEO infrastructure     → saverys-seo-implementation-prompt.md
  2. GA4 + Search Console   → saverys-ga4-search-console-prompt.md

Phase 2 — Content pages (do these next, on staging)
  3. Workshop & Store page  → saverys-workshop-page-prompt.md
  4. Journal section build  → saverys-journal-build-prompt.md
  5. Journal articles 2–8   → saverys-journal-articles-2-to-8.md

Phase 3 — Reference (commit to repo)
  6. Content strategy doc   → saverys-journal-content-strategy.md

Go-live — Domain switch
  → Point saverys.co.uk DNS to Netlify
  → Set production environment variables
  → Run go-live verification checklist (below)
```

---

## Pre-launch checklist (staging)

Run through this after all five code prompts have been executed, before switching the domain:

### Pages exist and render

- [ ] Homepage (`/`) — loads, metadata correct, structured data present
- [ ] History (`/history` or `/about`) — loads, metadata correct
- [ ] Portfolio (`/portfolio` or `/projects`) — loads, metadata correct
- [ ] Workshop (`/workshop`) — loads, all sections render, images display, metadata correct
- [ ] Contact (`/contact`) — loads, metadata correct, all three locations listed
- [ ] Journal listing (`/journal`) — loads, shows all 8 articles, sorted newest first
- [ ] Journal post (`/journal/choosing-upholstery-fabric-country-house`) — loads, full article renders, images display
- [ ] All 7 additional journal posts — each loads at correct URL
- [ ] 404 page (`/anything-that-doesnt-exist`) — custom 404 renders with branding and links
- [ ] Privacy (`/privacy` or `/privacy-policy`) — loads

### Navigation

- [ ] All pages accessible from the nav menu
- [ ] "Workshop & Store" appears in nav
- [ ] "Journal" appears in nav
- [ ] Mobile nav works correctly

### SEO infrastructure

- [ ] `/sitemap.xml` — loads, lists all static pages + all journal posts + all projects
- [ ] `/robots.txt` — loads, references sitemap, allows AI crawlers
- [ ] `/llms.txt` — loads, valid markdown, lists all pages
- [ ] Every page has a unique `<title>` tag (check page source)
- [ ] Every page has a unique `<meta name="description">` (check page source)
- [ ] Every page has `og:title`, `og:description`, `og:image` (check page source)
- [ ] Every page has `<link rel="canonical">` with `https://www.saverys.co.uk` base
- [ ] Homepage has Organisation + LocalBusiness ×3 + WebSite structured data
- [ ] Inner pages have BreadcrumbList structured data
- [ ] Journal posts have Article structured data
- [ ] Test 3+ pages at https://search.google.com/test/rich-results
- [ ] Test social cards at https://metatags.io

### Images

- [ ] Every `<img>` and `next/image` has a non-empty, descriptive `alt` attribute
- [ ] Hero images use `priority={true}` for above-fold performance
- [ ] Below-fold images are lazy-loaded
- [ ] No broken image links (check browser console for 404s)

### Headings

- [ ] Every page has exactly one `<h1>`
- [ ] No heading levels are skipped (h1 → h2 → h3, no h1 → h3)
- [ ] H1 on each page contains the primary target keyword naturally

### GA4 and tracking

- [ ] `G-HEYQ32WKC0` appears in page source on production build
- [ ] `G-HEYQ32WKC0` does NOT appear on localhost dev server
- [ ] No other GA4 or GTM tags present (no `GTM-K5NJC9KT`, no `G-PS21PFT69K`)
- [ ] Google Search Console verification meta tag is in `<head>`

### Redirects

- [ ] `/our-history` → 301 to `/history`
- [ ] `/our-portfolio` → 301 to `/portfolio`
- [ ] `/privacy-policy` → 301 to `/privacy`
- [ ] `/our-history/` (trailing slash) → 301 to `/history`
- [ ] `/wp-admin` → redirect (doesn't 404)

### CMS

- [ ] Visit `/admin` — Decap CMS loads
- [ ] Journal collection visible with all fields (title, date, featured image, alt text, summary, body, pillar, tags, SEO overrides)
- [ ] Projects collection visible and functional
- [ ] Can create a new draft journal post
- [ ] Uploaded images go to `public/images/uploads/`

### Performance

- [ ] Run Lighthouse on homepage — target 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- [ ] Run Lighthouse on a journal post — same targets
- [ ] Fonts load with `display: swap` (no FOIT)
- [ ] No render-blocking scripts

### Responsive

- [ ] All pages render correctly on mobile (375px)
- [ ] All pages render correctly on tablet (768px)
- [ ] All pages render correctly on desktop (1440px)
- [ ] Journal listing grid collapses gracefully
- [ ] Journal post body is readable on mobile (proper line length)

---

## Go-live day checklist

When you're ready to point `saverys.co.uk` to Netlify:

### DNS and domain

- [ ] Update DNS A/CNAME records to point to Netlify (follow Netlify's domain setup guide)
- [ ] Add `saverys.co.uk` as a custom domain in Netlify dashboard
- [ ] Enable HTTPS / SSL certificate in Netlify (automatic via Let's Encrypt)
- [ ] Wait for DNS propagation (can take up to 48 hours, usually much faster)
- [ ] Confirm `https://www.saverys.co.uk` loads the new Next.js site (apex `https://saverys.co.uk` should 301 to www)

### Environment variables

- [ ] Set `NEXT_PUBLIC_GA_ID=G-HEYQ32WKC0` in Netlify environment variables (production context)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.saverys.co.uk` in Netlify environment variables
- [ ] Trigger a production redeploy after setting variables

### GA4 verification

- [ ] Visit `https://www.saverys.co.uk` in a browser
- [ ] Open Google Analytics → Reports → Realtime
- [ ] Confirm you appear as an active user within 30 seconds
- [ ] Check that only `G-HEYQ32WKC0` is firing (no old tags)

### Search Console

- [ ] Go to https://search.google.com/search-console
- [ ] Confirm ownership verification is still active for `saverys.co.uk`
- [ ] If verification dropped, re-verify using the HTML meta tag method
- [ ] Go to Sitemaps → delete old WordPress sitemap if listed
- [ ] Submit new sitemap: `https://www.saverys.co.uk/sitemap.xml`
- [ ] Wait for confirmation — should show "Success" with page count

### Request indexing

- [ ] In Search Console → URL Inspection, submit each key page:
  - `https://www.saverys.co.uk/`
  - `https://www.saverys.co.uk/history`
  - `https://www.saverys.co.uk/portfolio`
  - `https://www.saverys.co.uk/workshop`
  - `https://www.saverys.co.uk/journal`
  - `https://www.saverys.co.uk/contact`
  - `https://www.saverys.co.uk/journal/choosing-upholstery-fabric-country-house`

### Smoke test

- [ ] Visit every page on the live domain — no 404s, no broken images, no console errors
- [ ] Test redirects on the live domain (`/our-history` → `/history` etc.)
- [ ] Test the CMS at `https://www.saverys.co.uk/admin`
- [ ] Submit a test rich results check at Google: `https://search.google.com/test/rich-results?url=https://www.saverys.co.uk`

### WordPress decommission

- [ ] Once everything is confirmed working, you can decommission the WordPress site on GoDaddy
- [ ] Keep the GoDaddy database backup from 23 March (`backup-20260323.sql`) stored safely
- [ ] Do NOT delete the GoDaddy hosting immediately — keep it as a fallback for 30 days
- [ ] After 30 days with no issues, cancel the GoDaddy hosting

---

## File manifest

After all prompts are executed, the project should contain these key files (paths may vary based on the project's conventions):

```
saverys/
├── CLAUDE.md                          ← This file (master reference)
├── .env.example                       ← Environment variable documentation
├── .env.local                         ← Local dev (GA4 disabled)
├── .env.production                    ← Production values
├── netlify.toml                       ← Netlify config, redirects, headers
├── public/
│   ├── admin/
│   │   ├── index.html                 ← Decap CMS admin page
│   │   └── config.yml                 ← CMS collections (updated journal fields)
│   ├── robots.txt                     ← Search engine directives
│   ├── llms.txt                       ← AI crawler content map
│   ├── llms-full.txt                  ← Full site content for AI crawlers
│   ├── _redirects                     ← WordPress migration + canonical redirects
│   ├── _headers                       ← Cache and security headers
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   └── images/
│       └── uploads/                   ← CMS-uploaded images
├── content/
│   ├── journal/
│   │   ├── choosing-upholstery-fabric-country-house.md
│   │   ├── cotswold-design-centre-broadway.md
│   │   ├── commissioning-a-bespoke-sofa.md
│   │   ├── designing-for-a-cotswold-stone-house.md
│   │   ├── anatomy-of-a-hand-sprung-seat.md
│   │   ├── how-we-approach-a-new-project.md
│   │   ├── guide-to-natural-upholstery-fabrics.md
│   │   └── ludlow-design-lovers-guide.md
│   └── projects/                      ← Portfolio project markdown files
├── app/ (or pages/)
│   ├── layout.tsx                     ← Root layout (GA4, meta, structured data)
│   ├── page.tsx                       ← Homepage
│   ├── sitemap.ts                     ← Dynamic XML sitemap
│   ├── not-found.tsx                  ← Custom 404
│   ├── workshop/page.tsx              ← Workshop & Store page
│   ├── journal/
│   │   ├── page.tsx                   ← Journal listing
│   │   └── [slug]/page.tsx            ← Journal post template
│   ├── history/page.tsx
│   ├── portfolio/page.tsx
│   ├── contact/page.tsx
│   └── privacy/page.tsx
├── components/
│   ├── StructuredData.tsx             ← JSON-LD schema component
│   └── ...                            ← Existing site components
├── lib/
│   ├── journal.ts                     ← Journal content utility
│   ├── schema.ts                      ← Schema generation utilities
│   └── ...
└── docs/
    └── journal-content-strategy.md    ← Editorial strategy reference
```

---

## What success looks like

**Within 1 week of go-live:**
- All pages indexed in Google Search Console
- GA4 collecting traffic data
- Rich results test passing for homepage and journal posts

**Within 1 month:**
- Impressions appearing in Search Console for target keywords
- Journal articles appearing in search results for long-tail queries
- First organic traffic to journal content

**Within 3 months:**
- Ranking movement for "interior design Broadway" and "interior design Cotswolds"
- Journal driving measurable organic traffic
- Ludlow article ranking for "interior design Ludlow" (low competition — should rank quickly)

**Within 6 months:**
- Competitive with Pavilion Broadway for Broadway-specific searches
- Journal established as an ongoing traffic source
- 16+ articles published (8 launch + 2 per month × 4 months)

**Within 12 months:**
- Dominant local presence for Broadway and Ludlow interior design searches
- 30+ journal articles creating a content moat competitors can't quickly replicate
- Organic traffic as the primary source of new enquiries

---

## Launch Day Runbook

Execute in order. Do not skip steps.

1. Final Netlify build green on `main`
2. DNS flip:
   - Apex `saverys.co.uk`: A record → Netlify load balancer IP, OR ALIAS/ANAME → `[netlify-site].netlify.app`
   - `www.saverys.co.uk`: CNAME → `[netlify-site].netlify.app`
3. Wait for Netlify auto-SSL provisioning (typically <10 min, occasionally up to 1 hour)
4. Set Netlify primary domain to `www.saverys.co.uk`, with apex `saverys.co.uk` → www redirect (also enforced explicitly in `netlify.toml`)
5. Verify env vars in Netlify production context:
   - `NEXT_PUBLIC_SITE_URL=https://www.saverys.co.uk`
   - `NEXT_PUBLIC_GA_ID=G-HEYQ32WKC0`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
   - `TURNSTILE_SECRET_KEY=...`
5a. Run smoke test against deploy preview (canonical pre-merge gate):
    ```
    npm run smoke -- https://[preview-url]
    ```
    All checks must pass before promoting to production.
5b. Manual contact form test on deploy preview:
    - Submit with Turnstile completed → confirm receipt in Netlify Forms inbox
    - Submit via curl/Postman without token → confirm 400 response
    - Confirm GA4 `form_submit` event fires (Realtime view)
6. Smoke test on production:
   - Homepage, three showroom pages, contact form, journal index, projects index
   - View source: confirm canonicals and OG URLs use `https://www.saverys.co.uk`
6a. Run automated production smoke test:
    ```
    npm run smoke:prod
    ```
    All checks must pass.
7. GA4 Realtime — confirm session fires from your visit
8. Search Console:
   - Verify domain via DNS TXT
   - Submit `https://www.saverys.co.uk/sitemap.xml`
9. Bing Webmaster Tools — same
10. Test 8–10 legacy WordPress URLs return 301:
    - `/our-portfolio`, `/our-history`, `/contact/`, `/feed`, `/wp-content/uploads/2025/10/test.jpg`, `/privacy-policy/`, `/wp-login.php`, `/wp-admin/`
11. Run Rich Results Test on:
    - `/`, `/about`, `/showroom/broadway`, `/showroom/ludlow`, `/projects`, `/projects/[any-slug]`, `/journal/[any-slug]`
12. PageSpeed Insights baseline — record LCP, CLS, INP for `/`, `/projects`, `/showroom/broadway`
13. GA4 Admin — mark `form_submit`, `phone_click`, `email_click`, `directions_click` as conversions
14. Send launch confirmation to Gary with link to start GBP setup × 3 locations

## Key Learnings & Principles

- **Canonical host: www, not apex.** The site canonical is
  `https://www.saverys.co.uk`. Apex `saverys.co.uk` 301s to www at the
  Netlify edge (rule in `netlify.toml`). The single source of truth is
  `lib/config.ts` exporting `siteConfig.url` (re-exported as `SITE_URL` from
  `lib/site-config.ts`). All sitemap entries, JSON-LD `.url`/`@id` fields,
  OG URLs, robots `Host:` and `Sitemap:` directives, and canonical link tags
  must use the www version. Mixing the two cost crawl budget and triggered
  the 28 April 2026 GSC "Blocked by robots.txt" alert because Googlebot
  kept chasing a 301 chain on what we'd told it was the canonical URL.

- **robots.txt: don't block static assets.** Removed
  `Disallow: /_next/static/` from `app/robots.ts` — Google needs CSS/JS
  access to render pages and score Core Web Vitals correctly. Only
  `/admin/` (Decap) and `/api/` are disallowed.

- **robots.txt hostname gating: use Netlify's `CONTEXT` env var.** Not
  `NEXT_PUBLIC_SITE_URL`. Internal env vars set by Netlify are more
  reliable than client-side ones for distinguishing production from
  preview/branch deploys, mirroring the GA4 gating pattern.

- **Schema types are fixed.** Only `LocalBusiness` × 3 and `Organization`
  are valid for this project. Do not introduce `InteriorDesignStore` or
  `InteriorDesigner` — Google's structured-data tooling rejects them.

## Outstanding (non-code)

- **Alt text backfill** ✅ done 2026-04-28 — see
  `audit-reports/alt-text-backfill-guide.md` for the final strings.
  Gary can refine via Decap CMS at `/admin` → Projects if any don't
  match the actual photograph.

- **Turnstile**: create a Cloudflare Turnstile site for `saverys.co.uk` (and
  `localhost` for dev) and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
  `TURNSTILE_SECRET_KEY` in Netlify production env vars.

- **Search Console + Bing Webmaster**: verify domain and submit sitemap
  post-DNS-flip.

- **Google Business Profile**: × 3 locations (Broadway HQ, Ludlow, Chelsea).
