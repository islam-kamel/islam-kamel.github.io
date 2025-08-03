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
  name: "Islam Kamel | Frontend & Full-Stack Web Developer CV",
  url: "https://islam-kamel.github.io",
  description:
    "Frontend & Full-Stack Developer skilled in React, Next.js, TypeScript & Django. View Islam Kamel’s CV, skills, projects, and achievements.",
  navItems: [],
  navMenuItems: [],
  links: {
    github: "https://github.com/islam-kamel",
    linkedin: "https://www.linkedin.com/in/islam-al-saghir",
  },
};
