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
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-[11px] font-semibold uppercase tracking-widest text-[#8899A6] backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_rgba(217,71,36,0.6)]" />
          </span>
          <span>Available for high-impact roles</span>
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
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-all duration-300 shadow-[0_0_20px_rgba(217,71,36,0.3)] hover:shadow-[0_0_30px_rgba(217,71,36,0.5)] overflow-hidden"
            href="mailto:contact@islamkamel.com"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
            <MailIcon size={16} />
            <span>contact@islamkamel.com</span>
          </a>
          <a
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A0D14] hover:bg-[#111622] text-white/90 hover:text-white border border-[#1A2234] hover:border-[#283550] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] font-medium text-sm transition-all duration-300"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
            <ArrowUpRightIcon className="text-[#8899A6]" size={14} />
          </a>
          <a
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A0D14] hover:bg-[#111622] text-white/90 hover:text-white border border-[#1A2234] hover:border-[#283550] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] font-medium text-sm transition-all duration-300"
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

      {/* B. Capabilities Section */}
      <section
        className="scroll-mt-24 pt-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        id="capabilities"
      >
        <div className="mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold mb-3 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary/50" />
            Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Engineering Focus
          </h2>
          <p className="mt-2 text-base text-[#8899A6] max-w-2xl">
            Delivering robust technical solutions across the entire stack, from
            high-fidelity user interfaces to distributed systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-[24px] bg-[#0A0D14] border border-[#1A2234] hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Ambient Radial Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,71,36,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

                <div className="relative z-10 mb-8">
                  <div className="w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#111622] to-[#0A0D14] border border-[#1A2234] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500 mb-6">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#8899A6] leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/[0.06] flex flex-col gap-2">
                  {cap.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-2.5 text-xs font-medium text-[#8899A6] group-hover:text-white/90 transition-colors duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* C. Technical Stack Section */}
      <section
        className="scroll-mt-24 pt-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1A2234]/60"
        id="stack"
      >
        <div className="mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold mb-3 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary/50" />
            Core Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Technical Ecosystem
          </h2>
          <p className="mt-2 text-base text-[#8899A6] max-w-2xl">
            Selected languages, frameworks, and infrastructure used to build
            resilient production applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {techStack.map((stack) => {
            const Icon = stack.icon;

            return (
              <div
                key={stack.title}
                className="group relative rounded-[24px] bg-[#0A0D14] border border-[#1A2234] hover:border-primary/40 transition-all duration-500 overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-8"
              >
                {/* Ambient Radial Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(217,71,36,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-[14px] bg-gradient-to-b from-[#111622] to-[#0A0D14] border border-[#1A2234] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white/80 group-hover:text-primary transition-all duration-500">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {stack.title}
                      </h3>
                      <p className="text-xs font-medium text-[#8899A6] mt-0.5">
                        {stack.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8899A6] leading-relaxed md:max-w-md">
                    {stack.description}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 flex-1 pt-6 md:pt-0 border-t border-white/[0.06] md:border-t-0 md:border-l md:pl-8">
                  {stack.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/[0.02] text-[#8899A6] border border-white/[0.06] shadow-sm hover:bg-primary/10 hover:text-white hover:border-primary/40 hover:shadow-[0_0_12px_-3px_rgba(217,71,36,0.4)] transition-all duration-300"
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
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold mb-3 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary/50" />
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
          <div className="group relative rounded-[24px] bg-[#0A0D14] border border-[#1A2234] hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,71,36,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#111622] to-[#0A0D14] border border-[#1A2234] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                  <GraduationCapIcon size={26} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Education
                  </h3>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8899A6] mt-0.5 block">
                    Academic Degree
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-primary/20 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h4 className="text-base font-bold text-white">
                        ASA Academy
                      </h4>
                      <span className="inline-flex text-[10px] uppercase tracking-widest font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_12px_-3px_rgba(217,71,36,0.3)]">
                        2016 – 2020
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white/90 mb-2">
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
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2.5 text-xs font-medium text-[#8899A6]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(217,71,36,0.8)]" />
              <span>Full 4-year undergraduate degree completed</span>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="group relative rounded-[24px] bg-[#0A0D14] border border-[#1A2234] hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,71,36,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#111622] to-[#0A0D14] border border-[#1A2234] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                  <AwardIcon size={26} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Certifications
                  </h3>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8899A6] mt-0.5 block">
                    Verified Programs
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-colors duration-300 flex items-start gap-3.5"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2Icon
                        className="text-primary"
                        size={12}
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <div className="flex flex-col gap-1 mb-1">
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {cert.title}
                        </h4>
                        <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#8899A6] px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] w-fit">
                          {cert.issuer}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-[#8899A6]">
                        {cert.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2.5 text-xs font-medium text-[#8899A6]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(217,71,36,0.8)]" />
              <span>Verified credentials & specialized tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* E. Contact CTA Section */}
      <section
        className="scroll-mt-24 pt-16 pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="group relative rounded-[32px] bg-gradient-to-b from-[#0A0D14] to-[#05070A] border border-[#1A2234] p-10 sm:p-16 text-center overflow-hidden transition-colors duration-500 hover:border-primary/30">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(217,71,36,0.15)_0%,transparent_70%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 relative z-10 text-balance">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-base sm:text-lg text-[#8899A6] max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
            Open to high-impact software engineering roles, distributed systems
            challenges, and select engineering collaborations.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(217,71,36,0.3)] hover:shadow-[0_0_40px_rgba(217,71,36,0.6)] hover:-translate-y-0.5"
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
