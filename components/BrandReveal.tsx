"use client";

import { useState, useEffect } from "react";

interface BrandRevealProps {
  onRevealComplete: () => void;
}

export default function BrandReveal({ onRevealComplete }: BrandRevealProps) {
  const [stage, setStage] = useState(0);
  // 0: divider, 1: brand name, 2: tagline, 3: done

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),    // Start brand name
      setTimeout(() => setStage(2), 1600),   // Tagline after brand
      setTimeout(() => {
        setStage(3);
        onRevealComplete();
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onRevealComplete]);

  return (
    <div className="flex flex-col items-center gap-6" style={{ zIndex: 10 }}>
      {/* Top divider */}
      <div
        className="gold-divider animate"
        style={{ maxWidth: "120px", margin: "0 auto" }}
      />

      {/* Brand name */}
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 400,
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        <span style={{ color: "var(--cream)" }}>LEGACY </span>
        <span style={{ color: "var(--gold)" }}>AI</span>
      </h1>

      {/* Tagline */}
      <p
        className="font-body"
        style={{
          fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 200,
          color: "var(--white-soft)",
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        The future of trusted intelligence
      </p>

      {/* Bottom divider */}
      <div
        className="gold-divider"
        style={{
          maxWidth: "80px",
          margin: "0.5rem auto 0",
          animation: stage >= 2 ? "expandDivider 1.5s ease forwards" : "none",
          width: stage >= 2 ? undefined : "0",
        }}
      />
    </div>
  );
}
