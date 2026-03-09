"use client";

export default function AmbientGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute animate-ambient-pulse"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(80vw, 800px)",
          height: "min(80vh, 800px)",
          background:
            "radial-gradient(ellipse at center, rgba(201, 168, 76, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
