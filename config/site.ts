type NavItem = {
  label: string;
  href: string;
};

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
  links: Record<Links, string>;
}

type Links = "github" | "linkedin";

export const siteConfig: SiteConfig = {
  name: "Islam Kamel",
  description:
    "Welcome to my digital space! I'm a passionate web developer dedicated to crafting seamless and engaging user experiences. With expertise in modern frameworks, responsive design, and cutting-edge technologies, I bring creative ideas to life on the web. From building intuitive interfaces to optimizing performance, I thrive on transforming ideas into functional, visually appealing solutions. Explore my work and see how I can help bring your next project to reality!",
  navItems: [],
  navMenuItems: [],
  links: {
    github: "https://github.com/islam-kamel",
    linkedin: "https://www.linkedin.com/in/islam-al-saghir",
  },
};
