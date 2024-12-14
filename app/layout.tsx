import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Image } from "@nextui-org/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontLogo, fontSans, fontTitle } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Signature } from "@/components/Signature";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
        <div
          className={
            "fixed hidden dark:md:block dark:opacity-70 -top-[15%] -left-[10%] 2xl:-top-[20%]   z-0 rotate-12"
          }
        >
          <Image
            className={
              "relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-55 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large "
            }
            src={"landing-bg.png"}
          />
        </div>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-end py-3 px-3">
              <div className="flex items-center gap-1 text-current min-h-[32.38px]">
                <span className="text-default-600">Powered by</span>
                <div className={"min-w-[34px]"}>
                  <Signature
                    className={
                      "data-[loaded=true]:opacity-100 opacity-0  transition-transform-opacity motion-reduce:transition-none"
                    }
                  />
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
