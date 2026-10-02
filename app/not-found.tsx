import React from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-retro-bg">
      <div className="max-w-md w-full border-2 border-retro-ink bg-retro-bg shadow-retro-lg overflow-hidden">
        {/* Window Bar */}
        <div className="bg-retro-ink text-retro-bg px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-ink">
          <span className="text-xs font-bold">404</span>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="inline-block px-3 py-1 bg-retro-pink border border-retro-ink text-xs font-bold text-retro-ink mb-4">
            Not Found
          </div>

          <h1 className="text-3xl font-bold text-retro-ink tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-sm text-retro-muted mb-8 leading-relaxed">
            The page you are looking for does not exist, has been relocated, or
            is temporarily unavailable.
          </p>

          <Link
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-retro-pink hover:bg-retro-pink-hover text-retro-ink font-bold text-sm border-2 border-retro-ink shadow-retro hover:shadow-retro-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-ink"
            href="/"
          >
            <ArrowLeftIcon size={16} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
