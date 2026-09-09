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

const navItems: NavItem[] = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Education", href: "/#education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const siteConfig: SiteConfig = {
  name: "Islam Kamel | Software Engineer",
  url: "https://islamkamel.com",
  description:
    "Software Engineer building scalable web architectures, LLM automation pipelines, and real-time systems.",
  navItems,
  navMenuItems: navItems,
  links: {
    github: "https://github.com/islam-kamel",
    linkedin: "https://www.linkedin.com/in/islam-al-saghir",
  },
};
