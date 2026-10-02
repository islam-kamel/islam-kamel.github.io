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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="max-w-md w-full border-2 border-[#111111] bg-[#FAF8F5] shadow-[6px_6px_0px_0px_#111111] overflow-hidden">
        {/* Window Bar */}
        <div className="bg-[#111111] text-[#FAF8F5] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#111111]">
          <span className="text-xs font-bold">Error</span>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="inline-block px-3 py-1 bg-[#EE7C98] border border-[#111111] text-xs font-bold text-[#111111] mb-4">
            Error
          </div>

          <h1 className="text-2xl font-bold text-[#111111] tracking-tight mb-3">
            Something didn’t load properly
          </h1>

          <p className="text-sm text-[#5A606B] mb-8 leading-relaxed">
            An unexpected error occurred while loading this page. You can try
            reloading or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#EE7C98] hover:bg-[#E56382] text-[#111111] font-bold text-sm border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              onClick={() => reset()}
            >
              Try reloading
            </button>
            <Link
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FAF8F5] hover:bg-white text-[#111111] font-bold text-sm border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
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
