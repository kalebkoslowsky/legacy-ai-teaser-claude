"use client";

import { useState, useEffect, useCallback } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import AmbientGlow from "@/components/AmbientGlow";
import QuestionSequence from "@/components/QuestionSequence";
import BrandReveal from "@/components/BrandReveal";
import EmailCapture from "@/components/EmailCapture";
import HiringTeaser from "@/components/HiringTeaser";

const VISITED_KEY = "legacy_visited";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "questions" | "reveal" | "complete">(
    "loading"
  );
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(VISITED_KEY)) {
        setIsReturning(true);
        setPhase("complete");
        return;
      }
    } catch {}
    setPhase("questions");
  }, []);

  const handleQuestionsComplete = useCallback(() => {
    setPhase("reveal");
  }, []);

  const handleRevealComplete = useCallback(() => {
    setPhase("complete");
    try { localStorage.setItem(VISITED_KEY, "true"); } catch {}
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <AmbientGlow />
      <ParticleBackground />

      {/* Question sequence */}
      {phase === "questions" && (
        <QuestionSequence onComplete={handleQuestionsComplete} />
      )}

      {/* Main reveal content */}
      {(phase === "reveal" || phase === "complete") && (
        <div
          className="relative flex-1 flex flex-col items-center justify-center px-6 py-20"
          style={{ zIndex: 10 }}
        >
          <div className="flex flex-col items-center gap-12">
            <BrandReveal onRevealComplete={handleRevealComplete} instant={isReturning} />

            {/* Everything after tagline loads at once */}
            {phase === "complete" && (
              <div className={`flex flex-col items-center gap-12${isReturning ? "" : " animate-fade-in"}`}>
                <EmailCapture />

                <div className="mt-16">
                  <HiringTeaser />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {phase === "complete" && (
        <footer
          className={`relative w-full text-center py-8${isReturning ? "" : " animate-fade-in"}`}
          style={{ zIndex: 10 }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
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
