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

interface FormFields {
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

type FormErrors = Partial<Record<keyof FormFields | "resume", string>>;

/* ── Reusable field wrapper ────────────────────── */
function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={error ? "" : undefined}>
      <label
        htmlFor={htmlFor}
        className="font-body"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          fontWeight: 400,
          color: "var(--white-soft)",
          marginBottom: "0.5rem",
          display: "block",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--gold)", marginLeft: "4px" }}>*</span>}
      </label>
      {children}
      {error && (
        <p
          className="font-body"
          style={{ fontSize: "0.8rem", color: "var(--error)", marginTop: "0.45rem" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Section wrapper ───────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-section" style={{ marginBottom: "2.5rem" }}>
      <h3
        className="font-display"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 400,
          color: "var(--gold)",
          marginBottom: description ? "0.4rem" : "1.5rem",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="font-body"
          style={{
            fontSize: "0.78rem",
            color: "var(--white-muted)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Main Form ─────────────────────────────────── */
interface ApplicationFormProps {
  onSuccess: () => void;
}

export default function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [form, setForm] = useState<FormFields>({
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

  const updateField = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileSelect = (file: File | null) => {
    setResume(file);
    if (file && errors.resume) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.resume;
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
      const firstErr = document.querySelector("[data-error]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");

    try {
      const formData = new window.FormData();
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

      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit}>

      {/* ── About You ── */}
      <Section title="About You" description="Basic contact information so we can reach you.">
        <Field label="Full Name" required htmlFor="f-name" error={errors.name}>
          <input
            id="f-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={`input-gold input-lg ${errors.name ? "error" : ""}`}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.6rem" }}>
          <Field label="Email Address" required htmlFor="f-email" error={errors.email}>
            <input
              id="f-email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`input-gold input-lg ${errors.email ? "error" : ""}`}
            />
          </Field>

          <Field label="Phone Number" htmlFor="f-phone">
            <input
              id="f-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="input-gold input-lg"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.6rem" }}>
          <Field label="Location" required htmlFor="f-location" error={errors.location}>
            <input
              id="f-location"
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="City, State/Country"
              className={`input-gold input-lg ${errors.location ? "error" : ""}`}
            />
          </Field>

          <Field label="Open to Relocation?" required htmlFor="f-relocation" error={errors.relocation}>
            <select
              id="f-relocation"
              value={form.relocation}
              onChange={(e) => updateField("relocation", e.target.value)}
              className={`select-gold input-lg ${errors.relocation ? "error" : ""}`}
            >
              <option value="" disabled>Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Depends on the opportunity">Depends on the opportunity</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* ── Role & Profile ── */}
      <Section title="Role & Profile" description="Tell us where you see yourself contributing.">
        <Field label="Role Interest" required htmlFor="f-role" error={errors.role}>
          <select
            id="f-role"
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={`select-gold input-lg ${errors.role ? "error" : ""}`}
          >
            <option value="" disabled>Select a role</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        {form.role === "Other" && (
          <Field label="Please Specify" required htmlFor="f-roleOther" error={errors.roleOther}>
            <input
              id="f-roleOther"
              type="text"
              value={form.roleOther}
              onChange={(e) => updateField("roleOther", e.target.value)}
              className={`input-gold input-lg ${errors.roleOther ? "error" : ""}`}
            />
          </Field>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.6rem" }}>
          <Field label="LinkedIn Profile" htmlFor="f-linkedin">
            <input
              id="f-linkedin"
              type="url"
              value={form.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="input-gold input-lg"
            />
          </Field>

          <Field label="Portfolio / GitHub" htmlFor="f-portfolio">
            <input
              id="f-portfolio"
              type="url"
              value={form.portfolio}
              onChange={(e) => updateField("portfolio", e.target.value)}
              placeholder="https://github.com/..."
              className="input-gold input-lg"
            />
          </Field>
        </div>
      </Section>

      {/* ── Your Story ── */}
      <Section title="Your Story" description="Show us what you've done and why this matters to you.">
        <Field label="Resume / CV" required error={errors.resume}>
          <FileUpload
            onFileSelect={handleFileSelect}
            error={errors.resume}
          />
        </Field>

        <Field label="Relevant Experience & Skills" required htmlFor="f-experience" error={errors.experience}>
          <textarea
            id="f-experience"
            value={form.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            placeholder="Tell us about your background, expertise, and what you've built."
            rows={5}
            className={`textarea-gold textarea-lg ${errors.experience ? "error" : ""}`}
            style={{ minHeight: "150px" }}
          />
        </Field>

        <Field label="Why Legacy AI?" required htmlFor="f-whyLegacy" error={errors.whyLegacy}>
          <textarea
            id="f-whyLegacy"
            value={form.whyLegacy}
            onChange={(e) => updateField("whyLegacy", e.target.value)}
            placeholder="What draws you to this opportunity? What excites you about shaping the future of AI?"
            rows={5}
            className={`textarea-gold textarea-lg ${errors.whyLegacy ? "error" : ""}`}
            style={{ minHeight: "150px" }}
          />
        </Field>
      </Section>

      {/* ── Submit ── */}
      <div style={{ marginTop: "2rem" }}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="font-body w-full cursor-pointer"
          style={{
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
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
              e.currentTarget.style.boxShadow = "0 0 30px rgba(201, 168, 76, 0.2)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gold)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>

        <p
          className="font-body text-center mt-4"
          style={{
            fontSize: "0.7rem",
            color: "var(--white-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Your information will only be reviewed by our founding team.
        </p>

        {status === "error" && (
          <p
            className="font-body text-center mt-4 animate-fade-in"
            style={{ fontSize: "0.78rem", color: "var(--error)", lineHeight: 1.7 }}
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
