import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getAllDrafts, getDraftBySlug } from "@/lib/drafts";
import { Pencil } from "@/components/icons";
import OpenGrpahLayout from "@/components/open-grpah-layout";

export const dynamic = "force-static";
export const alt = "Islam Kamel Blog Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const isDev = process.env.NODE_ENV === "development";

interface OgArticle {
  title: string;
  description: string;
  tags: string[];
  date: string;
  badgeLabel: string;
}

export function generateStaticParams() {
  const posts = getAllPosts().map((post) => ({ slug: post.slug }));

  if (!isDev) {
    return posts;
  }

  return [...posts, ...getAllDrafts().map((draft) => ({ slug: draft.slug }))];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: OgArticle | undefined;

  try {
    const post = getPostBySlug(slug);

    article = {
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: post.date,
      badgeLabel: "Article",
    };
  } catch {
    article = undefined;
  }

  if (!article && isDev) {
    const draft = getDraftBySlug(slug);

    if (draft) {
      article = {
        title: draft.title,
        description: draft.description,
        tags: draft.tags,
        date: draft.date,
        badgeLabel: "Draft",
      };
    }
  }

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const badge = (
    <>
      <Pencil
        size={16}
        style={{
          transform: "rotate(-2deg)",
        }}
      />
      <span>{article.badgeLabel}</span>
    </>
  );

  return new ImageResponse(
    (
      <OpenGrpahLayout
        badge={badge}
        description={article.description}
        formattedDate={formattedDate}
        tags={article.tags}
        title={article.title}
      />
    ),
    size
  );
}
