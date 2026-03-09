/**
 * Email sending utility using Resend.
 * Set RESEND_API_KEY in .env.local when ready.
 */

interface ApplicationData {
  name: string;
  email: string;
  phone?: string;
  location: string;
  relocation: string;
  role: string;
  roleOther?: string;
  linkedin?: string;
  portfolio?: string;
  experience: string;
  whyLegacy: string;
}

interface SendApplicationEmailParams {
  data: ApplicationData;
  resumeBuffer: Buffer;
  resumeFilename: string;
}

export async function sendApplicationEmail({
  data,
  resumeBuffer,
  resumeFilename,
}: SendApplicationEmailParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return { success: false, error: "Email service not configured" };
  }

  const roleDisplay = data.role === "Other" && data.roleOther
    ? `Other — ${data.roleOther}`
    : data.role;

  const timestamp = new Date().toISOString();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
      <hr style="border: 1px solid #c9a84c;" />
      <h2 style="color: #060b14;">NEW APPLICATION — LEGACY AI TECHNOLOGIES</h2>
      <hr style="border: 1px solid #c9a84c;" />

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Open to Relocation:</strong> ${data.relocation}</p>

      <p><strong>Role Interest:</strong> ${roleDisplay}</p>
      <p><strong>LinkedIn:</strong> ${data.linkedin || "Not provided"}</p>
      <p><strong>Portfolio/GitHub:</strong> ${data.portfolio || "Not provided"}</p>

      <hr style="border: 1px solid #c9a84c;" />
      <h3>EXPERIENCE & SKILLS</h3>
      <hr style="border: 1px solid #c9a84c;" />
      <p style="white-space: pre-wrap;">${data.experience}</p>

      <hr style="border: 1px solid #c9a84c;" />
      <h3>WHY LEGACY AI?</h3>
      <hr style="border: 1px solid #c9a84c;" />
      <p style="white-space: pre-wrap;">${data.whyLegacy}</p>

      <hr style="border: 1px solid #c9a84c;" />
      <p><strong>Submitted:</strong> ${timestamp}</p>
      <p><strong>Resume:</strong> Attached</p>
      <hr style="border: 1px solid #c9a84c;" />
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Legacy AI Applications <applications@legacyaitechnologies.com>",
      to: "talent@legacyaitechnologies.com",
      subject: `New Application — ${roleDisplay} — ${data.name}`,
      html: htmlBody,
      attachments: [
        {
          filename: resumeFilename,
          content: resumeBuffer.toString("base64"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Resend error:", err);
    return { success: false, error: "Failed to send email" };
  }

  return { success: true };
}

export async function sendConfirmationEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Silently succeed if Resend isn't configured yet
    console.warn("RESEND_API_KEY not set — skipping confirmation email");
    return { success: true };
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: Georgia, serif; font-size: 28px; letter-spacing: 0.15em; color: #060b14;">
          LEGACY <span style="color: #c9a84c;">AI</span>
        </h1>
      </div>
      <hr style="border: 1px solid #c9a84c; margin: 20px 0;" />
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Thank you for your interest in Legacy AI Technologies.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        You're now on our list. When we're ready to share more, you'll be among the first to know.
      </p>
      <hr style="border: 1px solid #c9a84c; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; 2026 Legacy AI Technologies
      </p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Legacy AI Technologies <hello@legacyaitechnologies.com>",
      to: email,
      subject: "You're on the list — Legacy AI Technologies",
      html: htmlBody,
    }),
  });

  if (!response.ok) {
    console.error("Resend confirmation error:", await response.text());
    return { success: false, error: "Failed to send confirmation" };
  }

  return { success: true };
}
