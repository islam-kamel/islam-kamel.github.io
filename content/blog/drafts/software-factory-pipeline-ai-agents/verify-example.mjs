import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const draftDir = path.dirname(fileURLToPath(import.meta.url));
const beforeDir = path.join(draftDir, "example/before");
const afterDir = path.join(draftDir, "example/after");

function run(command, args, options) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options });
  return {
    status: result.status,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim(),
  };
}

function printSection(title, command, output) {
  console.log(`\n## ${title}`);
  console.log("```text");
  console.log(`$ ${command}`);
  console.log(output);
  console.log("```");
}

function runTestSuite(cwd) {
  return run(process.execPath, ["--test", "test/slugify.test.mjs"], { cwd });
}

function verifyBeforeFails() {
  const result = runTestSuite(beforeDir);
  const command = "node --test test/slugify.test.mjs   # cwd: example/before";

  assert.notEqual(result.status, 0, "before suite must exit nonzero");
  assert.match(
    result.stdout,
    /actual: 'caf-au-lait'/,
    "before suite must report the stripped-accent actual value"
  );
  assert.match(
    result.stdout,
    /expected: 'café-au-lait'/,
    "before suite must report the accented expected value"
  );
  assert.match(result.stdout, /# pass 3/, "before suite must pass 3 tests");
  assert.match(result.stdout, /# fail 1/, "before suite must fail 1 test");

  printSection(
    "Before implementation fails on the Unicode test",
    command,
    result.stdout
  );
}

function verifyAfterPasses() {
  const result = runTestSuite(afterDir);
  const command = "node --test test/slugify.test.mjs   # cwd: example/after";

  assert.equal(result.status, 0, "after suite must exit zero");
  assert.match(result.stdout, /# pass 4/, "after suite must pass 4 tests");
  assert.match(result.stdout, /# fail 0/, "after suite must fail 0 tests");

  printSection(
    "After implementation passes all four tests",
    command,
    result.stdout
  );
}

function verifyWorktreeHandoff() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "verify-example-"));
  const repoDir = path.join(tempRoot, "slugify-demo");
  const reviewDir = path.join(tempRoot, "slugify-review");

  try {
    fs.mkdirSync(repoDir);
    fs.cpSync(path.join(afterDir, "src"), path.join(repoDir, "src"), {
      recursive: true,
    });
    fs.cpSync(path.join(afterDir, "test"), path.join(repoDir, "test"), {
      recursive: true,
    });

    const git = (args) => run("git", args, { cwd: repoDir });
    const gitIn = (cwd) => (args) => run("git", args, { cwd });

    let result = git(["init"]);
    assert.equal(result.status, 0, result.stderr);

    result = git(["switch", "-c", "feat/slugify"]);
    assert.equal(result.status, 0, result.stderr);
    printSection(
      "Create the feature branch",
      "git switch -c feat/slugify",
      [result.stdout, result.stderr].filter(Boolean).join("\n")
    );

    const commitArgs = [
      "-c",
      'user.name="Demo"',
      "-c",
      "user.email=demo@example.com",
      "commit",
      "-m",
      "Add slugify and tests",
    ];

    result = git(["add", "."]);
    assert.equal(result.status, 0, result.stderr);
    result = git(commitArgs);
    assert.equal(result.status, 0, result.stderr);

    result = git(["show", "--stat", "--oneline", "HEAD"]);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Add slugify and tests/);
    assert.match(result.stdout, /src\/slugify\.mjs\s+\|\s+7 \+/);
    assert.match(result.stdout, /test\/slugify\.test\.mjs\s+\|\s+20 \+/);
    assert.match(result.stdout, /2 files changed, 27 insertions\(\+\)/);
    printSection(
      "Commit evidence for the handoff",
      "git show --stat --oneline HEAD",
      result.stdout
    );

    result = git([
      "worktree",
      "add",
      "-b",
      "review/slugify",
      "../slugify-review",
      "feat/slugify",
    ]);
    assert.equal(result.status, 0, result.stderr);
    printSection(
      "Reviewer creates an isolated worktree",
      "git worktree add -b review/slugify ../slugify-review feat/slugify",
      [result.stdout, result.stderr].filter(Boolean).join("\n")
    );

    const reviewRun = runTestSuite(reviewDir);
    assert.equal(reviewRun.status, 0, reviewRun.stderr);
    assert.match(reviewRun.stdout, /# pass 4/);
    assert.match(reviewRun.stdout, /# fail 0/);
    printSection(
      "Reviewer reruns the tests in the worktree",
      "node --test test/slugify.test.mjs   # cwd: ../slugify-review",
      reviewRun.stdout
    );

    result = gitIn(repoDir)(["worktree", "remove", "../slugify-review"]);
    assert.equal(result.status, 0, result.stderr);
    printSection(
      "Worktree cleanup",
      "git worktree remove ../slugify-review",
      [result.stdout, result.stderr].filter(Boolean).join("\n")
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

verifyBeforeFails();
verifyAfterPasses();
verifyWorktreeHandoff();

console.log("\nverify-example: all checks passed.");
