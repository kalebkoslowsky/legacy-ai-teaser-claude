"use client";

import { useState, useEffect, useRef } from "react";

const BRAND_TEXT = "LEGACY AI TECHNOLOGIES";
const TAGLINE_TEXT = "The future of trusted intelligence";
const CHAR_DELAY_BRAND = 65;
const CHAR_DELAY_TAGLINE = 30;
const PAUSE_BEFORE_TAGLINE = 700;

interface BrandRevealProps {
  onRevealComplete: () => void;
  instant?: boolean;
}

export default function BrandReveal({ onRevealComplete, instant = false }: BrandRevealProps) {
  const [brandText, setBrandText] = useState(instant ? BRAND_TEXT : "");
  const [taglineText, setTaglineText] = useState(instant ? TAGLINE_TEXT : "");
  const [stage, setStage] = useState<"divider" | "brand" | "tagline" | "done">(instant ? "done" : "divider");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (instant) {
      onRevealComplete();
      return;
    }

    let charIndex = 0;

    timerRef.current = setTimeout(() => {
      setStage("brand");

      const typeBrand = () => {
        charIndex++;
        setBrandText(BRAND_TEXT.slice(0, charIndex));

        if (charIndex < BRAND_TEXT.length) {
          timerRef.current = setTimeout(typeBrand, CHAR_DELAY_BRAND);
        } else {
          timerRef.current = setTimeout(() => {
            setStage("tagline");
            charIndex = 0;

            const typeTagline = () => {
              charIndex++;
              setTaglineText(TAGLINE_TEXT.slice(0, charIndex));

              if (charIndex < TAGLINE_TEXT.length) {
                timerRef.current = setTimeout(typeTagline, CHAR_DELAY_TAGLINE);
              } else {
                // Tagline done — show divider and reveal everything at once
                setStage("done");
                onRevealComplete();
              }
            };

            typeTagline();
          }, PAUSE_BEFORE_TAGLINE);
        }
      };

      typeBrand();
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onRevealComplete]);

  // "LEGACY AI TECHNOLOGIES"
  // "LEGACY " = 0-6, "AI" = 7-8, " TECHNOLOGIES" = 9-22
  const renderBrand = () => {
    const text = brandText;
    const legacyPart = text.slice(0, Math.min(text.length, 7)); // "LEGACY "
    const aiPart = text.length > 7 ? text.slice(7, Math.min(text.length, 9)) : ""; // "AI"
    const techPart = text.length > 9 ? text.slice(9) : ""; // " TECHNOLOGIES"

    return (
      <>
        <span style={{ color: "var(--cream)" }}>{legacyPart}</span>
        <span className="glow-gold" style={{ color: "var(--gold)" }}>{aiPart}</span>
        <span style={{ color: "var(--cream)" }}>{techPart}</span>
        {stage === "brand" && <span className="typewriter-cursor" />}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6" style={{ zIndex: 10 }}>
      {/* Brand name */}
      <h1
        className="font-display text-center"
        style={{
          fontSize: "clamp(1.4rem, 5vw, 3.2rem)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: 600,
          minHeight: "1.4em",
          visibility: stage === "divider" ? "hidden" : "visible",
        }}
      >
        {renderBrand()}
      </h1>

      {/* Tagline */}
      <p
        className="font-body"
        style={{
          fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 200,
          color: "var(--white-soft)",
          minHeight: "1.5em",
          visibility: stage === "divider" || stage === "brand" ? "hidden" : "visible",
        }}
      >
        {taglineText}
        {stage === "tagline" && <span className="typewriter-cursor" />}
      </p>

    </div>
  );
}
