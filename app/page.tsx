"use client";

import { useState, useCallback } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import AmbientGlow from "@/components/AmbientGlow";
import QuestionSequence from "@/components/QuestionSequence";
import BrandReveal from "@/components/BrandReveal";
import EmailCapture from "@/components/EmailCapture";
import HiringTeaser from "@/components/HiringTeaser";

export default function Home() {
  const [phase, setPhase] = useState<
    "questions" | "reveal" | "email" | "complete"
  >("questions");

  const handleQuestionsComplete = useCallback(() => {
    setPhase("reveal");
  }, []);

  const handleRevealComplete = useCallback(() => {
    setPhase("email");
    // Stagger the hiring section
    setTimeout(() => setPhase("complete"), 600);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AmbientGlow />
      <ParticleBackground />

      {/* Question sequence */}
      {phase === "questions" && (
        <QuestionSequence onComplete={handleQuestionsComplete} />
      )}

      {/* Main reveal content */}
      {phase !== "questions" && (
        <div
          className="relative flex flex-col items-center gap-12 px-6 py-20"
          style={{ zIndex: 10 }}
        >
          <BrandReveal onRevealComplete={handleRevealComplete} />

          {/* Email capture */}
          {(phase === "email" || phase === "complete") && (
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <EmailCapture />
            </div>
          )}

          {/* Hiring section */}
          {phase === "complete" && (
            <div
              className="mt-16 animate-fade-in"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <HiringTeaser />
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      {phase === "complete" && (
        <footer
          className="absolute bottom-0 w-full text-center py-6 animate-fade-in"
          style={{
            zIndex: 10,
            animationDelay: "0.8s",
            animationFillMode: "both",
          }}
        >
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
      )}
    </main>
  );
}
