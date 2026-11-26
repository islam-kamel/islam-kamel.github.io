import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CHECK_SCRIPT = fileURLToPath(
  new URL("./check-drafts.mjs", import.meta.url)
);

const VALID_DRAFT = `---
title: "Sample Draft"
date: "2026-11-26"
description: "A draft used by the checker tests."
tags: ["Testing"]
draft: true
---

Draft body.
`;

const PUBLISHED_POST = `---
title: "Sample Post"
date: "2026-09-09"
description: "A published post used by the checker tests."
tags: ["Testing"]
---

Published body.
`;

function makeTempRoot(t) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "check-drafts-"));
  t.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));
  return tempRoot;
}

function writeFixture(tempRoot, relativePath, content = "") {
  const fullPath = path.join(tempRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

function runChecker(tempRoot) {
  return spawnSync(process.execPath, [CHECK_SCRIPT], {
    cwd: tempRoot,
    encoding: "utf8",
  });
}

test("valid draft with draft true exits 0", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(
    tempRoot,
    "content/blog/drafts/sample-draft/article.mdx",
    VALID_DRAFT
  );
  writeFixture(tempRoot, "content/blog/published.mdx", PUBLISHED_POST);

  const result = runChecker(tempRoot);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Draft checks passed: 1 draft\(s\)/);
});

test("folder without article.mdx is skipped as a note folder", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(
    tempRoot,
    "content/blog/drafts/sample-draft/article.mdx",
    VALID_DRAFT
  );
  writeFixture(tempRoot, "content/blog/drafts/notes-only/research.md", "notes");

  const result = runChecker(tempRoot);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 note-only folder\(s\)/);
});

test("draft missing draft true exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(
    tempRoot,
    "content/blog/drafts/sample-draft/article.mdx",
    VALID_DRAFT.replace("draft: true\n", "")
  );

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /must set "draft: true"/);
});

test("root post with draft true exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(tempRoot, "content/blog/drafts/.keep", "");
  writeFixture(
    tempRoot,
    "content/blog/published.mdx",
    PUBLISHED_POST.replace(
      'tags: ["Testing"]',
      'tags: ["Testing"]\ndraft: true'
    )
  );

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /is published but sets "draft: true"/);
});

test("draft slug colliding with a root post exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(
    tempRoot,
    "content/blog/drafts/published/article.mdx",
    VALID_DRAFT
  );
  writeFixture(tempRoot, "content/blog/published.mdx", PUBLISHED_POST);

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /collides with published post/);
});

test("draft missing required frontmatter fields exits 1", (t) => {
  for (const field of ["title", "date", "description", "tags"]) {
    const tempRoot = makeTempRoot(t);
    const pattern =
      field === "tags"
        ? new RegExp(`tags: \\["Testing"\\]\\n`)
        : new RegExp(`${field}: "[^"]*"\\n`);
    writeFixture(
      tempRoot,
      "content/blog/drafts/sample-draft/article.mdx",
      VALID_DRAFT.replace(pattern, "")
    );

    const result = runChecker(tempRoot);

    assert.equal(result.status, 1, `expected failure for missing ${field}`);
    assert.match(result.stderr, new RegExp(`must have .*"${field}"`));
  }
});

test("draft folder name that is not a valid slug exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(
    tempRoot,
    "content/blog/drafts/Sample_Draft/article.mdx",
    VALID_DRAFT
  );

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a valid slug/);
});

test("content/blog/drafts.mdx file exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(tempRoot, "content/blog/drafts.mdx", VALID_DRAFT);

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /content\/blog\/drafts\.mdx exists/);
});

test("content/blog/drafts existing as a file exits 1", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(tempRoot, "content/blog/drafts", "not a directory");

  const result = runChecker(tempRoot);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a directory/);
});

test("no drafts directory exits 0", (t) => {
  const tempRoot = makeTempRoot(t);
  writeFixture(tempRoot, "content/blog/published.mdx", PUBLISHED_POST);

  const result = runChecker(tempRoot);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /No drafts folder found/);
});
