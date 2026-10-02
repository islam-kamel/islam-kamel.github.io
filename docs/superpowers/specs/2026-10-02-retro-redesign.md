# Personal Portfolio Retro Redesign

## Objective

Redesign the entire personal website, including homepage, blog index, and article pages, around the owner's approved editorial retro direction. The uploaded screenshot is the main visual reference; the free retro Framer templates and vector collection are secondary inspiration, not assets to copy wholesale.

## Product intent

This is a personal website. Visitors should understand the owner's identity and technical interests, read the technical blog, and find a personal contact action labeled “Say hello”. It is not a recruiting, freelance, or contract landing page.

## Approved art direction

- Warm off-white canvas, oversized tightly set black display typography, confident editorial spacing.
- Vivid pink as the primary feature color, muted sage as a quieter supporting field, and near-black footer.
- Restrained halftone/print texture and original artwork that adds content-specific meaning; use print-like crops, not computer-window framing.
- Light purposeful animation for reveal or interaction, with static content fully usable and `prefers-reduced-motion` respected.
- Distinct layouts by content purpose, not a repeated template of cards. Article prose and code remain calm, high contrast, and easy to scan.

The owner rejected schematic computer artwork. Use the approved original abstract pink-cloud, halftone, and sage geometric collage `public/retro-cloud-collage.webp` once in the hero; do not substitute another computer, terminal, monitor, or fake interface illustration. Prefer print-like image crops over faux UI windows. The reference informs color, scale, texture, and editorial pacing only. Do not reuse TypeSafe AI branding, screenshot copy, illustrations, or exact composition. Do not add fake charts or unsupported claims.

Use natural section labels such as About, What I build, Education, Writing, and Say hello. Do not use pseudo-code, bracketed headings, slash-heavy separators, all-caps jargon, invented file paths, or console/system labels anywhere, including navigation, articles, errors, and OG cards. Keep credentials factual, list issuing institutions, and avoid unsupported “verified” or “accreditation” labels. This remains a personal website with no hiring/freelance positioning.

## Current implementation map

- `app/page.tsx`, `app/layout.tsx`: homepage and shared shell/metadata.
- `components/navbar.tsx`, `components/footer.tsx`: shared navigation and footer.
- `styles/globals.css`: site-wide visual system.
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`: blog index and article template.
- Colocated route `opengraph-image.tsx` files: generated share cards.
- Existing dependencies include `motion`, `framer-motion`, and `lucide-react`; prefer these and CSS/SVG over new packages or Three.js.

## Requirements

1. Apply the visual direction consistently across every public route, including `/`, `/blog`, all published article routes, and any existing not-found/error surfaces, while letting reading pages prioritize readability.
2. Preserve page content unless an existing claim needs correction; do not invent facts, projects, credentials, statistics, or outcomes.
3. Make every home-section navigation link work from `/`, `/blog`, and article routes.
4. Preserve exact route-specific canonical URLs and matching Open Graph/Twitter title, description, and URL. Keep generated route-local OG images and their dimensions, styled consistently with the retro direction; avoid duplicate manual image arrays.
5. Preserve homepage Person and WebSite JSON-LD, article BlogPosting/Article JSON-LD, generated sitemap with accurate published-post `lastmod`, and robots reference to sitemap.
6. Make keyboard focus, semantic structure, color contrast, mobile layouts, and reduced-motion behavior reliable.
7. Keep implementation small; no dependency additions or 3D scene absent a concrete, necessary use case.

## Acceptance

- The homepage, blog index, article pages, and error surfaces clearly share the approved retro language while retaining their distinct content roles.
- Natural labels and the supplied abstract hero collage replace all fabricated system language and rejected schematic art.
- Mobile and desktop layouts are readable, with no page-level horizontal overflow.
- Decorative elements communicate something about the content and are removed where they only fill space.
- Every factual claim remains supported by existing content; no invented metrics or generic portfolio filler is introduced.
- Contact uses “Say hello” and remains personal.
- SEO metadata, structured data, OG images, sitemap, robots, and nested-route navigation continue to satisfy `AGENTS.md`.
- Motion is optional to comprehension and reduced-motion safe.
