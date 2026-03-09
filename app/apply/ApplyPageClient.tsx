"use client";

import ParticleBackground from "@/components/ParticleBackground";
import AmbientGlow from "@/components/AmbientGlow";
import ApplicationForm from "@/components/ApplicationForm";

export default function ApplyPageClient() {
  return (
    <main className="relative min-h-screen">
      <AmbientGlow />
      <ParticleBackground />

      <div
        className="relative mx-auto max-w-[700px] px-6 py-12"
        style={{ zIndex: 10 }}
      >
        {/* Back link */}
        <a
          href="/"
          className="font-body inline-block mb-12"
          style={{
            fontSize: "0.8rem",
            color: "var(--white-muted)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--cream)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--white-muted)")
          }
        >
          &larr; Back
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          {/* Brand - smaller */}
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            <span style={{ color: "var(--cream)" }}>LEGACY </span>
            <span style={{ color: "var(--gold)" }}>AI</span>
          </h1>

          {/* Divider */}
          <div
            className="gold-divider animate mx-auto mt-6"
            style={{ maxWidth: "80px" }}
          />

          {/* Heading */}
          <h2
            className="font-display mt-8"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
              letterSpacing: "0.06em",
              fontWeight: 300,
              color: "var(--cream)",
            }}
          >
            Join the Team
          </h2>

          {/* Subheading */}
          <p
            className="font-body mt-6 mx-auto"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "var(--white-soft)",
              maxWidth: "520px",
            }}
          >
            We&apos;re building something that will change the way the world
            thinks about artificial intelligence. We need exceptional people who
            are ready to do the most important work of their careers.
          </p>
        </div>

        {/* Role context */}
        <div className="mb-16">
          <p
            className="font-body mx-auto text-center"
            style={{
              fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "var(--white-soft)",
              maxWidth: "520px",
            }}
          >
            We&apos;re looking for world-class talent across AI research,
            engineering, infrastructure, and operations. Whether you&apos;re a
            researcher pushing the boundaries of machine learning or an engineer
            who builds things that scale — there may be a place for you here.
          </p>
        </div>

        {/* Application Form */}
        <ApplicationForm />

        {/* Footer */}
        <footer className="text-center mt-20 pb-8">
          <p
            className="font-body"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--white-muted)",
            }}
          >
            &copy; 2026 Legacy AI Technologies
          </p>
        </footer>
      </div>
    </main>
  );
}
