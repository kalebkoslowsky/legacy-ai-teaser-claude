import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legacy AI Technologies",
  description: "Something new is coming. Be the first to know.",
  openGraph: {
    title: "Legacy AI Technologies",
    description: "The future of trusted intelligence.",
    type: "website",
    url: "https://legacyaitechnologies.com",
  },
  twitter: {
    card: "summary",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <noscript>
          <div className="fallback-brand">
            <h1
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "3rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "#e8e0d0" }}>LEGACY </span>
              <span style={{ color: "#c9a84c" }}>AI</span>
              <span style={{ color: "#e8e0d0" }}> TECHNOLOGIES</span>
            </h1>
            <p
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.85)",
                marginTop: "1.5rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              The future of trusted intelligence
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
