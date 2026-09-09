import { ImageResponse } from "next/og";

import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const dynamic = "force-static";
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
          backgroundColor: "#0A0D14",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(217, 71, 36, 0.18) 0%, rgba(10, 13, 20, 0) 60%)",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid #1A2234",
            borderRadius: "24px",
            backgroundColor: "rgba(10, 13, 20, 0.75)",
            padding: "48px 56px",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "1px solid #1A2234",
                backgroundColor: "#111622",
              }}
            >
              <span
                style={{
                  color: "#D94724",
                  fontWeight: 700,
                  fontSize: "18px",
                  fontFamily: "monospace",
                }}
              >
                &lt;IK /&gt;
              </span>
              <span
                style={{
                  color: "#8899A6",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                islamkamel.com/blog
              </span>
            </div>
            <div
              style={{
                color: "#D94724",
                fontSize: "15px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {`// ARTICLE · ${formattedDate}`}
            </div>
          </div>

          {/* Middle: Title & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.45,
                color: "#8899A6",
                margin: 0,
                maxWidth: "960px",
              }}
            >
              {post.description}
            </p>
          </div>

          {/* Bottom: Tags & Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "24px",
              borderTop: "1px solid #1A2234",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    backgroundColor: "#111622",
                    border: "1px solid #1A2234",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 500,
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
                color: "#8899A6",
                letterSpacing: "0.03em",
              }}
            >
              Islam Kamel · islamkamel.com
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
