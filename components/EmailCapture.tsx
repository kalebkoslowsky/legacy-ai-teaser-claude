"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      const { error } = await supabase
        .from("email_signups")
        .insert({ email, source: "teaser_page" });

      // Treat duplicate email as success (don't reveal it exists)
      if (error && !error.message.includes("duplicate")) {
        throw error;
      }

      // Fire confirmation email (non-blocking)
      fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="animate-fade-in text-center">
        <p
          className="font-body"
          style={{
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p
        className="font-body"
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 300,
          color: "var(--white-soft)",
        }}
      >
        Be the first to know
      </p>

      <form onSubmit={handleSubmit} className="flex items-center gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          aria-label="Email address"
          className="input-gold"
          style={{
            width: "clamp(200px, 40vw, 280px)",
            borderRight: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cursor-pointer"
          style={{
            background: "transparent",
            border: "1px solid rgba(201, 168, 76, 0.3)",
            borderLeft: "none",
            color: "var(--gold)",
            padding: "0.75rem 1rem",
            fontSize: "1.1rem",
            lineHeight: 1,
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gold-soft)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Submit email"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      {status === "error" && (
        <p
          className="font-body animate-fade-in"
          style={{
            fontSize: "0.8rem",
            color: "var(--error)",
            letterSpacing: "0.05em",
          }}
        >
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
