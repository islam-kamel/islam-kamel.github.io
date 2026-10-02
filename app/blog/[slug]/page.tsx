import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/mdx";
import { ArrowLeftIcon, CalendarIcon } from "@/components/icons";
import { MermaidRenderer } from "@/components/mermaid-renderer";

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
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
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
    image: `${canonicalUrl}/opengraph-image.png`,
  };

  return (
    <div className="w-full bg-retro-bg text-retro-ink">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingLd).replace(/</g, "\\u003c"),
        }}
        id="ld-json-blog-posting"
        type="application/ld+json"
      />
      <article className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-retro-ink hover:underline underline-offset-4 transition-all mb-8 group"
          href="/blog"
        >
          <ArrowLeftIcon
            className="group-hover:-translate-x-1 transition-transform"
            size={14}
          />
          <span>Back to writing</span>
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-retro-muted mb-4">
            <CalendarIcon size={13} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-retro-ink mb-4 leading-tight text-balance">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-retro-body-subtle leading-relaxed max-w-2xl font-normal">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold bg-white text-retro-ink border border-retro-ink shadow-retro-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-t-2 border-retro-ink mt-8 mb-10" />
        </header>

        {/* Rendered markdown content */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="prose-blog max-w-none"
        />

        {html.includes("mermaid") && <MermaidRenderer />}

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t-2 border-retro-ink flex items-center justify-between">
          <Link
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-retro-ink hover:underline underline-offset-4 transition-all group"
            href="/blog"
          >
            <ArrowLeftIcon
              className="group-hover:-translate-x-1 transition-transform"
              size={14}
            />
            <span>All articles</span>
          </Link>

          <Link
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-retro-ink hover:underline underline-offset-4 transition-all group"
            href="/"
          >
            <span>Home</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
