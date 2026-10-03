import { ImageResponse } from "next/og";

import { Computer } from "@/components/icons";
import OpenGrpahLayout from "@/components/open-grpah-layout";

export const dynamic = "force-static";
export const alt = "Islam Kamel | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const capabilities = [
    "Frontend Architecture",
    "Backend & Systems",
    "AI & LLM Integration",
    "Real-Time Systems",
  ];

  const badge = (
    <>
      <Computer size={16} style={{ transform: "rotate(-2deg)" }} />
      <span> Software engineer</span>
    </>
  );

  const title = "Islam Kamel";
  const description =
    "I build web apps, screens that show live data, and tools that use AI. I care about making them fast, clear, and easy to use.";

  return new ImageResponse(
    (
      <OpenGrpahLayout
        badge={badge}
        description={description}
        tags={capabilities}
        title={title}
      />
    ),
    size
  );
}
