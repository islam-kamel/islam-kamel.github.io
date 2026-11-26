# Verification notes for "A Software Factory Pipeline Using AI Agents"

Unpublished working notes. Not served by the site. Written on 2026-11-26.

## Environment

| Tool    | Version       |
| ------- | ------------- |
| Node.js | v20.18.2      |
| Git     | 2.43.0        |
| npm     | 10.8.2        |
| gh CLI  | not installed |

`/work` has no Git remote, so the integrator step (push plus draft pull request) is described in the article, not executed.

## Article commands, run from the final article text

Every fenced command and file was extracted from the final `article.mdx` and executed in a fresh temp directory. The extraction runner asserted each step. Results:

| Article block                                                                                                  | Expected                                     | Actual                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `mkdir slugify-demo`, `cd slugify-demo`, `git init`, `git switch -c feat/slugify`                              | all exit 0                                   | all exited 0                                                                                                                            |
| `git add .`, commit as Demo, `git show --stat --oneline HEAD`                                                  | diff touches 2 files, 7 + 20 = 27 insertions | `src/slugify.mjs \| 7 +++++++`, `test/slugify.test.mjs \| 20 ++++++++++++++++++++`, `2 files changed, 27 insertions(+)`                 |
| `git worktree add -b review/slugify ../slugify-review feat/slugify`, `cd`, `node --test test/slugify.test.mjs` | exit 1, failure excerpt matches              | exit 1, output contained `not ok 3 - keeps Unicode letters`, `+ 'caf-au-lait'`, `- 'café-au-lait'`, `# tests 4`, `# pass 3`, `# fail 1` |
| fix applied, `cd ../slugify-demo`, commit, `cd ../slugify-review`                                              | all exit 0                                   | all exited 0, commit reported `1 file changed, 1 insertion(+), 1 deletion(-)`                                                           |
| `git merge feat/slugify`, `node --test test/slugify.test.mjs`                                                  | exit 0, four passes                          | fast-forward merge, exit 0, `# pass 4`, `# fail 0`                                                                                      |

Edge claims in the prose, run against the article's final `src/slugify.mjs`:

```text
$ node -e "...slugify('- hello -'), slugify('')"
'hello'
''
```

The strip-rule claim was also checked: after the replace step, all four test inputs produce strings with no leading or trailing hyphen, so `.replace(/^-+|-+$/g, "")` never fires in the article's tests.

## Example fixtures, run via verify-example.mjs

`node content/blog/drafts/software-factory-pipeline-ai-agents/verify-example.mjs` exits 0 and asserts:

1. `example/before` suite exits 1 with `actual: 'caf-au-lait'` and `expected: 'café-au-lait'`, 3 pass, 1 fail.
2. `example/after` suite exits 0 with 4 pass, 0 fail.
3. A temp repo built from the `after` files: branch, commit, `git show --stat --oneline HEAD` (7 + 20 = 27 insertions), worktree add, four passes inside the worktree, worktree removal, temp repo deletion.

The script prints the full TAP output for each step, so the article's trimmed excerpts can be compared against the complete output. The excerpts in the article elide `duration_ms`, `location`, `failureType`, and `code` lines and mark the elision with `...`.

## Draft exclusion from the site

`npm run check:drafts` (new) prints:

```text
Draft checks passed: 1 draft(s), 0 note-only folder(s), 10 published post(s).
```

`node --test scripts/check-drafts.test.mjs` runs 10 cases against temporary fixtures, all passing: valid draft, note-only folder skip, missing `draft: true`, published post with `draft: true`, slug collision, each missing required field, invalid slug, `content/blog/drafts.mdx` file, drafts path as a file, no drafts folder.

After `npm run build` (which now runs check-theme-tokens, check-drafts, next build, verify-export):

```text
Static export verification passed: all invariants verified.
```

Manual export inspection:

- `out/blog/software-factory-pipeline-ai-agents.html` does not exist.
- `out/blog/software-factory-pipeline-ai-agents/` does not exist.
- `software-factory-pipeline-ai-agents` appears 0 times in `out/sitemap.xml` and 0 times in `out/blog.html`.
- The sitemap has 12 `<url>` entries: homepage, blog index, and the 10 published posts. Each published slug was checked individually and all 10 appear.
- The build route list shows the 10 published `/blog/[slug]` paths and no 11th post.

## Other checks

| Check                                                          | Result                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npx prettier --check` on every added or modified file         | passing                                                                                                                                                                                                                                                                                 |
| `npx eslint . --ext .ts,.tsx -c .eslintrc.json` (non-fix mode) | no findings                                                                                                                                                                                                                                                                             |
| `npx tsc --noEmit --incremental false`                         | exit 0                                                                                                                                                                                                                                                                                  |
| `npm ci`                                                       | fails on a pre-existing peer conflict (`tailwind-variants@2.0.1` inside `@heroui/theme` vs root `tailwindcss@3.4.16`); `.npmrc` sets `package-lock=false` and the repo tracks `yarn.lock`. Install completed with `npm ci --legacy-peer-deps` (756 packages). No lockfile was modified. |
| Article code blocks vs example fixtures                        | the before implementation and the test file are byte-identical between `article.mdx` and `example/`; the fix line differs only by the 4-space indent, which the article shows as a standalone changed line                                                                              |
| Mermaid block static checks                                    | quoted node and edge labels, same syntax family as the two published diagrams that render on the live site                                                                                                                                                                              |
| Article style scan                                             | no em dash, no middle dot, no emoji, no words from the banned list                                                                                                                                                                                                                      |

## Could not verify

1. **Mermaid rendering at both viewports.** No browser exists in this environment. Open `diagram-preview.html` (serve the repo root over HTTP, it fetches `article.mdx` and renders its mermaid block with the same Mermaid 11 CDN build and theme tokens as the site) and check 1440x900 and 390x844 for readable labels, no overlap, and horizontal scrolling on the narrow width.
2. **Pipe tables on the live site.** `lib/mdx.tsx` parses CommonMark without `remark-gfm`, and no published article uses a markdown table, so this draft's tables would currently render as plain pipe-text paragraphs. Publishing as designed needs either the `remark-gfm` addition (a dependency change that needs owner approval) or converting the tables. Site rendering was not attempted because integration is not authorized for this ticket.
3. **The draft publish date.** Frontmatter carries `2026-11-26`. The owner confirms the final publish date before the article moves out of the draft folder.
4. **The pipeline itself.** The factory source is unavailable, so the roles, write scopes, retry limits, resume rule, and lease rule stay proposed; the article marks each one.

## Publish checklist when the owner approves

1. Move `article.mdx` to `content/blog/software-factory-pipeline-ai-agents.mdx` and remove `draft: true`.
2. Leave `research.md`, `verification.md`, `diagram-preview.html`, `verify-example.mjs`, and `example/` in the draft folder; `check-drafts` will skip it as a note-only folder.
3. Resolve the table rendering question from item 2 above.
4. Run `npm run build` and inspect the new page's canonical, Open Graph, Twitter, and JSON-LD values.
5. Do not push, merge, publish, or deploy without explicit approval.
