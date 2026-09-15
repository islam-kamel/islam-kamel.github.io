# Two Technical Blog Posts Design

## Goal

Publish two English technical posts that add new portfolio evidence without repeating the existing LLM reliability, WebSocket, or deployment articles.

## Shared Constraints

- Use only anonymized, synthetic examples. Do not name a company, client, project, or industry.
- Make every claim either directly demonstrable from the example or clearly framed as a design choice.
- Keep titles under roughly 60 characters and use the existing MDX front matter contract.
- Reuse the current dynamic post route, Open Graph image generator, JSON-LD, and sitemap discovery.
- Add no dependencies, components, diagrams, decorative charts, or route-specific metadata code.

## Post 1: Moving Data Processing Off React's Main Thread

The article will use a synthetic data table whose filtering and aggregation block interaction when run synchronously. It will be structured as an annotated execution trace rather than a generic introduction and checklist.

It will cover:

1. Identifying CPU-bound data work that belongs outside React rendering.
2. Defining a small typed request and response contract for a native Web Worker.
3. Ignoring stale results with job identifiers when newer input supersedes older work.
4. Handling worker errors and terminating the worker in React cleanup.
5. Measuring main-thread responsiveness with an explicit browser profiling procedure, without inventing benchmark numbers.

The example will use browser-native workers and React primitives. It will not add a worker helper library or claim that workers reduce total computation time.

## Post 2: Making React PDF Output Deterministic

The article will use a synthetic multi-page report and organize the material as a failure catalogue: unstable inputs, font differences, pagination drift, ordering drift, and failed generation.

It will cover:

1. Normalizing and sorting data before rendering.
2. Registering fonts explicitly and avoiding environment-dependent typography.
3. Defining page dimensions, margins, wrapping, and intentional page breaks.
4. Keeping timestamps and identifiers outside the render path so the same input produces the same document.
5. Treating PDF generation as a fallible operation and exposing a clear retryable error state.

The code will use the public React PDF API confirmed from current documentation. It will not introduce the library into this portfolio application because the article is content, not a portfolio runtime feature.

## Repository Integration

Only two files will be added under `content/blog/`. `getAllPosts()` already discovers MDX files and feeds the blog index, static post parameters, dynamic Open Graph images, and sitemap entries. The shared post page already derives canonical, Open Graph, Twitter, and BlogPosting JSON-LD values from front matter, so no route code is required.

## Verification

1. Run the smallest existing focused checks, then the production static export and `yarn test:export`.
2. Inspect each generated article head for its exact canonical URL, Open Graph title and description, Twitter title and description, route-specific image URL, and 1200 by 630 image dimensions.
3. Inspect each BlogPosting JSON-LD object and confirm the sitemap contains both URLs with truthful dates.
4. Render `/blog` and both posts at 1440 by 900 and 390 by 844. Check code overflow, heading rhythm, readable line length, and removal of any redundant section or visual.
5. From `/blog` and one new post, verify Capabilities, Tech Stack, Education, and Contact navigation reaches the matching homepage sections.
6. Review the full diff and preserve the pre-existing untracked `find_text` files.

## Scope Limits

No redesign, dependency installation, shared component refactor, existing-article rewrite, commit of unrelated files, deployment, publication, or indexing request is included.
