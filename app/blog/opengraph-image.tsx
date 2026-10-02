import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Blog - Islam Kamel | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const topics = [
    "Web Architecture",
    "LLM Pipelines",
    "WebSockets",
    "Distributed Systems",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAF8F5",
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
            border: "3px solid #111111",
            backgroundColor: "#FAF8F5",
            boxShadow: "8px 8px 0px 0px #111111",
          }}
        >
          {/* Top Window Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#111111",
              color: "#FAF8F5",
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
                  backgroundColor: "#EE7C98",
                }}
              />
              <span>Islam Kamel</span>
            </div>
          </div>

          {/* Middle Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
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
                  backgroundColor: "#EE7C98",
                  color: "#111111",
                  border: "2px solid #111111",
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Writing
              </div>
            </div>

            <h1
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "-0.04em",
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Writing &amp; Technical Notes
            </h1>

            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.45,
                color: "#333333",
                margin: 0,
                maxWidth: "920px",
              }}
            >
              Technical articles, reference notes, and architecture patterns.
            </p>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 48px",
              borderTop: "2px solid #111111",
              backgroundColor: "#FAF8F5",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {topics.map((topic) => (
                <div
                  key={topic}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #111111",
                    color: "#111111",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                color: "#111111",
                fontWeight: 700,
              }}
            >
              islamkamel.com/blog
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
