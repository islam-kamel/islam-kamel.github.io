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
          theme: "dark",
          themeVariables: {
            darkMode: true,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

            // Canvas & Container
            background: "transparent",
            mainBkg: "#111622",

            // Primary Nodes (Elevated Surface)
            primaryColor: "#111622",
            primaryTextColor: "#FFFFFF",
            primaryBorderColor: "#283550",
            nodeBorder: "#283550",
            nodeTextColor: "#FFFFFF",

            // Clusters & Subgraphs (Layered Depth)
            clusterBkg: "#070A0F",
            clusterBorder: "#1A2234",
            titleColor: "#D94724",

            // Arrows & Connections (Brand Accent)
            lineColor: "#D94724",
            defaultLinkColor: "#D94724",

            // Edge Labels
            edgeLabelBackground: "#111622",
            labelBackground: "#111622",
            labelTextColor: "#E2E8F0",
            textColor: "#FFFFFF",

            // Secondary Elements
            secondaryColor: "#161E30",
            secondaryBorderColor: "#283550",
            secondaryTextColor: "#FFFFFF",
            tertiaryColor: "#070A0F",
            tertiaryBorderColor: "#1A2234",
            tertiaryTextColor: "#D94724",
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
