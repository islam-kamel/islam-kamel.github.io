# Retro Redesign Implementation Plan

Status: success

## Goal

Implement the approved editorial retro redesign across every public route, including homepage, blog index, article routes, and any existing not-found/error surfaces, preserving factual content, accessibility, SEO/export behavior, and personal-site positioning.

## Scope map

- Shared shell and design tokens: `app/layout.tsx`, `styles/globals.css`.
- Homepage and section navigation: `app/page.tsx`, `components/navbar.tsx`, `components/footer.tsx`.
- Editorial surfaces: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, existing not-found/error surfaces and only the minimum related styles/components.
- Route share cards: existing colocated `opengraph-image.tsx` files, only where needed to align with the new art direction.
- Approved hero image: `public/retro-cloud-collage.webp`, abstract pink clouds, halftone, and sage geometry.
- Reference decisions and requirements: `PRODUCT.md`, `DESIGN.md`, `.impeccable.md`, and the accompanying spec.

## Steps

1. Read `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `.impeccable.md`, and the spec. Inspect the existing components and current screenshots before editing.
2. Establish the smallest shared palette/type/texture treatment in existing styles. Keep typography and layout responsive; use existing assets/dependencies and add only original, meaningful vector art if required.
3. Redesign homepage compositions and navigation. Use natural labels (About, What I build, Education, Writing, Say hello); remove pseudo-code, bracketed headings, slash-heavy dividers, all-caps jargon, invented paths, and console/system copy. Use the approved hero collage once and remove rejected schematic computer art. Keep credentials factual and identify their issuers without unsupported “verified”/“accreditation” framing. Make “Say hello” the personal contact action.
4. Apply matching but quieter editorial styling to the blog index and article template. Protect comfortable measure, heading hierarchy, code readability, and mobile overflow behavior.
5. Update route OG cards only if the shared design warrants it. Verify that each edited route still emits its exact canonical and matching Open Graph/Twitter values, route-local image metadata, and required JSON-LD. Confirm sitemap, robots, and section links from nested routes.
6. Run formatter, type check, non-mutating lint, production build/export verification, and diff check. Use the exact repository-appropriate commands below.
7. Run Impeccable critique, fix only in-scope findings, then polish and audit. Inspect rendered `/`, `/blog`, and representative/all article routes at desktop (1440×900) and mobile (390×844) where browser tooling is available. Check keyboard focus, reduced motion, responsive overflow, and the editorial/visual checklist in `AGENTS.md`.

## Verification commands

- `yarn prettier --check <changed-files>`
- `yarn tsc --noEmit`
- `yarn eslint . --ext .ts,.tsx -c .eslintrc.json` (do not use the `lint` script because it includes `--fix`)
- `yarn build` (includes `scripts/verify-export.mjs`)
- `yarn test:export`
- `git diff --check`

Inspect generated `out/` heads for each changed route: canonical, matching OG/Twitter URL/title/description, route-local `og:image` and dimensions, Twitter image, and applicable JSON-LD. Verify sitemap entries/`lastmod` and robots sitemap reference. Record visual routes and viewport sizes; state any unavailable checks explicitly.

## Constraints and non-goals

- No changes to the four unrelated user-owned untracked files: `content/blog/making-react-pdf-output-deterministic.mdx`, `content/blog/moving-data-processing-off-react-main-thread.mdx`, `find_text`, and `find_text.swift`.
- No fake metrics/charts, fabricated personal claims, pseudo-system copy, schematic computer/terminal artwork, screenshot brand/art/text copying, hiring or freelance messaging, unnecessary dependency, or speculative Three.js.
- No production/deployment action, destructive operation, commit, push, or unrelated refactor.

## Outcome and evidence

- Outcome: the approved editorial retro redesign and final navigation/image corrections are implemented across the public routes. The approved abstract collage is `public/retro-cloud-collage.webp`. The work remains uncommitted and undeployed.
- Commands: scoped `yarn prettier --check` passed; `yarn tsc --noEmit --incremental false` passed; `yarn eslint . --ext .ts,.tsx -c .eslintrc.json` passed without warnings; `yarn build` passed with static export enabled and all 19 pages exported; `yarn test:export` passed; `git diff --check` passed. Export metadata checks passed for seven routes and all five published posts, including route canonicals/social metadata/OG assets, JSON-LD, sitemap dates, and robots reference.
- Final copy correction: removed all six middle-dot separators from public route and OG-card source, changed the program label to “Management Information Systems, 4-year program”, and simplified OG labels to “Islam Kamel”. Source and freshly rendered HTML searches found no middle-dot glyphs/entities. Re-ran formatter, typecheck, lint, build, export verifier, and diff check; all passed.
- Visual/accessibility evidence: parent inspected `/`, `/blog`, all five article routes, and `/404` at 1440×900 and 390×844; no page-level horizontal overflow. The homepage, blog index, migration diagram, and 404 were specifically reviewed. Three section-navigation links tested from `/blog` and the migration article resolved correctly. The mobile dialog kept focus inside, closed with Escape, and restored focus to its trigger. The hero image loaded at natural width 1254 and the “Personal portfolio” label was absent. Reduced-motion source was reviewed, but browser emulation was unavailable. Error runtime behavior received source review only.
- Preservation: the four pre-existing user-owned untracked files remain untracked; their recorded SHA-1 values matched the original baseline.
- Next time: inspect the exact freshly generated `out/` only after a successful build with `output: "export"` enabled. A successful verifier run against an older `out/` directory is not fresh build evidence.
- Open follow-ups: none for this redesign. No commit, push, or deployment was requested or performed.
