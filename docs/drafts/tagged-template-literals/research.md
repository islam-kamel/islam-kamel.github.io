# Research notes

Read on 2026-10-13. Scope: tagged-template call semantics, raw strings, safe literal regex insertion, and library examples.

| Claim                                                                                                                                              | Source URL                                                                                           | Date read  | Version / scope                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------- |
| A tag receives literal segments and substitution values; its result can be any value.                                                              | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates | 2026-10-13 | JavaScript template literals          |
| The template object is reused for a given source site; its array contains cooked strings and has a raw representation.                             | https://tc39.es/ecma262/2024/multipage/ecmascript-language-expressions.html#sec-gettemplateobject    | 2026-10-13 | ECMAScript 2024                       |
| `String.raw` constructs a string using raw template segments.                                                                                      | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw          | 2026-10-13 | JavaScript built-in                   |
| `RegExp.escape()` escapes text for literal insertion into a regular expression; MDN marks it Baseline 2025 and links polyfills for older runtimes. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape       | 2026-10-13 | Node.js v24.14.1; Baseline 2025       |
| Lit uses its `html` tag to create structured template results for rendering and updates.                                                           | https://github.com/lit/lit/blob/main/dev-docs/design/how-lit-html-works.md                           | 2026-10-13 | Lit design documentation, main branch |
| Drizzle's `sql` tag converts table/column objects to escaped identifiers and scalar values to bound parameters.                                    | https://orm.drizzle.team/docs/sql                                                                    | 2026-10-13 | Drizzle SQL documentation             |
| `String.raw` preserves backslashes in literal template segments, including a Windows-style path example.                                           | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw          | 2026-10-13 | Node.js v24.14.1                      |

## Search notes

Search intent: how-to/pattern. Primary query: `tagged template literals in JavaScript`. Secondary queries: `tag function examples`, `String.raw JavaScript`, and `RegExp.escape tagged template`.

The reviewed web search results commonly cover interpolation mechanics and then show HTML, SQL, `String.raw`, or small DSL examples. A recurring omission is presenting the syntax as inherently safe. This draft makes the implementation boundary explicit, demonstrates `String.raw` preserving a path-like string, and tests the regex example with metacharacters, an empty value, Unicode, and a non-string input. A Google query was attempted in the browser but returned Google's sorry page; no Google autocomplete, PAA, or Google top-results review is claimed.
