import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const garet = localFont({
  src: [
    {
      path: "../public/assets/fonts/Garet-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Garet-Heavy.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-garet",
  display: "swap",
});
