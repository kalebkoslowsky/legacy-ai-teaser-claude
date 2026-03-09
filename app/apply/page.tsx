import type { Metadata } from "next";
import ApplyPageClient from "./ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply — Legacy AI Technologies",
  description: "Join an extraordinary team building the future of AI.",
  openGraph: {
    title: "Apply — Legacy AI Technologies",
    description:
      "We're looking for world-class talent to reshape artificial intelligence.",
    type: "website",
    url: "https://legacyaitechnologies.com/apply",
  },
  robots: "index, follow",
};

export default function ApplyPage() {
  return <ApplyPageClient />;
}
