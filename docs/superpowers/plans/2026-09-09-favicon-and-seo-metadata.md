# Implementation Plan: Transparent SVG Favicon & Per-Route SEO Metadata Fixes

## Overview
This plan implements two core deliverables:
1. **Transparent SVG Favicon**: Replace the solid black rectangle background in `public/favicon.svg` with a transparent background and high-contrast styling (Option 2: the site's `iK` ligature with brand gradient `#F34F29` to `#D94724`, rounded stroke terminals), looking sharp on both dark and light browser tabs.
2. **SEO Metadata Plumbing**: Ensure every route (`/`, `/blog`, `/blog/[slug]`) generates its own exact canonical URL, matching OpenGraph tags, mirroring Twitter tags, and route-appropriate JSON-LD schemas (`Person` + `WebSite` on homepage only; `BlogPosting` on individual blog posts).

---

## User Review Required

> [!IMPORTANT]
> - **Favicon Style Selection**: An interactive preview has been generated in [favicon_preview.html](file:///Users/islam/.gemini/antigravity/brain/f2668531-bb72-4280-8a12-cad498a67e89/favicon_preview.html). The recommended default is **Variant A (Brand Orange Gradient)**, which ensures high visibility on both dark and light browser tabs without relying on client-side SVG media queries.
> - **Blog Post Title Formatting**: Per project guidelines in [AGENTS.md](file:///Volumes/Dev/Personal/islam-kamel.github.io/AGENTS.md#L28-L30), blog post titles will use `{ absolute: post.title }` rather than appending `- Islam Kamel | Software Engineer`, preventing title truncation in SERPs while keeping `<title>`, `og:title`, and `twitter:title` identical.

---

## Proposed Changes

### Component 1: Favicon

#### [MODIFY] [favicon.svg](file:///Volumes/Dev/Personal/islam-kamel.github.io/public/favicon.svg)
- Remove `<rect width="512" height="512" fill="black"/>`.
- Define a linear gradient `<linearGradient id="ik-grad" x1="0%" y1="0%" x2="100%" y2="100%">` from `#F34F29` to `#D94724`.
- Apply `stroke="url(#ik-grad)"`, `stroke-width="72"`, `stroke-linecap="round"`, and `stroke-linejoin="round"`.
- Transparent canvas with no background rect.

#### [MODIFY] [layout.tsx](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/layout.tsx)
- Ensure `metadata.icons` includes `/favicon.svg` with `type: "image/svg+xml"` and proper ordering.
- Remove root `<script id="ld-json-person" type="application/ld+json">` from `<head>`. (Structured data will be route-specific).

---

### Component 2: Route Metadata & Structured Data

#### [MODIFY] [page.tsx](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/page.tsx)
- Add explicit `metadata: Metadata` export for `/`:
  - `title`: `{ absolute: siteConfig.name }`
  - `description`: `siteConfig.description`
  - `alternates`: `{ canonical: siteConfig.url }`
  - `openGraph`: `{ url: siteConfig.url, title: siteConfig.name, description: siteConfig.description, siteName: "Islam Kamel", locale: "en_US", type: "website", images: [{ url: `${siteConfig.url}/opengraph.png`, width: 1200, height: 630, alt: siteConfig.name }] }`
  - `twitter`: `{ card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [`${siteConfig.url}/opengraph.png`], creator: "@IslamKamelLl" }`
- In `Home()` component:
  - Inject `Person` + `WebSite` JSON-LD from `config/ld_json.ts` using `<script id="ld-json-homepage" type="application/ld+json">`.

#### [MODIFY] [blog/page.tsx](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/blog/page.tsx)
- Update `metadata: Metadata` for `/blog`:
  - `title`: `"Blog"`
  - `description`: `"Technical articles on web architecture, real-time systems, and AI integration."`
  - `alternates`: `{ canonical: `${siteConfig.url}/blog` }`
  - `openGraph`:
    - `url`: `${siteConfig.url}/blog`
    - `title`: `"Blog - Islam Kamel | Software Engineer"`
    - `description`: `"Technical articles on web architecture, real-time systems, and AI integration."`
    - `type`: `"website"`
    - `images`: `[{ url: `${siteConfig.url}/opengraph.png`, width: 1200, height: 630, alt: "Blog" }]`
  - `twitter`:
    - `card`: `"summary_large_image"`
    - `title`: `"Blog - Islam Kamel | Software Engineer"`
    - `description`: `"Technical articles on web architecture, real-time systems, and AI integration."`
    - `images`: `[`${siteConfig.url}/opengraph.png`]`

#### [MODIFY] [blog/[slug]/page.tsx](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/blog/%5Bslug%5D/page.tsx)
- Update `generateMetadata({ params })` for `/blog/[slug]`:
  - Resolve `params`.
  - Fetch post: `getPostBySlug(slug)`.
  - Canonical URL: `${siteConfig.url}/blog/${post.slug}`.
  - Title: `{ absolute: post.title }` (clean title under 60 chars without trailing suffix).
  - Description: `post.description`.
  - `alternates`: `{ canonical: `${siteConfig.url}/blog/${post.slug}` }`.
  - `openGraph`:
    - `url`: `${siteConfig.url}/blog/${post.slug}`
    - `title`: `post.title`
    - `description`: `post.description`
    - `type`: `"article"`
    - `publishedTime`: `new Date(post.date).toISOString()`
    - `authors`: `["Islam Kamel"]`
    - `images`: `[{ url: `${siteConfig.url}/opengraph.png`, width: 1200, height: 630, alt: post.title }]`
  - `twitter`:
    - `card`: `"summary_large_image"`
    - `title`: `post.title`
    - `description`: `post.description`
    - `images`: `[`${siteConfig.url}/opengraph.png`]`
- In `BlogPostPage`:
  - Generate `BlogPosting` JSON-LD schema:
    - `@context`: `"https://schema.org"`
    - `@type`: `"BlogPosting"`
    - `headline`: `post.title`
    - `description`: `post.description`
    - `datePublished`: `new Date(post.date).toISOString()`
    - `dateModified`: `new Date(post.date).toISOString()`
    - `author`: `{ "@type": "Person", "name": "Islam Kamel", "url": siteConfig.url }`
    - `publisher`: `{ "@type": "Person", "name": "Islam Kamel", "url": siteConfig.url }`
    - `mainEntityOfPage`: `{ "@type": "WebPage", "@id": `${siteConfig.url}/blog/${post.slug}` }`
    - `url`: `${siteConfig.url}/blog/${post.slug}`
    - `image`: `${siteConfig.url}/opengraph.png`
  - Render with `<script id="ld-json-blog-post" type="application/ld+json">`.

---

### Component 3: Verification & Auditing

#### [VERIFY] [robots.ts](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/robots.ts)
- Confirm `/robots.txt` output references `${siteConfig.url}/sitemap.xml`.

#### [VERIFY] [sitemap.ts](file:///Volumes/Dev/Personal/islam-kamel.github.io/app/sitemap.ts)
- Confirm dynamic fetching of all posts via `getAllPosts()`.
- Ensure accurate `lastModified` dates on `/`, `/blog`, and every post entry.

---

## Verification Plan

### Automated Tests & Build Verification
1. Run static build:
   ```bash
   npm run build
   ```
   Ensure build exits with code 0.

2. Inspect generated HTML in `out/`:
   - `out/index.html`
   - `out/blog.html`
   - `out/blog/building-reliable-llm-pipelines.html`

3. Parse and display raw `<head>` values for each page:
   - `canonical`
   - `og:url`
   - `og:title`
   - `og:description`
   - `twitter:title`
   - `twitter:description`
   - Verify `application/ld+json` blocks (`Person` + `WebSite` on `/`, `BlogPosting` on `/blog/building-reliable-llm-pipelines`).

4. Verify `robots.txt` and `sitemap.xml` in `out/`.
