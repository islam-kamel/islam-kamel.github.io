"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  CloseIcon,
  GithubIcon,
  IkIcon,
  LinkedinIcon,
  Logo,
  MailIcon,
  MenuIcon,
} from "@/components/icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const scrolledTriggerRef = useRef<HTMLButtonElement>(null);
  const unscrolledTriggerRef = useRef<HTMLButtonElement>(null);

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

  // Lock body scroll when mobile menu is open
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

  // Synchronize native modal dialog state with React state
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isMobileMenuOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isMobileMenuOpen]);

  // Handle backdrop click to close dialog
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        setIsMobileMenuOpen(false);
      }
    };

    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  // Close mobile menu on desktop viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleDialogClose = () => {
    setIsMobileMenuOpen(false);
    const triggerToFocus =
      lastActiveTriggerRef.current ??
      (isScrolled ? scrolledTriggerRef.current : unscrolledTriggerRef.current);

    triggerToFocus?.focus({ preventScroll: true });
  };

  const openMobileMenu = (triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleToggleMenu = (triggerEl: HTMLButtonElement | null) => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu(triggerEl);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
    // If not on homepage, default NextLink behavior navigates to "/"
  };

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] };

  return (
    <>
      {/* Static placeholder to prevent layout shift from fixed headers */}
      <div className="h-20 w-full" />

      {/* 1. SCROLLED STATE: Centered Pill & Mobile Floating Elements */}
      <motion.div
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: shouldReduceMotion ? 0 : isScrolled ? 0 : -20,
        }}
        aria-hidden={!isScrolled}
        className={`fixed inset-x-0 top-4 z-50 flex items-center justify-between px-4 sm:px-6 md:justify-center md:px-0 ${
          isScrolled ? "pointer-events-auto" : "pointer-events-none invisible"
        }`}
        inert={!isScrolled ? true : undefined}
        initial={false}
        transition={motionTransition}
      >
        <div className="flex items-center gap-3">
          {/* Logo Circle (Always visible when scrolled) */}
          <NextLink
            aria-label="Home"
            className="w-11 h-11 rounded-full bg-[#FAF8F5] border-2 border-[#111111] hover:bg-[#EE7C98] backdrop-blur-md flex items-center justify-center shadow-[2px_2px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all group shrink-0 text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
            href="/"
            onClick={handleLogoClick}
          >
            <Logo
              className="group-hover:scale-105 transition-transform"
              size={22}
            />
          </NextLink>

          {/* Desktop Nav Pill (Hidden on mobile) */}
          <nav
            aria-label="Scrolled Navigation"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF8F5]/95 border-2 border-[#111111] backdrop-blur-xl shadow-[3px_3px_0px_0px_#111111]"
          >
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-sm font-bold text-[#111111] hover:bg-[#EE7C98]/25 px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                href={item.href}
              >
                {item.label}
              </NextLink>
            ))}
            <div className="w-[1.5px] h-4 bg-[#111111]/20 mx-1" />
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#111111] bg-[#EE7C98] hover:bg-[#E56382] border border-[#111111] rounded-full transition-all duration-200 shadow-[1px_1px_0px_0px_#111111] shrink-0 whitespace-nowrap ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={13} />
              <span>Say hello</span>
            </a>
          </nav>
        </div>

        {/* Mobile Menu Toggle Button (Visible only on mobile) */}
        <button
          ref={scrolledTriggerRef}
          aria-controls="mobile-navigation-dialog"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden w-11 h-11 rounded-full bg-[#FAF8F5] border-2 border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#EE7C98] transition-colors shadow-[2px_2px_0px_0px_#111111] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          type="button"
          onClick={() => handleToggleMenu(scrolledTriggerRef.current)}
        >
          {isMobileMenuOpen ? <CloseIcon size={19} /> : <MenuIcon size={19} />}
        </button>
      </motion.div>

      {/* 2. UNSCROLLED STATE: Full Width Header */}
      <motion.header
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: shouldReduceMotion ? 0 : isScrolled ? -10 : 0,
        }}
        aria-hidden={isScrolled}
        className={`fixed top-0 inset-x-0 h-20 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#111111]/15 z-40 ${
          isScrolled ? "pointer-events-none invisible" : "pointer-events-auto"
        }`}
        inert={isScrolled ? true : undefined}
        initial={false}
        transition={motionTransition}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left Brand */}
          <NextLink
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-lg"
            href="/"
            onClick={handleLogoClick}
          >
            <IkIcon />
            <div className="flex flex-col">
              <span className="text-[#111111] font-bold text-base sm:text-lg tracking-tight transition-colors">
                Islam Kamel
              </span>
              <span className="text-xs text-[#5A606B]">Software engineer</span>
            </div>
          </NextLink>

          {/* Center Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5"
          >
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-sm font-bold text-[#111111] hover:bg-[#EE7C98]/25 px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                href={item.href}
              >
                {item.label}
              </NextLink>
            ))}
          </nav>

          {/* Right Area */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              aria-label="GitHub"
              className="text-[#111111] hover:bg-[#EE7C98]/25 transition-colors p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon size={19} />
            </a>
            <a
              aria-label="LinkedIn"
              className="text-[#111111] hover:text-[#0077B5] transition-colors p-2 rounded-md hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              href={siteConfig.links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#111111] bg-[#EE7C98] hover:bg-[#E56382] rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              href="mailto:contact@islamkamel.com"
            >
              <MailIcon size={15} />
              <span>Say hello</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={unscrolledTriggerRef}
            aria-controls="mobile-navigation-dialog"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 flex items-center justify-end text-[#111111] hover:text-[#EE7C98] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            type="button"
            onClick={() => handleToggleMenu(unscrolledTriggerRef.current)}
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
        </div>
      </motion.header>

      {/* 3. MOBILE FULL-SCREEN NAVIGATION DIALOG */}
      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        className="fixed inset-0 m-0 p-0 w-full h-[100dvh] max-w-none max-h-none border-none bg-transparent backdrop:bg-black/50 overflow-hidden md:hidden z-50"
        id="mobile-navigation-dialog"
        onClose={handleDialogClose}
      >
        <div
          className={`w-full h-full bg-[#FAF8F5] flex flex-col justify-between pt-6 pb-8 px-6 overflow-y-auto ${
            shouldReduceMotion ? "" : "transition-opacity duration-200 ease-out"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111]/20">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5A606B]">
                Navigation
              </span>
              <button
                aria-label="Close navigation menu"
                className="p-1.5 text-[#111111] hover:bg-[#EE7C98]/20 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                type="button"
                onClick={closeMobileMenu}
              >
                <CloseIcon size={22} />
              </button>
            </div>
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className="text-2xl font-bold text-[#111111] hover:bg-[#EE7C98]/20 py-2.5 px-3 rounded-lg border-b border-[#111111]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </NextLink>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-[#111111]">
            <a
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#EE7C98] hover:bg-[#E56382] text-[#111111] font-bold text-base border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              href="mailto:contact@islamkamel.com"
              onClick={closeMobileMenu}
            >
              <MailIcon size={16} />
              <span>Say hello</span>
            </a>

            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                aria-label="GitHub"
                className="text-[#111111] hover:bg-[#EE7C98]/20 px-3 py-2 rounded-md transition-all flex items-center gap-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon size={20} />
                <span>GitHub</span>
              </a>
              <a
                aria-label="LinkedIn"
                className="text-[#111111] hover:bg-[#EE7C98]/20 px-3 py-2 rounded-md transition-all flex items-center gap-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                href={siteConfig.links.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedinIcon size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
