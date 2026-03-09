"use client";

import { useState, useEffect, useCallback } from "react";

const QUESTIONS = [
  "What if your AI isn't telling you the truth?",
  "What if transparency wasn't optional?",
  "What if intelligence was built to serve — not survive?",
];

const FADE_IN_MS = 1200;
const HOLD_MS = 2800;
const FADE_OUT_MS = 1000;
const CYCLE_MS = FADE_IN_MS + HOLD_MS + FADE_OUT_MS;

interface QuestionSequenceProps {
  onComplete: () => void;
}

export default function QuestionSequence({ onComplete }: QuestionSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [skipped, setSkipped] = useState(false);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (skipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Fade in
    setPhase("in");

    // Hold
    timers.push(
      setTimeout(() => setPhase("hold"), FADE_IN_MS)
    );

    // Fade out
    timers.push(
      setTimeout(() => setPhase("out"), FADE_IN_MS + HOLD_MS)
    );

    // Next question or complete
    timers.push(
      setTimeout(() => {
        if (currentIndex < QUESTIONS.length - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          onComplete();
        }
      }, CYCLE_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [currentIndex, skipped, onComplete]);

  if (skipped) return null;

  const animationClass =
    phase === "in"
      ? "animate-fade-in-up"
      : phase === "out"
        ? "animate-fade-out-up"
        : "";

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
      <p
        key={currentIndex}
        className={`font-display italic text-center px-8 ${animationClass}`}
        style={{
          fontWeight: 300,
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          letterSpacing: "0.02em",
          color: "var(--cream)",
          maxWidth: "800px",
        }}
      >
        {QUESTIONS[currentIndex]}
      </p>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed font-body cursor-pointer"
        style={{
          bottom: "2rem",
          right: "2rem",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--white-muted)",
          background: "none",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "0.5rem 1rem",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.4)";
          e.currentTarget.style.color = "var(--cream)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.color = "var(--white-muted)";
        }}
        aria-label="Skip introduction"
      >
        Skip
      </button>
    </div>
  );
}
