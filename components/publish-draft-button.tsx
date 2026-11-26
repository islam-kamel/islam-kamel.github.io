"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type PublishState = "idle" | "publishing" | "published" | "failed";

interface PublishDraftButtonProps {
  slug: string;
  title: string;
}

interface PublishDraftResponse {
  ok?: boolean;
  message?: string;
}

export function PublishDraftButton({ slug, title }: PublishDraftButtonProps) {
  const router = useRouter();
  const [state, setState] = useState<PublishState>("idle");
  const [message, setMessage] = useState("");

  async function publishDraft(): Promise<void> {
    setState("publishing");
    setMessage("");

    try {
      const response = await fetch("/api/drafts/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const result = (await response.json()) as PublishDraftResponse;

      if (response.ok && result.ok) {
        setState("published");
        setMessage(result.message || `Published ${title}.`);
        router.refresh();

        return;
      }

      setState("failed");
      setMessage(result.message || `Publishing ${title} failed.`);
    } catch {
      setState("failed");
      setMessage(
        "The draft publish endpoint is only available in development mode."
      );
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        aria-label={`Publish draft ${title}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-retro-ink text-retro-bg hover:bg-retro-paper hover:text-retro-ink font-bold text-xs border-2 border-retro-ink shadow-retro-sm hover:shadow-retro-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={state === "publishing"}
        type="button"
        onClick={publishDraft}
      >
        {state === "publishing" ? "Publishing" : "Publish"}
      </button>
      {message && (
        <p
          className="text-xs font-mono font-bold text-retro-ink max-w-xs"
          role={state === "failed" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  );
}
