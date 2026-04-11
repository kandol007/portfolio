// app/api/send/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_SIZE_BYTES = 10_000;
const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __portfolioContactRateLimit?: Map<string, RateLimitRecord>;
};

const rateLimitStore =
  globalForRateLimit.__portfolioContactRateLimit ?? new Map<string, RateLimitRecord>();

if (!globalForRateLimit.__portfolioContactRateLimit) {
  globalForRateLimit.__portfolioContactRateLimit = rateLimitStore;
}

function sanitizeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function validateRequestOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Allow non-browser clients (e.g., local smoke tests, curl).
    return true;
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) {
    return false;
  }

  try {
    const originHost = new URL(origin).host.toLowerCase();
    return originHost === host.toLowerCase();
  } catch {
    return false;
  }
}

function checkRateLimit(clientKey: string) {
  const now = Date.now();

  // Best-effort cleanup of expired records to avoid unbounded map growth.
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(clientKey);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  rateLimitStore.set(clientKey, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
  if (!validateRequestOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Forbidden request origin" },
      { status: 403 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Unsupported content type" },
      { status: 415 }
    );
  }

  const clientKey = getClientKey(request);
  const rateLimitResult = checkRateLimit(clientKey);
  if (!rateLimitResult.allowed) {
    const response = NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(rateLimitResult.retryAfterSeconds));
    return response;
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request payload is too large" },
        { status: 413 }
      );
    }

    let payload: ContactPayload;
    try {
      payload = JSON.parse(rawBody) as ContactPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const name = sanitizeSingleLine(typeof payload.name === "string" ? payload.name : "");
    const email = sanitizeSingleLine(
      typeof payload.email === "string" ? payload.email : ""
    ).toLowerCase();
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const website = typeof payload.website === "string" ? payload.website.trim() : "";

    // Honeypot trap for bots. Return success without sending mail.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (message.length < 5 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid message" },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { success: false, error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email to yourself (receiver)
    const mailToOwner = {
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `📬 Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Confirmation email to sender (user)
    const mailToSender = {
      from: emailUser,
      to: email,
      subject: "✅ Thanks for contacting me!",
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you shortly.\n\nYour message:\n${message}\n\n– Ritik Kumar`,
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
