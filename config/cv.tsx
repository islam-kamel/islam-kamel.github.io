import { siteConfig } from "@/config/site";

const cv = {
  contact: [
    {
      label: "Email",
      value: (
        <a
          className="text-primary hover:underline"
          href="mailto:contact@islamkamel.com"
        >
          contact@islamkamel.com
        </a>
      ),
    },
    {
      label: "LinkedIn",
      value: (
        <a
          className="text-primary hover:underline"
          href={siteConfig.links.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          Islam AL-Saghir
        </a>
      ),
    },
    {
      label: "GitHub",
      value: (
        <a
          className="text-primary hover:underline"
          href={siteConfig.links.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          islam-kamel
        </a>
      ),
    },
  ],
  languages: {
    label: "Languages",
    items: ["Arabic (Native/Bilingual)", "English (Intermediate)"],
  },
  certifications: {
    label: "Certifications",
    items: [
      "CS50’s Introduction to Computer Science (Harvard University)",
      "Python Development & Fundamentals (Pluralsight)",
      "Full Stack Web Development (Udacity)",
      "Frontend & Cross-Platform Mobile Development Track (Information Technology Institute - ITI)",
    ],
  },
  summary: {
    label: "Summary",
    value: `Senior Software Engineer specializing in scalable web architectures, LLM orchestration, and high-throughput real-time systems. Proven track record architecting resilient Next.js App Router applications, production multi-agent pipelines, and distributed event-driven systems with WebSockets and concurrent processing patterns. Expert across TypeScript, Python, interactive data visualizations with ECharts, dynamic PDF generation engines, and backend API design. Passionate about engineering robust, performance-critical platforms with strict type safety, end-to-end reliability, and elegant developer experience.`,
  },
  skills: {
    label: "Skills",
    items: [
      "Next.js App Router & React Server Components",
      "TypeScript & JavaScript (ESNext)",
      "Python & Asynchronous Concurrency",
      "LLM Orchestration & Multi-Agent Pipelines",
      "Real-time Systems & WebSockets",
      "Data Visualization & Analytics (ECharts, Chart.js)",
      "Dynamic PDF Generation & Document Pipelines (react-pdf)",
      "Web Workers & Concurrent Architecture",
      "Backend Engineering (Django, Flask, FastAPI)",
      "Full-Stack System Architecture & API Design",
      "Technical SEO & Structured Data (JSON-LD)",
      "State Management & Custom Reactive Primitives",
      "Docker & Containerized Deployments",
      "Data Structures, Algorithms & System Design",
      "Performance Optimization & Bundle Modernization",
      "Automated Data Processing & SheetJS",
    ],
  },
  education: [
    {
      institution: "ASA Academy",
      degree: "Bachelor’s degree, Management Information Systems",
      duration: "January 2016 – January 2020",
    },
  ],
};

export { cv };
