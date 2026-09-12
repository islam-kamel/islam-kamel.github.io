import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { GoogleTagManager } from "@next/third-parties/google";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontLogo, fontSans, fontTitle } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  keywords:
    "Islam Kamel, Software Engineer, Senior Software Engineer, Full-Stack Developer, Next.js, React, TypeScript, Python, LLM Orchestration, Multi-Agent Systems, WebSockets, Real-time Systems, ECharts, react-pdf, Docker, Django, PostgreSQL, Software Architecture, High-Performance Web",
  description: siteConfig.description,
  appleWebApp: {
    title: "Islam Kamel",
    statusBarStyle: "black",
    capable: true,
  },
  applicationName: "Islam Kamel",
  authors: {
    name: "Islam Kamel",
    url: siteConfig.url,
  },
  metadataBase: new URL(siteConfig.url),
  creator: "Islam Kamel",
  alternates: { canonical: siteConfig.url },
  manifest: "/manifest.json",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Islam Kamel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@IslamKamelLl",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-dark-96x96.png",
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark-48x48.png",
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-96x96.png",
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-48x48.png",
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-96x96.png",
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon-48x48.png",
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/favicon.ico",
        rel: "icon",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-icon-180x180.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      {
        url: "/apple-icon.png",
        rel: "apple-touch-icon",
        sizes: "192x192",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#000000] text-[#FFFFFF] font-sans antialiased selection:bg-primary/30 selection:text-white",
          fontSans.variable,
          fontTitle.variable,
          fontLogo.variable
        )}
      >
        {/*Google Tag Manager (noscript) */}
        <noscript>
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NPFLTNVW"
            style={{ display: "none", visibility: "hidden" }}
            width="0"
          />
        </noscript>
        {/*End Google Tag Manager (noscript)*/}
        <GoogleTagManager gtmId={"GTM-NPFLTNVW"} />

        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="min-h-screen w-full relative bg-[#000000] text-white flex flex-col justify-between">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
