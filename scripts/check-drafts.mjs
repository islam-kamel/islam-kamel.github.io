import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const DRAFTS_DIR = path.join(POSTS_DIR, "drafts");
const DRAFTS_FILE = path.join(POSTS_DIR, "drafts.mdx");
const ARTICLE_FILE = "article.mdx";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseScalar(raw) {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^"[^"]*"$/.test(value) || /^'[^']*'$/.test(value)) {
    return value.slice(1, -1);
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter((item) => item.length > 0);
  }
  return value;
}

function parseFrontmatter(raw) {
  const lines = raw.split(/\r?\n/);
  if (lines[0] !== "---") {
    return { found: false, data: {} };
  }

  const data = {};
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }

  if (end === -1) {
    return { found: false, data: {} };
  }

  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (key.length === 0) continue;
    data[key] = parseScalar(line.slice(separator + 1));
  }

  return { found: true, data };
}

function isValidDate(value) {
  if (typeof value !== "string" || value.length === 0) return false;
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed);
}

function checkDraftArticle(draftDir, slug, violations) {
  const articlePath = path.join(draftDir, ARTICLE_FILE);
  const data = parseFrontmatter(fs.readFileSync(articlePath, "utf8")).data;

  if (data.draft !== true) {
    violations.push(
      `${path.relative(process.cwd(), articlePath)} must set "draft: true" while it lives in the drafts folder`
    );
  }

  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    violations.push(
      `${path.relative(process.cwd(), articlePath)} must have a non-empty "title"`
    );
  }

  if (!isValidDate(data.date)) {
    violations.push(
      `${path.relative(process.cwd(), articlePath)} must have a valid "date"`
    );
  }

  if (
    typeof data.description !== "string" ||
    data.description.trim().length === 0
  ) {
    violations.push(
      `${path.relative(process.cwd(), articlePath)} must have a non-empty "description"`
    );
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    violations.push(
      `${path.relative(process.cwd(), articlePath)} must have a non-empty "tags" array`
    );
  }

  if (!SLUG_PATTERN.test(slug)) {
    violations.push(
      `draft folder "${slug}" is not a valid slug, expected lowercase words joined by single hyphens`
    );
  }

  const publishedPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(publishedPath)) {
    violations.push(
      `draft "${slug}" collides with published post ${path.relative(process.cwd(), publishedPath)}`
    );
  }
}

function checkPublishedPosts(violations) {
  const entries = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"));

  for (const entry of entries) {
    const postPath = path.join(POSTS_DIR, entry.name);
    const data = parseFrontmatter(fs.readFileSync(postPath, "utf8")).data;
    if (data.draft === true) {
      violations.push(
        `${path.relative(process.cwd(), postPath)} is published but sets "draft: true", move it into content/blog/drafts/<slug>/article.mdx instead`
      );
    }
  }

  return entries.length;
}

function main() {
  const violations = [];

  if (fs.existsSync(DRAFTS_FILE)) {
    violations.push(
      "content/blog/drafts.mdx exists as a published post file, move it into content/blog/drafts/<slug>/article.mdx"
    );
  }

  if (!fs.existsSync(DRAFTS_DIR)) {
    if (violations.length > 0) {
      console.error(
        `Draft checks failed with ${violations.length} problem(s):`
      );
      for (const violation of violations) {
        console.error(`- ${violation}`);
      }
      return 1;
    }

    console.log("No drafts folder found, skipping draft checks.");
    return 0;
  }

  if (!fs.statSync(DRAFTS_DIR).isDirectory()) {
    console.error("content/blog/drafts exists but is not a directory.");
    return 1;
  }

  const entries = fs
    .readdirSync(DRAFTS_DIR, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  let draftCount = 0;
  let noteFolderCount = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const draftDir = path.join(DRAFTS_DIR, entry.name);
    const articlePath = path.join(draftDir, ARTICLE_FILE);

    if (!fs.existsSync(articlePath)) {
      noteFolderCount++;
      continue;
    }

    if (!fs.statSync(articlePath).isFile()) {
      violations.push(
        `draft folder "${entry.name}" contains a directory named article.mdx`
      );
      continue;
    }

    draftCount++;
    checkDraftArticle(draftDir, entry.name, violations);
  }

  const publishedCount = checkPublishedPosts(violations);

  if (violations.length > 0) {
    console.error(`Draft checks failed with ${violations.length} problem(s):`);
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    return 1;
  }

  console.log(
    `Draft checks passed: ${draftCount} draft(s), ${noteFolderCount} note-only folder(s), ${publishedCount} published post(s).`
  );
  return 0;
}

process.exit(main());
