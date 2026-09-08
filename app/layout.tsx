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
import { LD_JSON } from "@/config/ld_json";

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
    images: [
      {
        url: `${siteConfig.url}/opengraph.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph.png`],
    creator: "@IslamKamelLl",
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-96x96.png",
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.svg",
        rel: "alternate icon",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        rel: "icon",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        rel: "apple-touch-icon",
        sizes: "192x192",
      },
      {
        url: "/apple-icon-180x180.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      {
        url: "/apple-icon-precomposed.png",
        rel: "apple-touch-icon-precomposed",
        sizes: "192x192",
      },
      {
        url: "/android-icon-192x192.png",
        rel: "icon",
        type: "image/png",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LD_JSON).replace(/</g, "\\u003c"),
          }}
          id="ld-json-person"
          type="application/ld+json"
        />
      </head>

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
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3GSTK22"
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
