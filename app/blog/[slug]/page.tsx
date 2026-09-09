import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/mdx";
import { ArrowLeftIcon, CalendarIcon } from "@/components/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    const postUrl = `${siteConfig.url}/blog/${post.slug}`;

    return {
      title: {
        absolute: post.title,
      },
      description: post.description,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: postUrl,
        siteName: "Islam Kamel",
        locale: "en_US",
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
        authors: ["Islam Kamel"],
        images: [
          {
            url: `${siteConfig.url}/opengraph.png`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [`${siteConfig.url}/opengraph.png`],
        creator: "@IslamKamelLl",
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;

  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const html = await renderMarkdown(post.content);
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.dateModified || post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Islam Kamel",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Islam Kamel",
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    image: `${siteConfig.url}/opengraph.png`,
  };

  return (
    <div className="w-full">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingLd).replace(/</g, "\\u003c"),
        }}
        id="ld-json-blog-posting"
        type="application/ld+json"
      />
      <article className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          className="inline-flex items-center gap-2 text-sm text-[#8899A6] hover:text-white transition-colors mb-8 group"
          href="/blog"
        >
          <ArrowLeftIcon
            className="group-hover:-translate-x-0.5 transition-transform"
            size={16}
          />
          Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs text-[#8899A6] mb-4">
            <CalendarIcon size={13} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
            {post.title}
          </h1>

          <p className="text-base text-[#8899A6] leading-relaxed max-w-2xl">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/[0.02] text-[#8899A6] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-white/[0.06] mt-8" />
        </header>

        {/* Rendered markdown content */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="prose-blog"
        />

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#8899A6] hover:text-white transition-colors group"
            href="/blog"
          >
            <ArrowLeftIcon
              className="group-hover:-translate-x-0.5 transition-transform"
              size={16}
            />
            All posts
          </Link>
        </div>
      </article>
    </div>
  );
}
