type NavItem = {
  label: string;
  href: string;
};

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
  links: Record<string, string>;
}

export const siteConfig: SiteConfig = {
  name: "Islam Kamel",
  description:
    "Welcome to my digital space! I'm a passionate web developer dedicated to crafting seamless and engaging user experiences. With expertise in modern frameworks, responsive design, and cutting-edge technologies, I bring creative ideas to life on the web. From building intuitive interfaces to optimizing performance, I thrive on transforming ideas into functional, visually appealing solutions. Explore my work and see how I can help bring your next project to reality!",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Blog",
      href: "/blog",
    },
  ],
  links: {
    github: "https://github.com/islam-kamel",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
