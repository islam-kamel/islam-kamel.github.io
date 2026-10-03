import { ReactNode } from "react";

import { themeColors, themeShadows } from "@/styles/tokens";

interface OpenGraphProps {
  formattedDate?: string;
  badge: ReactNode;
  title: string;
  description: string;
  tags?: string[];
}
export default function OpenGrpahLayout({
  formattedDate,
  badge,
  title,
  description,
  tags,
}: OpenGraphProps) {
  return (
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
            <span>islamkamel.com</span>
          </div>
          {formattedDate && (
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
          )}
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
                display: "flex",
                gap: "1px",
                alignItems: "center",

                fontSize: "0.75rem",
                lineHeight: "1rem",
                fontWeight: 700,

                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 9999,

                whiteSpace: "nowrap",

                padding: "0.25rem 0.875rem",

                transform: "rotate(-1deg)",

                backgroundColor: themeColors.retro.pink,
                color: themeColors.retro.ink,
                borderColor: themeColors.retro.ink,
                boxShadow: themeShadows.retroXs,
              }}
            >
              {badge}
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
            {title}
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
            {description}
          </p>
        </div>

        {/* Bottom Bar */}
        {tags && tags?.length > 0 && (
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
              {tags.map((tag) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
