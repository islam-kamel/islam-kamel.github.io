# Two Technical Blog Posts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish two anonymized English technical posts about native Web Workers and repeatable React PDF generation through the existing static MDX blog pipeline.

**Architecture:** Add only two MDX files. Existing post discovery already feeds the blog index, static route parameters, route-owned metadata, BlogPosting JSON-LD, dynamic Open Graph images, and sitemap entries, so no application code or dependency change is needed.

**Tech Stack:** Next.js 15 App Router, MDX, React, TypeScript examples, browser Web Workers, and documented `@react-pdf/renderer` APIs.

## Global Constraints

- Use only anonymized, synthetic examples. Do not name a company, client, project, or industry.
- Make every claim directly demonstrable from the example, supported by a primary source, or explicitly framed as a design choice.
- Keep both titles under roughly 60 characters.
- Add no dependencies, components, diagrams, decorative charts, route metadata code, or verifier abstraction.
- Preserve the pre-existing untracked `find_text` and `find_text.swift` files.
- Do not deploy, publish, push, or request indexing.

---

### Task 1: Publish the Web Worker article

**Files:**
- Create: `content/blog/moving-data-processing-off-react-main-thread.mdx`

**Interfaces:**
- Consumes: the existing front matter fields `title`, `date`, `description`, and `tags` read by `getAllPosts()` and `getPostBySlug()`.
- Produces: the static slug `moving-data-processing-off-react-main-thread` and an article rendered by the shared blog route.

- [ ] **Step 1: Add exact front matter**

```yaml
---
title: "Moving Data Processing Off React's Main Thread"
date: "2026-09-15"
description: "A practical Web Worker boundary for keeping filtering and aggregation from blocking a React interface, with typed messages, stale-result handling, cleanup, and measurement."
tags: ["React", "Web Workers", "Performance"]
---
```

- [ ] **Step 2: Open with the concrete failure trace**

Describe a synthetic table where each query filters and aggregates a large in-memory row set. State the exact boundary: React owns input and rendering; one dedicated worker owns CPU-bound filtering and aggregation. Do not claim that a worker reduces total computation time.

- [ ] **Step 3: Define the smallest typed message contract**

Use an initialization message so the row set is structured-cloned only once, followed by lightweight run messages:

```ts
type WorkerRequest =
  | { type: "init"; rows: Row[] }
  | { type: "run"; jobId: number; query: string };

type WorkerResponse =
  | { type: "ready" }
  | { type: "result"; jobId: number; summary: Summary }
  | { type: "error"; jobId: number; message: string };
```

Explain that functions and DOM nodes cannot cross this boundary because worker messages use structured cloning. Mention transferable buffers only as the upgrade path when one initial clone is measured as the bottleneck.

- [ ] **Step 4: Show the worker and React lifecycle**

The worker example must validate message type, return a serializable error message, and keep the dataset inside the worker. The React example must add `message`, `messageerror`, and `error` listeners, reject stale result IDs, remove every listener, and call `worker.terminate()` in the matching `useEffect` cleanup.

State that job IDs discard obsolete results but do not interrupt a synchronous calculation already running. Name terminate-and-recreate or cooperative chunking as later options only if measured cancellation latency requires them.

- [ ] **Step 5: Give a reproducible measurement procedure**

Use a fixed generated row count and the browser Performance panel. Compare the main-thread trace while typing the same query sequence before and after the worker boundary. Record long tasks, input responsiveness, worker duration, and message-copy cost. Do not print fabricated result numbers.

- [ ] **Step 6: Cite primary documentation**

Link to MDN documentation for using Web Workers, `postMessage()`, `terminate()`, and structured cloning, plus React documentation for effect cleanup.

- [ ] **Step 7: Run the focused content checks**

Run: `rg -n "company|client|customer|industry|Femto|Egypt|UAE" content/blog/moving-data-processing-off-react-main-thread.mdx`

Expected: no identifying work detail. Generic words may appear only when required by a source title and must be reviewed manually.

Run: `git diff --check -- content/blog/moving-data-processing-off-react-main-thread.mdx`

Expected: no output.

### Task 2: Publish the React PDF article

**Files:**
- Create: `content/blog/making-react-pdf-output-deterministic.mdx`

**Interfaces:**
- Consumes: the same existing front matter and shared static route pipeline as Task 1.
- Produces: the static slug `making-react-pdf-output-deterministic` and an article rendered by the shared blog route.

- [ ] **Step 1: Add exact front matter**

```yaml
---
title: "Making React PDF Output Deterministic"
date: "2026-09-15"
description: "A failure-driven guide to repeatable React PDF reports through normalized inputs, pinned fonts, controlled pagination, stable metadata, and explicit generation errors."
tags: ["React", "PDF", "Document Generation"]
---
```

- [ ] **Step 2: Define determinism before making claims**

State that the target is repeatable visible content, ordering, pagination, and document metadata for the same normalized inputs and font assets. Explicitly exclude byte-for-byte identity unless a separate hash check proves it.

