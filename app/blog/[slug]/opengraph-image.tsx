import { ImageResponse } from "next/og";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { themeColors, themeShadows } from "@/styles/tokens";

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

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: themeColors.retro.bg,
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: `3px solid ${themeColors.retro.ink}`,
            backgroundColor: themeColors.retro.bg,
            boxShadow: themeShadows.retroXl,
          }}
        >
          {/* Top Window Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: themeColors.retro.ink,
              color: themeColors.retro.bg,
              padding: "12px 24px",
              fontFamily: "monospace",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: themeColors.retro.pink,
                }}
              />
              <span>Islam Kamel</span>
            </div>
            <div
              style={{
                color: themeColors.retro.bg,
                fontSize: "14px",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              {formattedDate}
            </div>
          </div>

          {/* Middle Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              padding: "36px 48px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: themeColors.retro.pink,
                  color: themeColors.retro.ink,
                  border: `2px solid ${themeColors.retro.ink}`,
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Article
              </div>
            </div>

            <h1
              style={{
                fontSize: "50px",
                fontWeight: 700,
                color: themeColors.retro.ink,
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.12,
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.45,
                color: themeColors.retro.body,
                margin: 0,
                maxWidth: "960px",
              }}
            >
              {post.description}
            </p>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 48px",
              borderTop: `2px solid ${themeColors.retro.ink}`,
              backgroundColor: themeColors.retro.bg,
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    backgroundColor: themeColors.retro.paper,
                    border: `2px solid ${themeColors.retro.ink}`,
                    color: themeColors.retro.ink,
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                color: themeColors.retro.ink,
                fontWeight: 700,
              }}
            >
              Islam Kamel
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
