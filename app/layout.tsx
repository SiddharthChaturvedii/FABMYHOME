import type { Metadata } from "next";
import { Syne, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FABMYHOME | AI-Assisted Interior Styling",
  description: "Design Your Perfect Room in 30 Seconds. India's first AI-assisted interior styling platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-alabaster text-graphite font-sans">
        {children}
      </body>
    </html>
  );
}
