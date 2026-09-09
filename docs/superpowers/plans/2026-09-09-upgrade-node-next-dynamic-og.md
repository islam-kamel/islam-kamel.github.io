# Upgrade Node & GitHub Workflow, Next.js & Lodash to Safe LTS, and Implement Dynamic OG Images

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade GitHub Actions workflow and Node runner to Node 24 runtime; upgrade Next.js to safe LTS (15.5.25) and Lodash to 4.18.1; replace static `opengraph.png` with fancy dynamic `ImageResponse` OG images for all routes; update `AGENTS.md`.

**Architecture:** Use Next.js App Router metadata route convention (`opengraph-image.tsx`) with `ImageResponse` and `generateStaticParams` for pre-rendering branded OG cards at build time in static export. Upgrade workflow actions to Node 24 runtime-compatible versions.

**Tech Stack:** Next.js 15.5.25 LTS, React 18.3.1, next/og (Satori), Tailwind CSS 3.4, GitHub Actions (Node 24 runtime).

---

### Task 1: Upgrade GitHub Actions Workflow & Node Types

**Files:**
- Modify: `.github/workflows/nextjs.yml`
- Modify: `package.json`

- [ ] **Step 1: Update action versions and node-version in `.github/workflows/nextjs.yml`**
  Upgrade `actions/checkout@v7`, `actions/setup-node@v7` with `node-version: "24"`, `actions/configure-pages@v6`, `actions/cache@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`.
- [ ] **Step 2: Update `@types/node` in `package.json`**
  Set `@types/node` to `^24.0.0`.
- [ ] **Step 3: Commit Task 1 changes**
  `git add .github/workflows/nextjs.yml package.json && git commit -m "ci: upgrade github actions and runner to node 24"`

---

### Task 2: Upgrade Next.js, Lodash, and Related Packages

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Update versions in `package.json`**
  - `lodash`: `^4.18.1`
  - `@types/lodash`: `^4.17.25`
  - `next`: `15.5.25`
  - `@next/third-parties`: `15.5.25`
  - `eslint-config-next`: `15.5.25`
  - `@next/eslint-plugin-next`: `15.5.25`
- [ ] **Step 2: Install dependencies**
  Run `npm install` with bypass sandbox.
- [ ] **Step 3: Verify build**
  Run `npm run build` to verify clean compilation with upgraded Next.js and Lodash.
- [ ] **Step 4: Commit Task 2 changes**
  `git add package.json package-lock.json && git commit -m "chore(deps): upgrade next to 15.5.25 and lodash to 4.18.1"`

---

### Task 3: Implement Dynamic Fancy Open Graph Images

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `app/blog/opengraph-image.tsx`
- Create: `app/blog/[slug]/opengraph-image.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `app/opengraph-image.tsx` for Homepage**
  Sleek dark theme card with Islam Kamel branding, subtitle, skill badges, and domain tag.
- [ ] **Step 2: Create `app/blog/opengraph-image.tsx` for Blog List**
  Editorial technical card with publication badge, title "Writing & Engineering Notes", and topic chips.
- [ ] **Step 3: Create `app/blog/[slug]/opengraph-image.tsx` for Individual Posts**
  Export `generateStaticParams()`, dynamically render article title, publication date, read time, and tags.
- [ ] **Step 4: Clean up hardcoded image URLs in metadata and update JSON-LD**
  Remove static `openGraph.images` overrides in `app/layout.tsx`, `app/page.tsx`, `app/blog/page.tsx`, and `app/blog/[slug]/page.tsx`. Update JSON-LD `image` in `app/blog/[slug]/page.tsx`.
- [ ] **Step 5: Test static build and verify generated PNG images**
  Run `npm run build` and inspect `out/` for generated `.png` assets.
- [ ] **Step 6: Commit Task 3 changes**
  `git add app/ && git commit -m "feat(seo): add dynamic fancy opengraph images for all routes"`

---

### Task 4: Update AGENTS.md & Run Final Audits

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Update `AGENTS.md` with dynamic OG image guidelines**
  Add rules governing `opengraph-image.tsx`, `generateStaticParams`, image size constraints, and `<head>` verification.
- [ ] **Step 2: Audit rendered `<head>` tags across routes**
  Verify `out/index.html`, `out/blog.html`, and `out/blog/building-reliable-llm-pipelines.html` for canonical URLs, og:image, twitter:image, and JSON-LD structured data.
- [ ] **Step 3: Commit Task 4 changes**
  `git add AGENTS.md && git commit -m "docs: update AGENTS.md with dynamic opengraph image rules"`
