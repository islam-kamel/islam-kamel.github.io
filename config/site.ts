type NavItem = {
  label: string;
  href: string;
};

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
  links: Record<Links, string>;
}

type Links = "github" | "linkedin";

export const siteConfig: SiteConfig = {
  name: "Islam Kamel | Software Engineer CV",
  url: "https://islam-kamel.github.io",
  description:
    "Software Engineer building React, Next.js, TypeScript, LLM-powered pipelines, technical SEO, Python automation, and backend-integrated web apps.",
  navItems: [],
  navMenuItems: [],
  links: {
    github: "https://github.com/islam-kamel",
    linkedin: "https://www.linkedin.com/in/islam-al-saghir",
  },
};
