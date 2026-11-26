"use client";

import type { DraftPostMeta } from "@/lib/drafts";

import React, { useState } from "react";
import Link from "next/link";

import {
  ArrowUpRightIcon,
  BookOpenIcon,
  CalendarIcon,
} from "@/components/icons";
import { PublishDraftButton } from "@/components/publish-draft-button";

type ActiveTab = "published" | "drafts";

interface BlogDraftsTabsProps {
  drafts: DraftPostMeta[];
  children: React.ReactNode;
}

function tabButtonClass(isActive: boolean): string {
  const base =
    "px-4 py-2 text-xs font-mono font-bold border-2 border-retro-ink shadow-retro-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink";

  if (isActive) {
    return `${base} bg-retro-ink text-retro-bg shadow-retro-xs translate-x-[1px] translate-y-[1px]`;
  }

  return `${base} bg-retro-bg text-retro-ink hover:bg-retro-pink`;
}

function DraftsPanel({ drafts }: { drafts: DraftPostMeta[] }) {
  if (drafts.length === 0) {
    return (
      <div className="text-center py-20 text-retro-muted border-2 border-dashed border-retro-ink/30 p-12">
        <BookOpenIcon className="mx-auto mb-4 text-retro-ink" size={48} />
        <p className="text-sm font-medium">
          {
            "No drafts to review. Draft articles live in content/blog/drafts/<slug>/article.mdx."
          }
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-retro-ink tracking-tight mb-6 pb-3 border-b-2 border-retro-ink">
        Drafts for review
      </h2>

      <div className="flex flex-col divide-y-2 divide-retro-ink/20">
        {drafts.map((draft) => (
          <article key={draft.slug} className="py-8 first:pt-2 last:pb-0">
            <div className="flex items-center gap-3 text-xs text-retro-muted mb-3">
              <div className="flex items-center gap-1.5">
                <CalendarIcon size={13} />
                <time dateTime={draft.date}>
                  {new Date(draft.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>

            <Link className="group block mb-2" href={`/blog/${draft.slug}`}>
              <h3 className="text-xl sm:text-2xl font-bold text-retro-ink tracking-tight group-hover:underline underline-offset-4 transition-all flex items-start justify-between gap-4">
                <span>{draft.title}</span>
                <ArrowUpRightIcon
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-retro-ink shrink-0 mt-1"
                  size={18}
                />
              </h3>
            </Link>

            <p className="text-sm text-retro-body leading-relaxed mb-4 max-w-2xl font-normal">
              {draft.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {draft.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold bg-retro-bg text-retro-ink border border-retro-ink shadow-retro-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <PublishDraftButton slug={draft.slug} title={draft.title} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogDraftsTabs({ drafts, children }: BlogDraftsTabsProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("published");

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-center gap-3">
        <button
          aria-pressed={activeTab === "published"}
          className={tabButtonClass(activeTab === "published")}
          data-blog-tab="published"
          type="button"
          onClick={() => setActiveTab("published")}
        >
          Published
        </button>
        <button
          aria-pressed={activeTab === "drafts"}
          className={tabButtonClass(activeTab === "drafts")}
          data-blog-tab="drafts"
          type="button"
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </button>
      </div>

      {activeTab === "published" ? children : <DraftsPanel drafts={drafts} />}
    </div>
  );
}
