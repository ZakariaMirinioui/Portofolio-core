import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  const requests = (requestLog.get(ip) || []).filter((t) => t > windowStart);

  if (requests.length >= RATE_LIMIT_MAX) {
    return true;
  }

  requests.push(now);
  requestLog.set(ip, requests);

  if (requestLog.size > 1000) {
    const oldest = requestLog.keys().next().value;
    if (oldest) requestLog.delete(oldest);
  }

  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, organization, role, phone, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !organization || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 100 || organization.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input exceeds maximum length." },
        { status: 400 }
      );
    }

    const emailBody = {
      from: "Dossera Demo Request <no-reply@zakaria-mirinioui.dev>",
      to: "zakmirinioui@gmail.com",
      subject: `Dossera JAMS - Demo Request from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Organization: ${organization}
Role: ${role || "Not provided"}
Phone: ${phone || "Not provided"}

Message:
${message}
      `.trim(),
      html: `
<h2>Dossera JAMS - Demo Request</h2>
<table>
  <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  <tr><td><strong>Organization:</strong></td><td>${organization}</td></tr>
  <tr><td><strong>Role:</strong></td><td>${role || "Not provided"}</td></tr>
  <tr><td><strong>Phone:</strong></td><td>${phone || "Not provided"}</td></tr>
</table>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
      `.trim(),
    };

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(emailBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend error:", errorData);
      }
    }

    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New Dossera demo request from ${name} (${organization})`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Dossera Demo Request*\n*Name:* ${name}\n*Email:* ${email}\n*Organization:* ${organization}\n*Role:* ${role || "N/A"}`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Message:*\n${message.substring(0, 500)}`,
              },
            },
          ],
        }),
      });
    }

    console.log("Contact form submission:", { name, email, organization, role });

    return NextResponse.json(
      { success: true, message: "Thank you for your inquiry. We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly at zakmirinioui@gmail.com." },
      { status: 500 }
    );
  }
}