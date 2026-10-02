"use client";

import { useEffect } from "react";

import { themeColors } from "@/styles/tokens";

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
            background: themeColors.retro.bg,
            mainBkg: themeColors.retro.bg,

            // Primary Nodes
            primaryColor: themeColors.retro.paper,
            primaryTextColor: themeColors.retro.ink,
            primaryBorderColor: themeColors.retro.ink,
            nodeBorder: themeColors.retro.ink,
            nodeTextColor: themeColors.retro.ink,

            // Clusters & Subgraphs
            clusterBkg: themeColors.retro.bg,
            clusterBorder: themeColors.retro.ink,
            titleColor: themeColors.retro.ink,

            // Arrows & Connections
            lineColor: themeColors.retro.ink,
            defaultLinkColor: themeColors.retro.ink,

            // Edge Labels
            edgeLabelBackground: themeColors.retro.bg,
            labelBackground: themeColors.retro.bg,
            labelTextColor: themeColors.retro.ink,
            textColor: themeColors.retro.ink,

            // Secondary Elements
            secondaryColor: themeColors.retro.pink,
            secondaryBorderColor: themeColors.retro.ink,
            secondaryTextColor: themeColors.retro.ink,
            tertiaryColor: themeColors.retro.sage,
            tertiaryBorderColor: themeColors.retro.ink,
            tertiaryTextColor: themeColors.retro.ink,
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
