# Verification

- Runtime: Node.js v24.14.1 (`node --version`). `typeof RegExp.escape` returned `function`.
- `verify-example.mjs` reads `article.mdx`, extracts every JavaScript fence, concatenates them in article order, then appends the regex edge-case assertions. No example code is copied into the verifier.
- Command: `node docs/drafts/tagged-template-literals/verify-example.mjs`
- Exact output:
  ```text
  true
  false
  C:\temp\${name}
  All assertions passed.
  Executed 2 JavaScript article examples together.
  ```
- The assertions cover a match, non-match, two regex substitutions around static text (including `C++` and `a.b`), reordered substitutions, empty substitution, Unicode and regex metacharacters, and `TypeError` for a non-string substitution. They also verify the exact `String.raw` output.
- Formatter check: `npx prettier --check docs/drafts/tagged-template-literals/article.mdx docs/drafts/tagged-template-literals/research.md docs/drafts/tagged-template-literals/verification.md docs/drafts/tagged-template-literals/verify-example.mjs`.
- The six cited URLs were opened on 2026-10-13. The Drizzle SQL docs specifically distinguish escaped table/column identifiers from scalar parameters. MDN labels `RegExp.escape()` Baseline 2025 and links to polyfills.
- SEO lengths: title is 38 characters; description is 148 characters. The frontmatter title supplies the page H1; the article body has no duplicate H1. The final article contains 2 JavaScript fences.
- Google autocomplete/PAA/top-three SERP review remains incomplete because the browser query was blocked by Google's sorry page. No full Google SERP review is claimed.
- No page was published, committed, or wired into the site. The draft remains under `docs/drafts/`, outside the `content/blog` source read by `lib/blog.ts`.
