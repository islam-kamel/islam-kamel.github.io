import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { LD_JSON } from "@/config/ld_json";
import { getAllPosts } from "@/lib/blog";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  GithubIcon,
  LinkedinIcon,
  SendIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Islam Kamel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@IslamKamelLl",
  },
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  const disciplines = [
    {
      num: "01",
      title: "Frontend Architecture",
      description:
        "Building responsive, type-safe web applications using Next.js and React. Focused on state management, server components, and modular UI structure.",
      highlights: [
        "Next.js App Router",
        "React Server Components",
        "Performance Optimization",
        "Modular Design Systems",
      ],
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
      num: "02",
      title: "Backend & Systems",
      description:
        "Designing backend services, relational database schemas, containerized environments, and RESTful APIs.",
      highlights: [
        "Modular API Architecture",
        "Relational Data Modeling",
        "Container Deployments",
        "Environment Configuration",
      ],
      chips: ["Python", "Django", "Flask", "Docker", "PostgreSQL", "REST APIs"],
    },
    {
      num: "03",
      title: "AI & LLM Integration",
      description:
        "Integrating LLMs with application services. Building tool-calling agents, structured data extraction, and evaluation workflows.",
      highlights: [
        "Multi-Agent Coordination",
        "Tool Execution Systems",
        "Structured JSON Output",
        "Context Management",
      ],
      chips: [
        "LLM Orchestration",
        "Multi-Agent Systems",
        "Tool Execution",
        "Structured Output",
      ],
    },
    {
      num: "04",
      title: "Real-Time & Data Engineering",
      description:
        "Implementing bi-directional data streaming, off-thread concurrency, interactive analytics dashboards, and programmatic document generation.",
      highlights: [
        "Bi-directional Sockets",
        "Event-Driven Architecture",
        "Off-Thread Concurrency",
        "Data-Dense Dashboards",
      ],
      chips: [
        "WebSockets",
        "Socket.io",
        "Apache ECharts",
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
      issuer: "Pluralsight",
      focus: "Asynchronous I/O, OOP, Backend APIs, Concurrency",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Udacity",
      focus: "End-to-End System Design, RESTful Architecture, Databases",
    },
    {
      title: "Frontend & Cross-Platform Mobile Development Track",
      issuer: "Information Technology Institute (ITI)",
      focus: "Modern React, TypeScript, Component Systems, Responsive UI",
    },
  ];

  return (
    <div className="w-full bg-retro-bg text-retro-ink">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LD_JSON).replace(/</g, "\\u003c"),
        }}
        id="ld-json-homepage"
        type="application/ld+json"
      />

      {/* A. Hero Section */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle pale haze at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-retro-haze pointer-events-none" />

        {/* Editorial Header Bar */}
        <div className="flex justify-end border-b-2 border-retro-ink pb-3 mb-8 sm:mb-12 text-xs text-retro-muted">
          <div className="font-medium">
            <span>Cairo, Egypt</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Display Lead (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-pink text-retro-ink text-xs font-bold border border-retro-ink">
              <span>Software engineer</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-retro-ink leading-[0.95] text-balance">
                Islam Kamel
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-retro-ink">
                Software engineer
              </p>
            </div>

            <p className="text-base sm:text-lg text-retro-body leading-relaxed max-w-xl font-normal">
              Building web applications, real-time data streaming systems, and
              LLM integration workflows.
            </p>

            {/* Direct Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-retro-pink hover:bg-retro-pink-hover text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink focus-visible:ring-offset-2"
                href="mailto:contact@islamkamel.com"
              >
                <SendIcon size={16} />
                <span>Say hello</span>
              </a>

              <a
                className="inline-flex items-center gap-2 px-4 py-3 bg-retro-bg hover:bg-white text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ArrowUpRightIcon size={14} />
              </a>

              <a
                className="inline-flex items-center gap-2 px-4 py-3 bg-retro-bg hover:bg-white text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ArrowUpRightIcon size={14} />
              </a>
            </div>
          </div>

          {/* Abstract Print Collage Artwork (Right 5 cols) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="border-2 border-retro-ink bg-retro-bg shadow-retro-lg overflow-hidden w-full max-w-[460px]">
              <Image
                unoptimized
                alt="Abstract retro print collage with pink clouds, halftone textures, and geometric forms"
                className="w-full h-auto object-cover"
                height={1254}
                loading="eager"
                src="/retro-cloud-collage.webp"
                width={1254}
              />
            </div>
          </div>
        </div>
      </section>

      {/* B. What I build Section (The Warm Salmon-Pink Panel) */}
      <section
        className="scroll-mt-20 py-16 sm:py-24 bg-retro-pink border-y-2 border-retro-ink relative overflow-hidden"
        id="capabilities"
      >
        {/* Anchor aliases for what-i-build and tech-stack links */}
        <span className="sr-only scroll-mt-20" id="what-i-build" />
        <span className="sr-only scroll-mt-20" id="tech-stack" />

        {/* Restrained Halftone Texture Overlay */}
        <div className="absolute inset-0 bg-halftone pointer-events-none opacity-20" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b-2 border-retro-ink pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-retro-ink block mb-2">
                What I build
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-retro-ink leading-tight text-balance">
                Engineering Focus
              </h2>
            </div>
            <p className="text-base sm:text-lg text-retro-ink max-w-md font-medium">
              Web applications, real-time data streaming architectures, and
              backend services.
            </p>
          </div>

          {/* Editorial Open Layout (Numbered Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {disciplines.map((item) => (
              <div
                key={item.num}
                className="border-t-2 border-retro-ink pt-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-bold text-retro-ink tracking-tight">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-retro-ink tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-retro-ink leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-2 text-xs font-bold text-retro-ink"
                      >
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-retro-ink/30">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold bg-retro-bg text-retro-ink border border-retro-ink shadow-retro-xs"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. Education & Certifications Section (The Muted Sage Interlude) */}
      <section
        className="scroll-mt-20 py-16 sm:py-24 bg-retro-sage border-b-2 border-retro-ink relative"
        id="education"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-retro-ink">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-retro-sage-ink block mb-2">
                Education
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-retro-ink leading-tight">
                Education &amp; Certifications
              </h2>
            </div>
            <p className="text-base text-retro-sage-ink font-medium max-w-md">
              Academic degree and professional training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Education Degree (Left, 5 cols) */}
            <div className="lg:col-span-5 border-2 border-retro-ink bg-retro-bg shadow-retro-5 flex flex-col justify-between">
              <div className="bg-retro-ink text-retro-bg px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-ink">
                <span className="text-xs font-bold">Academic Degree</span>
                <span className="text-xs text-retro-muted-light">
                  2016–2020
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 bg-retro-sage border border-retro-ink text-xs font-bold text-retro-ink mb-4">
                    Bachelor&apos;s Degree
                  </div>

                  <h3 className="text-2xl font-bold text-retro-ink tracking-tight mb-1">
                    ASA Academy
                  </h3>

                  <p className="text-base font-bold text-retro-ink mb-4">
                    Bachelor&apos;s in Management Information Systems
                  </p>

                  <p className="text-sm text-retro-body leading-relaxed">
                    Curriculum centered on systems analysis, database
                    architecture, business logic modeling, and enterprise
                    software engineering foundations.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-retro-ink/15 text-xs text-retro-muted">
                  Management Information Systems, 4-year program
                </div>
              </div>
            </div>

            {/* Certifications (Right, 7 cols) */}
            <div className="lg:col-span-7 border-2 border-retro-ink bg-retro-bg shadow-retro-5 flex flex-col justify-between">
              <div className="bg-retro-ink text-retro-bg px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-ink">
                <span className="text-xs font-bold">Certifications</span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-grow">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-4 border border-retro-ink/20 bg-white hover:border-retro-ink hover:shadow-retro-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-retro-ink leading-snug">
                        {cert.title}
                      </h4>
                      <span className="inline-block px-2 py-0.5 bg-retro-bg border border-retro-ink text-[10px] font-bold text-retro-ink shrink-0 w-fit">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="text-xs text-retro-muted leading-relaxed">
                      {cert.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Recent Writing Section */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-retro-ink">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-retro-muted block mb-2">
              Writing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-retro-ink">
              Recent Articles
            </h2>
          </div>

          <Link
            className="inline-flex items-center gap-2 font-bold text-sm text-retro-ink hover:underline underline-offset-4 transition-all"
            href="/blog"
          >
            <span>View all articles</span>
            <ArrowUpRightIcon size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="border-2 border-retro-ink bg-retro-bg shadow-retro-md hover:shadow-retro-lg hover:-translate-y-1 transition-all p-6 flex flex-col justify-between group"
              href={`/blog/${post.slug}`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-retro-muted mb-3">
                  <CalendarIcon size={13} />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h3 className="text-lg font-bold text-retro-ink tracking-tight group-hover:underline underline-offset-4 transition-all mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-retro-muted leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-retro-ink/15 flex items-center justify-between text-xs font-bold text-retro-ink">
                <span>Read article</span>
                <ArrowUpRightIcon
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  size={14}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* E. Personal Contact Section */}
      <section
        className="scroll-mt-20 pb-24 sm:pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="border-2 border-retro-ink bg-retro-bg shadow-retro-lg p-8 sm:p-14 text-center">
          <div className="inline-block px-3 py-1 bg-retro-pink border border-retro-ink text-xs font-bold text-retro-ink mb-6">
            Say hello
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-retro-ink mb-4">
            Say hello
          </h2>

          <p className="text-base sm:text-lg text-retro-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Have a question about an article, want to discuss software
            architecture, or just want to connect? Send a note to say hello.
          </p>

          <a
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-retro-pink hover:bg-retro-pink-hover text-retro-ink font-bold text-base border-2 border-retro-ink shadow-retro-md hover:shadow-retro-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink focus-visible:ring-offset-2"
            href="mailto:contact@islamkamel.com"
          >
            <SendIcon size={18} />
            <span>contact@islamkamel.com</span>
          </a>
        </div>
      </section>
    </div>
  );
}
