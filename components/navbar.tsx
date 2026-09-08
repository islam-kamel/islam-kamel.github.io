"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import {
  CloseIcon,
  GithubIcon,
  LinkedinIcon,
  Logo,
  MailIcon,
  MenuIcon,
} from "@/components/icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. SCROLLED STATE: Separate Circular Floating Logo on the left */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="fixed top-4 left-4 sm:left-8 z-50"
            exit={{ opacity: 0, scale: 0.8, x: -16 }}
            initial={{ opacity: 0, scale: 0.8, x: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <NextLink
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] hover:border-primary/50 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-[#111622] transition-all group"
              href="/"
              onClick={scrollToTop}
            >
              <Logo
                className="group-hover:scale-105 transition-transform"
                size={24}
              />
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HEADER & NAVBAR */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 pointer-events-none"
            : "sticky top-0 bg-[#000000]/60 backdrop-blur-md border-b border-[#1A2234]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Brand: Visible only when unscrolled */}
          <motion.div
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? -20 : 0,
              pointerEvents: isScrolled ? "none" : "auto",
            }}
            className="flex items-center"
            initial={false}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <NextLink
              className="flex items-center gap-3 group pointer-events-auto"
              href="/"
            >
              <Logo size={34} />
              <div className="flex flex-col">
                <span className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors">
                  Islam Kamel
                </span>
                <span className="text-[11px] font-mono text-[#8899A6] -mt-1 hidden sm:block">
                  Software Engineer
                </span>
              </div>
            </NextLink>
          </motion.div>

          {/* Center Navigation Pill (Evervault style) */}
          <div
            className={`hidden md:block transition-all duration-300 pointer-events-auto ${
              isScrolled ? "fixed top-4 left-1/2 -translate-x-1/2 z-50" : ""
            }`}
          >
            <motion.nav
              animate={{
                y: 0,
                scale: 1,
                boxShadow: isScrolled
                  ? "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 1px 1px rgba(26,34,52,0.8)"
                  : "0 4px 20px -4px rgba(0,0,0,0.4)",
              }}
              className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] backdrop-blur-xl"
              initial={false}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {siteConfig.navItems.map((item) => (
                <NextLink
                  key={item.href}
                  className="text-xs sm:text-sm font-medium text-[#8899A6] hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-all whitespace-nowrap"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              ))}

              {/* Scrolled State Extra CTA Pill inside the centered container (Screenshot 2 style) */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                    className="overflow-hidden flex items-center"
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <a
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 shadow-sm shrink-0 whitespace-nowrap"
                      href="mailto:contact@islamkamel.com"
                    >
                      <MailIcon size={13} />
                      <span className="hidden sm:inline">
                        contact@islamkamel.com
                      </span>
                      <span className="sm:hidden">Contact</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          </div>

          {/* Right Area: Unscrolled (Social Links & Primary Contact Button) */}
          <motion.div
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? 20 : 0,
              pointerEvents: isScrolled ? "none" : "auto",
            }}
            className="hidden sm:flex items-center gap-4"
            initial={false}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <a
              aria-label="GitHub"
              className="text-[#8899A6] hover:text-white transition-colors p-1.5 pointer-events-auto"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon size={19} />
            </a>

            <a
              aria-label="LinkedIn"
              className="text-[#8899A6] hover:text-[#0077B5] transition-colors p-1.5 pointer-events-auto"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon size={19} />
            </a>

            <a
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 shadow-sm hover:shadow-primary/25 pointer-events-auto"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={15} />
              <span>contact@islamkamel.com</span>
            </a>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center pointer-events-auto">
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={`w-10 h-10 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] flex items-center justify-center text-[#8899A6] hover:text-white transition-colors ${
                isScrolled ? "fixed top-4 right-4 z-50 shadow-xl" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={19} />
              ) : (
                <MenuIcon size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-40 bg-[#000000]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8899A6] mb-2 px-2">
                Navigation
              </span>
              {siteConfig.navItems.map((item) => (
                <NextLink
                  key={item.href}
                  className="text-lg font-medium text-white/90 hover:text-white py-3 px-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NextLink>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-[#1A2234]">
              <a
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors shadow-lg shadow-primary/20"
                href="mailto:contact@islamkamel.com"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MailIcon size={16} />
                <span>contact@islamkamel.com</span>
              </a>

              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  aria-label="GitHub"
                  className="text-[#8899A6] hover:text-white transition-colors p-2 flex items-center gap-2 text-sm"
                  href={siteConfig.links.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GithubIcon size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  aria-label="LinkedIn"
                  className="text-[#8899A6] hover:text-[#0077B5] transition-colors p-2 flex items-center gap-2 text-sm"
                  href={siteConfig.links.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
