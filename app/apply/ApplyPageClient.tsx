"use client";

import ParticleBackground from "@/components/ParticleBackground";
import AmbientGlow from "@/components/AmbientGlow";
import ApplicationForm from "@/components/ApplicationForm";

export default function ApplyPageClient() {
  return (
    <main className="relative min-h-screen flex flex-col items-center">
      <AmbientGlow />
      <ParticleBackground />

      {/* Full-width centered column */}
      <div
        className="relative w-full flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        {/* Top bar with back link */}
        <div className="w-full max-w-[1000px] px-6 sm:px-10 pt-10 sm:pt-14">
          <a
            href="/"
            className="font-body inline-block"
            style={{
              fontSize: "0.8rem",
              color: "var(--white-muted)",
              textDecoration: "none",
              letterSpacing: "0.08em",
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
        </div>

        {/* Header — full width centered */}
        <header className="text-center px-6 mt-14 sm:mt-20 mb-16 sm:mb-20">
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(0.65rem, 1.8vw, 1.1rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "var(--cream)" }}>LEGACY </span>
            <span style={{ color: "var(--gold)" }}>AI</span>
            <span style={{ color: "var(--cream)" }}> TECHNOLOGIES</span>
          </h1>

          <div
            className="gold-divider animate mx-auto mt-8 sm:mt-10"
            style={{ maxWidth: "80px" }}
          />

          <h2
            className="font-display mt-8 sm:mt-10"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              letterSpacing: "0.06em",
              fontWeight: 400,
              color: "var(--cream)",
            }}
          >
            Join the Team
          </h2>

          <p
            className="font-body mt-6 sm:mt-8 mx-auto"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.9,
              fontWeight: 300,
              color: "var(--white-soft)",
              maxWidth: "540px",
            }}
          >
            We&apos;re building something that will change the way the world
            thinks about artificial intelligence. We need exceptional people who
            are ready to do the most important work of their careers.
          </p>

          <p
            className="font-body mt-6 mx-auto"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
              lineHeight: 1.9,
              fontWeight: 300,
              color: "var(--white-muted)",
              maxWidth: "500px",
            }}
          >
            We&apos;re looking for world-class talent across AI research,
            engineering, infrastructure, and operations. Whether you&apos;re a
            researcher pushing the boundaries of machine learning or an engineer
            who builds things that scale — there may be a place for you here.
          </p>
        </header>

        {/* Form card */}
        <div
          className="form-card w-full max-w-[760px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16"
          style={{ marginBottom: "4rem" }}
        >
          <ApplicationForm />
        </div>

        {/* Footer */}
        <footer className="text-center py-12">
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
