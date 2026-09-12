# Anti-AI-Slop Quality Standard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use the repository's `agy-delegate` feature and review lanes to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add enforceable writing and visual-quality rules with rejected and accepted examples to `AGENTS.md`.

**Architecture:** Extend the existing project instruction document with one self-contained quality section. Reuse the current manual review workflow and build verification; add no source files, dependencies, or automated prose scoring.

**Tech Stack:** Markdown project instructions, Git diff validation

## Global Constraints

- Cover page copy, blog content, structure, cards, gradients, icons, animations, charts, and Mermaid diagrams.
- Require project-specific evidence and direct language.
- Reject decorative or unreadable visuals and invented metrics.
- Include actionable rejected and accepted examples.
- Do not rewrite existing pages in this task.
- Do not add an automated prose scorer or dependency.
- Preserve unrelated uncommitted Mermaid renderer changes.

---

### Task 1: Add the quality standard

**Files:**
- Modify: `AGENTS.md`
- Reference: `docs/superpowers/specs/2026-09-12-anti-ai-slop-quality-standard-design.md`

**Interfaces:**
- Consumes: Existing content, metadata, homepage, navigation, and verification rules in `AGENTS.md`.
- Produces: One `Anti-AI-Slop Quality Standard` section that future agents can apply without consulting another document.

- [ ] **Step 1: Add the approved rules**

Insert a section before the existing content-writing rules covering specificity, direct language, varied structure, informative visuals, deliberate visual composition, and required desktop/mobile review.

- [ ] **Step 2: Include concrete failure examples**

Include at least these contrasts:

```text
Rejected: Building resilient systems requires a thoughtful and comprehensive approach.
Accepted: The old workflow deployed every push to GitHub Pages although Vercel had already become the production host.

Rejected: Push -> Build -> Deploy
Accepted: Before: HTTP www -> HTTPS www -> HTTPS apex
          After:  HTTP/HTTPS www -> HTTPS apex
```

- [ ] **Step 3: Check consistency and scope**

Run:

```bash
rg -n "Anti-AI-Slop|Rejected:|Accepted:|desktop|mobile|invent" AGENTS.md
git diff --check
git diff -- AGENTS.md
```

Expected: the section includes explicit failure conditions and examples, the diff is clean, and no files outside `AGENTS.md` are part of this task's implementation diff.

- [ ] **Step 4: Review and commit**

Run the required read-only review lane. After approval, stage only `AGENTS.md` and commit:

```bash
git add AGENTS.md
git commit -m "docs: add anti AI slop quality rules"
```