- [ ] **Step 3: Build the failure catalogue**

Use one compact table with these rows: unsorted records, render-time timestamps, missing font variants, accidental row splitting, and swallowed render failures. For each row, pair the visible symptom with one control.

- [ ] **Step 4: Normalize inputs before rendering**

Show a pure `normalizeReport()` function that validates required fields, copies and sorts records with an explicit lexical tie-breaker, and accepts an ISO generation timestamp rather than reading the clock or generating IDs inside the document component.

- [ ] **Step 5: Pin layout inputs and page behavior**

Use documented `Document`, `Page`, `View`, `Text`, `StyleSheet`, and `Font.register()` APIs. Register explicit regular and bold font files, set `Page size="A4"`, use `wrap={false}` only for rows that must stay intact, use `break` for intentional section boundaries, and use a `fixed` footer with a side-effect-free page-number render callback.

- [ ] **Step 6: Make generation failure visible**

Show `await pdf(<ReportDocument report={report} />).toBlob()` inside `try` and `catch`. Preserve the original error as `cause`, return a clear retryable UI state, and revoke any generated object URL after the download is triggered.

- [ ] **Step 7: Cite primary documentation**

Link to React PDF documentation for page wrapping, component props, styling, and the current renderer source documentation for `pdf().toBlob()` behavior.

- [ ] **Step 8: Run the focused content checks**

Run: `rg -n "company|client|customer|industry|Femto|Egypt|UAE" content/blog/making-react-pdf-output-deterministic.mdx`

Expected: no identifying work detail.

Run: `git diff --check -- content/blog/making-react-pdf-output-deterministic.mdx`

Expected: no output.

### Task 3: Verify the static routes and editorial quality

**Files:**
- Review only: `content/blog/moving-data-processing-off-react-main-thread.mdx`
- Review only: `content/blog/making-react-pdf-output-deterministic.mdx`
- Generated evidence: `out/`

**Interfaces:**
- Consumes: both front matter records and the existing Next.js static-export pipeline.
- Produces: two exported routes with route-owned metadata, JSON-LD, Open Graph images, and sitemap entries.

- [ ] **Step 1: Run the production build**

Run: `yarn build`

Expected: exit 0, the existing export verifier passes, and both new post routes and Open Graph assets appear under `out/blog/`.

- [ ] **Step 2: Run the explicit export check**

Run: `yarn test:export`

Expected: exit 0.

- [ ] **Step 3: Inspect both generated heads and structured data**

For each route, confirm exact canonical, `og:url`, Open Graph title and description, Twitter title and description, route-local image URL, 1200 by 630 image metadata, BlogPosting headline and dates, `mainEntityOfPage`, and JSON-LD image URL.

Inspect `out/sitemap.xml` and confirm both post URLs have a `lastmod` beginning `2026-09-15`. Confirm `out/robots.txt` references `https://islamkamel.com/sitemap.xml`.

- [ ] **Step 4: Inspect desktop and mobile rendering**

Serve the export locally and inspect `/blog` plus both posts at 1440 by 900 and 390 by 844. Verify code blocks scroll instead of clipping, headings and tables remain readable, line length is comfortable, and no section or visual can be removed without losing information.

- [ ] **Step 5: Verify homepage-section navigation from nested routes**

From `/blog` and one new post, activate Capabilities, Tech Stack, Education, and Contact. Confirm each lands on the matching homepage section ID.

- [ ] **Step 6: Run final local checks**

Run: `git diff --check`

Expected: no output.

Run: `git status --short`

Expected: only the two intended MDX files plus the already preserved untracked files remain outside committed planning documents.

### Task 4: Review and commit the two posts

**Files:**
- Review and commit: `content/blog/moving-data-processing-off-react-main-thread.mdx`
- Review and commit: `content/blog/making-react-pdf-output-deterministic.mdx`

**Interfaces:**
- Consumes: the full diff and all Task 3 evidence.
- Produces: one reviewed local commit containing only the two posts.

- [ ] **Step 1: Run the required delegated read-only review**

Check technical accuracy, example cleanup, error handling, anonymity, unsupported claims, overlap with existing posts, route metadata, and editorial specificity.

- [ ] **Step 2: Run one independent native validation pass**

Inspect the delegated result, actual diff, source references, and gate output. Resolve only confirmed findings and rerun affected checks. Do not recurse into another review loop.

- [ ] **Step 3: Commit only the approved posts**

```bash
git add content/blog/moving-data-processing-off-react-main-thread.mdx content/blog/making-react-pdf-output-deterministic.mdx
git commit -m "feat: publish two frontend engineering posts"
```

- [ ] **Step 4: Record the outcome**

Update the Obsidian plan with the commit, exact gates, inspected routes and viewports, rewritten or removed content, preserved dirty files, and the explicit no-push/no-deploy state. Set status to `success` only after all local acceptance checks pass.
