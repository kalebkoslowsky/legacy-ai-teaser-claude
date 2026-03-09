"use client";

import Link from "next/link";

export default function HiringTeaser() {
  return (
    <section className="flex flex-col items-center gap-6 text-center px-6">
      {/* Heading */}
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
          letterSpacing: "0.08em",
          fontWeight: 400,
          color: "var(--cream)",
        }}
      >
        Build What&apos;s Next
      </h2>

      {/* Body copy */}
      <p
        className="font-body"
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
          lineHeight: 1.8,
          fontWeight: 300,
          color: "var(--white-soft)",
          maxWidth: "520px",
        }}
      >
        We&apos;re assembling a small, extraordinary team to reshape the future
        of artificial intelligence. If that sounds like your kind of challenge
        — we&apos;d like to hear from you.
      </p>

      {/* CTA */}
      <Link
        href="/apply"
        className="font-body inline-block"
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 300,
          color: "var(--cream)",
          border: "1px solid rgba(201, 168, 76, 0.4)",
          padding: "0.75rem 2rem",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--gold-soft)";
          e.currentTarget.style.borderColor = "var(--gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.4)";
        }}
      >
        Apply Now &rarr;
      </Link>
    </section>
  );
}
