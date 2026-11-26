import fs from "fs";
import path from "path";

import matter from "gray-matter";

export interface DraftPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface DraftPost extends DraftPostMeta {
  content: string;
}

const DRAFTS_DIR = path.join(process.cwd(), "content/blog/drafts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasDraftArticle(slug: string): boolean {
  return (
    SLUG_PATTERN.test(slug) &&
    fs.existsSync(path.join(DRAFTS_DIR, slug, "article.mdx"))
  );
}

function readDraftArticle(slug: string): DraftPost {
  const raw = fs.readFileSync(
    path.join(DRAFTS_DIR, slug, "article.mdx"),
    "utf-8"
  );
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
  };
}

export function getAllDrafts(): DraftPostMeta[] {
  if (!fs.existsSync(DRAFTS_DIR) || !fs.statSync(DRAFTS_DIR).isDirectory()) {
    return [];
  }

  const drafts = fs
    .readdirSync(DRAFTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && hasDraftArticle(entry.name))
    .map((entry) => readDraftArticle(entry.name))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return drafts.map((draft) => ({
    slug: draft.slug,
    title: draft.title,
    date: draft.date,
    description: draft.description,
    tags: draft.tags,
  }));
}

export function getDraftBySlug(slug: string): DraftPost | null {
  if (!hasDraftArticle(slug)) {
    return null;
  }

  return readDraftArticle(slug);
}
