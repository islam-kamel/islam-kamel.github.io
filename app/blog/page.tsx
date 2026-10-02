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
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111]">
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="mb-12 pb-6 border-b-2 border-[#111111]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE7C98] text-[#111111] text-xs font-bold border border-[#111111] mb-4">
            <span>Writing</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#111111] mb-3">
            Writing
          </h1>

          <p className="text-base sm:text-lg text-[#5A606B] max-w-xl">
            {description}
          </p>
        </div>

        {/* Featured Post (Typographic & Open) */}
        {featuredPost && (
          <div className="mb-16">
            <div className="border-2 border-[#111111] bg-[#FAF8F5] shadow-[6px_6px_0px_0px_#111111] p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-[#5A606B]">
                <span className="inline-block px-2.5 py-0.5 bg-[#EE7C98] border border-[#111111] text-[11px] font-bold text-[#111111] w-fit">
                  Featured article
                </span>
                <div className="flex items-center gap-1.5 font-medium">
                  <CalendarIcon size={14} />
                  <time dateTime={featuredPost.date}>
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <Link
                className="group block mb-4"
                href={`/blog/${featuredPost.slug}`}
              >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#111111] tracking-tight group-hover:underline underline-offset-4 transition-all">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-base text-[#333333] leading-relaxed mb-6 max-w-3xl">
                {featuredPost.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#111111]/20">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold bg-white text-[#111111] border border-[#111111] shadow-[1px_1px_0px_0px_#111111]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE7C98] hover:bg-[#E56382] text-[#111111] font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                  href={`/blog/${featuredPost.slug}`}
                >
                  <span>Read article</span>
                  <ArrowUpRightIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts (Open Editorial Archive List) */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-6 pb-3 border-b-2 border-[#111111]">
              Archive
            </h2>

            <div className="flex flex-col divide-y-2 divide-[#111111]/20">
              {regularPosts.map((post, idx) => (
                <article key={post.slug} className="py-8 first:pt-2 last:pb-0">
                  <div className="flex items-center gap-3 text-xs text-[#5A606B] mb-3">
                    <span className="font-bold text-[#111111]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon size={13} />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  <Link
                    className="group block mb-2"
                    href={`/blog/${post.slug}`}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight group-hover:underline underline-offset-4 transition-all flex items-start justify-between gap-4">
                      <span>{post.title}</span>
                      <ArrowUpRightIcon
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#111111] shrink-0 mt-1"
                        size={18}
                      />
                    </h3>
                  </Link>

                  <p className="text-sm text-[#333333] leading-relaxed mb-4 max-w-2xl font-normal">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold bg-[#FAF8F5] text-[#111111] border border-[#111111] shadow-[1px_1px_0px_0px_#111111]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty state (future-proofing) */}
        {posts.length === 0 && (
          <div className="text-center py-20 text-[#5A606B] border-2 border-dashed border-[#111111]/30 p-12">
            <BookOpenIcon className="mx-auto mb-4 text-[#111111]" size={48} />
            <p className="text-sm font-medium">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
