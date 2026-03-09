"use client";

import { useState, useCallback } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import AmbientGlow from "@/components/AmbientGlow";
import ApplicationForm from "@/components/ApplicationForm";

export default function ApplyPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = useCallback(() => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center">
      <AmbientGlow />
      <ParticleBackground />

      <div
        className="relative w-full flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        {/* Top bar with back link */}
        <div className="w-full max-w-[760px] px-6 sm:px-10 pt-8 sm:pt-10">
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

        {submitted ? (
          /* ── Success View ── */
          <div
            className="flex-1 flex flex-col items-center justify-center text-center px-6 animate-fade-in"
            style={{ minHeight: "60vh" }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                letterSpacing: "0.1em",
                fontWeight: 400,
                color: "var(--cream)",
              }}
            >
              Application Received
            </h1>

            <div
              className="gold-divider animate mx-auto"
              style={{ maxWidth: "60px", marginTop: "1.5rem" }}
            />

            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--white-soft)",
                marginTop: "1.5rem",
                lineHeight: 1.8,
                maxWidth: "380px",
              }}
            >
              Thank you for your interest. If there&apos;s a fit,
              we&apos;ll be in touch.
            </p>

            <a
              href="/"
              className="font-body"
              style={{
                fontSize: "0.8rem",
                color: "var(--gold)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                marginTop: "2.5rem",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              &larr; Back to legacyaitechnologies.com
            </a>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="text-center px-6 mt-10 sm:mt-14 mb-10 sm:mb-12">
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(0.6rem, 1.6vw, 0.9rem)",
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
                className="gold-divider animate mx-auto mt-6"
                style={{ maxWidth: "60px" }}
              />

              <h2
                className="font-display mt-6"
                style={{
                  fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                  letterSpacing: "0.08em",
                  fontWeight: 400,
                  color: "var(--cream)",
                }}
              >
                Join the Team
              </h2>

              <p
                className="font-body mt-4 mx-auto"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "var(--white-muted)",
                  maxWidth: "480px",
                }}
              >
                We&apos;re looking for exceptional people across AI research,
                engineering, and operations to help build the future of
                trusted intelligence.
              </p>
            </header>

            {/* Form card */}
            <div
              className="form-card w-full max-w-[720px] mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12"
              style={{ marginBottom: "3rem" }}
            >
              <ApplicationForm onSuccess={handleSuccess} />
            </div>

            {/* Footer */}
            <footer className="text-center py-8">
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
          </>
        )}
      </div>
    </main>
  );
}
