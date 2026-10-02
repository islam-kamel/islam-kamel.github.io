import {
  Space_Grotesk as FontSans,
  Space_Mono as FontMono,
  Sacramento as FontLogo,
} from "next/font/google";

export const fontTitle = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const fontLogo = FontLogo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});
