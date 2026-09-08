import React from "react";

import { siteConfig } from "@/config/site";
import {
  ActivityIcon,
  ArrowUpRightIcon,
  AwardIcon,
  BarChart3Icon,
  BotIcon,
  CheckCircle2Icon,
  Code2Icon,
  CpuIcon,
  GithubIcon,
  GraduationCapIcon,
  LayersIcon,
  LinkedinIcon,
  MailIcon,
  SendIcon,
  ServerIcon,
} from "@/components/icons";

export default function Home() {
  const capabilities = [
    {
      title: "Frontend & Next.js Architecture",
      icon: LayersIcon,
      description:
        "Architecting high-performance web platforms using Next.js App Router, React Server Components, and modular UI systems. Engineered for sub-second TTFB, streamable hydration, and strict type safety across complex client-side workflows.",
      highlights: [
        "Next.js App Router",
        "React Server Components",
        "Performance Optimization",
        "Modular Design Systems",
      ],
    },
    {
      title: "LLM & Multi-Agent Pipelines",
      icon: BotIcon,
      description:
        "Designing deterministic AI orchestration pipelines, tool-calling agent networks, and automated data extraction workflows. Implementing robust schema validation, resilient fallback recovery, and context window optimization.",
      highlights: [
        "Multi-Agent Coordination",
        "Tool Execution Systems",
        "Structured JSON Output",
        "Context Management",
      ],
    },
    {
      title: "Real-Time Telemetry & WebSockets",
      icon: ActivityIcon,
      description:
        "Building low-latency event-driven communication channels and live dashboard feeds using WebSockets, socket.io, and background Web Workers for asynchronous state processing without UI thread blocking.",
      highlights: [
        "Bi-directional Sockets",
        "Event-Driven Architecture",
        "Web Workers Concurrency",
        "Low-Latency Telemetry",
      ],
    },
    {
      title: "Dynamic Reports & Data Visualization",
      icon: BarChart3Icon,
      description:
        "Developing rich, interactive telemetry charts and programmatic document generation engines utilizing Apache ECharts, SheetJS spreadsheet manipulation, and client/server-side react-pdf pipelines.",
      highlights: [
        "Apache ECharts Analytics",
        "Dynamic PDF Engines",
        "Automated SheetJS Export",
        "Data-Dense UI Design",
      ],
    },
  ];

  const techStack = [
    {
      title: "Frontend Systems",
      subtitle: "Type-safe interfaces & modern UI primitives",
      icon: Code2Icon,
      description:
        "Crafting responsive, accessible, and high-performance user interfaces with modern component architectures and strict TypeScript integration.",
      chips: [
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "HeroUI",
        "Vite",
      ],
    },
    {
      title: "Backend & Integration",
      subtitle: "Concurrent APIs, messaging & containers",
      icon: ServerIcon,
      description:
        "Engineering reliable backend services, asynchronous API contracts, real-time message brokers, and containerized deployments.",
      chips: [
        "Python",
        "Django",
        "Flask",
        "Socket.io",
        "Docker",
        "REST",
        "PostgreSQL",
      ],
    },
    {
      title: "Data & Automation",
      subtitle: "Agent workflows, computation & document engines",
      icon: CpuIcon,
      description:
        "Orchestrating autonomous LLM pipelines, client-side data parsing, high-density visualization dashboards, and multi-format reporting.",
      chips: [
        "LLM Orchestration",
        "Multi-Agent Systems",
        "ECharts",
        "react-pdf",
        "SheetJS",
        "Web Workers",
      ],
    },
  ];

  const certifications = [
    {
      title: "CS50’s Introduction to Computer Science",
      issuer: "Harvard University",
      focus: "C, Python, SQL, Algorithms, Memory & Data Structures",
    },
    {
      title: "Python Development & Fundamentals",
      issuer: "Advanced Specialization",
      focus: "Asynchronous I/O, OOP, Backend APIs, Concurrency",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Professional Program",
      focus: "End-to-End System Design, RESTful Architecture, Databases",
    },
    {
      title: "Frontend & Cross-Platform Mobile Engineering",
      issuer: "Engineering Specialization",
      focus: "Modern React, TypeScript, Component Systems, Responsive UI",
    },
  ];

  return (
    <div className="w-full">
      {/* A. Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start gap-8">
        {/* Pulsing Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A0D14] border border-[#1A2234] text-xs font-medium text-[#8899A6] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Available for high-impact software engineering roles</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14]">
          Software Engineer building scalable web architectures, LLM automation,
          and data-dense interfaces.
        </h1>

        {/* Descriptive Paragraph */}
        <p className="text-lg sm:text-xl text-[#8899A6] max-w-3xl leading-relaxed">
          Specializing in high-performance web applications, event-driven
          architectures, and AI-assisted workflows. Bridging modern Next.js and
          React frontend platforms with robust Python backend integrations,
          multi-agent LLM pipelines, and low-latency real-time WebSockets.
        </p>

        {/* Direct Links */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-all duration-200 shadow-sm shadow-primary/25 hover:shadow-primary/40"
            href="mailto:contact@islamkamel.com"
          >
            <MailIcon size={16} />
            <span>contact@islamkamel.com</span>
          </a>
          <a
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A0D14] hover:bg-[#111622] text-white border border-[#1A2234] hover:border-[#283550] font-medium text-sm transition-colors"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
            <ArrowUpRightIcon className="text-[#8899A6]" size={14} />
          </a>
          <a
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A0D14] hover:bg-[#111622] text-white border border-[#1A2234] hover:border-[#283550] font-medium text-sm transition-colors"
            href={siteConfig.links.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
            <ArrowUpRightIcon className="text-[#8899A6]" size={14} />
          </a>
        </div>
      </section>

      {/* B. Core Capabilities Section */}
      <section
        className="scroll-mt-24 pt-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1A2234]/60"
        id="capabilities"
      >
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
            Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Core Capabilities & Focus Areas
          </h2>
          <p className="mt-2 text-base text-[#8899A6] max-w-2xl">
            Production-grade engineering principles applied to full-stack
            systems, concurrent services, and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;

            return (
              <div
                key={cap.title}
                className="rounded-2xl bg-[#0A0D14] border border-[#1A2234] p-6 sm:p-8 hover:border-[#283550] hover:bg-[#0d121c] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#8899A6] leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1A2234] flex flex-wrap gap-2">
                  {cap.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono text-[#8899A6] bg-[#111622] px-2.5 py-1 rounded-md border border-[#1A2234]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* C. Tech Stack & Systems Section */}
      <section
        className="scroll-mt-24 pt-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1A2234]/60"
        id="stack"
      >
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
            Tech Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Tech Stack & Systems
          </h2>
          <p className="mt-2 text-base text-[#8899A6] max-w-2xl">
            A curated technical repertoire leveraged to architect reliable,
            type-safe, and scalable production software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {techStack.map((stack) => {
            const Icon = stack.icon;

            return (
              <div
                key={stack.title}
                className="rounded-2xl bg-[#0A0D14] border border-[#1A2234] p-6 sm:p-8 hover:border-[#283550] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#111622] border border-[#1A2234] flex items-center justify-center text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {stack.title}
                      </h3>
                      <p className="text-xs text-[#8899A6]">{stack.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8899A6] leading-relaxed mb-6">
                    {stack.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1A2234]">
                  {stack.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#111622] text-[#8899A6] border border-[#1A2234] hover:text-white hover:border-primary/50 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. Education & Certifications Section */}
      <section
        className="scroll-mt-24 pt-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1A2234]/60"
        id="education"
      >
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
            Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="mt-2 text-base text-[#8899A6] max-w-2xl">
            Formal foundations in information systems and rigorous continuous
            technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Card */}
          <div className="rounded-2xl bg-[#0A0D14] border border-[#1A2234] p-6 sm:p-8 hover:border-[#283550] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#111622] border border-[#1A2234] flex items-center justify-center text-primary">
                  <GraduationCapIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Education
                  </h3>
                  <span className="text-xs font-mono text-[#8899A6]">
                    Academic Degree
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#111622]/60 border border-[#1A2234]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base font-semibold text-white">
                      ASA Academy
                    </h4>
                    <span className="text-xs font-mono text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                      2016 – 2020
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#8899A6] mb-2">
                    Bachelor&apos;s in Management Information Systems
                  </p>
                  <p className="text-xs text-[#8899A6] leading-relaxed">
                    Core curriculum centered on systems analysis, database
                    architecture, business logic modeling, and enterprise
                    software engineering foundations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1A2234] flex items-center gap-2 text-xs text-[#8899A6]">
              <span className="w-2 h-2 rounded-full bg-primary/80" />
              <span>Full 4-year undergraduate degree completed</span>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="rounded-2xl bg-[#0A0D14] border border-[#1A2234] p-6 sm:p-8 hover:border-[#283550] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#111622] border border-[#1A2234] flex items-center justify-center text-primary">
                  <AwardIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Certifications
                  </h3>
                  <span className="text-xs font-mono text-[#8899A6]">
                    Verified Technical Programs
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-3.5 rounded-xl bg-[#111622]/60 border border-[#1A2234] flex items-start gap-3"
                  >
                    <CheckCircle2Icon
                      className="text-primary mt-0.5 shrink-0"
                      size={18}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] font-mono text-[#8899A6] px-1.5 py-0.5 rounded bg-[#0A0D14] border border-[#1A2234]">
                          {cert.issuer}
                        </span>
                      </div>
                      <p className="text-xs text-[#8899A6] mt-0.5">
                        {cert.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1A2234] flex items-center gap-2 text-xs text-[#8899A6]">
              <span className="w-2 h-2 rounded-full bg-primary/80" />
              <span>Verified credentials & specialized tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* E. Contact CTA Section */}
      <section
        className="scroll-mt-24 pt-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0A0D14] to-[#05070A] border border-[#1A2234] p-8 sm:p-14 text-center overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-36 bg-primary/10 blur-3xl pointer-events-none rounded-full" />

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 relative z-10">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-base sm:text-lg text-[#8899A6] max-w-xl mx-auto mb-8 leading-relaxed relative z-10">
            Open to high-impact software engineering roles, distributed systems
            challenges, and select engineering collaborations.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
              href="mailto:contact@islamkamel.com"
            >
              <SendIcon size={18} />
              <span>contact@islamkamel.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
