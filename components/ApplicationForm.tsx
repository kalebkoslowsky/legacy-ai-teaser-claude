"use client";

import { useState, FormEvent } from "react";
import FileUpload from "./FileUpload";

const ROLES = [
  "AI Research / Machine Learning",
  "Natural Language Processing",
  "Reinforcement Learning / Alignment",
  "Model Training / Pre-training",
  "Fine-tuning / Post-training",
  "Backend Engineering",
  "Frontend / Full Stack Engineering",
  "MLOps / Infrastructure",
  "Data Engineering / Data Pipelines",
  "Data Science / Analytics",
  "Evaluation / Benchmarking",
  "AI Safety / Red Teaming",
  "Product / Design",
  "Marketing / Growth",
  "Operations / Business",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  relocation: string;
  role: string;
  roleOther: string;
  linkedin: string;
  portfolio: string;
  experience: string;
  whyLegacy: string;
}

type FormErrors = Partial<Record<keyof FormData | "resume", string>>;

export default function ApplicationForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    relocation: "",
    role: "",
    roleOther: "",
    linkedin: "",
    portfolio: "",
    experience: "",
    whyLegacy: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "This field is required";
    if (!form.email.trim()) errs.email = "This field is required";
    if (!form.location.trim()) errs.location = "This field is required";
    if (!form.relocation) errs.relocation = "This field is required";
    if (!form.role) errs.role = "This field is required";
    if (form.role === "Other" && !form.roleOther.trim())
      errs.roleOther = "This field is required";
    if (!resume) errs.resume = "This field is required";
    if (!form.experience.trim()) errs.experience = "This field is required";
    if (!form.whyLegacy.trim()) errs.whyLegacy = "This field is required";
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErr = document.querySelector("[data-error]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (resume) {
        formData.append("resume", resume);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 animate-fade-in">
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--cream)",
            letterSpacing: "0.08em",
          }}
        >
          Thank you.
        </h2>
        <p
          className="font-body mt-6"
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            color: "var(--white-soft)",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: "440px",
          }}
        >
          Your application has been received. If there&apos;s a fit,
          we&apos;ll be in touch soon.
        </p>
        <a
          href="/"
          className="font-body mt-10 inline-block"
          style={{
            fontSize: "0.85rem",
            color: "var(--gold)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          &larr; Back to legacyaitechnologies.com
        </a>
      </div>
    );
  }

  const labelStyle = {
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    fontWeight: 300,
    color: "var(--white-soft)",
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[560px] mx-auto space-y-8">
      {/* Full Name */}
      <div data-error={errors.name ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Full Name <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={`input-gold ${errors.name ? "error" : ""}`}
        />
        {errors.name && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div data-error={errors.email ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Email Address <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`input-gold ${errors.email ? "error" : ""}`}
        />
        {errors.email && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="font-body" style={labelStyle}>
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="input-gold"
        />
      </div>

      {/* Location */}
      <div data-error={errors.location ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Location <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="City, State/Country"
          className={`input-gold ${errors.location ? "error" : ""}`}
        />
        {errors.location && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.location}
          </p>
        )}
      </div>

      {/* Relocation */}
      <div data-error={errors.relocation ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Open to Relocation? <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <select
          value={form.relocation}
          onChange={(e) => updateField("relocation", e.target.value)}
          className={`select-gold ${errors.relocation ? "error" : ""}`}
        >
          <option value="" disabled>Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Depends on the opportunity">Depends on the opportunity</option>
        </select>
        {errors.relocation && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.relocation}
          </p>
        )}
      </div>

      {/* Role Interest */}
      <div data-error={errors.role ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Role Interest <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <select
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
          className={`select-gold ${errors.role ? "error" : ""}`}
        >
          <option value="" disabled>Select a role</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.role && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.role}
          </p>
        )}
      </div>

      {/* Other role */}
      {form.role === "Other" && (
        <div data-error={errors.roleOther ? "" : undefined}>
          <label className="font-body" style={labelStyle}>
            Please specify <span style={{ color: "var(--gold)" }}>*</span>
          </label>
          <input
            type="text"
            value={form.roleOther}
            onChange={(e) => updateField("roleOther", e.target.value)}
            className={`input-gold ${errors.roleOther ? "error" : ""}`}
          />
          {errors.roleOther && (
            <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
              {errors.roleOther}
            </p>
          )}
        </div>
      )}

      {/* LinkedIn */}
      <div>
        <label className="font-body" style={labelStyle}>
          LinkedIn Profile
        </label>
        <input
          type="url"
          value={form.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/..."
          className="input-gold"
        />
      </div>

      {/* Portfolio / GitHub */}
      <div>
        <label className="font-body" style={labelStyle}>
          Portfolio / GitHub
        </label>
        <input
          type="url"
          value={form.portfolio}
          onChange={(e) => updateField("portfolio", e.target.value)}
          placeholder="https://github.com/... or portfolio URL"
          className="input-gold"
        />
      </div>

      {/* Resume Upload */}
      <div data-error={errors.resume ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Resume / CV <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <FileUpload
          onFileSelect={setResume}
          error={errors.resume}
        />
      </div>

      {/* Experience */}
      <div data-error={errors.experience ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Relevant Experience & Skills <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <textarea
          value={form.experience}
          onChange={(e) => updateField("experience", e.target.value)}
          placeholder="Tell us about your background, expertise, and what you've built."
          rows={3}
          className={`textarea-gold ${errors.experience ? "error" : ""}`}
          style={{ minHeight: "120px" }}
        />
        {errors.experience && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.experience}
          </p>
        )}
      </div>

      {/* Why Legacy AI */}
      <div data-error={errors.whyLegacy ? "" : undefined}>
        <label className="font-body" style={labelStyle}>
          Why Legacy AI? <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <textarea
          value={form.whyLegacy}
          onChange={(e) => updateField("whyLegacy", e.target.value)}
          placeholder="What draws you to this opportunity? What excites you about shaping the future of AI?"
          rows={3}
          className={`textarea-gold ${errors.whyLegacy ? "error" : ""}`}
          style={{ minHeight: "120px" }}
        />
        {errors.whyLegacy && (
          <p className="font-body mt-1" style={{ fontSize: "0.8rem", color: "var(--error)" }}>
            {errors.whyLegacy}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="font-body w-full cursor-pointer"
          style={{
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
            backgroundColor: "var(--gold)",
            color: "var(--deep-navy)",
            border: "none",
            padding: "1rem 2rem",
            transition: "all 0.3s ease",
            opacity: status === "submitting" ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (status !== "submitting") {
              e.currentTarget.style.backgroundColor = "#d4b55a";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gold)";
          }}
        >
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>

        <p
          className="font-body text-center mt-4"
          style={{
            fontSize: "0.75rem",
            color: "var(--white-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Your information will only be reviewed by our founding team.
        </p>

        {status === "error" && (
          <p
            className="font-body text-center mt-4 animate-fade-in"
            style={{ fontSize: "0.8rem", color: "var(--error)" }}
          >
            Something went wrong. Please try again or email us directly at{" "}
            <a
              href="mailto:talent@legacyaitechnologies.com"
              style={{ color: "var(--gold)", textDecoration: "underline" }}
            >
              talent@legacyaitechnologies.com
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
