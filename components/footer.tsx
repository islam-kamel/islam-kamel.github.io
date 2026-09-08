import React from "react";

import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#000000] border-t border-[#1A2234] py-8 text-sm text-[#8899A6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-[#8899A6]">
          Copyright © {year} Islam Kamel. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            aria-label="GitHub"
            className="text-[#8899A6] hover:text-white transition-colors"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon size={18} />
          </a>
          <a
            aria-label="LinkedIn"
            className="text-[#8899A6] hover:text-[#0077B5] transition-colors"
            href={siteConfig.links.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            aria-label="Email"
            className="text-[#8899A6] hover:text-primary transition-colors"
            href="mailto:contact@islamkamel.com"
          >
            <MailIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
