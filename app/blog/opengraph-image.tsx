import { ImageResponse } from "next/og";

import { Pencil } from "@/components/icons";
import OpenGrpahLayout from "@/components/open-grpah-layout";

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

  const badge = (
    <>
      <div />
      <Pencil size={16} style={{ transform: "rotate(-2deg)" }} />
      <span>Writing</span>
    </>
  );

  const title = "Writing & Technical Notes";
  const description =
    "Technical articles, reference notes, and architecture patterns.";

  return new ImageResponse(
    (
      <OpenGrpahLayout
        badge={badge}
        description={description}
        tags={topics}
        title={title}
      />
    ),
    size
  );
}
