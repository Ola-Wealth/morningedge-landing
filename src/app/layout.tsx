import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The AI Edge — A Live AI-Literacy Cohort | MorningEdge AI",
  description:
    "Close the AI literacy gap in a live 6-session cohort — 4 build sessions, 2 hot-seat reviews, and a real capstone you ship for your job. No code required. Early-bird seats open.",
  openGraph: {
    title: "The AI Edge — A Live AI-Literacy Cohort",
    description:
      "A live cohort that closes the AI gap — 6 sessions, a real capstone, a community, and zero code required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
