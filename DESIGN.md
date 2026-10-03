# Design

## Direction

An editorial retro portfolio informed by selected references: Reado for calm editorial spacing and clear typography, NOORIE for purposeful framed surfaces and pink accents, and a restrained print-era palette of warm off-white, pink feature panels, muted sage, and ink contrast. Do not copy brand marks, copy, or exact layouts.

## Visual language

- Use a strong grotesk display face already available to the project or a restrained system fallback. Keep body and article typography highly readable.
- Build clear, varied editorial compositions with generous margins, deliberate alignment, and a small palette. Pink signals featured content; sage provides visual rest; dark is reserved for the footer and selected contrast.
- Hero artwork is an original chunky pixel-art CRT computer and keyboard rendered via SVG in `components/retro-pixel-pc.tsx`, using the site's palette (ink, paper, sage, pink). As a single deliberate exception to the no-terminal rule, the CRT screen displays accessible, finite recorded terminal output from verified repository commands (`node --version` and `yarn --version`). It reveals once via CSS without looping or simulating an interactive shell, and presents immediately and statically under `prefers-reduced-motion`. Fake telemetry, metrics, terminal copy, or schematic readouts remain strictly forbidden everywhere else across the site.
- Each illustration must add meaning or context. Avoid repeated card grids, ubiquitous pills, gradients, glows, ornamental diagrams, and fabricated data visuals.
- Keep print textures selective: the featured writing panel may use the quiet low-contrast print grid over pink.

## Motion and interaction

Motion is short, subtle, and tied to an interaction or reveal. Honor `prefers-reduced-motion`, keep all content available without animation, and ensure keyboard focus and hover affordances remain clear. Prefer existing motion dependencies or CSS; Three.js is unnecessary unless a concrete visual need cannot be met simply.

## Responsive and accessible behavior

Design for mobile and desktop, with readable article widths, usable navigation, visible focus, semantic headings and links, sufficient contrast, and no horizontal page overflow. Code blocks and genuinely wide content may scroll within their own region.

## Content and metadata

Use direct, specific language and existing facts. Contact is personal (“Say hello”), without job-seeking or freelance positioning. Prefer natural labels (About, What I build, Education, Writing, Say hello); avoid pseudo-code, brackets, slash-heavy separators, all-caps jargon, invented paths, and system/console language. Name certification issuers without unsupported “verified” or “accreditation” framing. Preserve route-specific canonical, Open Graph and Twitter metadata; generated route Open Graph images; structured data; sitemap and robots behavior; and navigation links from nested routes.

Prefer plain text labels and ordinary punctuation. Do not use decorative text symbols or glyphs as separators in interface copy.
