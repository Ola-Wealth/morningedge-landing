import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
