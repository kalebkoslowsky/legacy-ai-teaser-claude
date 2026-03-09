import { NextRequest, NextResponse } from "next/server";
import { sendApplicationEmail } from "@/lib/email";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const location = formData.get("location") as string;
    const relocation = formData.get("relocation") as string;
    const role = formData.get("role") as string;
    const roleOther = (formData.get("roleOther") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const experience = formData.get("experience") as string;
    const whyLegacy = formData.get("whyLegacy") as string;
    const resume = formData.get("resume") as File | null;

    // Validate required fields
    if (!name || !email || !location || !relocation || !role || !experience || !whyLegacy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (role === "Other" && !roleOther) {
      return NextResponse.json(
        { error: "Please specify your role" },
        { status: 400 }
      );
    }

    // Validate resume
    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    if (resume.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File must be under 5MB" },
        { status: 400 }
      );
    }

    if (!ACCEPTED_TYPES.includes(resume.type)) {
      const ext = resume.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext || "")) {
        return NextResponse.json(
          { error: "Please upload a PDF, DOC, or DOCX file" },
          { status: 400 }
        );
      }
    }

    // Convert file to buffer
    const bytes = await resume.arrayBuffer();
    const resumeBuffer = Buffer.from(bytes);

    // Send email
    const result = await sendApplicationEmail({
      data: {
        name,
        email,
        phone,
        location,
        relocation,
        role,
        roleOther,
        linkedin,
        portfolio,
        experience,
        whyLegacy,
      },
      resumeBuffer,
      resumeFilename: resume.name,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send application" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
