# Design

## Direction

An editorial retro portfolio informed by the owner's uploaded TypeSafe AI screenshot: oversized tight black typography on warm off-white; vivid pink feature panels; muted sage interludes; and a near-black footer. Reinterpret its hierarchy and print-era texture for this personal site. Do not copy its brand, copy, illustrations, or exact layout.

## Visual language

- Use a strong grotesk display face already available to the project or a restrained system fallback. Keep body and article typography highly readable.
- Build clear, varied editorial compositions with generous margins, deliberate alignment, and a small palette. Pink signals featured content; sage provides visual rest; dark is reserved for the footer and selected contrast.
- Use the approved abstract pink-cloud, halftone, and sage geometric print collage at `public/retro-cloud-collage.webp` once in the hero. Do not use schematic computer/terminal artwork, fake interface frames, or console copy. Other visuals must be original and clearly relate to their content.
- Each illustration must add meaning or context. Avoid repeated card grids, ubiquitous pills, gradients, glows, ornamental diagrams, and fabricated data visuals.

## Motion and interaction

Motion is short, subtle, and tied to an interaction or reveal. Honor `prefers-reduced-motion`, keep all content available without animation, and ensure keyboard focus and hover affordances remain clear. Prefer existing motion dependencies or CSS; Three.js is unnecessary unless a concrete visual need cannot be met simply.

## Responsive and accessible behavior

Design for mobile and desktop, with readable article widths, usable navigation, visible focus, semantic headings and links, sufficient contrast, and no horizontal page overflow. Code blocks and genuinely wide content may scroll within their own region.

## Content and metadata

Use direct, specific language and existing facts. Contact is personal (“Say hello”), without job-seeking or freelance positioning. Prefer natural labels (About, What I build, Education, Writing, Say hello); avoid pseudo-code, brackets, slash-heavy separators, all-caps jargon, invented paths, and system/console language. Name certification issuers without unsupported “verified” or “accreditation” framing. Preserve route-specific canonical, Open Graph and Twitter metadata; generated route Open Graph images; structured data; sitemap and robots behavior; and navigation links from nested routes.

Prefer plain text labels and ordinary punctuation. Do not use decorative text symbols or glyphs as separators in interface copy.
