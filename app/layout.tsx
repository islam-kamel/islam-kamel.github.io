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
  description: siteConfig.description,
  icons: [
    {
      url: "/favicon.png",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "/favicon.svg",
      rel: "alternate icon",
      type: "image/svg+xml",
    },
    {
      url: "/apple-icon.png",
      rel: "apple-touch-icon",
      sizes: "192x192",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontTitle.variable,
          fontLogo.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="min-h-screen w-full relative">
            <div
              className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,theme(colors.black)_40%,theme(colors.zinc.900)_100%)]"
              // style={{
              //   background:
              //     "radial-gradient(125% 125% at 50% 10%, hsla(var(--ik-background)) 40%, #2b0707 100%)",
              // }}
            />

            <div className="relative grid auto-rows-max gap-4  ">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
        <GoogleTagManager gtmId={"GTM-T3GSTK22"} />
      </body>
    </html>
  );
}
