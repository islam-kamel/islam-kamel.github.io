import React from "react";

import { siteConfig } from "@/config/site";
import { GithubIcon, IkIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0E1013] text-[#FAF8F5] border-t-2 border-[#111111] py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#23272F]">
          <div className="flex items-center gap-3">
            <IkIcon />
            <div className={"flex flex-col gap-1"}>
              <span className="text-xs font-bold text-[#FAF8F5]">
                Islam Kamel
              </span>
              <span className="text-xs text-[#8E939E]">Software engineer</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              aria-label="GitHub"
              className="text-[#8E939E] hover:text-[#EE7C98] transition-colors"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon size={18} />
            </a>
            <a
              aria-label="LinkedIn"
              className="text-[#8E939E] hover:text-[#0077B5] transition-colors"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              aria-label="Email"
              className="text-[#8E939E] hover:text-[#EE7C98] transition-colors flex items-center gap-2 font-mono text-xs"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={16} />
              <span>contact@islamkamel.com</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E939E]">
          <p>© {year} Islam Kamel. All rights reserved.</p>
          <p className="text-xs text-[#8E939E]">
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
