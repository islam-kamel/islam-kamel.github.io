import { siteConfig } from "@/config/site";

const cv = {
  location: {
    label: "Location",
    value: "Qena, Egypt",
  },
  contact: [
    {
      label: "Phone",
      value: (
        <a className="text-primary hover:underline" href={`tel:+201066373279`}>
          +201066373279
        </a>
      ),
    },
    {
      label: "Email",
      value: (
        <a
          className="text-primary hover:underline"
          href={`mailto:dev.islam.kamel@gmail.com`}
        >
          dev.islam.kamel@gmail.com
        </a>
      ),
    },
    {
      label: "Linkedin",
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
      label: "Github",
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
      "Python: The Big Picture",
      "Frontend & Cross-Platform Mobile Development Track",
      "CS50’s Introduction to Computer Science",
      "Full Stack Development",
      "Python Fundamentals",
    ],
  },
  summary: {
    label: "Summary",
    value: `Software Engineer with professional experience building scalable, performant, and maintainable web applications end to end. Currently at Femto Security, working across the stack: complex React/Next.js interfaces, LLM-powered automation pipelines, technical SEO and structured data, real-time features, and backend performance diagnostics. Strong foundation in TypeScript, Python, state management, asynchronous patterns (web workers, sockets), and backend integration with Django/Flask. Skilled in designing interactive data visualizations, optimizing PDF/report pipelines, and improving UX in data-heavy admin tools. Comfortable working in agile environments, debugging intricate UI/UX issues, and collaborating across teams to ship secure, user-focused features.`,
  },
  skills: {
    label: "Skills",
    items: [
      "ReactJS / Next.js",
      "TypeScript",
      "Python",
      "LLM Integration & Automation Pipelines",
      "Next.js App Router & Technical SEO",
      "Vite",
      "Monorepo",
      "State Management & Custom Hooks",
      "Data Visualization (ECharts, Chart.js)",
      "PDF Generation & Dynamic Reports (react-pdf, react-pdf-html)",
      "Web Workers & Concurrent Patterns",
      "Real-time Communication (socket.io-client)",
      "Responsive Web Design",
      "Docker",
      "Backend Integration (Django, Flask)",
      "Data Structures & OOP",
      "Excel Automation (SheetJS)",
      "Date & UI Component Handling (react-datepicker)",
      "Performance Optimization",
    ],
  },
  experience: [
    {
      company: "Femto Security",
      role: "Software Engineer",
      duration: "April 2023 – Present",
      location: "UAE",
      details: [
        "Designed and implemented complex interactive data visualizations using ECharts and Chart.js to surface security metrics and engagement statistics.",
        "Built and optimized dynamic PDF reports (e.g., engagement reports, VAT invoices) using react-pdf and custom HTML-to-PDF conversion pipelines, ensuring accurate pagination, table of contents, and performance under large data.",
        "Built LLM-powered automation pipelines with multi-agent research and review workflows for content generation and enrichment.",
        "Implemented technical SEO for the company web platform: dynamic sitemaps, JSON-LD structured data, and improved indexing.",
        "Worked across the backend: audited real-time Socket.IO event flows, configured CORS policies, and diagnosed server performance.",
        "Optimized production builds across Next.js and Vite — bundling strategy (modern/legacy), bundle-size reduction — and resolved SSR hydration issues.",
        "Developed reusable custom React hooks for data fetching, state synchronization, and UI behavior; improved UX in data-heavy admin dashboards (seamless row expansion, touch events, consistent custom cell behavior).",
        "Integrated real-time features with socket.io-client to support live updates across product dashboards.",
        "Automated Excel exports with styling and alignment using SheetJS, including conditional formatting and compatibility adjustments.",
        "Collaborated across backend and product teams to enforce type safety, centralized field naming conventions, and complex plan-driven form workflows.",
      ],
    },
    {
      company: "Hadota",
      role: "Senior Graphic Designer",
      duration: "February 2016 – July 2021",
      location: "Egypt",
      details: [
        "Led visual identity and branding projects, creating high-impact designs for digital and print media.",
        "Collaborated with clients to translate business goals into compelling design solutions.",
        "Managed a team of junior designers and ensured consistency across campaigns.",
        "Handled end-to-end design workflows including concept, execution, and delivery under tight deadlines.",
      ],
    },
  ],
  education: [
    {
      institution: "ASA Academy",
      degree: "Bachelor’s degree, Management Information Systems",
      duration: "January 2016 – January 2020",
    },
  ],
};

export { cv };
