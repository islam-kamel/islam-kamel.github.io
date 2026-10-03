import React from "react";

import { siteConfig } from "@/config/site";
import { GithubIcon, IkIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-retro-dark text-retro-bg border-t-2 border-retro-ink py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-retro-dark-border">
          <div className="flex items-center gap-3">
            <IkIcon />
            <div className={"flex flex-col gap-1"}>
              <span className="text-xs font-bold text-retro-bg">
                Islam Kamel
              </span>
              <span className="text-xs text-retro-muted-light">
                Software engineer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              aria-label="GitHub"
              className="text-retro-muted-light hover:text-retro-pink transition-colors"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon size={18} />
            </a>
            <a
              aria-label="LinkedIn"
              className="text-retro-muted-light hover:text-linkedin transition-colors"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-retro-muted-light">
          <p>© {year} Islam Kamel. All rights reserved.</p>
          <a
            aria-label="Email"
            className="text-retro-muted-light hover:text-retro-pink transition-colors flex items-center gap-2 font-mono text-xs"
            href="mailto:contact@islamkamel.com"
          >
            <MailIcon size={16} />
            <span>contact@islamkamel.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
