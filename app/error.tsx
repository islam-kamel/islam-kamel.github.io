"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-retro-bg">
      <div className="max-w-md w-full border-2 border-retro-ink bg-retro-bg shadow-retro-lg overflow-hidden">
        {/* Window Bar */}
        <div className="bg-retro-ink text-retro-bg px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-ink">
          <span className="text-xs font-bold">Error</span>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="inline-block px-3 py-1 bg-retro-pink border border-retro-ink text-xs font-bold text-retro-ink mb-4">
            Error
          </div>

          <h1 className="text-2xl font-bold text-retro-ink tracking-tight mb-3">
            Something didn’t load properly
          </h1>

          <p className="text-sm text-retro-muted mb-8 leading-relaxed">
            An unexpected error occurred while loading this page. You can try
            reloading or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center px-5 py-2.5 bg-retro-pink hover:bg-retro-pink-hover text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink"
              onClick={() => reset()}
            >
              Try reloading
            </button>
            <Link
              className="inline-flex items-center justify-center px-5 py-2.5 bg-retro-bg hover:bg-white text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink"
              href="/"
            >
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
