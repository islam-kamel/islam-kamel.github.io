"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
  const { scrollY } = useScroll();

  // Add hysteresis to the scroll event to prevent flickering at the threshold
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 60 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 20 && isScrolled) {
      setIsScrolled(false);
    }
  });

  // Ensure initial check on mount in case page loads already scrolled
  useEffect(() => {
    if (window.scrollY > 60) {
      setIsScrolled(true);
    }
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
      {/* Static placeholder to prevent layout shift from fixed headers */}
      <div className="h-20 w-full" />

      {/* 1. SCROLLED STATE: Centered Pill & Mobile Floating Elements */}
      <motion.div
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : -20,
        }}
        className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-4 sm:px-6 md:justify-center md:px-0 pointer-events-none"
        initial={false}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex items-center gap-3 ${isScrolled ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Logo Circle (Always visible when scrolled) */}
          <NextLink
            aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] hover:border-primary/50 backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:bg-[#111622] transition-all group shrink-0"
            href="/"
            onClick={scrollToTop}
          >
            <Logo
              className="group-hover:scale-105 transition-transform"
              size={24}
            />
          </NextLink>

          {/* Desktop Nav Pill (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),_0_0_1px_1px_rgba(26,34,52,0.8)]">
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-sm font-medium text-[#8899A6] hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-all whitespace-nowrap"
                href={item.href}
              >
                {item.label}
              </NextLink>
            ))}
            <div className="w-px h-4 bg-[#1A2234] mx-1" />
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 shadow-sm shrink-0 whitespace-nowrap ml-1"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={13} />
              <span>contact@islamkamel.com</span>
            </a>
          </nav>
        </div>

        {/* Mobile Menu Toggle Button (Visible only on mobile) */}
        <button
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className={`md:hidden w-11 h-11 rounded-full bg-[#0A0D14]/90 border border-[#1A2234] flex items-center justify-center text-[#8899A6] hover:text-white transition-colors shadow-xl backdrop-blur-md ${isScrolled ? "pointer-events-auto" : "pointer-events-none"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon size={19} /> : <MenuIcon size={19} />}
        </button>
      </motion.div>

      {/* 2. UNSCROLLED STATE: Full Width Header */}
      <motion.header
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -10 : 0,
        }}
        className={`fixed top-0 inset-x-0 h-20 w-full bg-[#000000]/60 backdrop-blur-md border-b border-[#1A2234]/60 z-40 ${
          isScrolled ? "pointer-events-none" : "pointer-events-auto"
        }`}
        initial={false}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left Brand */}
          <NextLink className="flex items-center gap-3 group" href="/">
            <Logo size={34} />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors">
                Islam Kamel
              </span>
              <span className="text-[11px] font-mono text-[#8899A6] -mt-1  sm:">
                Software Engineer
              </span>
            </div>
          </NextLink>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-sm font-medium text-[#8899A6] hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-all whitespace-nowrap"
                href={item.href}
              >
                {item.label}
              </NextLink>
            ))}
          </nav>

          {/* Right Area */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              aria-label="GitHub"
              className="text-[#8899A6] hover:text-white transition-colors p-1.5"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon size={19} />
            </a>
            <a
              aria-label="LinkedIn"
              className="text-[#8899A6] hover:text-[#0077B5] transition-colors p-1.5"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-full transition-all duration-200 shadow-sm hover:shadow-primary/25"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={15} />
              <span>contact@islamkamel.com</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 flex items-center justify-end text-[#8899A6] hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
        </div>
      </motion.header>

      {/* 3. MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-30 bg-[#000000]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
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
