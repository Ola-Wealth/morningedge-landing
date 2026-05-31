import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AI Edge for Real Estate — AI Coaching for Nigerian Property Professionals",
  description:
    "A 1-on-1 AI coaching programme built for Nigerian realtors, property agents, and estate developers. Close more deals, write better listings, and follow up faster. Zero code required.",
  openGraph: {
    title: "The AI Edge for Real Estate — MorningEdge Co.",
    description:
      "AI coaching built specifically for Nigerian real estate professionals. Live, 1-on-1, and with zero code required.",
    type: "website",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
