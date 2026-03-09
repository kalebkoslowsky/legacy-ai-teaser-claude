"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export default function FileUpload({ onFileSelect, error }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_TYPES.includes(f.type) && !ACCEPTED_EXTENSIONS.includes(ext)) {
      return "Please upload a PDF, DOC, or DOCX file";
    }
    if (f.size > MAX_SIZE) {
      return "File must be under 5MB";
    }
    return null;
  };

  const handleFile = (f: File) => {
    const err = validateFile(f);
    if (err) {
      setFileError(err);
      setFile(null);
      onFileSelect(null);
      return;
    }
    setFileError(null);
    setFile(f);
    onFileSelect(f);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setFileError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const displayError = fileError || error;

  if (file) {
    return (
      <div>
        <div
          className="flex items-center justify-between gap-4 px-4 py-3"
          style={{
            border: "1px solid rgba(201, 168, 76, 0.3)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <div className="min-w-0">
              <p
                className="font-body truncate"
                style={{ fontSize: "0.85rem", color: "var(--cream)" }}
              >
                {file.name}
              </p>
              <p
                className="font-body"
                style={{ fontSize: "0.75rem", color: "var(--white-muted)" }}
              >
                {formatSize(file.size)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="font-body cursor-pointer shrink-0"
            style={{
              fontSize: "0.8rem",
              color: "var(--error)",
              background: "none",
              border: "none",
              textDecoration: "underline",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className="cursor-pointer text-center py-8 px-4"
        style={{
          border: `2px dashed ${
            displayError
              ? "var(--error)"
              : dragActive
                ? "var(--gold)"
                : "rgba(201, 168, 76, 0.3)"
          }`,
          backgroundColor: dragActive ? "var(--gold-glow)" : "transparent",
          transition: "all 0.3s ease",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          className="mx-auto mb-3"
          style={{ opacity: 0.6 }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p
          className="font-body"
          style={{
            fontSize: "0.85rem",
            color: "var(--white-soft)",
            letterSpacing: "0.04em",
          }}
        >
          <span className="hidden sm:inline">
            Drop your resume here or click to upload
          </span>
          <span className="sm:hidden">Tap to upload your resume</span>
        </p>
        <p
          className="font-body mt-1"
          style={{
            fontSize: "0.75rem",
            color: "var(--white-muted)",
          }}
        >
          PDF, DOC, or DOCX — Max 5MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload resume"
      />

      {displayError && (
        <p
          className="font-body mt-2"
          style={{ fontSize: "0.8rem", color: "var(--error)" }}
        >
          {displayError}
        </p>
      )}
    </div>
  );
}
