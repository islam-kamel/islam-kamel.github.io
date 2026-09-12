import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@/components/icons";

const title = `Blog - ${siteConfig.name}`;
const description =
  "Technical articles, reference notes, and architecture patterns.";
const url = `${siteConfig.url}/blog`;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Islam Kamel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@IslamKamelLl",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="w-full">
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold mb-3 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary/50" />
            Blog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Writing
          </h1>
          <p className="text-base text-[#8899A6] max-w-xl">
            Technical articles, reference notes, and architecture patterns.
          </p>
        </div>

        {/* Post List */}
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="group relative rounded-[24px] bg-[#0A0D14] border border-[#1A2234] hover:border-primary/40 transition-all duration-500 overflow-hidden p-6 sm:p-8 block"
              href={`/blog/${post.slug}`}
            >
              <div className="relative z-10">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-[#8899A6] mb-3">
                  <CalendarIcon size={13} />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  {post.title}
                  <ArrowUpRightIcon
                    className="text-[#8899A6] group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-0.5 group-hover:translate-y-0"
                    size={18}
                  />
                </h2>

                {/* Description */}
                <p className="text-sm text-[#8899A6] leading-relaxed mb-4 max-w-2xl">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/[0.02] text-[#8899A6] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state (future-proofing) */}
        {posts.length === 0 && (
          <div className="text-center py-20 text-[#8899A6]">
            <BookOpenIcon className="mx-auto mb-4 text-[#1A2234]" size={48} />
            <p>No posts yet. Check back soon.</p>
          </div>
        )}
      </section>
    </div>
  );
}
