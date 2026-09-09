
## Rules for the AI agent (going forward)

**Metadata**
1. Every route must set its own `alternates.canonical` equal to that page's exact live URL. Never let it inherit the site root.
2. `openGraph.url`, `openGraph.title`, `openGraph.description` must mirror that same page's own title/description — never the default/root metadata.
3. `twitter.title` / `twitter.description` must mirror the same values.
4. After adding or editing any page, fetch its rendered `<head>` and confirm canonical/og/twitter values point to *that* page, not the homepage. Treat "matches homepage on a non-home route" as a bug, every time.

**Dynamic Open Graph Images**
- All routes must generate dynamic Open Graph cards via colocated `opengraph-image.tsx` using `ImageResponse` from `next/og`.
- For static export (`output: "export"`), always configure:
  - `export const dynamic = "force-static";`
  - `export const size = { width: 1200, height: 630 };`
  - `export const contentType = "image/png";`
  - `export const alt = "...";`
- Dynamic routes (`[slug]`) must export `generateStaticParams()` in `opengraph-image.tsx` so Next.js pre-renders all image assets during static build.
- Never define manual `openGraph.images` or `twitter.images` arrays in page/layout `metadata` objects when `opengraph-image.tsx` is present, to prevent duplicate or conflicting tags.
- Verification: After adding or modifying any route, inspect the built `<head>` in `out/` to confirm `<meta property="og:image">`, `<meta property="og:image:width">`, `<meta property="og:image:height">`, and `<meta name="twitter:image">` point to that route's own `opengraph-image.png`.

**Structured data**
5. Every blog post should include `BlogPosting`/`Article` JSON-LD: `headline`, `description`, `datePublished`, `dateModified`, `author` (Person: Islam Kamel), `mainEntityOfPage` = canonical URL, and `image` = `${canonicalUrl}/opengraph-image.png`.
6. Homepage should include `Person` + `WebSite` JSON-LD.

**Title tags**
7. Keep `<title>` under ~60 characters where practical. For long post titles, drop the trailing `| Software Engineer` suffix rather than let the post title get truncated in search results.

**Sitemap / robots**
8. Confirm `/robots.txt` references the sitemap.
9. Confirm `sitemap.xml` is generated automatically (not hardcoded) and includes every published post with an accurate `lastmod` — new posts should never require a manual sitemap edit.

**Content/writing style**
10. Avoid defaulting every post to the same skeleton (problem → numbered fixes → "what I'd do differently" → summary). It's the most common LLM-blog-post shape and reads templated when repeated across posts.
11. Anchor each post in at least one specific, non-generic detail (an actual incident, a real number with its context) — something that couldn't be dropped unchanged into a different blog on the same topic.
12. Avoid bare round statistics ("~95%", "~80%") with no note on how they were measured — unexplained round numbers read as placeholders even when true.
13. In example code, clean up anything registered on connect (event listeners, subscriptions) in the matching teardown/disconnect handler — an example that leaks a listener undercuts a post that's specifically about doing this reliably in production.
14. If a post raises a specific design question rhetorically (e.g. "full snapshot or a diff on reconnect?"), answer it or state which way you went and why — don't leave it hanging right as it gets interesting.

**Homepage / positioning (active)**
15. Don't repeat the same tool/skill names across two sections under different headings (e.g. "Capabilities" and "Core Stack" currently both list ECharts, LLM Orchestration, WebSockets almost verbatim). Each section should carry information the other doesn't.
16. Name the issuing platform/institution for every certification listed, not just CS50 — unlabeled cert sources are harder to verify or weigh.
17. Confirm whether the CTA is meant for freelance/contract inquiries, full-time roles, or both, and word "Let's work together" accordingly instead of leaving it ambiguous.

**Homepage / positioning (deferred — content not ready, do not act on these yet)**
18. Backing capability claims with real projects/case studies.
19. Adding a current role/status + years-of-experience line.

**Navigation**
20. Every nav link that targets a homepage section (Capabilities, Tech Stack, Education, Contact) must resolve correctly from any route, not just from the homepage. Test each of the four links from `/blog` and from a blog post, not only from `/`.

**Low priority / no action needed**
21. `meta-keywords` hasn't been a ranking signal for Google/Bing since ~2009. Not worth agent time either way.