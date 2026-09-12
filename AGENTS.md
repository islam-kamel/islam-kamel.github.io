
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

**Anti-AI-Slop Quality Standard**
- **Scope**: Applies across all public routes (homepage, blog index, articles, navigation, error states) for all new content and material edits, covering page copy, blog content, cards, gradients, icons, animations, charts, and Mermaid diagrams. Build success alone is never sufficient verification.
- **Specificity over generic prose**: Every section must contain a project-specific fact, decision, constraint, result, or example. Remove statements that could be pasted unchanged into another portfolio. Claims must be supported by observable evidence. Round statistics, performance claims, and business outcomes need their measurement method or source.
  - Rejected: Building resilient systems requires a thoughtful and comprehensive approach.
  - Accepted: The old workflow deployed every push to GitHub Pages although Vercel had already become the production host.
- **Direct language over inflated language**: Headings and sentences must describe the actual subject. Avoid corporate filler, dramatic transitions, false certainty, and conclusions that merely repeat the page. Reject patterns such as "a subtle discrepancy surfaced", "the data was conclusive", "seamless experience", and "stands on solid engineering ground" unless surrounding evidence makes that exact wording necessary.
  - Rejected: Eliminating Measurement Drift in Analytics
  - Accepted: Removing the Retired GTM Container
- **Varied structure over templates**: Do not default pages or posts to the same introduction, problem, numbered solution, checklist, and summary structure. Choose structure from the material: incident timeline, decision record, comparison, technical walkthrough, annotated example, or another form justified by the content. Do not add an introduction that previews the article or a conclusion that only restates it. Start with the concrete event or question when possible and end when the useful information ends.
- **Informative visuals only**: A visual must make a relationship, comparison, sequence, hierarchy, or measured result easier to understand than short prose. Delete diagrams that merely put obvious steps into boxes. Never invent metrics or use decorative charts. A chart requires real data, its source or collection method, labels, units, and enough context to interpret it. Diagrams must use the available content width and remain readable at supported breakpoints. On narrow screens, preserve readable labels and allow horizontal scrolling rather than shrinking the diagram into illegibility.
  - Rejected:
    ```text
    Push -> Build -> Deploy
    ```
  - Accepted:
    ```text
    Before: HTTP www -> HTTPS www -> HTTPS apex
    After:  HTTP/HTTPS www -> HTTPS apex
    ```
- **Deliberate visual composition**: Do not repeat the same card grid, gradient, pill, icon, glow, or animation in every section. Reuse a treatment only when it communicates the same function. Decorative elements must support hierarchy or meaning, not fill empty space. Keep density appropriate to the information: do not wrap a sentence in a card, add a section for one weak claim, or use motion where a static state communicates the same thing.
- **Required Editorial & Visual Review Checklist**: Before completing a new or materially changed public page, inspect the rendered page at desktop and mobile widths and verify:
  1. Could any section be moved to another portfolio unchanged? If yes, rewrite or remove it.
  2. Could any section or visual be removed without losing information? If yes, remove it.
  3. Does every claim have evidence or clearly read as opinion? If no, qualify or support it.
  4. Does every visual communicate more than nearby prose? If no, remove or replace it.
  5. Are diagrams and text readable without zooming at desktop and mobile widths? If no, fix the presentation.
  6. Does the page repeat a structure or visual treatment already overused elsewhere on the site? If yes, revise it.
  - Record concrete evidence in the final report: routes inspected, viewport sizes, and any content or visuals removed or rewritten.

**Content/writing style**
10. In example code, clean up anything registered on connect (event listeners, subscriptions) in the matching teardown/disconnect handler — an example that leaks a listener undercuts a post that's specifically about doing this reliably in production.
11. If a post raises a specific design question rhetorically (e.g. "full snapshot or a diff on reconnect?"), answer it or state which way you went and why — don't leave it hanging right as it gets interesting.

**Homepage / positioning (active)**
12. Don't repeat the same tool/skill names across two sections under different headings (e.g. "Capabilities" and "Core Stack" currently both list ECharts, LLM Orchestration, WebSockets almost verbatim). Each section should carry information the other doesn't.
13. Name the issuing platform/institution for every certification listed, not just CS50 — unlabeled cert sources are harder to verify or weigh.
14. Confirm whether the CTA is meant for freelance/contract inquiries, full-time roles, or both, and word "Let's work together" accordingly instead of leaving it ambiguous.

**Homepage / positioning (deferred — content not ready, do not act on these yet)**
15. Backing capability claims with real projects/case studies.
16. Adding a current role/status + years-of-experience line.

**Navigation**
17. Every nav link that targets a homepage section (Capabilities, Tech Stack, Education, Contact) must resolve correctly from any route, not just from the homepage. Test each of the four links from `/blog` and from a blog post, not only from `/`.

**Low priority / no action needed**
18. `meta-keywords` hasn't been a ranking signal for Google/Bing since ~2009. Not worth agent time either way.
