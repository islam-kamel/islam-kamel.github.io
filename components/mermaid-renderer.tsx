"use client";

import { useEffect } from "react";

export function MermaidRenderer() {
  useEffect(() => {
    let isCancelled = false;

    async function initMermaid() {
      const elements = document.querySelectorAll(
        ".mermaid:not([data-processed='true'])"
      );

      if (elements.length === 0) return;

      try {
        // Use dynamic Function to prevent Webpack/Turbopack from trying to resolve remote URL at build time
        const importRemote = new Function("url", "return import(url);");
        const { default: mermaid } = await importRemote(
          "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
        );

        if (isCancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            darkMode: false,
            fontFamily:
              "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",

            // Canvas & Container
            background: "#FAF8F5",
            mainBkg: "#FAF8F5",

            // Primary Nodes
            primaryColor: "#FFFFFF",
            primaryTextColor: "#111111",
            primaryBorderColor: "#111111",
            nodeBorder: "#111111",
            nodeTextColor: "#111111",

            // Clusters & Subgraphs
            clusterBkg: "#FAF8F5",
            clusterBorder: "#111111",
            titleColor: "#111111",

            // Arrows & Connections
            lineColor: "#111111",
            defaultLinkColor: "#111111",

            // Edge Labels
            edgeLabelBackground: "#FAF8F5",
            labelBackground: "#FAF8F5",
            labelTextColor: "#111111",
            textColor: "#111111",

            // Secondary Elements
            secondaryColor: "#EE7C98",
            secondaryBorderColor: "#111111",
            secondaryTextColor: "#111111",
            tertiaryColor: "#DCE5DB",
            tertiaryBorderColor: "#111111",
            tertiaryTextColor: "#111111",
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 15,
          },
        });

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];

          if (el.getAttribute("data-processed") === "true") continue;
          el.setAttribute("data-processed", "true");

          const text = el.textContent || "";
          const id = `mermaid-svg-${Date.now()}-${i}`;

          try {
            const { svg } = await mermaid.render(id, text);

            if (!isCancelled) {
              el.innerHTML = svg;
            }
          } catch {
            // Ignore rendering errors to avoid breaking page
          }
        }
      } catch {
        // Ignore remote load errors gracefully
      }
    }

    initMermaid();

    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
}
