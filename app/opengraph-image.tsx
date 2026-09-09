import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Islam Kamel | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const capabilities = [
    "Frontend Architecture",
    "LLM Orchestration",
    "Real-Time Systems",
    "Distributed Services",
  ];

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
                IK
              </span>
              <span
                style={{
                  color: "#8899A6",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                islamkamel.com
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: "1px solid rgba(217, 71, 36, 0.3)",
                backgroundColor: "rgba(217, 71, 36, 0.08)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#D94724",
                }}
              />
              <span
                style={{
                  color: "#D94724",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                SYSTEMS ARCHITECT
              </span>
            </div>
          </div>

          {/* Middle Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "20px",
              }}
            >
              <h1
                style={{
                  fontSize: "60px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Islam Kamel
              </h1>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#D94724",
                  letterSpacing: "-0.01em",
                }}
              >
                Software Engineer
              </span>
            </div>
            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.45,
                color: "#8899A6",
                margin: 0,
                maxWidth: "920px",
              }}
            >
              Building scalable web architectures, LLM automation pipelines, and
              real-time systems.
            </p>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "24px",
              borderTop: "1px solid #1A2234",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {capabilities.map((pill) => (
                <div
                  key={pill}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    backgroundColor: "#111622",
                    border: "1px solid #1A2234",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                color: "#8899A6",
                letterSpacing: "0.05em",
              }}
            >
              islamkamel.com
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
