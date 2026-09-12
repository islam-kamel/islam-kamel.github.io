# Site-Wide Anti-AI-Slop Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use the repository's `agy-delegate` feature and review lanes to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove unsupported personal narratives, invented metrics, generic copy, decorative diagrams, and repeated visual effects from every current public route.

**Architecture:** Edit existing page data, metadata copy, and Markdown content in place. Preserve the components, dark visual identity, SEO architecture, and export verifier. Use deletion and direct replacement rather than new abstractions or dependencies.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Markdown, Mermaid, static export

## Global Constraints

- Blog posts are general technical references, not personal case studies.
- Label hypothetical examples and calculated scenarios explicitly.
- Do not invent metrics, projects, employers, outcomes, or personal production history.
- Preserve canonical, Open Graph, Twitter, JSON-LD, sitemap, robots, GTM, and redirect behavior.
- Keep the dark visual identity and current information architecture.
- Add no components, dependencies, automated prose scorer, or speculative features.
- Use direct language and delete sections or visuals that add no information.

---

### Task 1: Clean homepage and blog index positioning

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `config/site.ts`
- Modify: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `siteConfig`, homepage content arrays, and `getAllPosts()`.
- Produces: Direct public positioning copy shared by metadata and the homepage Open Graph card.

- [ ] **Step 1: Remove unsupported and duplicated homepage claims**

Delete the decorative quote badge. Rewrite hero and capability descriptions without unsupported outcome language. Do not repeat the technology chips in hero copy.

- [ ] **Step 2: Reduce repeated visual treatments**

Remove ambient radial hover gradients from capability, education, certification, and blog cards. Keep the primary contact accent, focus states, hover borders, readable contrast, and category icons.

- [ ] **Step 3: Align metadata and blog copy**

Use neutral technical-reference wording for the blog. Update `siteConfig.description` and homepage Open Graph copy without adding claims.

- [ ] **Step 4: Run focused checks**

Run `rg` for removed phrases and repeated card gradients, then run ESLint on the four changed TypeScript files. Expect no unwanted matches and a clean lint result.

### Task 2: Rewrite published articles as technical references

**Files:**
- Modify: `content/blog/building-reliable-llm-pipelines.mdx`
- Modify: `content/blog/why-i-moved-from-rest-to-websockets.mdx`
- Modify: `content/blog/migrating-github-pages-to-vercel.mdx`

**Interfaces:**
- Consumes: Markdown frontmatter parsed by `getAllPosts()` and Mermaid fences rendered by `renderMarkdown()`.
- Produces: Three neutral technical references with accurate titles, descriptions, examples, and diagrams.

- [ ] **Step 1: Rewrite the LLM pipelines article**

Remove personal production claims and unsupported metrics. Label the fallback split as hypothetical, replace the retrospective section with neutral orchestration and evaluation guidance, remove the repetitive summary, and add redaction/access-control guidance to logging.

- [ ] **Step 2: Rewrite the WebSockets article**

Change the title and description from a personal migration story to a REST-polling/WebSockets comparison. Label the 30-client calculation as an example, convert personal decisions to recommendations, preserve reconnect-snapshot rationale, and delete unsupported outcomes and timelines.

- [ ] **Step 3: Tighten the Vercel migration article**

Keep verified `islamkamel.com` facts, remove inflated transitions and the preview sentence, rename headings directly, delete the obvious actor diagram, and replace the generic pipeline with a redirect before/after diagram or no diagram if prose is clearer.

- [ ] **Step 4: Run focused content checks**

Search for the rejected phrases and metrics from the design. Expect no matches. Review every remaining first-person sentence and retain it only for a verifiable identity or contact fact.

### Task 3: Verify every public route and ship

**Files:**
- Verify: `app/page.tsx`
- Verify: `app/blog/page.tsx`
- Verify: `content/blog/*.mdx`
- Verify: `out/**`

**Interfaces:**
- Consumes: Tasks 1 and 2 output.
- Produces: A validated static export and live Vercel deployment.

- [ ] **Step 1: Run repository gates**

Run `yarn lint`, `yarn build`, `yarn test:export`, and `git diff --check`. Expect every command to pass and all 15 static routes to export.

- [ ] **Step 2: Inspect rendered routes**

Inspect `/`, `/blog`, and all three posts at 1280px and 390px. Confirm no body overflow, readable text and diagrams, useful retained visuals, working navigation, and no movable generic copy.

- [ ] **Step 3: Inspect SEO output**

For every changed route, verify route-specific canonical, Open Graph, Twitter, image dimensions, and article JSON-LD. Confirm robots, sitemap, and post dates remain correct.

- [ ] **Step 4: Review and ship**

Run the required Gemini review lane and independent validation. Stage only scoped files, commit with `feat: remove site-wide AI slop`, push `main`, then verify GitHub Actions, Vercel Production, and live routes in Safari.
