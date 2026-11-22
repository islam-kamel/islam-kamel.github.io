import localFont from "next/font/local";

export const fontTitle = localFont({
  src: "../public/fonts/space-grotesk/SpaceGrotesk-Variable.ttf",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-title",
});

export const fontSans = localFont({
  src: "../public/fonts/space-grotesk/SpaceGrotesk-Variable.ttf",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
});

export const fontMono = localFont({
  src: [
    {
      path: "../public/fonts/space-mono/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/space-mono/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export const fontLogo = localFont({
  src: "../public/fonts/sacramento/Sacramento-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-logo",
});
