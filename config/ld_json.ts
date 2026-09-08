import { Graph } from "schema-dts";

import { siteConfig } from "@/config/site";
import { cv } from "@/config/cv";

export const LD_JSON: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: "Islam Kamel",
      alternateName: "إسلام كامل",
      jobTitle: "Software Engineer",
      image: `${siteConfig.url}/personal.JPG`,
      url: siteConfig.url,
      email: "mailto:contact@islamkamel.com",
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
      description: siteConfig.description,
      knowsAbout: cv.skills.items,
    },
    {
      "@type": "WebSite",
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.url}#person`,
      },
      inLanguage: "en",
      image: `${siteConfig.url}/opengraph.png`,
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}#profilepage`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "en",
      mainEntity: { "@id": `${siteConfig.url}#person` },
    },
  ],
};
