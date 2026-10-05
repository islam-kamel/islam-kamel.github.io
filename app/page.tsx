import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { LD_JSON } from "@/config/ld_json";
import { getAllPosts } from "@/lib/blog";
import { RetroPixelPC } from "@/components/retro-pixel-pc";
import {
  ArrowUpRightIcon,
  Broadcast,
  CalendarIcon,
  Computer,
  CursorClick,
  Database,
  Eduction,
  Factory,
  GithubIcon,
  LinkedinIcon,
  Pencil,
  Robot,
  SendIcon,
  Website,
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

const PINNED_EXCERPTS: Record<string, string> = {
  "making-react-pdf-output-deterministic":
    "Your PDF can change when fonts or page breaks change. I explain how to keep the output the same.",
  "moving-data-processing-off-react-main-thread":
    "A slow filter can freeze the page while you wait. I explain how to move that work into a Web Worker.",
  "migrating-github-pages-to-vercel":
    "Old redirects can send readers and search engines to the wrong page. I explain what to check when moving a site to Vercel.",
};

export default function Home() {
  const posts = getAllPosts()
    .filter((p) => p.slug !== "returning-useful-errors-for-invalid-json")
    .slice(0, 3);

  const disciplines = [
    {
      num: "01",
      title: "Frontend Architecture",
      icon: Website,
      description:
        "Navigation and rendering shape how a page feels. I keep expensive data processing from blocking the interface.",
      tools: "TypeScript / Next.js / React / Tailwind CSS",
      articleTitle: "Moving Data Processing Off React's Main Thread",
      articleHref: "/blog/moving-data-processing-off-react-main-thread",
    },
    {
      num: "02",
      title: "Backend & Systems",
      icon: Database,
      description:
        "Invalid input should get a useful error. I validate requests before passing their data through the system.",
      tools: "Python / Django / PostgreSQL / Docker",
      articleTitle: "Returning Useful Errors for Invalid JSON in a Node.js API",
      articleHref: "/blog/returning-useful-errors-for-invalid-json",
    },
    {
      num: "03",
      title: "AI & LLM Integration",
      icon: Robot,
      description:
        "I connect language models to app tools, check the responses, and handle calls that fail.",
      tools:
        "LLM Orchestration / Multi-Agent Systems / Tool Execution / Structured Output",
      articleTitle: "Building Reliable LLM Pipelines",
      articleHref: "/blog/building-reliable-llm-pipelines",
    },
    {
      num: "04",
      title: "Real-Time & Data Engineering",
      icon: Broadcast,
      description:
        "As new data arrives, the screen updates. Web Workers handle heavier processing so the page stays responsive.",
      tools: "WebSockets / Apache ECharts / Web Workers / react-pdf",
      articleTitle: "REST Polling vs WebSockets for Real-Time Interfaces",
      articleHref: "/blog/why-i-moved-from-rest-to-websockets",
    },
  ];

  const certifications = [
    {
      title: "CS50’s Introduction to Computer Science",
      issuer: "Harvard University",
      focus: "C, Python, SQL, and the basics of how programs work.",
    },
    {
      title: "Python Development & Fundamentals",
      issuer: "Pluralsight",
      focus: "Python, APIs, and tasks that run while other work waits.",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Udacity",
      focus: "Building web apps, APIs, and databases.",
    },
    {
      title: "Frontend & Cross-Platform Mobile Development Track",
      issuer: "Information Technology Institute (ITI)",
      focus: "React, TypeScript, and pages that work on different screens.",
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
            <div className="retro-sticker-badge px-3.5 py-1 bg-retro-pink -rotate-1">
              <Computer className={"-rotate-2"} size={16} />
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
              I build web apps, screens that show live data, and tools that use
              AI. I care about making them fast, clear, and easy to use.
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

          {/* Retro Pixel-Art CRT Computer (Right 5 cols) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="border-2 border-retro-ink bg-retro-bg shadow-retro-lg overflow-hidden w-full max-w-[460px] p-6 sm:p-8 flex items-center justify-center">
              <RetroPixelPC className="w-full max-w-[340px] h-auto" />
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
              <div
                className={
                  "retro-sticker-badge px-3 py-1 bg-retro-bg rotate-1 mb-3"
                }
              >
                <Factory className={"-rotate-2"} size={16} />
                <span>What I build</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-retro-ink leading-tight text-balance">
                Engineering Focus
              </h2>
            </div>
            <p className="text-base sm:text-lg text-retro-ink max-w-md font-medium">
              I build web apps and the tools that keep their data moving.
            </p>
          </div>

          {/* Editorial Open Layout (Numbered Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-x-12 gap-y-12">
            {disciplines.map((item) => (
              <div
                key={item.num}
                className="border-t-2 border-retro-ink pt-6 flex flex-col justify-between h-full"
              >
                <div className="md:min-h-[200px] lg:min-h-[175px] flex flex-col justify-start">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-bold text-retro-ink tracking-tight">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-retro-ink tracking-tight mb-3 flex items-center gap-3">
                    <item.icon
                      aria-hidden="true"
                      className="shrink-0 text-retro-ink -rotate-3"
                      focusable="false"
                      size={28}
                    />
                    <span>{item.title}</span>
                  </h3>

                  <p className="text-sm sm:text-base text-retro-ink leading-relaxed font-normal pb-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-retro-ink space-y-2 mt-auto md:min-h-[144px] lg:min-h-[112px]">
                  <div className="font-mono text-xs text-retro-ink">
                    Works with: {item.tools}
                  </div>

                  <div className="text-xs font-bold text-retro-ink">
                    <span>Read: </span>
                    <Link
                      className="hover:underline underline-offset-4 inline-flex items-center gap-1 group"
                      href={item.articleHref}
                    >
                      <span>{item.articleTitle}</span>
                      <ArrowUpRightIcon
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                        size={13}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. Recent Writing Section */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-retro-ink">
          <div>
            <div
              className={
                "retro-sticker-badge px-3.5 py-1 bg-retro-pink -rotate-1 mb-3"
              }
            >
              <Pencil className={"-rotate-2"} size={16} />
              <span>Writing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-retro-ink">
              Recent Articles
            </h2>
            <p className="text-sm text-retro-muted mt-1 font-normal">
              I write about the parts of building software that can get in the
              way.
            </p>
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

                <p className="text-xs text-retro-muted leading-relaxed mb-4">
                  {PINNED_EXCERPTS[post.slug] ?? post.description}
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

      {/* D. Education & Certifications Section (The Muted Sage Interlude) */}
      <section
        className="scroll-mt-20 py-16 sm:py-24 bg-retro-sage border-y-2 border-retro-ink relative"
        id="education"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-retro-ink">
            <div>
              <div
                className={
                  "retro-sticker-badge px-3 py-1 bg-retro-bg -rotate-1 mb-3"
                }
              >
                <Eduction className={"-rotate-2"} size={16} />
                <span>Education</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-retro-ink leading-tight">
                Education &amp; Certifications
              </h2>
            </div>
            <p className="text-base text-retro-sage-ink font-medium max-w-md">
              I studied programming, data, and web apps.
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
                  <div className="retro-sticker-badge px-3 py-0.5 bg-retro-sage rotate-1 mb-4">
                    Bachelor&apos;s Degree
                  </div>

                  <h3 className="text-2xl font-bold text-retro-ink tracking-tight mb-1">
                    ASA Academy
                  </h3>

                  <p className="text-base font-bold text-retro-ink mb-4">
                    Bachelor&apos;s in Management Information Systems
                  </p>

                  <p className="text-sm text-retro-body leading-relaxed">
                    I studied systems analysis, database design, and software
                    basics. I learned how software and data fit the needs of a
                    business.
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

      {/* E. Personal Contact Section */}
      <section
        className="scroll-mt-20 pt-12 sm:pt-16 pb-24 sm:pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="border-2 border-retro-ink bg-retro-bg shadow-retro-lg p-8 sm:p-12 text-center">
          <div className="retro-sticker-badge px-3.5 py-1 bg-retro-pink -rotate-1 mb-4">
            <CursorClick className={"rotate-2"} size={16} />
            <span>Get in touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-retro-ink mb-3">
            Say hello
          </h2>

          <p className="text-base sm:text-lg text-retro-muted max-w-xl mx-auto mb-6 leading-relaxed">
            If something I wrote helped you, or you want to talk about code,
            write to me.
          </p>

          <a
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-retro-pink hover:bg-retro-pink-hover text-retro-ink font-bold text-base border-2 border-retro-ink shadow-retro-md hover:shadow-retro-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink focus-visible:ring-offset-2"
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
