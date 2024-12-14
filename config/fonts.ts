import { Nunito as FontMono, Roboto as FontSans, Sacramento as FontLogo } from "next/font/google";

export const fontTitle = FontSans({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-mono",
});

export const fontSans = FontMono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
});

export const fontLogo = FontLogo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo"
})
