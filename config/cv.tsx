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
    value: `Full-stack web developer with professional experience building scalable, performant, and maintainable applications. Currently contributing as a Frontend Developer at Femto Security, delivering complex interfaces and document generation tooling using React, Next.js, ECharts, react-pdf, and modern build tooling like Vite. Strong foundation in TypeScript, state management, asynchronous patterns (web workers, sockets), and backend integration with Django/Flask. Skilled in designing interactive data visualizations, optimizing PDF/report pipelines, and improving UX in data-heavy admin tools. Comfortable working in agile environments, debugging intricate UI/UX issues, and collaborating across teams to ship secure, user-focused features.`,
  },
  skills: {
    label: "Skills",
    items: [
      "ReactJS / Next.js",
      "TypeScript",
      "Vite",
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
      role: "Frontend Developer",
      duration: "April 2023 – Present",
      location: "United Arab Emirates",
      details: [
        "Designed and implemented complex interactive data visualizations using ECharts and Chart.js to surface security metrics and engagement statistics.",
        "Built and optimized dynamic PDF reports (e.g., engagement reports, VAT invoices) using react-pdf and custom HTML-to-PDF conversion pipelines, ensuring accurate pagination, table of contents, and performance under large data.",
        "Developed reusable custom React hooks for data fetching, state synchronization, and UI behavior; resolved edge cases like label disappearance in tree charts and managed background chart rendering without visible mounts.",
        "Improved user experience in admin dashboards by enabling seamless row expansion in data tables, handling touch events, and ensuring consistent behavior across custom cell contents.",
        "Integrated real-time features with socket.io-client to support live updates in phishing simulation campaigns and attack surface monitoring.",
        "Automated Excel exports with styling and alignment using SheetJS, including conditional formatting and compatibility adjustments.",
        "Worked on performance tuning, bundling strategy (modern/legacy), and build optimization using Vite and related tooling to reduce bundle size and improve load times.",
        "Collaborated across backend and product teams to enforce type safety, centralized field renaming conventions, and handled complex forms triggered by plan selection workflows.",
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
