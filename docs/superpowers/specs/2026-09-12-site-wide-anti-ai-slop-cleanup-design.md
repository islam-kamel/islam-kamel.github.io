# Site-Wide Anti-AI-Slop Cleanup

## Goal

Apply the `AGENTS.md` Anti-AI-Slop Quality Standard across every current public route while preserving the site's technical-reference direction. Remove unsupported personal experience, invented metrics, generic positioning, decorative diagrams, and repeated visual effects without inventing replacement claims.

## Editorial Direction

Blog posts are general technical references, not personal case studies. Use neutral, direct language. Label calculated scenarios and hypothetical examples explicitly. First-person language is allowed only for verifiable identity or contact statements, not implied production history.

Keep technical detail that teaches a decision, constraint, failure mode, or implementation pattern. Delete introductions, summaries, and transitions that only announce or repeat content.

## Homepage

- Remove the generic quote badge.
- Replace broad claims such as "scalable", "production-ready", and "production-tested" with direct descriptions of subject areas and technologies.
- Remove the repeated stack list from the hero because the capabilities section already names the tools.
- Keep capability categories, factual technology lists, education, certifications with issuers, links, and the contact action.
- Remove repeated radial hover gradients from capability and education cards. Retain one restrained accent treatment on the primary contact call-to-action.
- Remove redundant nested decoration where a single container communicates the same hierarchy.
- Update homepage metadata and Open Graph copy to match the cleaned positioning.

## Blog Index

- Replace personal production-history copy with a neutral label for technical articles, reference notes, and architecture patterns.
- Remove the repeated ambient radial glow from post cards.
- Keep dates, titles, descriptions, tags, and accessible links.

## LLM Pipelines Article

- Rewrite first-person and production-history claims into neutral technical guidance.
- Delete the unsupported "thousands of daily requests" and "95%" claims.
- Convert the 80/20 fallback split into an explicitly hypothetical example without claiming measured cost savings.
- Replace "What I would do differently" with a direct discussion of when an orchestration layer and evaluation set become useful.
- Remove the summary section if it only restates the article.
- Keep schema validation, retry, fallback, and logging examples, but do not claim that logging full prompts and responses is universally safe. Mention redaction and access controls because prompts may contain sensitive data.

## WebSockets Article

- Retitle and redescribe the post as a general comparison rather than a personal migration story.
- Label the polling calculation as an example: 30 clients polling every two seconds equals 900 requests per minute.
- Rewrite first-person choices as explicit design recommendations and preserve the rationale for full reconnect snapshots.
- Delete unsupported outcome metrics and the case-study timeline.
- Keep the cleanup-safe Socket.IO example, architecture diagram, scaling trade-offs, and guidance on when polling is simpler.

## GitHub Pages to Vercel Article

- Keep `islamkamel.com` facts that were verified during the migration audit, but present them as a technical migration record rather than a dramatic personal narrative.
- Delete the introductory preview sentence and inflated phrases.
- Rename headings to describe the actual changes directly.
- Delete the first Mermaid diagram because it only places obvious actors into boxes.
- Replace the remaining generic validation pipeline diagram with a more informative before/after redirect comparison, or delete it if prose is clearer. Do not retain a decorative `Push -> Deploy -> Check` flow.
- Keep verified redirect, GTM, sitemap, Search Console, and export-verification facts.
- End with the Search Console indexing state, without a generic concluding claim.

## Routes Left Structurally Unchanged

- The shared article template, navigation, footer, and error boundary contain no unsupported experience claims and remain in scope for visual verification only.
- Existing canonical, Open Graph, Twitter, structured-data, sitemap, robots, GTM, and redirect behavior must not regress.

## Validation

- Inspect `/`, `/blog`, and all three article routes at 1280px and 390px.
- Verify text and diagrams are readable without zooming and the page body has no horizontal overflow.
- Confirm retained visuals communicate information not already obvious from nearby prose.
- Search public source for first-person production claims, unsupported round metrics, inflated phrases, and removed generic positioning.
- Run lint, build, static export verification, and diff check.
- Inspect each changed route's exported canonical, Open Graph, Twitter, JSON-LD, and route-specific Open Graph image.
- Verify the deployed Vercel commit and live routes in Safari after push.

## Non-Goals

- No new components, dependencies, analytics, animations, case studies, employers, project names, performance claims, or automated prose scorer.
- No redesign of the established dark visual identity.
- No changes to Cloudflare, GTM, or Search Console configuration unless verification finds a regression caused by this cleanup.
