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
      worksFor: {
        "@type": "Organization",
        name: "Femto Security",
        url: "https://femtosec.io",
      },
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
        siteConfig.links.github,
        siteConfig.links.linkedin,
        "https://x.com/IslamKamelLl",
      ],
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
