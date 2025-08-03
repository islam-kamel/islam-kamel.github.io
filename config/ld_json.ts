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
      jobTitle: "Frontend & Full-Stack Web Developer",
      telephone: "+201066373279",
      image: `${siteConfig.url}/personal.JPG`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Qus",
        addressRegion: "Qena",
        addressCountry: "Egypt",
      },
      gender: "Male",
      url: siteConfig.url,
      email: "mailto:dev.islam.kamel@gmail.com",
      sameAs: [
        "https://github.com/islam-kamel",
        "https://www.linkedin.com/in/islam-al-saghir",
        "https://x.com/IslamKamelLl",
      ],
      description:
        "Frontend & Full-Stack Developer skilled in React, Next.js, TypeScript & Django.",
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
      sameAs: [
        "https://github.com/islam-kamel",
        "https://www.linkedin.com/in/islam-al-saghir",
      ],
    },
  ],
};
