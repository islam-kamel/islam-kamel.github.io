import React from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="max-w-md w-full border-2 border-[#111111] bg-[#FAF8F5] shadow-[6px_6px_0px_0px_#111111] overflow-hidden">
        {/* Window Bar */}
        <div className="bg-[#111111] text-[#FAF8F5] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#111111]">
          <span className="text-xs font-bold">404</span>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="inline-block px-3 py-1 bg-[#EE7C98] border border-[#111111] text-xs font-bold text-[#111111] mb-4">
            Not Found
          </div>

          <h1 className="text-3xl font-bold text-[#111111] tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-sm text-[#5A606B] mb-8 leading-relaxed">
            The page you are looking for does not exist, has been relocated, or
            is temporarily unavailable.
          </p>

          <Link
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#EE7C98] hover:bg-[#E56382] text-[#111111] font-bold text-sm border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
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
