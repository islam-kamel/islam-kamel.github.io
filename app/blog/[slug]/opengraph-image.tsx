import { ImageResponse } from "next/og";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Pencil } from "@/components/icons";
import OpenGrpahLayout from "@/components/open-grpah-layout";

export const dynamic = "force-static";
export const alt = "Islam Kamel Blog Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
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
      <span>Article</span>
    </>
  );

  return new ImageResponse(
    (
      <OpenGrpahLayout
        badge={badge}
        description={post.description}
        formattedDate={formattedDate}
        tags={post.tags}
        title={post.title}
      />
    ),
    size
  );
}
