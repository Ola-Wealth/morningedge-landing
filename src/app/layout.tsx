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
  title: "The AI Edge — 1-on-1 AI Literacy Coaching | MorningEdge Co.",
  description:
    "Close the AI literacy gap with a personalised 1-on-1 coaching program. No code required. Built around your role, your tools, and your challenges.",
  openGraph: {
    title: "The AI Edge — 1-on-1 AI Literacy Coaching",
    description:
      "A coaching program that closes the AI gap — live, 1-on-1, and with zero code required.",
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
