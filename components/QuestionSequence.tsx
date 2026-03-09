"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Beat {
  text: string;
  hold: number;       // ms to hold after typing
  pauseAfter: number; // ms of dark pause before next beat
  vanish: boolean;    // true = instant disappear, false = slow fade
}

const BEATS: Beat[] = [
  {
    text: "What if the most powerful technology in history... was built with the wrong priorities.",
    hold: 2500,
    pauseAfter: 600,
    vanish: false,
  },
  {
    text: "What if intelligence was built to serve — not survive?",
    hold: 2500,
    pauseAfter: 600,
    vanish: false,
  },
  {
    text: "Safety shouldn't be an afterthought...",
    hold: 2000,
    pauseAfter: 800,
    vanish: false,
  },
  {
    text: "We made it the foundation.",
    hold: 2200,
    pauseAfter: 0,
    vanish: false,
  },
];

const CHAR_DELAY = 55;
const FADE_OUT_DURATION = 1400;

interface QuestionSequenceProps {
  onComplete: () => void;
}

export default function QuestionSequence({ onComplete }: QuestionSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "fading" | "dark">("typing");
  const [skipped, setSkipped] = useState(false);
  const charIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (skipped) return;

    const beat = BEATS[currentIndex];
    charIndexRef.current = 0;
    setDisplayedText("");
    setPhase("typing");

    const typeNextChar = () => {
      charIndexRef.current++;
      const chars = charIndexRef.current;
      setDisplayedText(beat.text.slice(0, chars));

      if (chars < beat.text.length) {
        timerRef.current = setTimeout(typeNextChar, CHAR_DELAY);
      } else {
        // Done typing — hold
        setPhase("holding");
        timerRef.current = setTimeout(() => {
          const advance = () => {
            if (currentIndex < BEATS.length - 1) {
              setPhase("dark");
              setDisplayedText("");
              timerRef.current = setTimeout(() => {
                setCurrentIndex((i) => i + 1);
              }, beat.pauseAfter);
            } else {
              onComplete();
            }
          };

          if (beat.vanish) {
            // Instant vanish — skip fade
            advance();
          } else {
            // Slow fade out
            setPhase("fading");
            timerRef.current = setTimeout(advance, FADE_OUT_DURATION);
          }
        }, beat.hold);
      }
    };

    timerRef.current = setTimeout(typeNextChar, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, skipped, onComplete]);

  if (skipped) return null;

  const beat = BEATS[currentIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
      {phase !== "dark" && (
        <p
          key={currentIndex}
          className={`font-body text-center px-8 ${
            phase === "fading" ? "animate-fade-out-slow" : ""
          }`}
          style={{
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
            letterSpacing: "0.02em",
            color: "var(--cream)",
            maxWidth: "700px",
            lineHeight: 1.7,
            minHeight: "3em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>
            {displayedText}
            <span className="typewriter-cursor" />
          </span>
        </p>
      )}

      <button
        onClick={handleSkip}
        className="fixed font-body cursor-pointer"
        style={{
          bottom: "2rem",
          right: "2rem",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
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
