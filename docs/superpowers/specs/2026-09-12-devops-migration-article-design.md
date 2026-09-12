# DevOps Migration Article and SEO Repair Design

## Goal

Publish an original DevOps case study about moving `islamkamel.com` from GitHub Pages to Vercel behind Cloudflare, while correcting verified SEO and measurement defects and preserving the site's existing static-export architecture.

## Content

The article will use the September 2026 migration as its concrete incident. It will explain how DNS, TLS, redirects, canonical metadata, sitemaps, deployment verification, and Search Console interact. The defining detail is the former two-hop path from `http://www.islamkamel.com/` through HTTPS WWW to the HTTPS apex, and the one-hop Cloudflare rule that replaced it.

The article will include two Mermaid diagrams using the renderer already present in the project:

1. The production path from GitHub to Vercel, Cloudflare DNS/redirects, and visitors or crawlers.
2. The verification loop from push through Vercel deployment, HTTP checks, metadata checks, and Search Console indexing.

No chart library, new component, or external article asset will be added.

## Technical Changes

- Add one MDX article under `content/blog/` with accurate front matter, a search-friendly title and description, specific observed response codes, and no unexplained performance claims.
- Reuse dynamic article metadata, JSON-LD, sitemap generation, and the colocated Open Graph image route.
- Make the no-script Tag Manager iframe use the active `GTM-NPFLTNVW` container instead of the retired GitHub Pages container `GTM-T3GSTK22`.
- Make homepage and blog sitemap modification dates deterministic from published content instead of changing on every deployment.
- Extend the existing smallest runnable export check only where needed to cover the new article, HTTPS canonical metadata, Open Graph image, sitemap entry, and absence of the retired Tag Manager ID.

## Legacy Domain Decision

Search Console for `https://islam-kamel.github.io/` reports zero indexed pages and one excluded page classified as `Page with redirect`. The live GitHub URL now returns 404. No redirect-only GitHub deployment or removal request will be added because there is no indexed legacy URL to recover and doing so would create a second hosting path without SEO benefit.

## Verification

- Run lint and the production static build.
- Run the existing export verifier, or restore its equivalent if it no longer exists in this checkout.
- Inspect generated HTML for route-specific canonical, Open Graph, Twitter, JSON-LD, and graph markup.
- Review the complete diff through the required delegated review lane and one independent native validation pass.
- Push `main`, confirm the new Vercel deployment reaches Production, crawl the live article, verify its sitemap entry and metadata, then request indexing in Search Console.

## Scope Limits

No redesign, dependency addition, GitHub Pages deployment, Cloudflare DNS change, Google Tag Manager container publication, or speculative SEO feature is included.
