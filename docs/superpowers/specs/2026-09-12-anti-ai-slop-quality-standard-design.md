# Anti-AI-Slop Quality Standard

## Goal

Add a concise, enforceable standard to `AGENTS.md` that prevents generic AI-shaped writing and decorative interface patterns across the entire website. The standard covers page copy, blog content, visual composition, diagrams, and final review.

## Scope

- All public routes, including the homepage, blog index, articles, navigation, and error states.
- New content and material edits to existing content.
- Visual devices used to communicate content, including cards, gradients, icons, animations, charts, and Mermaid diagrams.
- Agent review requirements before a page or article is considered complete.

This change adds project rules only. It does not rewrite existing pages or introduce a new linter, dependency, or content framework.

## Rules

### Specificity over generic prose

Every section must contain a project-specific fact, decision, constraint, result, or example. Remove statements that could be pasted unchanged into another portfolio.

Rejected:

> Building resilient systems requires a thoughtful and comprehensive approach.

Accepted:

> The old workflow deployed every push to GitHub Pages although Vercel had already become the production host.

Claims must be supported by observable evidence. Round statistics, performance claims, and business outcomes need their measurement method or source.

### Direct language over inflated language

Headings and sentences must describe the actual subject. Avoid corporate filler, dramatic transitions, false certainty, and conclusions that merely repeat the page.

Rejected:

> Eliminating Measurement Drift in Analytics

Accepted:

> Removing the Retired GTM Container

Rejected phrases include patterns such as "a subtle discrepancy surfaced", "the data was conclusive", "seamless experience", and "stands on solid engineering ground" unless the surrounding evidence makes that exact wording necessary.

### Varied structure over templates

Do not default pages or posts to the same introduction, problem, numbered solution, checklist, and summary structure. Choose structure from the material: incident timeline, decision record, comparison, technical walkthrough, annotated example, or another form justified by the content.

Do not add an introduction that previews the article or a conclusion that only restates it. Start with the concrete event or question when possible and end when the useful information ends.

### Informative visuals only

A visual must make a relationship, comparison, sequence, hierarchy, or measured result easier to understand than short prose. Delete diagrams that merely put obvious steps into boxes.

Rejected:

```text
Push -> Build -> Deploy
```

Accepted:

```text
Before: HTTP www -> HTTPS www -> HTTPS apex
After:  HTTP/HTTPS www -> HTTPS apex
```

Never invent metrics or use decorative charts. A chart requires real data, its source or collection method, labels, units, and enough context to interpret it.

Diagrams must use the available content width and remain readable at supported breakpoints. On narrow screens, preserve readable labels and allow horizontal scrolling rather than shrinking the diagram into illegibility.

### Deliberate visual composition

Do not repeat the same card grid, gradient, pill, icon, glow, or animation in every section. Reuse a treatment only when it communicates the same function. Decorative elements must support hierarchy or meaning, not fill empty space.

Keep density appropriate to the information. Do not wrap a sentence in a card, add a section for one weak claim, or use motion where a static state communicates the same thing.

## Required Review

Before completing a new or materially changed public page, the agent must inspect the rendered page at desktop and mobile widths and answer:

1. Could any section be moved to another portfolio unchanged? If yes, rewrite or remove it.
2. Could any section or visual be removed without losing information? If yes, remove it.
3. Does every claim have evidence or clearly read as opinion? If no, qualify or support it.
4. Does every visual communicate more than nearby prose? If no, remove or replace it.
5. Are diagrams and text readable without zooming at desktop and mobile widths? If no, fix the presentation.
6. Does the page repeat a structure or visual treatment already overused elsewhere on the site? If yes, revise it.

Record concrete evidence in the final report: routes inspected, viewport sizes, and any content or visuals removed or rewritten. Build success alone is not visual or editorial verification.

## Validation

- Confirm the new section in `AGENTS.md` is internally consistent with existing metadata, content, and homepage rules.
- Confirm every rule has an actionable failure condition.
- Confirm the examples demonstrate specific rejected and accepted outcomes.
- Run a diff check after editing.
- Do not add an automated prose scorer. It would generate false confidence and is unnecessary until repeated manual reviews show a measurable need.
