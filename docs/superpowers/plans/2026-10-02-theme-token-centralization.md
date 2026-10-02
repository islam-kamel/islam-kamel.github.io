# Theme Token Centralization Plan

Status: completed

## Goal

Centralize the retro theme palette and reusable shadow/gradient values so UI consumers reference named Tailwind utilities or shared tokens instead of embedding theme literals. Preserve the current rendered appearance and behavior.

## Scope

- UI components, app routes, global styles, Tailwind config, and any small shared token module needed by Tailwind, Open Graph renderers, and Mermaid.
- `AGENTS.md` for one concise future rule and the smallest regression guard if practical.
- Do not edit page content, unrelated assets, user drafts, or project dependencies.

## Steps

1. Audit theme-related hex/rgb/hsl values, arbitrary color classes, gradients, and shadows in UI code and distinguish theme values from unrelated literal code examples/assets.
2. Select one canonical palette source compatible with Tailwind CSS 3.4 and the TypeScript/JavaScript renderers. Retain raw palette literals only in that source; use named Tailwind colors/shadows and shared references elsewhere.
3. Replace UI literals without changing layout, content, interaction, contrast, alpha behavior, or rendered styling. Keep unrelated colors and content examples intact.
4. Add a concise AGENTS.md token-use rule and a minimal regression check that catches raw theme literals in consumer UI files while excluding the canonical token source and legitimate non-theme examples/assets.
5. Format scoped files, run typecheck, non-mutating lint, static build/export checks, and inspect the diff for appearance-affecting changes.

## Verification Run & Results

- Scoped Prettier check: passed (exit 0)
- `yarn tsc --noEmit --incremental false`: passed (exit 0)
- `yarn eslint . --ext .ts,.tsx -c .eslintrc.json`: passed (exit 0, 0 warnings, 0 errors)
- `node scripts/check-theme-tokens.mjs`: passed (exit 0, self-check passed, all 27 consumer UI files scanned with 0 violations)
- Guard wired into `package.json` `build` script before static build/export without new dependencies or lockfile changes
- Canonical shared token module converted to `styles/tokens.mjs` with `styles/tokens.d.ts` typing
- `yarn build`: passed (exit 0, zero `MODULE_TYPELESS_PACKAGE_JSON` warning, static export verification passed)
- `git diff --check`: passed (exit 0)
- Independent final verification after converting the canonical module to `.mjs`: scoped Prettier, typecheck, non-mutating ESLint, token guard, and diff check all passed again; a fresh foreground `yarn build` passed with the guard, all 19 static pages, and export verifier, with no module warning.
- Visual review by the orchestrator confirmed the existing pink, sage, and prose colors are unchanged at desktop and mobile, and the Mermaid diagram retained readable black labels (17 checked).

Outcome: UI theme color, shadow, and gradient literals now resolve through the canonical `styles/tokens.mjs` source and named Tailwind utilities. A self-checking guard scans consumer UI files and runs before the build. No design or content change, dependency addition, commit, or deployment was made.

## Constraints

No new dependencies, content/layout changes, commits, pushes, deployments, secret or `.env` reads, or destructive operations. Preserve unrelated user-owned files and edits. AGY implements only; the orchestrator reviews and verifies.
