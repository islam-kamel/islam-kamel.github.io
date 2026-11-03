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
      mainEntity: {
        "@type": "Person",
        "@id": `${siteConfig.url}#person`,
        name: "Islam Kamel",
        alternateName: ["إسلام كامل", "Eslam Kamel", "اسلام كامل"],
        jobTitle: "Software Engineer",
        url: "https://islamkamel.com",
        email: "mailto:contact@islamkamel.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Information Technology Institute (ITI)",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "ASA Academy",
          },
        ],
        knowsAbout: [
          "Software Engineering",
          "Frontend Architecture",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
          "Django",
          "LLM Integration",
        ],
        sameAs: [
          "https://github.com/islam-kamel",
          "https://www.linkedin.com/in/islam-al-saghir",
        ],
      },
    },
  ],
};
