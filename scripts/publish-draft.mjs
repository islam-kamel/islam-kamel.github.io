#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const DRAFTS_DIR = path.join(POSTS_DIR, "drafts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DRAFT_LINE_PATTERN = /^draft:\s*true\s*$/;

function printUsage() {
  console.error("Usage: node scripts/publish-draft.mjs <slug>");
  console.error("");
  console.error(
    "Moves content/blog/drafts/<slug>/article.mdx to content/blog/<slug>.mdx"
  );
  console.error("and changes draft: true to draft: false in its frontmatter.");
}

function main() {
  const slug = process.argv[2];

  if (!slug) {
    printUsage();
    return 1;
  }

  if (!SLUG_PATTERN.test(slug)) {
    console.error(
      `Error: "${slug}" is not a valid slug, expected lowercase words joined by single hyphens.`
    );
    return 1;
  }

  const draftDir = path.join(DRAFTS_DIR, slug);
  const articlePath = path.join(draftDir, "article.mdx");
  const publishedPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(articlePath) || !fs.statSync(articlePath).isFile()) {
    console.error(
      `Error: no draft article found at content/blog/drafts/${slug}/article.mdx.`
    );
    return 1;
  }

  if (fs.existsSync(publishedPath)) {
    console.error(
      `Error: content/blog/${slug}.mdx already exists, resolve the collision before publishing.`
    );
    return 1;
  }

  const raw = fs.readFileSync(articlePath, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = raw.split(eol);
  const closingIndex = lines.indexOf("---", 1);

  if (lines[0] !== "---" || closingIndex === -1) {
    console.error(
      `Error: content/blog/drafts/${slug}/article.mdx has no frontmatter block.`
    );
    return 1;
  }

  const draftLineIndex = lines.findIndex(
    (line, index) =>
      index > 0 && index < closingIndex && DRAFT_LINE_PATTERN.test(line)
  );

  if (draftLineIndex === -1) {
    console.error(
      `Error: content/blog/drafts/${slug}/article.mdx must set "draft: true" in its frontmatter.`
    );
    return 1;
  }

  lines[draftLineIndex] = "draft: false";

  fs.writeFileSync(publishedPath, lines.join(eol));
  fs.rmSync(articlePath);

  console.log(
    `Published ${slug} to content/blog/${slug}.mdx and removed the draft article.`
  );

  const remaining = fs.existsSync(draftDir)
    ? fs.readdirSync(draftDir).filter((entry) => entry !== "article.mdx")
    : [];

  if (remaining.length > 0) {
    console.log(`Draft notes kept in content/blog/drafts/${slug}/.`);
  }

  return 0;
}

process.exit(main());
